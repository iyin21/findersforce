import { showNotification } from "@mantine/notifications"
import { AxiosError, AxiosRequestConfig } from "axios"
// import { useQuery, useMutation } from "react-query"
import {
    ApplicationResponse,
    ShiftResponse,
    ApplicationDetailsResponse,
} from "../interface"
import useAuthContext from "../../../hooks/auth-hooks/useAuth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAxiosInstance from "../../../services/useAxiosInstance"

interface ApplicationRequest {
    status: string
    page?: number
    jobTypeId?: string
    jobMatchPercentageMin?: string
    jobMatchPercentageMax?: string
}
interface UpdateApplicationRequest {
    status: string
}
function useGetApplications({
    status,
    page,
    jobTypeId,
    jobMatchPercentageMin,
    jobMatchPercentageMax,
}: ApplicationRequest) {
    // const { auth } =  useAuth()
    // console.log(auth)
    const { state } = useAuthContext()
    const axiosInstance = useAxiosInstance()
    const getApplications = async () => {
        const { data } = await axiosInstance.get("/applications", {
            params: {
                status,
                page,
                jobTypeId,
                jobMatchPercentageMin,
                jobMatchPercentageMax,
            },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data
    }

    return useQuery<ApplicationRequest, AxiosError, ApplicationResponse>(
        [
            "applications",
            {
                status,
                page,
                jobTypeId,
                jobMatchPercentageMin,
                jobMatchPercentageMax,
            },
        ],
        getApplications,

        {
            // initialData:{page, status, commodity},
            onError: (err) => {
                showNotification({
                    title: "Error",
                    message: err.message,
                    color: "red",
                })
            },
        }
    )
}

function useGetApplicationDetails({ id }: { id: string }) {
    const { state } = useAuthContext()
    const axiosInstance = useAxiosInstance()
    const getApplicationDetails = async () => {
        const { data } = await axiosInstance.get(`/applications/${id}`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, ApplicationDetailsResponse["data"]>(
        ["applicationDetails", id],
        getApplicationDetails,

        {
            // initialData:{page, status, commodity},
            onError: (err) => {
                showNotification({
                    title: "Error",
                    message: err.message,
                    color: "red",
                })
            },
        }
    )
}
function useUpdateApplication({ id }: { id: string }) {
    const { state } = useAuthContext()
    const axiosInstance = useAxiosInstance()
    // Get QueryClient from the context
    const queryClient = useQueryClient()

    const updateApplication = async ({ status }: UpdateApplicationRequest) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        }
        const { data } = await axiosInstance.patch(
            `/applications/${id}`,
            { status },
            config
        )

        return data
    }
    return useMutation<
        ApplicationDetailsResponse,
        AxiosError,
        UpdateApplicationRequest
    >(
        ["updateApplicationRequest"],
        ({ status }: UpdateApplicationRequest) => updateApplication({ status }),
        {
            onError: (err) => {
                showNotification({
                    message: err?.message || "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["applications"] })
            },
        }
    )
}
function useGetShiftHistory({
    operativeId,
    completed,
}: {
    operativeId: string | undefined
    completed?: boolean
}) {
    const { state } = useAuthContext()
    const axiosInstance = useAxiosInstance()
    const getShiftHistory = async () => {
        const { data } = await axiosInstance.get(`/schedule`, {
            params: { operativeId, completed },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, ShiftResponse["data"]>(
        ["shiftHistory", { operativeId, completed }],
        getShiftHistory,

        {
            // initialData:{page, status, commodity},
            onError: (err) => {
                showNotification({
                    title: "Error",
                    message: err.message,
                    color: "red",
                })
            },
        }
    )
}
export {
    useGetApplications,
    useGetApplicationDetails,
    useGetShiftHistory,
    useUpdateApplication,
}
