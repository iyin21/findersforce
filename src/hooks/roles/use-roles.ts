import { axiosInstance } from "../../services/api.service"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { showNotification } from "@mantine/notifications"
import {
    InviteHqInterface,
    InviteUserInterface,
    RoleResponse,
    RolesRequest,
} from "../../types/roles/role-interface"

export const useInviteShiftManger = () => {
    const { state } = useAuthContext()

    const createInvite = async (requestBody: InviteUserInterface) => {
        const newFormData = new FormData()

        newFormData.append("invitedRole", requestBody.invitedRole)
        // @ts-ignore
        newFormData.append("companyId", requestBody.companyId)

        if (requestBody.companyName === undefined) {
            ;("")
        } else {
            // @ts-ignore
            newFormData.append("companyName", requestBody.companyName)
        }

        // @ts-ignore
        newFormData.append("regionAddress", requestBody.regionAddress)

        requestBody.email.map((item) => newFormData.append("email[]", item))

        const { data } = await axiosInstance.post("/invitation", newFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `${state?.jwt?.token}`,
            },
        })
        return data
    }

    return useMutation<any, AxiosError, InviteUserInterface>(
        ["inviteShiftManager"],
        (requestBody: InviteUserInterface) => createInvite(requestBody),
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
export const useInviteHQ = ({ jwt }: { jwt: string | undefined }) => {
    const createInvite = async (requestBody: InviteHqInterface) => {
        const { data } = await axiosInstance.post(
            "/invitation/multiple",
            requestBody,
            {
                headers: {
                    Authorization: `${jwt}`,
                },
            }
        )
        return data
    }

    return useMutation<any, AxiosError, InviteHqInterface>(
        ["inviteShiftManager"],
        (requestBody: InviteHqInterface) => createInvite(requestBody),
        {
            // onSuccess: (data) => {
            //     showNotification({
            //         message: data?.message || data?.message,
            //         title: "Success",
            //         color: "green",
            //     })
            // },
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

function useGetRoles({ status, signal, page, limit, depotRole }: RolesRequest) {
    const { state } = useAuthContext()

    /** API methods */
    const getRoles = async () => {
        const { data } = await axiosInstance.get("/depot", {
            signal,
            params: {
                status,
                page,
                limit,
                depotRole,
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
                depotRole,
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
            null,
            {
                headers: {
                    Authorization: `${state?.jwt?.token}`,
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
            `/invitation/${userId}/resend`,
            null,
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
    const revokeInvite = async () => {
        const { data } = await axiosInstance.patch(
            `/invitation/${userId}/revoke`,
            null,
            {
                headers: {
                    Authorization: `${state?.jwt?.token}`,
                },
            }
        )

        return data
    }
    return useMutation<AxiosResponse, AxiosError>(revokeInvite, {
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
    })
}

export { useGetRoles, useDeleteUser, useResendInvite, useRevokeInvite }
