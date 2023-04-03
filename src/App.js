import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyMessages from "./pages/MyMessages";
import CreateChat from "./pages/CreateChat";

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function handleSetUser(newUser) {
    setUser(newUser);
  }

  function logOut() {
    setUser({});
    navigate('/login');
  }

  function logIn(id, username, email) {
    setUser({
      id: id,
      username: username,
      email: email
    });
  }

  return (
      <div className="flex flex-col h-screen max-h-screen bg-slate-900 text-slate-50">
        <div className="flex flex-col mx-auto bg-slate-800 w-full p-4 drop-shadow-2xl border-b-2 border-slate-600 z-10">
          <h1 className="text-center text-2xl">
            <Link to={'/'}>
            {
              user.username
              ?
              <p className="tracking-wide">Welcome to MinText, <span className="text-green-600">{user.username}</span>!</p>
              :
              <p>MinText</p>
            }
            </Link>
          </h1>
          <nav className="mx-auto">
            <ul className="flex gap-12">
              <li className="flex">
                {
                  user.username
                  ? <Link className="text-green-600 hover:underline py-1" to={'/my-messages'}>My Messages</Link>
                  : <h2 className="py-1 px-4" >Please log in: </h2>
                }
              </li>
              <li>
                {
                  user.username
                  ? <button className="text-green-600 hover:underline py-1" onClick={logOut}>Logout</button>
                  : <div className="flex gap-4 py-1">
                      <Link className="text-green-600 hover:underline" to={'/login'}>Login</Link>
                      or
                      <Link className="text-green-600 hover:underline" to={'/signup'}>Sign Up</Link>
                    </div>
                }
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/my-messages" element={ <MyMessages logOut={logOut} user={user} /> } />
          <Route exact path="/create-chat" element={ <CreateChat user={user} logOut={logOut} /> } />
          <Route exact path="/login" element={ <Login logIn={logIn} user={user} handleSetUser={handleSetUser} /> } />
          <Route exact path="/signup" element={ <SignUp logIn={logIn} user={user} handleSetUser={handleSetUser} /> } />
        </Routes>
      </div>
  );
}

export default App;