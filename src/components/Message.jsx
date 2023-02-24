import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Message({ msg }) {
  const { curUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const time = `${new Date(msg.date).getHours()}:${new Date(
    msg.date
  ).getMinutes()}`;

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [msg]);

  if (msg.text.trim() === '' && msg.img === undefined) return;

  return (
    <div
      ref={ref}
      className={`message ${msg.senderId === curUser.uid ? 'owner' : ''}`}
    >
      <div className='message-info'>
        <img
          src={
            msg.senderId === curUser.uid ? curUser.photoURL : data.user.photoURL
          }
          alt=''
        />
        <span>{time}</span>
      </div>
      <div className='message-content'>
        {msg.text.trim() !== '' && <p>{msg.text}</p>}
        {msg.img && <img src={msg.img} alt='' />}
      </div>
    </div>
  );
}

export default Message;
