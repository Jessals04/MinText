import React, { useEffect } from 'react';
import ChatsContainer from '../containers/ChatsContainer';
import CurrentChatsContainer from '../containers/CurrentChatsContainer';
import MessagesContainer from "../containers/MessagesContainer";
import SendMessageContainer from "../containers/SendMessageContainer";

function MyMessages({ logOut, user }) {

  // if user is not logged in, navigate to login
  useEffect(() => {
    if (!user.username) {
      console.error('No user loggen in. Redirecting to login.');
      logOut();
    }
  });

  return (
    <div className='flex justify-between mt-auto h-full overflow-y-auto w-full'>
      <div className='w-1/3 drop-shadow-2xl border-r-2 border-slate-600 bg-gradient-to-t from-slate-900 to-slate-800'>
        <ChatsContainer user={user} />
      </div>

      <div>
        <CurrentChatsContainer chat />
      </div>

      <div className='flex flex-col mt-auto w-2/3 pr-8'>
        <div className='mt-auto pt-16 relative bottom-16'>
          <MessagesContainer username={user.username} />
        </div>
        <div className='mt-auto w-2/3 absolute bottom-0'>
          <SendMessageContainer username={user.username} />
        </div>
      </div>
    </div>
  );
}

export default MyMessages;