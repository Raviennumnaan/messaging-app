import Img from '../img/img.png';
import Attach from '../img/attach.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

function Input() {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { curUser } = useContext(AuthContext);
  const { data, uploadImage } = useContext(ChatContext);

  const handleSend = async function () {
    if (img) {
      uploadImage(img, text, uuidv4(), curUser, data);
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: curUser.uid,
          date: Date.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', curUser.uid), {
      [data.chatId + '.lastMsg']: { text },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMsg']: { text },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText(' ');
    setImg(null);
  };

  return (
    <div className='input'>
      <input
        type='text'
        placeholder='Type Something...'
        onChange={e => setText(e.target.value)}
        value={text}
        onKeyDown={e => e.code === 'Enter' && handleSend()}
      />
      <div className='send'>
        <img src={Attach} alt='' />
        <input
          type='file'
          className='hide'
          id='file'
          onChange={e => setImg(e.target.files[0])}
        />
        <label htmlFor='file'>
          <img src={Img} alt='' />
          {img && <span>Image Selected</span>}
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;
