import axios from "../../services/api.service"

const forgotPassword = (
    email: string,
    navigate: (arg0: string, arg1: { state: { email: string } }) => void,
    setIsSubmitting: (val: boolean) => void,
    setErrorMsg: (msg: string) => void,
    showError: (val: boolean) => void
) => {
    axios
        .post("/request-password-reset", JSON.stringify({ email: email }), {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
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
