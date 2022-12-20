import { showNotification } from "@mantine/notifications"
import { axiosInstance } from "../../services/api.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { InviteDepotInterface } from "../../types/roles/role-interface"
import useAuthContext from "../../hooks/auth-hooks/useAuth"

export const useInviteDepot = () => {
    const { state } = useAuthContext()

    const createInvite = async (requestBody: InviteDepotInterface) => {
        const newFormData = new FormData()

        Object.keys(requestBody).forEach((key) => {
            // @ts-ignore
            if (key === "email") {
                // @ts-ignore
                requestBody[key].forEach((email: any) => {
                    newFormData.append(`email[]`, email)
                })
                // values[key].forEach((image: any) => {
                //     newFormData.append(`additionalInfoImageUrls`, image)
                // })
            } else {
                // @ts-ignore
                newFormData.append(key, requestBody[key])
            }
        })

        // requestBody.email.map((item) => newFormData.append("email[]", item))

        const { data } = await axiosInstance.post("/invitation", newFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `${state.jwt?.token}`,
            },
        })
        return data
    }

    return useMutation<any, AxiosError, InviteDepotInterface>(
        ["inviteShiftManager"],
        (requestBody: InviteDepotInterface) => createInvite(requestBody),
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
