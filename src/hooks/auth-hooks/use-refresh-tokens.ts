import { axiosBaseInstance } from "../../services/api.service"
import useAuthContext from "./useAuth"

const useRefreshToken = () => {
    const { dispatch } = useAuthContext()

    const refresh = async () => {
        const response = await axiosBaseInstance("/auth/refresh-token", {
            method: "GET",
        })

        const res = await axiosBaseInstance.get(
            "/user/profile",
            {
                headers: {
                    Authorization: `Bearer ${response.data.data.jwt.token}`,
                },
            }
        )

        dispatch({
            type: "SET_USER_DATA",
            payload: {
                user: res.data.data,
                jwt: response.data.data.jwt,
            },
        })

        return response.data.data.jwt.token
    }

    return refresh
}

export default useRefreshToken
