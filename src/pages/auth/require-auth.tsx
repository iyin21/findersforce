import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../../hooks/auth-hooks/useAuth"

const RequireAuth = () => {
    const { state } = useAuth()
    const location = useLocation()
    return state?.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
