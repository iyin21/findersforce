import { showNotification } from "@mantine/notifications"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ProfileResponse } from "../../types/profile/interface"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import { axiosInstance } from "../../services/api.service"


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
