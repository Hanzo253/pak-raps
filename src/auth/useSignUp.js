import { useState } from "react";

// firebase imports
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignUp = (email, password) => {
  const [error, setError] = useState(null);

  const signup = (email, password) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log("user signed up:", response.user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, signup };
};
