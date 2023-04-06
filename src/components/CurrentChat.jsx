import Decrypt from "../utils/Decrypt";

function CurrentChat({ message, username }) {
    const content = Decrypt(message.content);

    return (
        <div className="text-sm md:text-base">
            <table>
                <tbody>
                    {
                        message.profile.username === username
                        ?
                        <tr className=''>
                            <td className='text-right w-32 md:w-52 lg:w-60 pl-2 md:pl-8 pr-8 font-bold align-text-top break-all'>
                                {message.profile.username}:
                            </td>
                            <td>
                                {content}
                            </td>
                        </tr>
                        :
                        <tr className=''>
                            <td className='text-right w-32 md:w-52 lg:w-60 pl-2 md:pl-8 pr-8 align-text-top break-all'>
                                {message.profile.username}:
                            </td>
                            <td>
                                {content}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default CurrentChat;