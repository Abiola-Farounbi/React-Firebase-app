import React, {useState} from "react";
import { Link } from "@reach/router";
import {signInWithGoogle} from './firebase.js';
import {auth} from "./firebase";
import '../App.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const signInWithEmailAndPasswordHandler = (event, email, password) => {
      event.preventDefault();
      auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError(error.message);
        console.error("Error signing in with password and email", error);
      });
    };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

  return (
    <div className='container'>
      <section className='sign_in_main'>
      <h1  className='sign_in_heading'>Sign In</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <form>
          <label htmlFor="userEmail" >
            Email:
          </label>
          <br></br>
          <input
            type="email"
            name="userEmail"
            value = {email}
            placeholder="E.g: Esther@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <br></br>
          <label htmlFor="userPassword">
            Password:
          </label>
          <br></br>
          <input
            type="password"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <br></br>
          <div className='textCenter'>
          <button className='sign_in_button textCenter' onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign In
          </button>
          </div>
        </form>
        <p  className='textCenter'>or</p>
        <div className='textCenter'>
        <button className='sign_in_button '  onClick={signInWithGoogle}>
        Sign In with Google
      </button>
      </div>
      <p className="sign_in_text textCenter">
          Don't have an account?
          <Link to="signUp" >
            Sign Up here
          </Link>
          <br></br>
          <Link to = "passwordReset">
            Forgot Password?
          </Link>
        </p>
      </div>
      </section>
    </div>
  );
};
export default SignIn;