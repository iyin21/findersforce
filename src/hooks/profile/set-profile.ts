import { axiosInstance } from "../../services/api.service"

const setProfile = (
    password: string,
    confirmPassword: string,
    inviteCode: string,
    opened: boolean,
    firstName: string,
    lastName: string,
    accountType: string,
    
    setIsSubmitting: (val: boolean) => void,
    setErrorMsg: (msg: string) => void,
    showError: (val: boolean) => void,
    setOpened: (val: boolean) => void,
    courseLink?: string,
    subscriptionPlan?: string | null,
) => {
    const requestBody = {
        firstName: firstName,
        lastName: lastName,
        password: password,
        passwordConfirm: confirmPassword,
        inviteCode: inviteCode,
        courseLink: courseLink,
        subscriptionPlan: subscriptionPlan
    }
    if (accountType === "SHIFT-MANAGER") {
        delete requestBody.courseLink
        delete requestBody.subscriptionPlan
    }
    accountType === "SHIFT-MANAGER" ? delete requestBody.courseLink : null
    axiosInstance
        .post(
            "/invitation/accept",
            requestBody
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