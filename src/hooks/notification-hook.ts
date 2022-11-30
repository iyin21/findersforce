import useAuthContext from "./auth-hooks/useAuth"
// import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { showNotification } from "@mantine/notifications"
import useAxiosInstance from "./../services/useAxiosinstance"
import { NotificationResponse } from "types/notification-types"



export default function useUserNotification() {
    const { state } = useAuthContext()
    const axiosPrivate = useAxiosInstance()
    // /** API methods */
    const getUserNotifications = async () => {
        const { data } = await axiosPrivate.get(
            "/user/notifications",
            {
                withCredentials: true,
                headers: {
                    Authorization: `${state?.jwt?.token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        return data
    }

    return useQuery<string, AxiosError, NotificationResponse["data"]>(
        ["userNotification"],
        () => getUserNotifications(),
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
