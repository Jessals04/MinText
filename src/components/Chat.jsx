
function Chat({ chat, handleChatIdChange }) {

    function handleClick() {
        handleChatIdChange(chat.id);
    }
    return (
        <div className="h-10 flex px-4 hover:bg-slate-600 active:bg-slate-700" onClick={handleClick}>
            <h1 className="my-auto">{chat.chatName}</h1>
        </div>
    );
}

export default Chat;