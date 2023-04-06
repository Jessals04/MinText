import React from 'react';
import SendMessage from "../components/SendMessage";
import { useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import { useNavigate } from 'react-router-dom';
import Encrypt from '../utils/Encrypt';

function SendMessageContainer({ username, chatId, showMessageTooLongMessage, toggleSetShowMessageTooLongMessage }) {
    const [text, setText] = useState('');
    const navigate = useNavigate();

    // create a GraphQLClient instance
    const hygraph = new GraphQLClient(
        'https://api-ap-southeast-2.hygraph.com/v2/clf530pz54wiv01ug5kdudakw/master', {
            headers: {
                authorization: `Bearer ${process.env.REACT_APP_AUTHTOKEN}`,
            }
        }
    );

    // create a query to create new message
    const SENDMESSAGEQUERY = gql`
      mutation AddMessage($content: String!, $username: String!, $chatId: ID!) {
        createMessage (data: {
          content: $content,
          profile: {
            connect: {
              username: $username
            }
          },
          chat: {
            connect: {
              id: $chatId
            }
          }
        }) {
          id,
          content,
          profile {
            username
          }
        }
        
        publishManyMessagesConnection (from: DRAFT, to: PUBLISHED) {
          edges {
            node {
              id
            }
          }
        }
      }
    `;

    const PUBLISHMESSAGEMUTATION = gql`
      mutation PublishMessage($id: ID) {
        publishMessage(where: {id: $id}, to: PUBLISHED) {
          id
        }
      }
    `;

    function handleChange(value) {
        setText(value);
    };

    async function publishMessage(id) {
        await hygraph.request(PUBLISHMESSAGEMUTATION, {
            id: id
        })
        .catch((err) => console.log(err.message))
    }

    async function handleClick() {
        // perform query if text length greater than 0
        if (text === '') return;

        const content = Encrypt(text);

        // create message
        await hygraph.request(SENDMESSAGEQUERY, {
          content: content,
          username: username,
          chatId: chatId
        })
        .then((res) => res)
        .then((data) => {
            publishMessage(data.createMessage.id);
        })
        .catch((err) => {
            if (err.message.includes('Expected value to have up to 1000 characters')) {
              toggleSetShowMessageTooLongMessage();
              return;
            }
            console.log(err.message);
            navigate('/login');
        });

        // clear text
        setText('');
    };

    return (
        <div>
            <SendMessage
                value={text}
                handleChange={handleChange}
                handleClick={handleClick}
                showMessageTooLongMessage={showMessageTooLongMessage}
                toggleShowMessageTooLongMessage={toggleSetShowMessageTooLongMessage} />
        </div>
    );
}

export default SendMessageContainer;