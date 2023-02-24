import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './style/App.scss';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';

function App() {
  const { curUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!curUser) return <Navigate to='/login' />;
    return children;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
