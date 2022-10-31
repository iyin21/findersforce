import { axiosInstance } from "../../../services/api.service"
import { showNotification } from "@mantine/notifications"
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { useQuery, useMutation } from "react-query"
import { ApplicationResponse, ShiftResponse } from "../interface"
import { useAuthContext } from "../../auth/context/authContext"
//import { BidDetailsResponse, BidRequest, BidResponse, BidActivitiesResponse } from "./interface";
interface ApplicationRequest {
    status: string
    page?: number
}
function useGetApplications({ status, page }: ApplicationRequest) {
    const { auth } = useAuthContext()
    //console.log(auth)
    const getApplications = async () => {
        const { data } = await axiosInstance.get("/applications", {
            params: { status, page },
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2QzNDNjNTQ1M2U2YTQ1YzczM2I4ZiIsImlhdCI6MTY2NzIwNzg0MCwiZXhwIjoxNjY3MjA4ODQwfQ.CyQ1XZrHQWUPM2YS8ayobiii5hVwWMsn5dbPl_yHhZo`,
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
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2QzNDNjNTQ1M2U2YTQ1YzczM2I4ZiIsImlhdCI6MTY2NzIwNzg0MCwiZXhwIjoxNjY3MjA4ODQwfQ.CyQ1XZrHQWUPM2YS8ayobiii5hVwWMsn5dbPl_yHhZo`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, ApplicationResponse["data"]>(
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
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2QzNDNjNTQ1M2U2YTQ1YzczM2I4ZiIsImlhdCI6MTY2NzIwNzg0MCwiZXhwIjoxNjY3MjA4ODQwfQ.CyQ1XZrHQWUPM2YS8ayobiii5hVwWMsn5dbPl_yHhZo`,
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
export { useGetApplications, useGetApplicationDetails, useGetShiftHistory }
