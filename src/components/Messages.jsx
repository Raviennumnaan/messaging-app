import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Message from './Message';

function Messages() {
  const [msgs, setMsgs] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
      doc.exists() && setMsgs(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className='messages'>
      {msgs.map(msg => (
        <Message msg={msg} key={msg.id} />
      ))}
    </div>
  );
}

export default Messages;
