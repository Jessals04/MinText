import React from 'react';
import Messages from "../components/Messages";
import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";

function MessagesContainer({ username }) {
    const [messages, setMessages] = useState([]);

    // create a GraphQLClient instance
    const hygraph = new GraphQLClient(
        'https://api-ap-southeast-2.hygraph.com/v2/clf530pz54wiv01ug5kdudakw/master', {
            headers: {
                authorization: `Bearer ${process.env.REACT_APP_AUTHTOKEN}`,
            }
        }
    );

    // create a query that gets the messages from the database
    const GETMESSAGESQUERY = gql`
      query GetMessages {
        messages (last: 100) {
          id,
          content,
          profile {
            username
          }
        }
      }
    `;

    // await messages data
    async function getMessages() {
        await hygraph.request(GETMESSAGESQUERY)
        .then((res) => res)
        .then((data) => {
            setMessages(data.messages);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    // use useEffect to clear interval before ismounting component
    useEffect(() => {
        // create interval that calls getMessages every 500 milliseconds
        const intervalID = setInterval(() => {
            getMessages();
        }, 500);

        // return a clean up method to clear interval
        return () => {
            clearInterval(intervalID);
        }
    });

    return (
        <div>
            <Messages messages={messages} username={username} />
        </div>
    );
}

export default MessagesContainer;