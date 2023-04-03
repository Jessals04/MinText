import CreateChatFieldsContainer from "../containers/CreateChatFieldsContainer";
import { useEffect } from "react";

function CreateChat({ user, logOut }) {

    // if user is not logged in, navigate to login
    useEffect(() => {
        if (!user.username) {
        console.error('No user loggen in. Redirecting to login.');
        logOut();
        }
    });

    return (
        <div className="flex h-screen w-screen">
            <div className="m-auto">
                <CreateChatFieldsContainer user={user}/>
            </div>
        </div>
    );
}

export default CreateChat;