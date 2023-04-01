import React, { useState, useEffect } from 'react';
import ChatsContainer from '../containers/ChatsContainer';
import CurrentChatsContainer from '../containers/CurrentChatsContainer';
import MessagesContainer from "../containers/MessagesContainer";
import SendMessageContainer from "../containers/SendMessageContainer";

function MyMessages({ logOut, user }) {
  const [currentChatId, setCurrentChatId] = useState('');

  function handleChatIdChange(newChatId) {
    setCurrentChatId(newChatId);
    console.log(currentChatId);
  }

  // if user is not logged in, navigate to login
  useEffect(() => {
    if (!user.username) {
      console.error('No user loggen in. Redirecting to login.');
      logOut();
    }
  });

  return (
    <div className='flex justify-between mt-auto h-full overflow-y-auto w-full'>
      <div className='w-1/3 drop-shadow-2xl border-r-2 border-slate-600 bg-gradient-to-t from-slate-900 to-slate-800 fixed h-full'>
        <ChatsContainer handleChatIdChange={handleChatIdChange} user={user} />
      </div>

      <div className='flex flex-col mt-auto ml-auto w-2/3 h-full'>
        <div className='h-full pt-16 relative bottom-16'>
          <CurrentChatsContainer username={user.username} chatId={currentChatId} />
        </div>
        <div className='mt-auto w-2/3 absolute bottom-0'>
          <SendMessageContainer username={user.username} chatId={currentChatId} />
        </div>
      </div>
    </div>
  );
}

export default MyMessages;