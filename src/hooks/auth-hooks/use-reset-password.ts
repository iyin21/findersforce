import axios from "../../services/api.service"

const useResetPassword = (
    newPassword: string,
    confirmPassword: string,
    location: { state: { otp: string } },
    setPasswordChanged: (arg0: boolean) => void,
    setErrorMsg: (arg0: string) => void,
    showError: (arg0: boolean) => void,
    setIsSubmitting: (arg0: boolean) => void,
    passwordChanged: boolean
) => {
    axios
        .patch(
            "/change-password",
            JSON.stringify({
                password: newPassword,
                passwordConfirm: confirmPassword,
                resetCode: location.state?.otp,
            }),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        )
        .then((response) => {
            setPasswordChanged(!passwordChanged)
        })
        .catch((err) => {
            try {
                setErrorMsg(err.response.data.error)
            } catch (error) {
                setErrorMsg("Hmmm, something went wrong, try again later.")
            } finally {
                showError(true)
                setPasswordChanged(false)
                setIsSubmitting(false)
            }
        })
}

export default useResetPassword
