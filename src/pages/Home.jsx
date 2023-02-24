import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import Spinner from '../components/Spinner';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function Home() {
  const { loading } = useContext(AuthContext);

  if (loading) return <Spinner />;

  return (
    <div className='home app-container'>
      <div className='container'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
