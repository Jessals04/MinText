import React from 'react';
import MessagesContainer from "../containers/MessagesContainer";
import SendMessageContainer from "../containers/SendMessageContainer";

function MyMessages({ username }) {
    return (
        <div>
          <MessagesContainer username={username} />
          <SendMessageContainer />
        </div>
      );
}

export default MyMessages;