import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "./hooks/use-refresh-tokens";
import useAuthContext from "./hooks/useAuth";

const PersistLogin = () => {
    const { state } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken();
    console.log(state.isAuthenticated)


    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false)
            }
        }
    
        state?.jwt?.token === undefined ? verifyRefreshToken() : setIsLoading(false);
    
    }, []);

    return (
        <>{isLoading ? <>Loading</> : <Outlet />}</>
    );
}

export default PersistLogin;
