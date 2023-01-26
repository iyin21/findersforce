import { showNotification } from "@mantine/notifications"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import {
    DashboardData,
    RegionsResponse,
} from "../../types/dashboard/interfaces"
import useAuthContext from "../auth-hooks/useAuth"
import useAxiosInstance from "../../services/useAxiosInstance"

function useGetDashboardAnalytics({
    dateFrom,
    dateTo,
    regionId,
}: {
    dateFrom: Date | null | undefined
    dateTo: Date | null | undefined
    regionId?: string | null | undefined
}) {
    const { state } = useAuthContext()
    const axiosInstance = useAxiosInstance()

    const getDashboardAnalytics = async () => {
        const { data } = await axiosInstance.get("/depot/analytics", {
            params: { dateFrom, dateTo, regionId },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }
    return useQuery<string, AxiosError, DashboardData>(
        ["dashbordAnalytics", { dateFrom, dateTo, regionId }],
        getDashboardAnalytics,
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

function useGetDepotRegions({ id }: { id?: string }) {
    const { state } = useAuthContext()
    const axiosInstance = useAxiosInstance()
    const getDepotRegions = async () => {
        const { data } = await axiosInstance.get(
            `/depot/company/${id}/regions`,
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )
        return data
    }
    return useQuery<unknown, AxiosError, RegionsResponse>(
        ["regions", { id }],
        getDepotRegions,

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

export { useGetDashboardAnalytics, useGetDepotRegions }
