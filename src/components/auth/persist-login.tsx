import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import UseRefreshToken from "./hooks/use-refresh-tokens";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const refresh = UseRefreshToken(auth.accessToken);

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
        auth.accessToken !== "" ? verifyRefreshToken() : setIsLoading(false);
    }, []);
    return (
        <>
            {isLoading ? <p>Loading....</p> : <Outlet />}
        </>
    );
}

export default PersistLogin;