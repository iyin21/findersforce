import { AuthActionType } from "types/auth/auth-interfaces"
import { admin } from "../../utils/user-types"
import { axiosBaseInstance } from "../../services/api.service"

const loginWith2Fa = (
    otp: string,
    from: string,
    setErrorMsg: (msg: string) => void,
    showError: (val: boolean) => void,
    setIsSubmitting: (val: boolean) => void,
    dispatch: (arg0: AuthActionType) => void,
    navigate: (arg0: string, arg1: { replace: boolean }) => void
) => {
    axiosBaseInstance
        .post("/auth/verify-2fa/email", { code: otp })
        .then(async (response) => {
            const user = response.data?.data?.user

            const res = await axiosBaseInstance.get("/user/profile", {
                headers: {
                    Authorization: `Bearer ${response.data.data.jwt.token}`,
                },
            })

            if (user.accountType === "DEPOT" || user?.accountType === "ADMIN") {
                dispatch({
                    type: "SET_USER_DATA",
                    payload: {
                        user: res.data.data,
                        jwt: response.data.data.jwt,
                    },
                })
                user?.accountType === admin
                    ? navigate("/analytics", { replace: true })
                    : navigate(from, { replace: true })
            } else {
                showError(true)
                setErrorMsg(
                    "Unauthorized! You have to be a Depot manager or an Admin to have access"
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

export default loginWith2Fa
