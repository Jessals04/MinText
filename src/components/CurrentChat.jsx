import Decrypt from "../utils/Decrypt";

function CurrentChat({ message, username }) {
    const content = Decrypt(message.content);
    const date = new Date(message.createdAt);

    return (
        <div className="text-sm md:text-base px-2 py-1 ml-4 md:ml-12">
            {
                message.profile.username === username
                ?
                <div className="flex gap-4">
                    <h1 className="text-slate-400 hover:text-slate-200 font-bold">{message.profile.username}</h1>
                    <h2 className="my-auto text-xs text-slate-500">{date.toLocaleString()}</h2>
                </div>
                :
                <div className="flex gap-4">
                    <h1 className="text-slate-400 hover:text-slate-200">{message.profile.username}</h1>
                    <h2 className="my-auto text-xs text-slate-500">{date.toLocaleString()}</h2>
                </div>
            }
            <div>
                <p>{content}</p>
            </div>
        </div>
    );
}

export default CurrentChat;