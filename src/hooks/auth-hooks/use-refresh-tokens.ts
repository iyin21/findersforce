import axios from "../../pages/auth/utils"
import useAuthContext from "./useAuth"

const useRefreshToken = () => {
    const { state, dispatch } = useAuthContext()

    const refresh = async () => {
        const response = await axios.get("/refresh-token", {
            withCredentials: true,
            headers: {
                Cookie: `refreshToken=${state.jwt?.token}`,
            },
        })

        const res = await axios.get(
            "https://findersforce-api.workcube.com.ng/api/v1/user/profile",
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


        return response.data.data.jwt
    }

    return refresh
}

export default useRefreshToken
