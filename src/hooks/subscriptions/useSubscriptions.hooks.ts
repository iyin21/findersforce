import { showNotification } from "@mantine/notifications"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { RegionsResponse } from "../../types/dashboard/interfaces"
import { axiosInstance } from "../../services/api.service"
import { DepotCompanyResponse, SubscriptionPrice, SubscriptionResponse } from "../../types/subscriptions/interface"
import useAuthContext from "../auth-hooks/useAuth"

function useGetAllSubscriptions() {
    const { state } = useAuthContext()
    const getSubscriptions = async () => {
        const { data } = await axiosInstance.get(`/depot/subscription`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }
    return useQuery<unknown, AxiosError, SubscriptionResponse["data"]>(
        ["allSubscriptions"],
        getSubscriptions,

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

function useGetSubscriptionPrice() {
    const { state } = useAuthContext()
    const getSubscriptionPrice = async () => {
        const { data } = await axiosInstance.get(`/admin/subscription/price`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }
    return useQuery<unknown, AxiosError, SubscriptionPrice["data"]>(
        ["subscriptionPrices"],
        getSubscriptionPrice,

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

function useGetAdminSubscriptions({ companyId }: { companyId?: string }) {
    const { state } = useAuthContext()
    const getAdminSubscriptions = async () => {
        const { data } = await axiosInstance.get(`/admin/subscription`, {
            params: { companyId },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }
    return useQuery<unknown, AxiosError, SubscriptionResponse["data"]>(
        ["adminSubscriptions", { companyId }],
        getAdminSubscriptions,

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

function useGetSingleSubscriptions({
    subscriptionId,
}: {
    subscriptionId: string
}) {
    const { state } = useAuthContext()
    const getSingleSubscription = async (subscriptionId: string) => {
        const { data } = await axiosInstance.get(
            `/depot/subscription?subscriptionId=${subscriptionId}`,
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )
        return data.data
    }

    return useQuery<string, AxiosError, SubscriptionResponse["data"]>(
        ["singleSubscription", subscriptionId],
        () => getSingleSubscription(subscriptionId),

        {
            enabled: !!subscriptionId,
            onSuccess: (data) => {
                window.sessionStorage.setItem(
                    "pdfData",
                    JSON.stringify(data?.results)
                )
            },
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

function useGetDepotCompanies() {
    const { state } = useAuthContext()
    const getDepotCompanies = async () => {
        const { data } = await axiosInstance.get(`/admin/depot-companies`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }
    return useQuery<unknown, AxiosError, DepotCompanyResponse["data"]>(
        ["depot-companies"],
        getDepotCompanies,

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

function useGetDepotRegions({id}: {id: string}) {
    const { state } = useAuthContext()
    const getDepotRegions = async () => {
        const { data } = await axiosInstance.get(`/depot/company/${id}/regions`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }
    return useQuery<unknown, AxiosError, RegionsResponse["data"]>(
        ["depot-regions", { id }],
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
    useGetSingleSubscriptions,
    useGetAllSubscriptions,
    useGetAdminSubscriptions,
    useGetDepotCompanies,
    useGetDepotRegions,
    useGetSubscriptionPrice,
}
