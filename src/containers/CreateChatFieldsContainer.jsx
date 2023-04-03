import CreateChatFields from "../components/CreateChatFields";
import { GraphQLClient, gql } from "graphql-request";
import { useNavigate } from "react-router-dom";

function CreateChatFieldsContainer({ user }) {
    const navigate = useNavigate();

    // create a GraphQLClient instance
    const hygraph = new GraphQLClient(
        'https://api-ap-southeast-2.hygraph.com/v2/clf530pz54wiv01ug5kdudakw/master', {
            headers: {
                authorization: `Bearer ${process.env.REACT_APP_AUTHTOKEN}`,
            }
        }
    );

    /*
     * TO-DO:
     * - query database for member. if member exists return true, else false.
     * - create a new chat in the database with the chatName, descipriton
     *   and members provided by the user 
     */

    // query and function to search for profile
    const SEARCHFORPROFILEQUERY = gql`
      query SearchForProfile($username: String!) {
        profile(where: { username: $username }) {
          username
        }
      }
    `;

    async function searchForProfile(username) {
        let userExists = false;

        await hygraph.request(SEARCHFORPROFILEQUERY, {
            username: username
        })
        .then((res) => res)
        .then((data) => {
            if (data.profile.username === username) {
                userExists = true;
            } else {
                userExists = false;
            }
        })
        .catch((err) => console.log(err.message));

        return userExists;
    }
    // -----------

    // mutations and function to create new chat
    const CREATENEWCHATMUTATION = gql`
      mutation CreateNewChat($chatName: String!, $description: String!) {
        createChat(data: {
          chatName: $chatName,
          description: $description
        }) {
          id
        }
      }
    `;

    const ADDPROFILETOCHATMUTATION = gql`
      mutation AddProfileToChat($username: String!, $chatId: ID!) {
        updateChat(data: {
          profiles: {
            connect: {
              where: {
                username: $username
              }
            }
          }
        },
        where: {
          id: $chatId
        }) {
          id
        }
      }
    `;

    const PUBLISHCHATMUTATION = gql`
      mutation PublishChat($chatId: ID!) {
        publishChat(to: PUBLISHED, where: {
          id: $chatId
        }) {
          id
        }
      }
    `;

    async function createChat(chatName, description, members) {
        const chatId = await createChatWithoutMembers(chatName, description);
        await hygraph.request(PUBLISHCHATMUTATION, {
            chatId: chatId
        });

        await members.forEach((member) => {
            addMemberToChat(member, chatId)
        });

        // wait 1 second to avoid too many requests to database
        setTimeout(() => chatId, 500);

        await hygraph.request(PUBLISHCHATMUTATION, {
            chatId: chatId
        });

        sendChatCreatedMessage(chatName, chatId);

        navigate('/my-messages');
    }

    async function createChatWithoutMembers(chatName, description) {
        let chatId = ''
        await hygraph.request(CREATENEWCHATMUTATION, {
            chatName: chatName,
            description: description
        })
        .then((res) => res)
        .then((data) => {
            chatId = data.createChat.id;
        })
        .catch((err) => console.log(err.message));

        return chatId;
        
    }

    async function addMemberToChat(username, chatId) {
        await hygraph.request(ADDPROFILETOCHATMUTATION, {
            username: username,
            chatId: chatId
        })
        .catch((err) => console.log(err.message));
    }

    const CHATCREATEDMESSAGEMUTATION = gql`
      mutation SendChatCreatedMessage($chatId: ID!, $username: String!, $content: String!) {
        createMessage (data: {
          profile: {
            connect: {
              username: $username
            }
          },
          content: $content,
          chat: {
            connect: {
              id: $chatId
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

    async function sendChatCreatedMessage(chatName, chatId) {
        const chatCreatedMessageContent = `👋 Welcome to ${chatName}!`

        await hygraph.request(CHATCREATEDMESSAGEMUTATION, {
            chatId: chatId,
            username: user.username,
            content: chatCreatedMessageContent
        })
        .catch((err) => console.log(err.message));
    }

    return (
        <div className='m-auto border-2 border-slate-600 rounded-lg bg-slate-800 drop-shadow-lg text-slate-50 px-8 sm:px-32 py-16 max-w-xs sm:max-w-full'>
            <CreateChatFields searchForProfile={searchForProfile} createChat={createChat} username={user.username} />
        </div>
    );
}

export default CreateChatFieldsContainer;