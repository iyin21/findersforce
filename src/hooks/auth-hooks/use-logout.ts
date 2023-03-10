import { axiosBaseInstance } from "../../services/api.service"
import { AuthActionType } from "types/auth/auth-interfaces"

const handleLogOut = async (
    token: string | any,
    showNotification: (arg0: { title: string; message: any }) => void,
    dispatch: (arg0: AuthActionType) => void,
    navigate: (arg0: string) => void
) => {
    const data = await axiosBaseInstance.post(
        "/auth/logout",
        {
            withCredentials: true,
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        }
    )

    if (data.data.status === "success") {
        showNotification({
            title: "Success",
            message: data.data.message,
        })
    }
    dispatch({
        type: "CLEAR_USER_DATA",
    })
    navigate("/login")
}

export default handleLogOut
