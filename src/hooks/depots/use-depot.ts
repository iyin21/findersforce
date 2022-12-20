import { showNotification } from "@mantine/notifications"
import { axiosInstance } from "../../services/api.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import {
    InviteDepotInterfaceRequest,
    MultipleRateRequest,
    InviteDepotInterfaceResponse,
} from "../../types/roles/role-interface"
import useAuthContext from "../../hooks/auth-hooks/useAuth"

export const useInviteDepot = () => {
    const { state } = useAuthContext()

    const createInvite = async (requestBody: InviteDepotInterfaceRequest) => {
        const newFormData = new FormData()

        Object.keys(requestBody).forEach((key) => {
            if (key === "email") {
                // @ts-ignore
                requestBody[key].forEach((email: any) => {
                    newFormData.append(`email[]`, email)
                })
            } else {
                // @ts-ignore
                newFormData.append(key, requestBody[key])
            }
        })

        const { data } = await axiosInstance.post("/invitation", newFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `${state.jwt?.token}`,
            },
        })
        return data?.data
    }

    return useMutation<
        InviteDepotInterfaceResponse,
        AxiosError,
        InviteDepotInterfaceRequest
    >(
        ["inviteShiftManager"],
        (requestBody: InviteDepotInterfaceRequest) => createInvite(requestBody),
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

export const useCreateMultipleRates = () => {
    const { state } = useAuthContext()

    const createMultipleRates = async (requestBody: MultipleRateRequest) => {
        const { data } = await axiosInstance.post(
            "/job-listing/job-rate-multiple",
            requestBody,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${state.jwt?.token}`,
                },
            }
        )
        return data
    }

    return useMutation<any, AxiosError, MultipleRateRequest>(
        ["createMultipleRates"],
        (requestBody: MultipleRateRequest) => createMultipleRates(requestBody),
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
