import { showNotification } from "@mantine/notifications"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ProfileRequest, ProfileResponse } from "../../types/profile/interface"
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

interface InviteProfileResponse {
    jwt: {
        token: string
    }
    user: {
        depotCompany: {
            _id: string
            name: string
        }
    }
}

export const useCreateProfile = () => {
    const { state } = useAuthContext()

    const createProfileRequest = async (requestBody: ProfileRequest) => {
        const { data } = await axiosInstance.post(
            "/invitation/accept",
            requestBody,
            {
                signal: new AbortController().signal,
                headers: {
                    Authorization: `${state?.jwt?.token}`,
                },
            }
        )

        return data.data
    }
    return useMutation<InviteProfileResponse, AxiosError, ProfileRequest>(
        ["createJobList"],
        (requestBody) => createProfileRequest(requestBody),
        {
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
