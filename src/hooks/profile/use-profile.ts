import { showNotification } from "@mantine/notifications"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ProfileResponse } from "../../types/profile/interface"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import axios, { axiosInstance } from "../../services/api.service"

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
        .post(
            "/invitation/accept",
            JSON.stringify({
                password: password,
                passwordConfirm: confirmPassword,
                inviteCode: inviteCode,
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

export const useProfile = () => {
    const { state } = useAuthContext()

    const getProfile = async () => {
        const { data } = await axiosInstance.get("/user/profile", {
            headers: {
                Authorization: `${state?.jwt?.token}`,
            },
        })
        return data.data
    }
    return useQuery<string, AxiosError, ProfileResponse>(
        ["profile"],
        () => getProfile(),
        {
            onError: (err) => {
                showNotification({
                    title: "Error",
                    // @ts-ignore
                    message: err.message || err?.response?.data?.error,
                })
            },
        }
    )
}
