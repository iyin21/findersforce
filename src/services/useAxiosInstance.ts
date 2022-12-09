import { axiosInstance } from "./api.service"
import { useEffect } from "react"
import useRefreshToken from "../hooks/auth-hooks/use-refresh-tokens"
import useAuthContext from "../hooks/auth-hooks/useAuth"

const useAxiosInstance = () => {
    const { state } = useAuthContext()
    const refresh = useRefreshToken()

    useEffect(() => {
        const requestIntercept = axiosInstance.interceptors.request.use(
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
            (error: any) => Promise.reject(error)
        )

        const responseIntercept = axiosInstance.interceptors.response.use(
            (response: any) => response,
            async (error: { config: any; response: { status: number } }) => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`
                    return axiosInstance(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosInstance.interceptors.request.eject(requestIntercept)
            axiosInstance.interceptors.response.eject(responseIntercept)
        }
    }, [state.jwt?.token, refresh])

    return axiosInstance
}

export default useAxiosInstance
