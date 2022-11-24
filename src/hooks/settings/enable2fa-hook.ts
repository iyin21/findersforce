import { showNotification } from "@mantine/notifications"
import { AxiosInstance } from "axios"

const useEnableTwoFactor = (
    protectedAxios: AxiosInstance,
    token: string,
    setCheck: (val: boolean) => void
) => {
    protectedAxios
        .patch(
            "/enable-2fa",
            JSON.stringify({
                type: "email",
            }),
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        )
        .then((response) => {
            setCheck(true)
            showNotification({
                title: "Success",
                message: response.data.message,
            })
        })
        .catch((err) => {
            showNotification({
                title: "Error",
                message: err?.response.data.error,
            })
        })
}

export default useEnableTwoFactor
