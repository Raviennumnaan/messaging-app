import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import AuthProvider from './context/AuthContext';
import ChatProvider from './context/ChatContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ChatProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatProvider>
  </AuthProvider>
);
