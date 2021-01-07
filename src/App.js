import React, { useContext } from 'react'; 
import { Router } from "@reach/router";
import SignIn from  '../src/components/signin';
import SignUp from  '../src/components/signup';
import ProfilePage from '../src/components/profilePage'
import PasswordReset from '../src/components/passwordReset'
import { UserContext } from "../src/providers/UserProvider";
import './App.css';

function App() {
  const user = useContext(UserContext);
  return (
        user ?
        <ProfilePage   />
      :
        <Router>
      
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>

  );

}
     
export default App;
  