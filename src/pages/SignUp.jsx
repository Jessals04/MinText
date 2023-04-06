import { useState, useEffect } from "react";
import { GraphQLClient, gql } from "graphql-request";
import { Link, useNavigate } from "react-router-dom";
import Hash from "../utils/Hash";

function SignUp({ logOut, logIn, user, handleSetUser }) {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [emailAvailable, setEmailAvailable] = useState(true);
    const [passwordIsLegal, setPasswordIsLegal] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();

    // create a GraphQLClient instance
    const hygraph = new GraphQLClient(
        'https://api-ap-southeast-2.hygraph.com/v2/clf530pz54wiv01ug5kdudakw/master', {
            headers: {
                authorization: `Bearer ${process.env.REACT_APP_AUTHTOKEN}`,
            }
        }
    );

    // create a query to check if username exists
    const CHECKFORUSERNAMEQUERY = gql`
      query CheckForUsername($username: String!) {
        profile(where: {
          username: $username
        }) {
          username
        }
      }
    `;

    // create a query to check if username exists
    const CHECKFOREMAILQUERY = gql`
      query CheckForEmail($email: String!) {
        profile(where: {
          email: $email
        }) {
          email
        }
      }
    `;

    // create a mutation to create a new profile
    const CREATENEWPROFILEMUTATION = gql`
      mutation CreateNewProfile($username: String!, $password: String!, $email: String!) {
        createProfile(data: {
          username: $username,
          password: $password,
          email: $email,
          slug: $username
        }) {
          id,
          username,
          slug
        }
        
        publishProfile(where: { username: $username }, to: PUBLISHED) {
          stage
        }
      }
    `;

    // create a query to publish the user's profile again
    const PUBLISHPROFILEMUTATION = gql`
      mutation PublishProfile($username: String!) {
        publishProfile(where: { username: $username }, to: PUBLISHED) {
          stage
        }
      }
    `;

    // function that checks database if username exists
    async function checkUsername(usernameToCheck) {
        let response = {};
        await hygraph.request(CHECKFORUSERNAMEQUERY, { username: usernameToCheck })
        .then((res) => res)
        .then((data) => {
            response = data.profile;
        })
        .catch((err) => {
            console.log(err.message)
            if (err.message.includes('429')) {
                response = null;
                return;
            }
        });

        if (response == null) {
            setUsernameAvailable(true);
        } else {
            setUsernameAvailable(false);
        }
    }
    
    // function that checks database if email exists
    async function emailCheck(emailToCheck) {
        let response = {};
        await hygraph.request(CHECKFOREMAILQUERY, { email: emailToCheck })
        .then((res) => res)
        .then((data) => {
            response = data.profile;
        })
        .catch((err) => {
            console.log(err.message)
            if (err.message.includes('429')) {
                response = null;
                return;
            }
        });

        if (response == null) {
            setEmailAvailable(true);
        } else {
            setEmailAvailable(false);
        }
    }

    // function that creates a new profile in the database
    // returns true if mutation was successful, false if not
    async function createNewProfile(newUsername, newEmail, newPassword) {
        // hash password
        const hashedPass = Hash(newPassword);
        let returnTrue = true;
        
        await hygraph.request(CREATENEWPROFILEMUTATION, {
            username: newUsername,
            password: hashedPass,
            email: newEmail
        })
        .then((res) => res)
        .then((data) => {
            console.log('Account creation successful.');
            setId(data.createProfile.id);
        })
        .catch((err) => {
            console.error('Account was not created successfully. The following error message was received:\n----------\n'
                          + err.message
                          + '\n----------');
            setShowErrorMessage(true);
            returnTrue = false;
        });

        await hygraph.request(PUBLISHPROFILEMUTATION, {
            username: newUsername
        })
        .catch((err) => console.log(err.message));

        return returnTrue;
    }

    // function that checks the length of the password
    // returns a boolean
    function passwordCheck(passwordToCheck) {
        if ((passwordToCheck.length > 6) && (passwordToCheck.length < 25)) {
            setPasswordIsLegal(true);
            return true;
        } else {
            setPasswordIsLegal(false);
            return false;
        }
    }

    // function to check username & email length
    // returns true if all fields are legel
    function usernameAndEmailLengthCheck() {
        let fieldsLegal = true;

        if (username === null) {
            setUsernameAvailable(false);
            fieldsLegal = false;
        } else if (username === '') {
            setUsernameAvailable(false);
            fieldsLegal = false;
        }
        
        if (email === null) {
            setEmailAvailable(false);
            fieldsLegal = false;
        } else if (email === '') {
            setEmailAvailable(false);
            fieldsLegal = false;
        }

        return fieldsLegal;
    }

    // onChange functions
    function onUsernameChange({ target }) {
        setUsername(target.value.toLowerCase());
        checkUsername(target.value);
    }

    function onEmailChange({ target }) {
        setEmail(target.value);
        emailCheck(target.value);
        setShowErrorMessage(false);
    }

    function onPasswordChange({ target }) {
        setPassword(target.value);
        setPasswordIsLegal(true);
    }

    async function handleSubmit ({ target }) {
        // check if password is legal
        const passwordIsLegal = passwordCheck(password);

        // check if username and email are legal
        const fieldsAreLegal = usernameAndEmailLengthCheck();

        // if any field is illegal, return
        if (!(passwordIsLegal && fieldsAreLegal)) {
            console.error('Some fields are not legal. Cancelling account creation.');
            return;
        }

        // submit query to create a new profile in database
        const accCreationSuccessful = await createNewProfile(username, email, password);
        console.log(accCreationSuccessful);
        if (accCreationSuccessful === false) {
            console.error('There was an error creating the account.');
            return;
        }
        
        // logIn
        logIn(id, username, email);

        // clear fields
        setUsername('');
        setEmail('');
        setPassword('');

        // send user to MyMessages
        navigate('/my-messages');

    }

    // if user is already logged in, navigate back to home
    useEffect(() => {
        if (user.username) navigate('/');
    });

    return (
        <div className='flex my-10 sm:mx-10'>
            <div className='flex flex-col gap-4 m-auto border-2 border-slate-600 rounded-lg p-10 bg-slate-800 drop-shadow-lg text-slate-50 px-8 sm:px-32 py-16 max-w-xs sm:max-w-full'>
                <h1 className='mx-auto text-2xl'>Sign Up</h1>
                {
                    showErrorMessage ? <h2 className="text-orange-600 text-sm">There was an error, please try again.
                                                                                <br />
                                                                                Only certain characters can be used for a username.
                                                                                </h2> : <></>
                }
                {
                    usernameAvailable ? <></> : <h2 className="text-orange-600 text-sm">That username is already taken.
                                                                                          <br />
                                                                                          Already have an account? <Link to={'/login'} className="underline">Login</Link>.
                                                                                          </h2>
                }
                <input value={username} onChange={onUsernameChange} className='bg-slate-600 rounded-lg p-2 w-58 sm:w-80' type="text" placeholder='Username' />
                {
                    emailAvailable ? <></> : <h2 className="text-orange-600 text-sm">That email is already taken. Try loggin in.</h2>
                }
                <input value={email} onChange={onEmailChange} className='bg-slate-600 rounded-lg p-2 w-58 sm:w-80' type="email" placeholder='Email' />
                {
                    passwordIsLegal ? <></> : <h2 className="text-orange-600 text-sm">Please ensure your password is
                                                                                        <br />
                                                                                        between 6 and 25 characters.</h2>
                }
                <input value={password} onChange={onPasswordChange} className='bg-slate-600 rounded-lg p-2 w-58 sm:w-80' type="password" placeholder='Password' />
                <button className="mx-auto border-2 border-slate-300 rounded-lg w-32 hover:bg-slate-600 active:bg-slate-500" type="submit" onClick={handleSubmit}>Let's go!</button>
            </div>
        </div>
    );
}

export default SignUp;