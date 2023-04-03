import { GraphQLClient, gql } from "graphql-request";
import { useState, useEffect } from "react";

// import components
import Chats from "../components/Chats";
import CreateChatBtn from "../components/CreateChatBtn";

function ChatsContainer({ user, handleChatIdChange }) {
    const [chats, setChats] = useState([]);

    // create a GraphQLClient instance
    const hygraph = new GraphQLClient(
        'https://api-ap-southeast-2.hygraph.com/v2/clf530pz54wiv01ug5kdudakw/master', {
            headers: {
                authorization: `Bearer ${process.env.REACT_APP_AUTHTOKEN}`,
            }
        }
    );

    // create a query that gets the chats in which the
    // logged in user is a member
    const GETCHATSQUERY = gql`
      query GetUsersChats($username: String!) {
        profile(where: {username: $username}) {
          chats {
            id,
            chatName
          }
        }
      }
    `;

    // a function that gets the lists of chats and set's the chats state
    async function getAndSetChats() {
        await hygraph.request(GETCHATSQUERY, {
            username: user.username
        })
        .then((res) => res)
        .then((data) => {
            // sets chats with received data as an array
            setChats(data.profile.chats);
        })
        .catch((err) => console.error(err.message));
    }

    useEffect(() => {
        const intervalID = setInterval(() => {
            getAndSetChats();
        }, 1000);

        return () => {
            clearInterval(intervalID);
        }
    });

    return (
        <div className="flex flex-col h-screen">
            <div className="">
                <CreateChatBtn />
            </div>

            <Chats chats={chats} handleChatIdChange={handleChatIdChange} />
        </div>
    );
}

export default ChatsContainer;