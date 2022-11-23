import useAuthContext from "../auth-hooks/useAuth"
// import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { showNotification } from "@mantine/notifications"
import useAxiosPrivate from "../../services/usePrivateAxios"

interface disable2FaRequestResponse {
    message: string
    status: string
    data: {
        data: {
            message: string
            status: string
        }
    }
}

export default function useDisableTwoFactorRequest() {
    const { state } = useAuthContext()
    const axiosPrivate = useAxiosPrivate()
    // /** API methods */
    const requestToDisable2fa = async () => {
        const { data } = await axiosPrivate.get("/disable-2fa-request", {
            withCredentials: true,
            headers: {
                Authorization: `${state?.jwt?.token}`,
                "Content-Type": "application/json",
            },
        })
        return data
    }

    return useQuery<string, AxiosError, disable2FaRequestResponse["data"]>(
        ["disable2FaRequest"],
        () => requestToDisable2fa(),
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
