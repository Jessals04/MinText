import React from 'react';
import SendMessage from "../components/SendMessage";
import { useState } from "react";
import { GraphQLClient, gql } from "graphql-request";

function SendMessageContainer() {
    const [text, setText] = useState('');

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
        mutation AddMessage($content: String!, $username: String!) {
            createMessage (
                data: {
                    content: $content,
                    profile: {
                        connect: {
                        username: $username
                    }
                }
            }) {
                id
            }

            publishManyMessagesConnection (last: 1, from: DRAFT, to: PUBLISHED) {
                edges {
                  node {
                    id
                  }
                }
            }
        }
    `;

    // create a query to publish message
    const PUBLISHMESSAGEQUERY = gql`
        mutation PublishMessage($id: ID) {
          publishMessage(where: {id: $id}, to: PUBLISHED) {
            id
          }
        }
    `;

    // create query variables
    const variables = {
        content: text,
        username: 'jessals'
    };

    function handleChange(value) {
        setText(value);
    };

    async function handleClick() {
        // perform query if text length greater than 0
        if (text == '') return;

        // create message
        const data = await hygraph.request(SENDMESSAGEQUERY, variables).catch((err) => {
            console.log(err.message);
        });

        // clear text
        setText('');
    };

    return (
        <div>
            <SendMessage
                value={text}
                handleChange={handleChange}
                handleClick={handleClick} />
        </div>
    );
}

export default SendMessageContainer;