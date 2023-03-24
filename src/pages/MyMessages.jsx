import React, { useEffect } from 'react';
import MessagesContainer from "../containers/MessagesContainer";
import SendMessageContainer from "../containers/SendMessageContainer";

function MyMessages({ logOut, username }) {

  // if user is not logged in, navigate to login
  useEffect(() => {
    if (!username) {
      console.error('No user loggen in. Redirecting to login.');
      logOut();
    }
  });

  return (
    <div className='flex flex-col mt-auto h-full overflow-y-auto'>
      <div className='pb-16 mt-auto bottom-0'>
        <MessagesContainer username={username} />
      </div>
      <div className='mt-auto w-full absolute bottom-0'>
        <SendMessageContainer username={username} />
      </div>
    </div>
  );
}

export default MyMessages;