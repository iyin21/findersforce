import { axiosInstance } from "../../services/api.service"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { showNotification } from "@mantine/notifications"
import { InviteShiftMangerInterface } from "../../types/roles/role-interface"

export const useInviteShiftManger = () => {
    const { state } = useAuthContext()

    const createInvite = async (requestBody: InviteShiftMangerInterface) => {
        const { data } = await axiosInstance.post("/invitation", requestBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${state?.jwt?.token}`,
            },
        })
        return data
    }

    return useMutation<any, AxiosError, InviteShiftMangerInterface>(
        ["inviteShiftManager"],
        (requestBody: InviteShiftMangerInterface) => createInvite(requestBody),
        {
            onSuccess: (data) => {
                showNotification({
                    message: data?.message || data?.message,
                    title: "Success",
                    color: "green",
                })
            },
            onError: (err: AxiosError) => {
                showNotification({
                    message:
                        // @ts-ignore
                        err.response?.data?.error ||
                        err.message ||
                        "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
        }
    )
}
