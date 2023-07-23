// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC6j0bpQkUrWSXOIjkLNkoFuNHAApGSJxo",
  authDomain: "filter-pixel-393514.firebaseapp.com",
  databaseURL: "https://filter-pixel-393514-default-rtdb.firebaseio.com",
  projectId: "filter-pixel-393514",
  storageBucket: "filter-pixel-393514.appspot.com",
  messagingSenderId: "110984216437",
  appId: "1:110984216437:web:c7f8d1f70a1bc47a4cdd3c"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export default app;
