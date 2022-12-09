import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Loader } from "@mantine/core"
import useRefreshToken from "../../hooks/auth-hooks/use-refresh-tokens"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import { showNotification } from "@mantine/notifications"
import FindersForceLogo from "../../assets/FF-logo.svg"

const PersistLogin = () => {
    const { state } = useAuthContext()
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (error) {
                showNotification({
                    title: "Require login",
                    message: "Session expired, login to continue",
                })
            } finally {
                setIsLoading(false)
            }
        }

        state?.jwt?.token === undefined
            ? verifyRefreshToken()
            : setIsLoading(false)
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="h-screen w-full flex items-center justify-center">
                    <img
                        src={FindersForceLogo}
                        alt=""
                        className="animate-pulse"
                    />
                    <Loader color="rgba(254, 215, 10, 1)" className="pl-2.5" />
                </div>
            ) : (
                <Outlet />
            )}
        </>
    )
}

export default PersistLogin
