import { AuthActionType } from "types/auth/auth-interfaces"
import axios from "../../services/api.service"

const login = (
    email: string,
    password: string,
    from: string,
    setErrorMsg: (msg: string) => void,
    showError: (val: boolean) => void,
    setIsSubmitting: (val: boolean) => void,
    dispatch: (arg0: AuthActionType) => void,
    navigate: (arg0: string, arg1: { replace: boolean }) => void
) => {
    axios
        .post("/login", JSON.stringify({ email: email, password: password }))
        .then((response) => {
            const user = response.data?.data?.user
            if (user.accountType === "DEPOT") {
                dispatch({
                    type: "SET_USER_DATA",
                    payload: {
                        user: user,
                        jwt: response.data.data.jwt,
                    },
                })
                navigate(from, { replace: true })
            } else {
                showError(true)
                setErrorMsg(
                    "Unauthorized! You have to be a Depot manager to have access"
                )
                setIsSubmitting(false)
            }
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

export default login