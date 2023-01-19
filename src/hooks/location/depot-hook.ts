import { axiosInstance } from "../../services/api.service"
import { showNotification } from "@mantine/notifications"
import { AxiosError } from "axios"
import useAuthContext from "../auth-hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { RegionsResponse } from "../../types/dashboard/interfaces"
import AllManagersResponse from "types/location/interface"

function useGetAllDepotRegions() {
    const { state } = useAuthContext()
    const getDepotRegions = async () => {
        const { data } = await axiosInstance.get(
            `/depot/company/${state.user?.company._id}/regions`,
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )

        return data
    }

    return useQuery<unknown, AxiosError, RegionsResponse>(
        ["allUsers"],
        getDepotRegions,

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

function useGetAllManagers() {
    const { state } = useAuthContext()
    const getAllManagers = async () => {
        const { data } = await axiosInstance.get(
            "/depot?status=accepted&depotRole=MANAGER",
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )
        return data
    }

    return useQuery<unknown, AxiosError, AllManagersResponse["data"]>(
        ["allManagers"],
        getAllManagers,
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

const addManagers = (
    email: string[],
    companyId: string,
    inviteRole: string,
    regionAddress: string | null,
    token: string,
    setOpened: (val: boolean) => void,
    setIsSubmitting: (val: boolean) => void,
    setErrorMsg: (msg: string) => void,
    showError: (val: boolean) => void,
) => {
    axiosInstance.post(
        "/invitation/multiple",
        {
            invitees: [
                {
                    companyId: companyId,
                    invitedRole: inviteRole,
                    regionaAddress: regionAddress,
                    email: email,
                }
            ]
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token,
            },
        }
    ).then(res => {
        setOpened(false)
        setIsSubmitting(false)
        showNotification({
            title: "Success",
            color: "green",
            message: res.data.message || "Invite successfully sent"
        })
    }).catch(err => {
        try {
            setErrorMsg(err.response.data.error)
        } catch (error) {
            setErrorMsg("Hmmm, something went wrong, try again later.")
        } finally {
            showError(true)
            setIsSubmitting(false)
        }
    })
}

export { useGetAllDepotRegions, useGetAllManagers, addManagers }
