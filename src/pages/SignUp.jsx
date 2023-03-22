import { useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import { Navigate } from "react-router-dom";

function SignUp({ user, handleSetUser }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [emailAvailable, setEmailAvailable] = useState(true);
    const [passwordIsLegal, setPasswordIsLegal] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

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
          username,
          slug
        }
        
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
        .catch((err) => console.log(err.message));

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
        .catch((err) => console.log(err.message));

        if (response == null) {
            setEmailAvailable(true);
        } else {
            setEmailAvailable(false);
        }
    }

    // function that creates a new profile in the database
    // returns true if mutation was successful, false if not
    async function createNewProfile(newUsername, newEmail, newPassword) {
        await hygraph.request(CREATENEWPROFILEMUTATION, {
            username: newUsername,
            email: newEmail,
            password: newPassword
        })
        .then((res) => res)
        .then((data) => {
            console.log(data);
            return true;
        })
        .catch((err) => {
            console.log(err.message);
            return false;
        })
    }

    // function that checks the length of the password
    // returns a boolean
    function passwordCheck(passwordToCheck) {
        if ((password.length > 6) && (password.length < 25)) {
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
        setUsername(target.value);
        checkUsername(target.value);
    }

    function onEmailChange({ target }) {
        setEmail(target.value);
        emailCheck(target.value);
    }

    function onPasswordChange({ target }) {
        setPassword(target.value);
        setPasswordIsLegal(true);
    }

    function handleSubmit ({ target }) {
        // check if password is legal
        const passwordIsLegal = passwordCheck(target.value);

        // check if username and email are legal
        const fieldsAreLegal = usernameAndEmailLengthCheck();

        // if any field is illegal, return
        if (!(passwordIsLegal && fieldsAreLegal)) {
            console.log('Some fields are not legal.');
            return;
        }

        // submit query to create a new profile in database
        const mutationWasSuccessful = createNewProfile(username, email, password);

        if (!mutationWasSuccessful) {
            // show error message
            setShowErrorMessage(true);
            return;
        }
        
        // set user
        handleSetUser({
            username: username,
            email: email
        });

        // clear fields
        setUsername('');
        setEmail('');
        setPassword('');

        // send user to MyMessages
        Navigate('/my-messages');

    }

    return (
        <div className='flex m-10'>
            <div className='flex flex-col gap-4 m-auto bg-slate-800 px-36 py-10 rounded-lg text-slate-50'>
                <h1 className='mx-auto text-2xl'>Sign Up</h1>
                {
                    showErrorMessage ? <h2 className="text-red-600 text-sm">There was an error, please try again.</h2> : <></>
                }
                {
                    usernameAvailable ? <></> : <h2 className="text-orange-600 text-sm">That username is already taken.</h2>
                }
                <input value={username} onChange={onUsernameChange} className='bg-slate-600 rounded-lg p-2 w-80' type="text" placeholder='Username' />
                {
                    emailAvailable ? <></> : <h2 className="text-orange-600 text-sm">That email is already taken. Try loggin in.</h2>
                }
                <input value={email} onChange={onEmailChange} className='bg-slate-600 rounded-lg p-2 w-80' type="email" placeholder='Email' />
                {
                    passwordIsLegal ? <></> : <h2 className="text-orange-600 text-sm">Please ensure your password is
                                                                                        <br />
                                                                                        between 6 and 25 characters.</h2>
                }
                <input value={password} onChange={onPasswordChange} className='bg-slate-600 rounded-lg p-2 w-80' type="password" placeholder='Password' />
                <button className="mx-auto border-2 border-slate-300 rounded-lg w-32 hover:bg-slate-600 active:bg-slate-500" type="submit" onClick={handleSubmit}>Let's go!</button>
            </div>
        </div>
    );
}

export default SignUp;