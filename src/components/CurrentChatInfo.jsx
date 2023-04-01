
function CurrentChatInfo({ chatData }) {
    return (
        <div className="flex gap-4 py-2 px-4 bg-slate-600 w-full">
            <div className="flex h-full border-r-2">
                <h1 className="font-bold my-auto pr-4">{chatData.chatName}</h1>
            </div>
            <div>
                {
                    chatData.description
                    ?
                    <div className="flex gap-2">
                        <h2>Description:</h2>
                        <p>{chatData.description}</p>
                    </div>
                    :
                    <></>
                }
                <ul>
                    {
                        chatData.users
                        ?
                        <div className="flex gap-2">
                            <h2>Members:</h2>
                            {
                                chatData.users.map((user) => (
                                    <li>`{user.username}`</li>
                                ))
                            }
                        </div>
                        :
                        <></>
                    }
                </ul>

            </div>
        </div>
    );
}

export default CurrentChatInfo;