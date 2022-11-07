import { useNavigate, useLocation } from "react-router-dom"
import axios from "../../pages/auth/utils"
import useAuthContext from "./useAuth"

const useRefreshToken = () => {
    const { dispatch } = useAuthContext()
    const location = useLocation()
    const from = location.state?.from?.pathname
    const navigate = useNavigate()
    const refresh = async () => {
        const response = await axios.get("/refresh-token", {
            withCredentials: true,
        })

        axios
            .get(
                "https://findersforce-api.workcube.com.ng/api/v1/user/profile",
                {
                    headers: {
                        Authorization: `Bearer ${response.data.data.jwt.token}`,
                    },
                }
            )
            .then((res) => {
                dispatch({
                    type: "SET_USER_DATA",
                    payload: {
                        user: res.data.data,
                        jwt: response.data.data.jwt,
                    },
                })

                navigate(from)
            })
        return response.data.data.jwt
    }
    return refresh
}

export default useRefreshToken
