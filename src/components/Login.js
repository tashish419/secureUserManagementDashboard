import { useRef, useState } from "react";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Header from "./Header";

const Login = () => {
  const [IsSignedIn, setIsSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleClickButton = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    if (message) return;

    if (!IsSignedIn) {
        // Sign Up Logic
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " " + errorMessage);
          });
      } else {
        // Sign In Logic
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " " + errorMessage);
          });
      }
  };

  const signUpToggle = () => {
    setIsSignedIn(!IsSignedIn);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-6">
            {IsSignedIn ? "Sign In" : "Sign Up"}
          </h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              ref={email}
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <p className="font-bold text-md">{errorMessage}</p>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={handleClickButton}
            >
              {IsSignedIn ? "Sign In" : "Sign Up"}
            </button>
            <p className="py-2 cursor-pointer" onClick={signUpToggle}>
              {IsSignedIn
                ? "New User? Sign up now."
                : "Already registered? Sign in now."}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
