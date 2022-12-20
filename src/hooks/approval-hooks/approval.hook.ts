import { axiosInstance } from "../../services/api.service"
import { showNotification } from "@mantine/notifications"
import { AxiosError, AxiosRequestConfig } from "axios"
import { AllUsersResponse } from "../../types/approval/approval-interface";
import useAuthContext from "../auth-hooks/useAuth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
interface ApprovalRequest {
    docStatus: string
}
interface UpdateOperativeRequest {
    status: string
    rejectReason?: string | null
    moreInformation?: string
}

function useGetAllOperativeUsers({ docStatus }: ApprovalRequest) {
    const { state } = useAuthContext()
    const getAllUsers = async () => {
        const { data } = await axiosInstance.get("/admin/user?accountType=OPERATIVE", {
            params: { docStatus },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data
    }

    return useQuery<ApprovalRequest, AxiosError, AllUsersResponse>(
        ["allUsers", { docStatus }],
        getAllUsers,

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

function useGetOperativeDetails({ id }: { id: string }) {
    const { state } = useAuthContext()
    const getOperativeDetails = async () => {
        const { data } = await axiosInstance.get(`/admin/user?userId=${id}`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, AllUsersResponse["data"]>(
        ["operativeDetails", id],
        getOperativeDetails,

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


function useUpdateOperative({ id }: { id: string }) {
    const { state } = useAuthContext()
    // Get QueryClient from the context
    const queryClient = useQueryClient();

    const updateApplication = async ({ status, rejectReason = "", moreInformation = "" }: UpdateOperativeRequest) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        }
        const body = rejectReason === "" ? { status } : { status, moreInformation, rejectReason }
        const { data } = await axiosInstance.patch(
            `/admin/kyc/${id}`,
            body,
            config
        )

        return data
    }
    return useMutation<
        AllUsersResponse,
        AxiosError,
        UpdateOperativeRequest
    >(
        ["updateOperativeRequest"],
        ({ status, rejectReason, moreInformation }: UpdateOperativeRequest) => updateApplication({ status, moreInformation, rejectReason }),
        {
            onError: (err) => {
                showNotification({
                    message: err?.message || "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["approval"] });
            }
        }
    )
}

export {
    useGetAllOperativeUsers,
    useGetOperativeDetails,
    useUpdateOperative,
}
