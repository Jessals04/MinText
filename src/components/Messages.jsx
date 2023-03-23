import React from 'react';
import PropTypes from 'prop-types';

function Messages({ messages, username }) {
    return (
        <div className='p-2 flex overflow-y-auto'>
            <div className='mx-auto'>
                {
                    messages.map((message) => (
                        <table key={message.id}>
                            <tbody>
                                {
                                    message.profile.username == username
                                    ?
                                    <tr className=''>
                                        <td className='text-right w-44 pr-8 font-bold'>
                                            {message.profile.username}:
                                        </td>
                                        <td>
                                            {message.content}
                                        </td>
                                    </tr>
                                    :
                                    <tr className=''>
                                        <td className='text-right w-44 pr-8'>
                                            {message.profile.username}:
                                        </td>
                                        <td>
                                            {message.content}
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    ))
                }
            </div>
        </div>
    );
}

export default Messages;

Messages.prototype = {
    messages: PropTypes.array.isRequired
};