
function CurrentChat({ message, username }) {
    return (
        <div>
            <table>
                <tbody>
                    {
                        message.profile.username === username
                        ?
                        <tr className=''>
                            <td className='text-right w-44 pr-8 font-bold align-text-top'>
                                {message.profile.username}:
                            </td>
                            <td>
                                {message.content}
                            </td>
                        </tr>
                        :
                        <tr className=''>
                            <td className='text-right w-44 pr-8 align-text-top'>
                                {message.profile.username}:
                            </td>
                            <td>
                                {message.content}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default CurrentChat;