import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

// firebase imports
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

export const useSignUp = (username, email, password) => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = (username, email, password) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: "https://i2.lensdump.com/i/rhYekk.jpg",
        })
          .then(() => {
            console.log("Username has been set.");
          })
          .catch((error) => {
            setError(error.message);
          });
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email verification sent.");
          })
          .catch((error) => {
            setError(error.message);
          });
        // dispatch({ type: "LOGIN", payload: response.user });
        navigate("/songs", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, signup };
};
