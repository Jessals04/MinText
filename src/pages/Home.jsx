import React from 'react';

function Home() {
    return (
        <div className="flex pt-8">
            <div className="flex flex-col mx-auto border-2 rounded-lg p-10 bg-slate-100 drop-shadow-lg max-w-md">
                <h1 className="mx-auto pb-4 text-lg">Welcome to MinText!</h1>
                <p>
                    MinText is a simple messaging app - a ReactJS project developed by Jess W (usename 'jessals' in the My Messages tab).
                    <br />
                    <br />
                    Log in with your Google accout, pick a unique username and, voila, you can start sending messages.
                    <br />
                    <br />
                    Currently this is in production and will have a DMs option soon.
                </p>
            </div>
        </div>
    );
}

export default Home;