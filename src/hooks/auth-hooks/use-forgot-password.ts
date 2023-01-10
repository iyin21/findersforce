import { showNotification } from "@mantine/notifications"
import { axiosInstance } from "../../services/api.service"

const forgotPassword = (
    email: string,
    navigate: (arg0: string, arg1: { state: { email: string } }) => void,
    setIsSubmitting: (val: boolean) => void,
    setErrorMsg: (msg: string) => void,
    showError: (val: boolean) => void
) => {
    axiosInstance
        .post(
            "/auth/request-password-reset",
            { email: email },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        )
        .then((response) => {
            navigate("/verify-email", { state: { email: email } })
        })
        .catch((err) => {
            try {
                setErrorMsg(err.response.data.error)
            } catch (error) {
                setErrorMsg("Hmmm, something went wrong, try again later.")
            } finally {
                showError(true)
                setIsSubmitting(false)
            }
        })
}

export default forgotPassword

export const resendOTP = (email: string) => {
    axiosInstance
        .post(
            "/auth/request-password-reset",
            { email: email },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        )
        .then((response) => {
            showNotification({
                title: "Success",
                message: response.data.message,
                color: "green",
            })
        })
        .catch((err) => {
            showNotification({
                title: "Error",
                message: err.data.error || "Something went wrong",
                color: "red",
            })
        })
}
