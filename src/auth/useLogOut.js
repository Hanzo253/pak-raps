import { useAuthContext } from "./useAuthContext";

import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login", { replace: true });
        dispatch({ type: "LOGOUT" });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logout };
};
