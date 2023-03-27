import Chat from "./Chat";

function Chats({ chats }) {
    return (
        <div>
            {
                chats.map((chat) => (
                    <Chat key={chat.id} chat={chat} />
                ))
            }
        </div>
    );
}

export default Chats;