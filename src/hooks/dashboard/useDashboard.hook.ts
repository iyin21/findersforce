import { showNotification } from "@mantine/notifications"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { DashboardData, RegionsResponse } from "../../types/dashboard/interfaces"
import { axiosInstance } from "../../services/api.service"
import useAuthContext from "../auth-hooks/useAuth"

function useGetDashboardAnalytics ({
    dateFrom,
    dateTo,
}: {
    dateFrom: Date | null | undefined,
    dateTo: Date | null | undefined
}) {
    const { state } = useAuthContext()

    const getDashboardAnalytics = async () => {
        const { data } = await axiosInstance.get("/depot/analytics", {
        params: {dateFrom, dateTo},
        headers: {
            Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
            return data.data           
        }
        return useQuery<string, AxiosError, DashboardData>(
            ["dashbordAnalytics", {dateFrom, dateTo}],
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

function useGetDepotRegions ({
    id
}: {
    id?: string
}) {
    const { state } = useAuthContext();
    const getDepotRegions = async () => {
        const { data } = await axiosInstance.get(`/depot/company/${id}/regions`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
                },
        })
        return data.data
    }
    return useQuery<unknown, AxiosError, RegionsResponse["data"]>(
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

export {
    useGetDashboardAnalytics,
    useGetDepotRegions
}