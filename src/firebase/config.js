// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments()


//console.log(process.env)
//console.log( import.meta.env );

// Your web app's Firebase configuration
// Dev/Prod
/* const firebaseConfig = {
  apiKey: "AIzaSyDGPWkdapBzp_8Uvc8EV4N4IbToXSYDId0",
  authDomain: "react-init-4bd4b.firebaseapp.com",
  projectId: "react-init-4bd4b",
  storageBucket: "react-init-4bd4b.appspot.com",
  messagingSenderId: "437930594529",
  appId: "1:437930594529:web:fd876e9d891172125767a0"
};
 */
// Testing
/* const firebaseConfig = {
  apiKey: "AIzaSyA7CBJs9HjxWGK4QDfUoLK4fzX4N_H7F4U",
  authDomain: "prueba-data-base-3406d.firebaseapp.com",
  projectId: "prueba-data-base-3406d",
  storageBucket: "prueba-data-base-3406d.appspot.com",
  messagingSenderId: "414681557821",
  appId: "1:414681557821:web:b214ce0bce53d318957354"
}; */

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};



// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB   = getFirestore( FirebaseApp );
