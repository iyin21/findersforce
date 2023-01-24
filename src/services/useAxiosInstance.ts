import { axiosBaseInstance } from "./api.service"
import { useEffect } from "react"
import useRefreshToken from "../hooks/auth-hooks/use-refresh-tokens"
import useAuthContext from "../hooks/auth-hooks/useAuth"

const useAxiosInstance = () => {
    const { state } = useAuthContext()
    const refresh = useRefreshToken()

    useEffect(() => {
        const requestIntercept = axiosBaseInstance.interceptors.request.use(
            (config) => {
                if (
                    config &&
                    config.headers !== undefined &&
                    state.jwt !== null
                ) {
                    // @ts-ignore
                    if (!config.headers["Authorization"]) {
                        // @ts-ignore
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

        const responseIntercept = axiosBaseInstance.interceptors.response.use(
            (response: any) => response,
            async (error: { config: any; response: { status: number } }) => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`
                    return axiosBaseInstance(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosBaseInstance.interceptors.request.eject(requestIntercept)
            axiosBaseInstance.interceptors.response.eject(responseIntercept)
        }
    }, [state.jwt?.token, refresh])

    return axiosBaseInstance
}

export default useAxiosInstance
