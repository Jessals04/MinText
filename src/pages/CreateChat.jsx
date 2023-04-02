import CreateChatFieldsContainer from "../containers/CreateChatFieldsContainer";

function CreateChat({ user }) {
    return (
        <div className="flex h-screen w-screen">
            <div className="m-auto">
                <CreateChatFieldsContainer user={user}/>
            </div>
        </div>
    );
}

export default CreateChat;