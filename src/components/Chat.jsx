import Cam from '../img/cam.png';
import Add from '../img/add.png';
import More from '../img/more.png';
import Messages from './Messages';
import Input from './Input';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className='chat-info'>
        <span>{data.user?.displayName}</span>
        <div className='chat-icons'>
          <img src={Cam} alt='' />
          <img src={Add} alt='' />
          <img src={More} alt='' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
