import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

function Chats() {
  const [chats, setChats] = useState([]);

  const { curUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = function () {
      const unsub = onSnapshot(doc(db, 'userChats', curUser.uid), doc => {
        setChats(doc.data());
      });

      return () => unsub();
    };

    curUser.uid && getChats();
  }, [curUser.uid]);

  const handleSelect = function (userInfo) {
    dispatch({ type: 'CHANGE_USER', payload: { userInfo, curUser } });
  };

  return (
    <div className='chats'>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(chat => (
          <div
            className='user-chat'
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo?.photoURL} alt='' />
            <div className='user-chat-info'>
              <span>{chat[1].userInfo?.displayName}</span>
              <p>{chat[1].lastMsg?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Chats;
