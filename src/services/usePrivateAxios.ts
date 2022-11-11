import { axiosPrivate } from "../services/api.service"
import { useEffect } from "react"
import useRefreshToken from "../hooks/auth-hooks/use-refresh-tokens"
import useAuthContext from "../hooks/auth-hooks/useAuth"

const useAxiosPrivate = () => {
    const { state } = useAuthContext()
    const refresh = useRefreshToken()

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (
                    config &&
                    config.headers !== undefined &&
                    state.jwt !== null
                ) {
                    if (!config.headers["Authorization"]) {
                        config.headers[
                            "Authorization"
                        ] = `Bearer ${state?.jwt.token}`
                    }
                    return config
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [state.jwt?.token, refresh])

    return axiosPrivate
}

export default useAxiosPrivate
