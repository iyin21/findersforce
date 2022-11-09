import useAuthContext from "./auth-hooks/useAuth"
// import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { showNotification } from "@mantine/notifications"
import useAxiosPrivate from "./../services/usePrivateAxios"

interface NotificationResponse {
    count: number
    status: boolean
    pagination: {
        next: {}
        prev: {}
    }
    data: {
        data: NotificationData[]
    }
}

interface NotificationData {
    _id: string
    sender: string | any
    description: string
    receiver: {
        _id: string
        email: string
        firstName: string
        lastName: string
        userName: string
        phoneNumber: string
    }
    title: string
    event: string
    createdAt: Date | string
    updatedAt: Date | string
    __v: number
    readStatus: boolean
}

export default function useUserNotification() {
    const { state } = useAuthContext()
    const axiosPrivate = useAxiosPrivate()
    // /** API methods */
    const getUserNotifications = async () => {
        const { data } = await axiosPrivate.get(
            "https://findersforce-api.workcube.com.ng/api/v1/user/notifications",
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
