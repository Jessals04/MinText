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
            {/*
            CurrentChats will map the array of chats for the current chat and give those details to the CurrentChat component.
            */}
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