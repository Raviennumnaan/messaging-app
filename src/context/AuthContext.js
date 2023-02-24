import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = function ({ children }) {
  const [curUser, setCurUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, user => {
      if (user === null) setCurUser({});
      setCurUser(user);
      setLoading(false);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ curUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
