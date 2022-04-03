import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

// firebase imports
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignUp = (email, password) => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = (email, password) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        dispatch({ type: "LOGIN", payload: response.user });
        navigate("/songs", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, signup };
};
