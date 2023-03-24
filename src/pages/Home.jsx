import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="flex pt-8">
            <div className="flex flex-col mx-auto border-2 border-slate-600 rounded-lg p-10 bg-slate-800 drop-shadow-lg sm:max-w-md max-w-xs">
                <h1 className="mx-auto pb-4 text-lg">Welcome to MinText!</h1>
                <p>
                    MinText is a simple messaging app - a ReactJS project developed by Jess W (usename 'jessals' in the My Messages tab).
                    <br />
                    <br />
                    Create an account on the <Link to={'/signup'} className="font-bold underline text-green-600">sign up</Link> page. Pick a unique username, enter your email and password and, voila, you can start sending messages.
                    <br />
                    <br />
                    Currently this is in production and will have a DMs option soon.
                    <br />
                    <br />
                    <span className='italic'>P.S. your password is encrypted, so I won't be able to see it in the database!</span>
                </p>
            </div>
        </div>
    );
}

export default Home;