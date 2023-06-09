import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import { Link, useNavigate } from "react-router-dom";
import Hash from "../utils/Hash";

function Login({ logIn, user }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameExists, setUsernameExists] = useState(true);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const navigate = useNavigate();
  let id = '';
  let email = '';

  // create a GraphQLClient instance
  const hygraph = new GraphQLClient(
    'https://api-ap-southeast-2.hygraph.com/v2/clf530pz54wiv01ug5kdudakw/master', {
        headers: {
            authorization: `Bearer ${process.env.REACT_APP_AUTHTOKEN}`,
        }
    }
  );

  // create a query that requests a users password
  const GETPROFILEPASSQUERY = gql`
    query GetUserPass($username: String!) {
      profile(where: {
        username: $username
      }) {
        id,
        password,
        email
      }
    }
  `;

  // function that queries that database for a username and returns
  // the encrypted password
  // if the password from the database matches the user provided password,
  // the function will return true; else, false
  async function checkUsernameAndPassword() {
    let profile = null;

    await hygraph.request(GETPROFILEPASSQUERY, { username: username })
    .then((res) => res)
    .then((data) => {
      id = data.profile.id;
      email = data.profile.email;
      profile = data.profile;
    })
    .catch((err) => console.log(err.message));

    // if profile is null, return false and setUsernameExists(false)
    if (!profile) {
      setUsernameExists(false);
      return false;
    }
    
    // hash password provided by user
    const hashedPass = Hash(password);

    // check if passwords match
    const passwordsMatch = checkIfVarsMatch(hashedPass, profile.password);

    if (!passwordsMatch) {
      return false;
    }
    
    return true;
  }

  // function will take in two variables and return true if they match;
  // else, false
  function checkIfVarsMatch(var1, var2) {
    if (var1 === var2) return true;
    return false;
  }

  function onUsernameChange({ target }) {
    setUsername(target.value.toLowerCase());
    setUsernameExists(true);
  }
  
  function onPasswordChange({ target }) {
    setPassword(target.value);
    setPasswordIncorrect(false);
  }

  async function handleSubmit() {
    const profileExistsAndPasswordMatches = await checkUsernameAndPassword();

    if (!profileExistsAndPasswordMatches) {
      setPasswordIncorrect(true);
      return;
    }

    // set user
    logIn(id, username, email);

    // clear fields
    setUsername('');
    setPassword('');

    // send user to MyMessages
    navigate('/my-messages');

  }

  // if user is already logged in, navigate back to home
  useEffect(() => {
    if (user.username) navigate('/');
  }, [user.username, navigate]);
  
  return (
    <div>
      <div className='flex my-10 sm:mx-10'>
            <div className='flex flex-col gap-4 m-auto border-2 border-slate-600 rounded-lg bg-slate-800 drop-shadow-lg text-slate-50 px-8 sm:px-32 py-16 max-w-xs sm:max-w-full'>
                <h1 className='mx-auto text-2xl'>Login</h1>
                {
                  usernameExists
                  ?
                  <></>
                  :
                  <h2 className="text-orange-600 text-sm">That username is not in our system.
                                                            <br />
                                                            Please try again or <Link to={'/signup'} className="underline">sign up</Link>
                                                            </h2>
                }
                <input value={username} onChange={onUsernameChange} className='bg-slate-600 rounded-lg p-2 w-58 sm:w-80' type="text" placeholder='Username' />
                {
                  passwordIncorrect
                  ?
                  <h2 className="text-orange-600 text-sm">That password was incorrect.
                                                            <br />
                                                            Please try again or <Link to={'/signup'} className="underline">sign up</Link>
                                                            </h2>
                  :
                  <></>
                }
                <input value={password} onChange={onPasswordChange} className='bg-slate-600 rounded-lg p-2 w-58 sm:w-80' type="password" placeholder='Password' />
                <button className="mx-auto border-2 border-slate-300 rounded-lg w-32 hover:bg-slate-600 active:bg-slate-500" type="submit" onClick={handleSubmit}>Let's go!</button>
            </div>
        </div>
    </div>
  );
}

export default Login;