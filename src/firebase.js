// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Rest of your code


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSP6jDErT6Haz7Y85zCASiXrdICClhLFM",
  authDomain: "at-frgaf-react-game.firebaseapp.com",
  projectId: "at-frgaf-react-game",
  storageBucket: "at-frgaf-react-game.appspot.com",
  messagingSenderId: "661515486378",
  appId: "1:661515486378:web:19533b238b91b099347cd3",
  measurementId: "G-SQM21K248E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };