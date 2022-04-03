import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

// firebase imports
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignUp = (username, email, password) => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = (username, email, password) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        dispatch({ type: "LOGIN", payload: response.user });
        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: null,
        })
          .then(() => {
            console.log("Username has been set.");
          })
          .catch((error) => {
            setError(error.message);
          });
        navigate("/songs", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, signup };
};
