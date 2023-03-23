import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS, { SHA256, Base64 } from "crypto-js";

function Login({ user, handleSetUser }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameExists, setUsernameExists] = useState(true);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const navigate = useNavigate();

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
      profile = data.profile;
    })
    .catch((err) => console.log(err.message));

    // if profile is null, return false and setUsernameExists(false)
    if (!profile) {
      setUsernameExists(false);
      return false;
    }

    // hash password provided by user
    const hashedPassAsWordArray = CryptoJS.SHA256(password);
    const hashedPass = hashedPassAsWordArray.toString(CryptoJS.enc.Base64);

    // check if passwords match
    const passwordsMatch = checkIfVarsMatch(hashedPass, profile.password);

    if (!passwordsMatch) {
      return false;
    } else {
      setEmail(profile.email);
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
    setUsername(target.value);
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
    handleSetUser({
      username: username,
      email: email
    });

    // clear fields
    setUsername('');
    setPassword('');

    // send user to MyMessages
    navigate('/my-messages');

  }

  // if user is already logged in, navigate back to home
  useEffect(() => {
    if (user.username) navigate('/');
  }, []);
  
  return (
    <div>
      <div className='flex m-10'>
            <div className='flex flex-col gap-4 m-auto border-2 border-slate-600 rounded-lg p-10 bg-slate-800 drop-shadow-lg text-slate-50 px-32 py-16'>
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
                <input value={username} onChange={onUsernameChange} className='bg-slate-600 rounded-lg p-2 w-80' type="text" placeholder='Username' />
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
                <input value={password} onChange={onPasswordChange} className='bg-slate-600 rounded-lg p-2 w-80' type="password" placeholder='Password' />
                <button className="mx-auto border-2 border-slate-300 rounded-lg w-32 hover:bg-slate-600 active:bg-slate-500" type="submit" onClick={handleSubmit}>Let's go!</button>
            </div>
        </div>
    </div>
  );
}

export default Login;