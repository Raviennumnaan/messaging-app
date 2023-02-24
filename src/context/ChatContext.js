import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { createContext, useReducer } from 'react';
import { db, storage } from '../firebase';
import chatReducer from './ChatReducer';

export const ChatContext = createContext();

const ChatProvider = function ({ children }) {
  const initialState = {
    chatId: 'null',
    user: {},
    imgURL: '',
  };

  const updateMsg = async (imgURL, id, text, user, data) => {
    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id,
        text,
        senderId: user.uid,
        date: Date.now(),
        img: imgURL,
      }),
    });
  };

  const uploadImage = async function (img, text = '', id, user, data) {
    const storageRef = ref(storage, id);

    const uploadTask = uploadBytesResumable(storageRef, img);

    return uploadTask.on(
      'state_changed',
      () => {},
      error => {
        throw error;
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateMsg(downloadURL, id, text, user, data);
      }
    );
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ data: state, dispatch, uploadImage }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
