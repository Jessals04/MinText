
function CurrentChatInfo({ chatData }) {
    return (
        <div className="flex flex-col md:flex-row gap-4 py-2 px-4 bg-slate-600 w-full">
            <div className="flex h-full md:border-r-2">
                <h1 className="font-bold my-auto pr-4 text-sm md:text-base">{chatData.chatName}</h1>
            </div>
            <div>
                {
                    chatData.description
                    ?
                    <div className="flex gap-2">
                        <h2 className="text-xs md:text-base">Description:</h2>
                        <p className="text-xs md:text-base max-h-10 md:max-h-12 overflow-scroll scrollbar-hide">{chatData.description}</p>
                    </div>
                    :
                    <></>
                }
                <ul>
                    {
                        chatData.users
                        ?
                        <div className="flex gap-2">
                            <h2 className="text-xs md:text-base">Members:</h2>
                            <ul className="flex gap-2 max-h-4 md:max-h-6 overflow-scroll scrollbar-hide">
                                {
                                    chatData.users.map((user) => (
                                        <li className="text-xs md:text-base underline hover:no-underline" key={user.username}>{user.username}</li>
                                    ))
                                }
                            </ul>
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