import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "netflixgpt-67959.firebaseapp.com",
  projectId: "netflixgpt-67959",
  storageBucket: "netflixgpt-67959.appspot.com",
  messagingSenderId: "373951290515",
  appId: "1:373951290515:web:389a4f7657fa7d17ab8166",
  measurementId: "G-5XVHM446KH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
