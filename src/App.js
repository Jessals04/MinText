import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyMessages from "./pages/MyMessages";

function App() {
  const [user, setUser] = useState({});

  return (
      <div className="flex flex-col h-screen max-h-screen">
        <h1 className="mx-auto text-2xl">
          <Link to={'/'}>MinText</Link>
        </h1>
        <nav className="mx-auto">
          <ul className="flex gap-8">
            <li>
              {
                user != {} ? <Link to={'/my-messages'}>My Messages</Link> : <h2>Please log in: </h2>
              }
            </li>
            <li>
              {
                user != {} ? <button>Logout</button> : <Link to={'/login'}>Login</Link>
              }
            </li>
          </ul>
        </nav>
        <div className="signInDiv"></div>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/my-messages" element={ <MyMessages username={'jessals'} /> } />
          <Route exact path="/login" element={ <Login /> } />
        </Routes>
      </div>
  );
}

export default App;