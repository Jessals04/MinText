import { useEffect, useRef } from "react";
import CurrentChat from "../components/CurrentChat";

function CurrentChats({ messages, username, showMessageTooLongMessage }) {
    const scrollToRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            scrollToRef.current.scrollIntoView();
        }, 1000);
    }, []);

    return (
        <div className="flex flex-col pr-2 pt-24">
            {
                messages.map((message) => (
                    <CurrentChat key={message.id} message={message} username={username} />
                ))
            }
            {
                showMessageTooLongMessage
                ?
                <h1 className="text-green-600 text-sm m-auto pt-2">That message is too long! Messages must be no longer than 1000 characters.</h1>
                :
                <></>
            }
            <div ref={scrollToRef}></div>
        </div>
    );
}

export default CurrentChats;