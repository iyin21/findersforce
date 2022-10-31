import AuthContext from "../pages/auth/context/authContext";
import { useContext } from "react";


const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthContextProvider");
    }
    return context;
};

export default useAuthContext;