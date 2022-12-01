import { showNotification } from "@mantine/notifications"
import { AxiosInstance } from "axios"

const useDisableTwoFactor = (
    otp: string,
    setIsSubmitting: (val: boolean) => void,
    token: string,
    protectedAxios: AxiosInstance,
    setCheck: (value: boolean) => void
) => {
    protectedAxios
        .patch(
            "/auth/disable-2fa",
            {
                code: otp,
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        )
        .then((response) => {
            setCheck(false)
            setIsSubmitting(false)
            showNotification({
                title: "Success",
                message: response.data.message,
            })
        })
        .catch((err) => {
            try {
                if (err?.response.status === 400) {
                    showNotification({
                        title: "Error",
                        color: "red",
                        message: err.response.data.error,
                    })
                } else if (err?.response.status === 422) {
                    showNotification({
                        title: "Error",
                        color: "red",
                        message: err.response.data.error,
                    })
                } else {
                    showNotification({
                        title: "Error",
                        color: "red",
                        message: "Hmmm, something went wrong, try again later.",
                    })
                }
            } catch (error) {
                showNotification({
                    title: "Error",
                    message: "Hmmm, something went wrong, try again later.",
                })
            } finally {
                setIsSubmitting(false)
            }
        })
}

export default useDisableTwoFactor;
