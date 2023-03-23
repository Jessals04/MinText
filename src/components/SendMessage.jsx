import React, { useState } from "react";

function SendMessage(props) {
    function handleChange ({ target }) {
        props.handleChange(target.value);
    };

    return (
        <div className="w-full flex pb-4">
            <input
                className="bg-transparent border-b-2 border-green-600 p-2 w-full mx-2"
                value={props.value}
                type="text"
                onChange={handleChange}
            />
            <button
                className="m-2 pr-2 text-green-600 ml-auto"
                onClick={props.handleClick}
            >Send</button>
        </div>
    );
}

export default SendMessage;