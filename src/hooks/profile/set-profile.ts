import { axiosInstance } from "../../services/api.service"

const setProfile = (
    password: string,
    confirmPassword: string,
    inviteCode: string,
    opened: boolean,
    firstName: string,
    lastName: string,
    setIsSubmitting: (val: boolean) => void,
    setErrorMsg: (msg: string) => void,
    showError: (val: boolean) => void,
    setOpened: (val: boolean) => void
) => {
    axiosInstance
        .post(
            "/invitation/accept",
            {
                firstName: firstName,
                lastName: lastName,
                password: password,
                passwordConfirm: confirmPassword,
                inviteCode: inviteCode,
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