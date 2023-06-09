import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateChatFields({ searchForProfile, createChat, username }) {
    const [chatName, setChatName] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState([username]);
    const [memberToSearchFor, setMemberToSearchFor] = useState('');
    const [showChatNameEmpty, setShowChatNameEmpty] = useState(false);
    const [showMembersEmpty, setShowMembersEmpty] = useState(false);
    const [showMemberNotExists, setShowMemberNotExists] = useState(false);
    const [showMemberAlreadyAdded, setShowMemberAlreadyAdded] = useState(false);

    const navigate = useNavigate();

    function onChatNameChange({ target }) {
        setChatName(target.value);
        setShowChatNameEmpty(false);
    }

    function onDescriptionChange({ target }) {
        setDescription(target.value);
    }
    
    function onSearchForMembersChange({ target }) {
        setMemberToSearchFor(target.value.toLowerCase());
        setShowMembersEmpty(false);
        setShowMemberNotExists(false);
        setShowMemberAlreadyAdded(false);
    }

    async function handleMemberSubmit() {
        // return if member field is empty
        if (!memberToSearchFor) {
            return;
        }

        setShowMembersEmpty(false);

        const userExists = await searchForProfile(memberToSearchFor);
        if (userExists && (!members.includes(memberToSearchFor))) {
            setMembers([...members, memberToSearchFor]);
            setMemberToSearchFor('');
        } else if (members.includes(memberToSearchFor)) {
            setShowMemberAlreadyAdded(true);
            setMemberToSearchFor('');
        } else {
            setShowMemberNotExists(true);
        }
    }

    function handleSubmit() {
        // check if fields are empty
        if (!chatName) {
            setShowChatNameEmpty(true);
        }

        if (members.length === 0) {
            setShowMembersEmpty(true);
        }

        if ((!chatName) || (members.length === 0)) {
            return;
        }

        createChat(chatName, description, members);

    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 justify-center content-center mx-auto">
                <h1 className='mx-auto text-2xl'>Create New Chat</h1>
                {
                        showChatNameEmpty
                        ?
                        <h2 className="text-orange-600 text-sm">Please enter a chat name.</h2>
                        :
                        <></>
                }
                <input value={chatName} onChange={onChatNameChange} className='bg-slate-600 rounded-lg p-2 w-58 sm:w-80' type="text" placeholder='Chat name' />
                <input value={description} onChange={onDescriptionChange} className='bg-slate-600 rounded-lg p-2 w-58 sm:w-80' type="text" placeholder='Description' />

                {
                    members.length === 0
                    ?
                    <h2 className="text-sm">Please select some members.</h2>
                    :
                    <div>
                        <h2>Members:</h2>
                        <ul className="text-sm">
                            {
                                members.map((member) => (
                                    <li key={member}>{member}</li>
                                ))
                            }
                        </ul>
                    </div>
                }

                {/* Messages for members field. */}
                {
                        showMembersEmpty
                        ?
                        <h2 className="text-orange-600 text-sm">Please add at least one member.</h2>
                        :
                        <></>
                }
                {
                        showMemberNotExists
                        ?
                        <h2 className="text-orange-600 text-sm">That username does not exists.</h2>
                        :
                        <></>
                }
                {
                        showMemberAlreadyAdded
                        ?
                        <h2 className="text-orange-600 text-sm">You have already added that member.</h2>
                        :
                        <></>
                }
                <input value={memberToSearchFor} onChange={onSearchForMembersChange} className='bg-slate-600 rounded-lg p-2 w-58 sm:w-80' type="text" placeholder='Search for a username' />
                <button className="mx-auto text-sm md:text-base hover:underline active:text-slate-200" type="submit" onClick={handleMemberSubmit}>+ Add Member</button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-0 text-sm">
                <button className="mx-auto border-2 border-slate-500 text-slate-400 rounded-lg w-32 py-1 hover:bg-slate-700 active:bg-slate-600" type="submit" onClick={() => navigate('/my-messages')}>Cancel</button>

                <button className="mx-auto border-2 border-slate-00 rounded-lg w-32 py-1 hover:bg-slate-700 active:bg-slate-600" type="submit" onClick={handleSubmit}>Let's go!</button>
            </div>
        </div>
    );
}

export default CreateChatFields;