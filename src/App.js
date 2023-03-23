import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyMessages from "./pages/MyMessages";

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

  return (
      <div className="flex flex-col h-screen max-h-screen">
        <h1 className="mx-auto text-2xl pb-2">
          <Link to={'/'}>
          {
            user.username
            ?
            <p className="tracking-wide">Welcome to MinText, {user.username}!</p>
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
                ? <Link className="border-2 py-1 px-4 rounded-lg" to={'/my-messages'}>My Messages</Link>
                : <h2 className="py-1 px-4" >Please log in: </h2>
              }
            </li>
            <li>
              {
                user.username
                ? <button className="border-2 py-1 px-4 rounded-lg" onClick={logOut}>Logout</button>
                : <div className="flex gap-4 py-1">
                    <Link className="text-green-600 hover:underline" to={'/login'}>Login</Link>
                    or
                    <Link className="text-green-600 hover:underline" to={'/signup'}>Sign Up</Link>
                  </div>
              }
            </li>
          </ul>
        </nav>
        <div className="signInDiv"></div>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/my-messages" element={ <MyMessages username={user.username} /> } />
          <Route exact path="/login" element={ <Login user={user} handleSetUser={handleSetUser} /> } />
          <Route exact path="/signup" element={ <SignUp user={user} handleSetUser={handleSetUser} /> } />
        </Routes>
      </div>
  );
}

export default App;