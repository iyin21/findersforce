import { axiosInstance } from "../../../services/api.service"
import { showNotification } from "@mantine/notifications"
import { AxiosError, AxiosRequestConfig } from "axios"
import { useQuery, useMutation } from "react-query"
import {
    ApplicationResponse,
    ShiftResponse,
    ApplicationDetailsResponse,
} from "../interface"
//import { useAuthContext } from "../../auth/context/authContext"
//import useAuth from "../../../hooks/useAuth";

interface ApplicationRequest {
    status: string
    page?: number
}
interface UpdateApplicationRequest {
    status: string
}
function useGetApplications({ status, page }: ApplicationRequest) {
    //const { auth } =  useAuth()
    //console.log(auth)
    const getApplications = async () => {
        const { data } = await axiosInstance.get("/applications", {
            params: { status, page },
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        })
        return data
    }

    return useQuery<ApplicationRequest, AxiosError, ApplicationResponse>(
        ["applications", { status, page }],
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
    const getApplicationDetails = async () => {
        const { data } = await axiosInstance.get(`/applications/${id}`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2QzNDNjNTQ1M2U2YTQ1YzczM2I4ZiIsImlhdCI6MTY2NzM3NDI4NCwiZXhwIjoxNjY3Mzc1Mjg0fQ.KG4POjiP1_HlM1cDjxgyWt6OGevg3d11rI4RHoNQ_P8`,
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
    //const { state } = useAuthContext();

    const updateApplication = async ({ status }: UpdateApplicationRequest) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2QzNDNjNTQ1M2U2YTQ1YzczM2I4ZiIsImlhdCI6MTY2NzM3NDI4NCwiZXhwIjoxNjY3Mzc1Mjg0fQ.KG4POjiP1_HlM1cDjxgyWt6OGevg3d11rI4RHoNQ_P8`,
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
        "updateApplicationRequest",
        ({ status }: UpdateApplicationRequest) => updateApplication({ status }),
        {
            onError: (err) => {
                showNotification({
                    message: err?.message || "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
        }
    )
}
function useGetShiftHistory({
    operativeId,
    completed,
}: {
    operativeId: string
    completed?: boolean
}) {
    const getShiftHistory = async () => {
        const { data } = await axiosInstance.get(`/schedule`, {
            params: { operativeId, completed },
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2QzNDNjNTQ1M2U2YTQ1YzczM2I4ZiIsImlhdCI6MTY2NzM3NDI4NCwiZXhwIjoxNjY3Mzc1Mjg0fQ.KG4POjiP1_HlM1cDjxgyWt6OGevg3d11rI4RHoNQ_P8`,
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
