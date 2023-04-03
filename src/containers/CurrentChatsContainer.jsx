import { useEffect, useState } from "react";
import CurrentChats from "../components/CurrentChats";
import { GraphQLClient, gql } from "graphql-request";
import CurrentChatInfo from "../components/CurrentChatInfo";


function CurrentChatsContainer({ chatId, username }) {
    const [messages, setMessages] = useState([]);
    const [currentChatData, setcurrentChatData] = useState({});

    // create a GraphQLClient instance
    const hygraph = new GraphQLClient(
        'https://api-ap-southeast-2.hygraph.com/v2/clf530pz54wiv01ug5kdudakw/master', {
            headers: {
                authorization: `Bearer ${process.env.REACT_APP_AUTHTOKEN}`,
            }
        }
    );

    // create a query that gets the messages from the database
    const GETCHATDATAQUERY = gql`
      query GetChatData($id: ID!) {
        chat(where: { id: $id}) {
          id,
          chatName,
          description,
          profiles {
            username
          },
          messages(last: 1000) {
            id,
            profile {
              username
            }
            content
          }
        }
      }
    `;

    // await messages data
    async function getMessages() {
        await hygraph.request(GETCHATDATAQUERY, {
            id: chatId
        })
        .then((res) => res)
        .then((data) => {
            setMessages(data.chat.messages);
            setcurrentChatData({
                chatName: data.chat.chatName,
                description: data.chat.description,
                users: data.chat.profiles
            });
        })
        .catch((err) => {
            if (!err.message.includes('data.chat is null')) {
                console.log(err.message);
            }
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
        <div className="flex flex-col justify-between h-full">
            <CurrentChatInfo chatData={currentChatData} />
            <CurrentChats messages={messages} username={username} />
        </div>
    );
}

export default CurrentChatsContainer;