import { useNavigate } from "react-router-dom";

function CreateChatBtn() {
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <button
                onClick={() => {
                    navigate('/create-chat');
                }}
                className="py-2 px-4 text-sm border-2 rounded-lg hover:bg-slate-700 active:bg-slate-600"
            >+ Create Chat</button>
        </div>
    );
}

export default CreateChatBtn;