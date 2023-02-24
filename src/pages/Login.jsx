import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/Spinner';

function Login() {
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('Sorry something went wrong');
  const navigate = useNavigate();

  const { loading } = useContext(AuthContext);

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const email = e.target[0].value;
      const password = e.target[1].value;

      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
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
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />

          <button type='submit' className='btn'>
            Sign in
          </button>
          {err && <span>{errMsg}</span>}
        </form>
        <p>
          You don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
