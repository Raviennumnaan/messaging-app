import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';

function Navbar() {
  const { curUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignout = async function () {
    navigate('/');
    signOut(auth);
  };

  return (
    <div className='navbar'>
      <span className='logo'>Messaging App</span>
      <div className='user'>
        <img src={curUser.photoURL} alt='' />
        <span>{curUser.displayName}</span>
        <button onClick={handleSignout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
