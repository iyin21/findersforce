import { showNotification } from "@mantine/notifications"
import { axiosInstance } from "../../services/api.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosRequestConfig } from "axios"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import {
    InviteDepotInterfaceResponse,
    JobRateRequest,
    JobRateResponse,
    MultipleRateRequest,
    InviteDepotInterfaceRequest,
    ScheduleRequest,
    ScheduleResponse,
    OperativeRequest,
    OperativeResponse,
    IJobRateResponse,
    UpdateJobRateRequest,
    CreateJobRateRequest,
    PaymentResponse,
    ISingleJobRateResponse,
    deleteRequest,
} from "../../types/depot/depot-inteface"

export const useInviteDepot = () => {
    const { state } = useAuthContext()

    const createInvite = async (requestBody: InviteDepotInterfaceRequest) => {
        const newFormData = new FormData()

        Object.keys(requestBody).forEach((key) => {
            if (key === "email") {
                // @ts-ignore
                requestBody[key].forEach((email: any) => {
                    newFormData.append(`email[]`, email)
                })
            } else {
                // @ts-ignore
                newFormData.append(key, requestBody[key])
            }
        })

        const { data } = await axiosInstance.post("/invitation", newFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `${state.jwt?.token}`,
            },
        })
        return data?.data
    }

    return useMutation<
        InviteDepotInterfaceResponse,
        AxiosError,
        InviteDepotInterfaceRequest
    >(
        ["inviteShiftManager"],
        (requestBody: InviteDepotInterfaceRequest) => createInvite(requestBody),
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

export const useCreateMultipleRates = () => {
    const { state } = useAuthContext()

    const createMultipleRates = async (requestBody: MultipleRateRequest) => {
        const { data } = await axiosInstance.post(
            "/job-listing/job-rate-multiple",
            requestBody,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${state.jwt?.token}`,
                },
            }
        )
        return data
    }

    return useMutation<any, AxiosError, MultipleRateRequest>(
        ["createMultipleRates"],
        (requestBody: MultipleRateRequest) => createMultipleRates(requestBody),
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

export const useGetJobRates = ({ company }: JobRateRequest) => {
    const { state } = useAuthContext()
    const getJobRates = async () => {
        const { data } = await axiosInstance.get(`/job-listing/job-rate`, {
            params: {
                company,
            },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<JobRateRequest, AxiosError, JobRateResponse>(
        ["job rates", company],
        () => getJobRates(),
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

export const useGetSingleJobRates = ({ id }: JobRateRequest) => {
    const { state } = useAuthContext()
    const getSingleJobRates = async () => {
        const { data } = await axiosInstance.get(
            `/job-listing/job-rate/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )
        return data.data
    }

    return useQuery<JobRateRequest, AxiosError, ISingleJobRateResponse>(
        ["single job rate", id],
        () => getSingleJobRates(),
        {
            onError: (err) => {
                showNotification({
                    title: "Error",
                    // @ts-ignore
                    message: err?.response?.data?.error || "An error occurred",
                    color: "red",
                })
            },
        }
    )
}

export const useUpdateSingleJobRates = ({ id }: { id: string }) => {
    const { state } = useAuthContext()
    const updateJobRate = async (requestBody: UpdateJobRateRequest) => {
        const { data } = await axiosInstance.patch(
            `/job-listing/job-rate/${id}`,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )

        return data
    }
    return useMutation<IJobRateResponse, AxiosError, UpdateJobRateRequest>(
        ["UpdateJobRateRequest", id],
        (requestBody: UpdateJobRateRequest) => updateJobRate(requestBody),
        {
            onSuccess: (data) => {
                showNotification({
                    message: data?.message || data?.message,
                    title: "Success",
                    color: "green",
                })
            },
            onError: (err) => {
                showNotification({
                    message: err.message || "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
        }
    )
}

export const useCreateJobRates = () => {
    const { state } = useAuthContext()
    const createJobRate = async (requestBody: CreateJobRateRequest) => {
        const { data } = await axiosInstance.post(
            `/job-listing/job-rate`,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )

        return data
    }
    return useMutation<IJobRateResponse, AxiosError, CreateJobRateRequest>(
        ["create JobRateRequest"],
        (requestBody: CreateJobRateRequest) => createJobRate(requestBody),
        {
            onSuccess: (data) => {
                showNotification({
                    // @ts-ignore
                    message: data?.message,
                    title: "Success",
                    color: "green",
                })
            },
            onError: (err) => {
                showNotification({
                    // @ts-ignore
                    message: err.response?.data?.error || "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
        }
    )
}

export const useGetSchedules = ({ companyId }: ScheduleRequest) => {
    const { state } = useAuthContext()
    const getSchedules = async () => {
        const { data } = await axiosInstance.get(`/schedule`, {
            params: {
                companyId,
            },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<ScheduleRequest, AxiosError, ScheduleResponse>(
        ["get schedules", companyId],
        () => getSchedules(),
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

export const useGetOperatives = ({ companyId }: OperativeRequest) => {
    const { state } = useAuthContext()
    const getOperatives = async () => {
        const { data } = await axiosInstance.get(`/admin/depot-operatives`, {
            params: {
                companyId,
            },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<OperativeRequest, AxiosError, OperativeResponse>(
        ["get operatives", companyId],
        () => getOperatives(),
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
export const useGetPayments = ({ regionId }: OperativeRequest) => {
    const { state } = useAuthContext()
    const getPayments = async () => {
        const { data } = await axiosInstance.get(`/admin/transaction`, {
            params: {
                regionId,
            },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<OperativeRequest, AxiosError, PaymentResponse>(
        ["get all payments", regionId],
        () => getPayments(),
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

export const useDeleteRegion = () => {
    const { state } = useAuthContext()
    const deleteRegion = async (requestBody: deleteRequest) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `${state.jwt?.token}`,
            },
        }
        const { data } = await axiosInstance.delete(
            `/admin/delete-regions`,
            {
                data: requestBody,
            },
            // @ts-ignore
            config
        )

        return data
    }
    return useMutation<any, AxiosError, deleteRequest>(
        ["delete region"],
        (requestBody: deleteRequest) => deleteRegion(requestBody),
        {
            onSuccess: (data) => {
                showNotification({
                    // @ts-ignore
                    message: data?.message,
                    title: "Success",
                    color: "green",
                })
            },
            onError: (err) => {
                showNotification({
                    // @ts-ignore
                    message: err.response?.data?.error || "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
        }
    )
}
