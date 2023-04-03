import { useNavigate } from "react-router-dom";

function CreateChatBtn() {
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <button
                onClick={() => {
                    navigate('/create-chat');
                }}
                className="py-1 md:py-2 px-2 md:px-4 text-sm border-2 rounded-lg hover:bg-slate-700 active:bg-slate-60 w-full flex gap-2 justify-center"
            >+ 
              <span
                className="hidden md:block"
              >Create Chat
              </span>
            </button>
        </div>
    );
}

export default CreateChatBtn;