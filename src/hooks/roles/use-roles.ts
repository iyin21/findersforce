import { axiosInstance } from "../../services/api.service"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { showNotification } from "@mantine/notifications"
import {
    InviteShiftMangerInterface,
    RoleResponse,
    RolesRequest,
} from "../../types/roles/role-interface"

export const useInviteShiftManger = () => {
    const { state } = useAuthContext()

    const createInvite = async (requestBody: InviteShiftMangerInterface) => {
        const { data } = await axiosInstance.post("/invitation", requestBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${state?.jwt?.token}`,
            },
        })
        return data
    }

    return useMutation<any, AxiosError, InviteShiftMangerInterface>(
        ["inviteShiftManager"],
        (requestBody: InviteShiftMangerInterface) => createInvite(requestBody),
        {
            onSuccess: (data) => {
                showNotification({
                    message: data?.message || data?.message,
                    title: "Success",
                    color: "green",
                })
            },
            onError: (err: AxiosError) => {
                showNotification({
                    message:
                        // @ts-ignore
                        err.response?.data?.error ||
                        err.message ||
                        "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
        }
    )
}

function useGetRoles({ status, signal, page, limit }: RolesRequest) {
    const { state } = useAuthContext()

    /** API methods */
    const getRoles = async () => {
        const { data } = await axiosInstance.get("/depot", {
            signal,
            params: {
                status,
                page,
                limit,
            },
            headers: {
                Authorization: `${state?.jwt?.token}`,
            },
        })
        return data
    }

    return useQuery<RolesRequest, AxiosError, RoleResponse>(
        [
            "roles and permission",
            {
                status,
                signal,
                page,
                limit,
            },
        ],
        () => getRoles()
    )
}

function useDeleteUser({ userId }: { userId: string | undefined }) {
    const { state } = useAuthContext()

    /** API methods */
    const deleteUser = async () => {
        const { data } = await axiosInstance.patch(
            `/admin/delete/user/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )

        return data
    }
    return useMutation<AxiosResponse, AxiosError>(deleteUser)
}

function useResendInvite({ userId }: { userId: string | undefined }) {
    const { state } = useAuthContext()

    /** API methods */
    const resendInvite = async () => {
        const { data } = await axiosInstance.post(
            `/invitation${userId}/resend`,
            {
                headers: {
                    Authorization: `${state?.jwt?.token}`,
                },
            }
        )

        return data
    }
    return useMutation<AxiosResponse, AxiosError>(resendInvite)
}

function useRevokeInvite({ userId }: { userId: string | undefined }) {
    const { state } = useAuthContext()

    /** API methods */
    const resendInvite = async () => {
        const { data } = await axiosInstance.patch(
            `/invitation${userId}/revoke`,
            {
                headers: {
                    Authorization: `${state?.jwt?.token}`,
                },
            }
        )

        return data
    }
    return useMutation<AxiosResponse, AxiosError>(resendInvite)
}

export { useGetRoles, useDeleteUser, useResendInvite, useRevokeInvite }
