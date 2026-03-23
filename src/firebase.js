import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUZ0IrW0fzTxp3lmVQXqMOwTa5X46xhEQ",
  authDomain: "interview-platform-df1d6.firebaseapp.com",
  projectId: "interview-platform-df1d6",
  storageBucket: "interview-platform-df1d6.firebasestorage.app",
  messagingSenderId: "846800480317",
  appId: "1:846800480317:web:7da2416110f81f9e96a254"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);