import { useState } from "react";

// firebase imports
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = (email, password) => {
  const [error, setError] = useState(null);

  const login = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log("user logged in:", response.user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, login };
};
