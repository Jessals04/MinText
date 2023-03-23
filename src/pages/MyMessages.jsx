import React, { useEffect } from 'react';
import MessagesContainer from "../containers/MessagesContainer";
import SendMessageContainer from "../containers/SendMessageContainer";
import { useNavigate } from 'react-router-dom';

function MyMessages({ username }) {
  const navigate = useNavigate();

  // if user is not logged in, navigate to login
  useEffect(() => {
    if (!username) navigate('/login');
  }, []);

  return (
    <div className='flex flex-col mt-auto'>
      <MessagesContainer username={username} />
      <SendMessageContainer username={username} />
    </div>
  );
}

export default MyMessages;