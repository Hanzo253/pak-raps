import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("user signed out");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logout };
};
