import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/";

  // 🔵 Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate(redirectPath);
    } catch (err) {
      console.error(err);
    }
  };

  // 📧 Email Login
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(redirectPath);
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
  <div className="bg-white p-6 rounded-xl shadow max-w-md mx-auto">
  <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

  <button
    onClick={handleGoogleLogin}
    className="bg-red-500 text-white w-full p-2 rounded mb-3"
  >
    Continue with Google
  </button>

  <p className="text-sm text-center text-gray-500">
    Email login coming soon
  </p>
</div>
  );
}
