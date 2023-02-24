// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC6eUoTwNYvPUD6dNGXJLuSmRasHKhC6r8',
  authDomain: 'chat-1c128.firebaseapp.com',
  projectId: 'chat-1c128',
  storageBucket: 'chat-1c128.appspot.com',
  messagingSenderId: '592922440767',
  appId: '1:592922440767:web:a537e58b9e2bf52bc2b48a',
  measurementId: 'G-9H5N2CCBSD',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const analytics = getAnalytics(app);
