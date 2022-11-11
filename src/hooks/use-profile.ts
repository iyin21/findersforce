import axios from "../services/api.service"

const setProfile = (
    password: string,
    confirmPassword: string,
    inviteCode: string,
    opened: boolean,
    setIsSubmitting: (val: boolean) => void,
    setErrorMsg: (msg: string) => void,
    showError: (val: boolean) => void,
    setOpened: (val: boolean) => void
) => {
    axios
        .patch(
            "/change-password",
            JSON.stringify({
                password: password,
                passwordConfirm: confirmPassword,
                resetCode: inviteCode,
            }),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        )
        .then((response) => {
            setOpened(!opened)
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

export default setProfile
