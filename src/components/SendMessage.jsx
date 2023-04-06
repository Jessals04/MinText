import React from "react";

function SendMessage(props) {

    function handleChange({ target }) {
        props.handleChange(target.value);
        if (props.showMessageTooLongMessage === true) {
            props.toggleShowMessageTooLongMessage();
        }
    };

    // ------------------------------
    // altered from
    // https://reactgo.com/react-trigger-button-click/
    const handleKeyDown = e => {
        if (e.keyCode === 13) {
            props.handleClick();
        }
    };
    // ------------------------------

    return (
        <div className="w-full flex pb-4 drop-shadow-2xl border-t-2 border-slate-600 bg-gradient-to-t from-slate-900 to-slate-800">
            <input
                className="bg-transparent border-b-2 border-green-600 p-2 w-full mx-2"
                value={props.value}
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className="m-2 pr-2 text-green-600 ml-auto"
                onClick={props.handleClick}
            >Send</button>
        </div>
    );
}

export default SendMessage;