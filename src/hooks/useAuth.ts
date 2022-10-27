import AuthContext, { authContextType } from "../pages/auth/context/authContext";
import { useContext } from "react";

const useAuth = () => {
    return useContext(AuthContext) as authContextType;
}

export default useAuth;