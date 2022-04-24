import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

// firebase imports
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export const useLogin = (email, password) => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        dispatch({ type: "LOGIN", payload: response.user });
        if (auth.currentUser.emailVerified === true) {
          navigate("/songs", { replace: true });
        } else {
          alert(
            "Please verify your email address to login. Resending email verification link..."
          );
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log("Email verification has been resent.");
            })
            .catch((error) => {
              setError(
                "Error resending email verification link, link might already be in your inbox."
              );
            });
        }
      })
      .catch((err) => {
        setError(err.message);
        switch (err.code) {
          case "auth/user-not-found":
            setError("This user does not exists");
            break;
          case "auth/wrong-password":
            setError("The password you entered is incorrect");
            break;
          default:
            break;
        }
      });
  };

  return { error, login };
};
