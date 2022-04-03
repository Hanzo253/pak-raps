import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

// firebase imports
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = (email, password) => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        dispatch({ type: "LOGIN", payload: response.user });
        navigate("/songs", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, login };
};
