import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuthContext from "./hooks/useAuth";

const MaintainLogin = () => {
    const { state, dispatch } = useAuthContext();
 
    return (
        <>
            {!state.persist ? <Outlet /> : <Outlet />}
        </>
    );
}

export default MaintainLogin;