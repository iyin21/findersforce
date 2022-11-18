import { showNotification } from "@mantine/notifications"
import { AxiosInstance } from "axios"

const useUpdatePassword = (
    currentPassword: string,
    newPassword: string,
    setErrorMsg: (msg: string) => void,
    showError: (val: boolean) => void,
    setIsSubmitting: (val: boolean) => void,
    navigate: (arg0: string) => void,
    token: string,
    setOpenModal: (state: boolean) => void,
    protectedAxios: AxiosInstance
) => {
    protectedAxios
        .patch(
            "/update-password",
            JSON.stringify({
                password: currentPassword,
                newPassword: newPassword,
            }),
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        )
        .then((response) => {
            showNotification({
                title: "Success",
                message: response.data.message,
            })
            navigate("/dashboard")
            setOpenModal(false)
        })
        .catch((err) => {
            try {
                if (err?.response.status === 400) {
                    setErrorMsg(err.response.data.error)
                } else if (err?.response.status === 422) {
                    setErrorMsg(err.response.data.error)
                } else {
                    setErrorMsg("Hmmm, something went wrong, try again later.")
                }
            } catch (error) {
                setErrorMsg("Hmmm, something went wrong, try again later.")
            } finally {
                showError(true)
                setIsSubmitting(false)
            }
        })
}

export default useUpdatePassword
