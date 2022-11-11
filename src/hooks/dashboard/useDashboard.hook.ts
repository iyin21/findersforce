import { showNotification } from "@mantine/notifications"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { DashboardData } from "../../types/dashboard/interfaces"
import { axiosInstance } from "../../services/api.service"
import useAuthContext from "../auth-hooks/useAuth"

function useGetDashboardAnalytics () {
    const { state } = useAuthContext()

    const getDashboardAnalytics = async () => {
        const { data } = await axiosInstance.get("/depot/analytics", {
        headers: {
            Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
            return data.data           
        }
        return useQuery<string, AxiosError, DashboardData>(
            ["dashbordAnalytics"],
            ({ signal }) => getDashboardAnalytics(),
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
    useGetDashboardAnalytics
}