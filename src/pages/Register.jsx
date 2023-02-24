import AddAvatar from '../img/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { useContext, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('Sorry something went wrong');
  const navigate = useNavigate();

  const { loading } = useContext(AuthContext);

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];

      if (password.length < 6)
        throw new Error('Password must be more than 6 characters');

      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        () => {},
        error => {
          throw error;
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async downloadURL => {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, 'userChats', res.user.uid), {});

              navigate('/');
            }
          );
        }
      );
    } catch (error) {
      console.error(error);
      setErrMsg(error.message);
      setErr(true);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className='form-container app-container'>
      <div className='form-wrapper'>
        <span className='logo'>Messaging App</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='name' />
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <input type='file' placeholder='file' id='file' className='hide' />
          <label htmlFor='file'>
            <img src={AddAvatar} alt='' />
            <span>Add an Avatar</span>
          </label>
          <button type='submit' className='btn'>
            Sign up
          </button>
          {err && <span>{errMsg}</span>}
        </form>
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
