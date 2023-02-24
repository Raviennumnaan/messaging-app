import { useContext, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

function Search() {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { curUser } = useContext(AuthContext);

  const handleSearch = async function (e) {
    try {
      if (e.code !== 'Enter') return;
      setUser(null);

      const q = query(
        collection(db, 'users'),
        where('displayName', '==', userName)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
      setTimeout(() => setErr(false), 3000);
    }
  };

  const handleSelect = async function () {
    try {
      // Check whether the group exist
      // Not exist create and open
      const id =
        curUser.uid > user.uid
          ? curUser.uid + user.uid
          : user.uid + curUser.uid;
      const res = await getDoc(doc(db, 'chats', id));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', id), { messages: [] });

        await updateDoc(doc(db, 'userChats', curUser.uid), {
          [id + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },

          [id + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', user.uid), {
          [id + '.userInfo']: {
            uid: curUser.uid,
            displayName: curUser.displayName,
            photoURL: curUser.photoURL,
          },

          [id + '.date']: serverTimestamp(),
        });
      }
      // Exist open that
    } catch (error) {}

    setUser(null);
    setUserName('');
  };

  return (
    <div className='search'>
      <div className='search-form'>
        <input
          type='text'
          placeholder='Find a user'
          onChange={e => setUserName(e.target.value)}
          onKeyDown={handleSearch}
          value={userName}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className='user-chat' onClick={handleSelect}>
          <img src={user.photoURL} alt='' />
          <div className='user-chat-info'>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
