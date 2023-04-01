import Chat from "./Chat";

function Chats({ chats, handleChatIdChange }) {
    return (
        <div>
            {
                chats.map((chat) => (
                    <Chat key={chat.id} chat={chat} handleChatIdChange={handleChatIdChange} />
                ))
            }
        </div>
    );
}

export default Chats;