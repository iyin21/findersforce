import { showNotification } from "@mantine/notifications"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import useAuthContext from "../auth-hooks/useAuth"
import {
    PaymentResponse,
    TransactionResponse,
} from "../../types/payment/interface"
import useAxiosInstance from "../../services/useAxiosInstance"

interface updatePaymentRequest {
    transactionIds: string[]
}

function useGetTransactionHistoryByJobListingId({
    jobListingId,
}: {
    jobListingId?: string
}) {
    const { state } = useAuthContext()
    const axiosInstance = useAxiosInstance()
    const getTransactionHistoryByJobListingId = async () => {
        const { data } = await axiosInstance.get(
            `/admin/transaction?jobListingId=${jobListingId}`,
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )
        return data.data
    }

    return useQuery<unknown, AxiosError, PaymentResponse["data"]>(
        ["transactionHistory", { jobListingId }],
        getTransactionHistoryByJobListingId,

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

function useUpdatePaymentHistory() {
    const { state } = useAuthContext()
    const axiosInstance = useAxiosInstance()
    const queryClient = useQueryClient()

    const updatePaymentHistory = async ({
        transactionIds,
    }: updatePaymentRequest) => {
        const { data } = await axiosInstance.patch(
            `/admin/payment`,
            { transactionIds },
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )
        return data.data
    }

    return useMutation<
        TransactionResponse["data"],
        AxiosError,
        updatePaymentRequest
    >(
        ["paymentHistory"],
        ({ transactionIds }: updatePaymentRequest) => updatePaymentHistory({ transactionIds }),
        {
            onError: (err) => {
                showNotification({
                    message: err?.message || "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
            onSuccess: (msg) => {
                queryClient.invalidateQueries({ queryKey: ["payment"] });
                showNotification({
                    title: "Success",
                    message: msg?.message || "Payment status successfully updated",
                    color: "Green",
                })
            }
        }
    )
}

export { useGetTransactionHistoryByJobListingId, useUpdatePaymentHistory }
