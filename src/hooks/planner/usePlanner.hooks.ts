import { showNotification } from "@mantine/notifications"
import { ShiftResponse } from "../../pages/Applications/interface"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { axiosInstance } from "../../services/api.service"
import useAuthContext from "../auth-hooks/useAuth"

function useGetShiftHistory() {
    const { state } = useAuthContext()
    const getShiftHistory = async () => {
        const { data } = await axiosInstance.get(`/schedule`, {
            
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, ShiftResponse["data"]>(
        ["shiftHistory"],
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
    useGetShiftHistory
}