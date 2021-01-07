import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import {auth} from "./firebase";

const ProfilePage = () => {
    const user = useContext(UserContext);
    const {photoURL, displayName, email} = user;
    return (
      <div className = "container">
        <section className='profile_main'>
        <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
          <div
            style={{
              background: `url(${photoURL || 'https://res.cloudinary.com/dsderm9xw/image/upload/v1600206470/profileImage_jlshac.jpg'})  no-repeat center center`,
              backgroundSize: "cover",
              height: "300px",
              width: "300px"
            }}
        ></div>
          <div>
          <h2 className = "profile_main_text1">{displayName}</h2>
          <h3 className = "profile_main_text2">{email}</h3>
          </div>
        </div>
        <button className = "profile_main_button" onClick = {() => {auth.signOut()}}>Sign out</button>
        </section>
      </div>
    ) 
  };
  export default ProfilePage;