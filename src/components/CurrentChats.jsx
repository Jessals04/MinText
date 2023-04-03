import { useEffect, useRef } from "react";
import CurrentChat from "../components/CurrentChat";

function CurrentChats({ messages, username }) {
    const scrollToRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            scrollToRef.current.scrollIntoView();
        }, 1000);
    }, []);

    return (
        <div>
            {
                messages.map((message) => (
                    <CurrentChat key={message.id} message={message} username={username} />
                ))
            }
            <div ref={scrollToRef}></div>
        </div>
    );
}

export default CurrentChats;