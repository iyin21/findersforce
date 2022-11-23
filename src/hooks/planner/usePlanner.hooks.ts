import { showNotification } from "@mantine/notifications"
import { ShiftResponse } from "../../types/planner/interfaces"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { axiosInstance } from "../../services/api.service"
import useAuthContext from "../auth-hooks/useAuth"
import { IDepotRating } from "../../types/dashboard/interfaces"


function useGetShiftHistory({
    upcoming,
    ongoing,
    completed,
    cancelled
}: {
    upcoming?: boolean
    ongoing?: boolean
    completed?: boolean
    cancelled?: boolean
}) {
    const { state } = useAuthContext()
    const getShiftHistory = async () => {
        const { data } = await axiosInstance.get(`/schedule`, {
            params: {upcoming, ongoing, completed, cancelled },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, ShiftResponse["data"]>(
        ["shiftHistory", {upcoming, ongoing, completed, cancelled }],
        getShiftHistory,

        {
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

function useGetShiftHistoryByJobListingId({
    jobListingId,
    queryStatus,
}: {
    jobListingId?:string,
    queryStatus?: string
}) {
    const { state } = useAuthContext()
    const getShiftHistoryByJobListingId = async () => {
        const { data } = await axiosInstance.get(`/schedule?jobListingId=${jobListingId}&${queryStatus}=true`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, ShiftResponse["data"]>(
        ["shiftHistory", { jobListingId, queryStatus }],
        getShiftHistoryByJobListingId,

        {
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


function useGetSingleSchedule({
    jobListingId
}: {
    jobListingId?:string
}) {
    const { state } = useAuthContext()
    const getSingleSchedule = async () => {
        const { data } = await axiosInstance.get(`/schedule`, {
            params:{jobListingId},
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, ShiftResponse["data"]>(
        ["shiftHistory", {jobListingId }],
        getSingleSchedule,

        {
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

function useGetOperativeRatingSummary({
    id
}: {
    id?: string
}) {
    const { state } = useAuthContext()
    const getOperativeRatingSummary = async () => {
        const { data } = await axiosInstance.get(`/rating/operative/${id}/summary`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, IDepotRating["data"]>(
        ["shiftHistory", { id }],
        getOperativeRatingSummary,

        {
            onError: (err:any) => {
                showNotification({
                    title: "Error",
                    message: err?.response?.data.error,
                    color: "red",
                })
            },
        }
    )
}





export { 
    useGetShiftHistory, 
    useGetShiftHistoryByJobListingId,
    useGetSingleSchedule,
    useGetOperativeRatingSummary
}