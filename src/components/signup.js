import React, { useState } from "react";
import {signInWithGoogle} from './firebase.js';
import {auth} from './firebase.js'
import {generateUserDocument} from './firebase';
import '../App.css';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };


  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }  else if (name === "displayName") {
        setDisplayName(value);
    }
  };

  return (
    <div className="container">
      <section className='sign_up_main'>
      <h1 className="sign_up_heading">Sign Up</h1>
      <div >
       { error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form >
        <label htmlFor="displayName">
            Display Name:
          </label>
          <br></br>
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="E.g:   Esther"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <br></br>
          <label >
            Email:
          </label>
          <br></br>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="E.g: Esther@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <br></br>
          <label className="block">
            Password:
          </label>
          <br></br>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            onChange={event => onChangeHandler(event)}
          />
          <br></br>
        <div className='textCenter'>
        <button
           className="sign_up_button"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </div>
        </form>
        <p className='textCenter'>or</p>
       <div className='textCenter'>
          <button className="sign_up_button" 
            onClick={signInWithGoogle}>
            SignIn with google
          </button>
       </div>
      </div>
      </section>
    </div>
  );
};
export default SignUp;