import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import UseRefreshToken from "./hooks/use-refresh-tokens";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { state } = useAuth();
    console.log(state)
    const refresh = UseRefreshToken(state?.jwt?.token);

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
        state?.jwt !== null ? verifyRefreshToken() : setIsLoading(false);
    }, []);
    return (
        <>
            {isLoading ? <p>Loading....</p> : <Outlet />}
        </>
    );
}

export default PersistLogin;