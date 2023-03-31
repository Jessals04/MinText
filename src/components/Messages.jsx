import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Messages({ messages, username }) {
    const scrollToRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            scrollToRef.current.scrollIntoView();
        }, 1000);
    }, []);
    
    return (
        <div className='p-2 flex'>
            <div className='mx-auto'>
                {
                    messages.map((message) => (
                        <table key={message.id}>
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
                    ))
                }
                <div ref={scrollToRef}></div>
            </div>
        </div>
    );
}

export default Messages;

Messages.prototype = {
    messages: PropTypes.array.isRequired
};