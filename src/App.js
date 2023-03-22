import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyMessages from "./pages/MyMessages";

function App() {
  const [user, setUser] = useState(null);

  function handleSetUser(newUser) {
    setUser(newUser);
  }

  function logOut() {
    setUser(null);
  }

  return (
      <div className="flex flex-col h-screen max-h-screen">
        <h1 className="mx-auto text-2xl">
          <Link to={'/'}>MinText</Link>
        </h1>
        <nav className="mx-auto">
          <ul className="flex gap-12">
            <li className="flex">
              {
                user !== {}
                ? <Link className="border-2 py-1 px-4 rounded-lg"  to={'/my-messages'}>My Messages</Link>
                : <h2 className="py-1 px-4" >Please log in: </h2>
              }
            </li>
            <li>
              {
                user !== {}
                ? <button className="border-2 py-1 px-4 rounded-lg">Logout</button>
                : <div className="flex gap-4">
                    <Link className="border-2 py-1 px-4 rounded-lg" to={'/login'}>Login</Link>
                    <Link className="border-2 py-1 px-4 rounded-lg" to={'/signup'}>Sign Up</Link>
                  </div>
              }
            </li>
          </ul>
        </nav>
        <div className="signInDiv"></div>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/my-messages" element={ <MyMessages username={'jessals'} /> } />
          <Route exact path="/login" element={ <Login user={user} setUser={handleSetUser} /> } />
          <Route exact path="/signup" element={ <SignUp user={user} handleSetUser={handleSetUser} /> } />
        </Routes>
      </div>
  );
}

export default App;