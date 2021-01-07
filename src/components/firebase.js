import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyAzd2jemMg4Fff8IYSByRrwMQ9gVo0c8Ug",
    authDomain: "musicplayer-573d2.firebaseapp.com",
    databaseURL: "https://musicplayer-573d2.firebaseio.com",
    projectId: "musicplayer-573d2",
    storageBucket: "musicplayer-573d2.appspot.com",
    messagingSenderId: "20649268267",
    appId: "1:20649268267:web:f525b3ee527843d663c66e",
    measurementId: "G-QR5ZCCENM2"
  };
 
  firebase.initializeApp(firebaseConfig);


export const firestore=firebase.firestore();
export const auth = firebase.auth();

// for the sign in with google
export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};


export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};