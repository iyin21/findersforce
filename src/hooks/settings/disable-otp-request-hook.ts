import { showNotification } from "@mantine/notifications"
import { AxiosInstance } from "axios"

const useDisable2FaRequest = (
    token: string | undefined,
    axiosInstance: AxiosInstance,
    setOpen: (val: boolean) => void
) => {
    axiosInstance
        .get("/auth/disable-2fa-request", {
            withCredentials: true,
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            showNotification({
                title: "Success",
                color: "green",
                // @ts-ignore
                message: res.data.message,
            })
            setOpen(true)
        })
        .catch((error) => {
            showNotification({
                title: "Error",
                color: "red",
                message: error?.response.data.error || "Error occurred",
            })
        })
}

export default useDisable2FaRequest
