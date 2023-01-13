import { showNotification } from "@mantine/notifications"
import {
    PaymentEvidenceUpload,
    ShiftByScheduleIdResponse,
    ShiftResponse,
} from "../../types/planner/interfaces"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosRequestConfig } from "axios"
import { axiosInstance } from "../../services/api.service"
import useAuthContext from "../auth-hooks/useAuth"

function useGetShiftHistory({
    ongoing,
    completed,
    cancelled,
    jobMeetingPoint,
    regionId,
}: {
    upcoming?: boolean
    ongoing?: boolean
    completed?: boolean
    cancelled?: boolean
    jobMeetingPoint?: string
    regionId?: string | undefined | null
}) {
    const { state } = useAuthContext()
    const getShiftHistory = async () => {
        const { data } = await axiosInstance.get(`/schedule`, {
            params: {
                ongoing,
                completed,
                cancelled,
                jobMeetingPoint,
                regionId,
            },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, ShiftResponse["data"]>(
        [
            "shiftHistory",
            { ongoing, completed, cancelled, jobMeetingPoint, regionId },
        ],
        getShiftHistory,

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

function useGetShiftHistoryByJobListingId({
    jobListingId,
    queryStatus,
}: {
    jobListingId?: string
    queryStatus?: string
}) {
    const { state } = useAuthContext()
    const getShiftHistoryByJobListingId = async () => {
        const { data } = await axiosInstance.get(
            `/schedule?jobListingId=${jobListingId}&${queryStatus}=true`,
            {
                headers: {
                    Authorization: `Bearer ${state?.jwt?.token}`,
                },
            }
        )
        return data.data
    }

    return useQuery<unknown, AxiosError, ShiftResponse["data"]>(
        ["shiftHistory", { jobListingId, queryStatus }],
        getShiftHistoryByJobListingId,

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

function useGetSingleSchedule({
    jobListingId,
    operativeId,
}: {
    jobListingId?: string
    operativeId?: string
}) {
    const { state } = useAuthContext()
    const getSingleSchedule = async () => {
        const { data } = await axiosInstance.get(`/schedule`, {
            params: { jobListingId, operativeId },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, ShiftResponse["data"]>(
        ["shiftHistory", { jobListingId, operativeId }],
        getSingleSchedule,

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

function useGetScheduleByScheduleId({ scheduleId }: { scheduleId: string }) {
    const { state } = useAuthContext()
    const getOperativeRatingSummary = async () => {
        const { data } = await axiosInstance.get(`/schedule/${scheduleId}`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, ShiftByScheduleIdResponse["data"]>(
        ["shiftHistory", { scheduleId }],
        getOperativeRatingSummary,

        {
            onError: (err: any) => {
                showNotification({
                    title: "Error",
                    message: err?.response?.data.error,
                    color: "red",
                })
            },
        }
    )
}
function usePaymentEvidenceUpload({ scheduleId }: { scheduleId: string }) {
    const { state } = useAuthContext()

    const uploadPaymentEvidence = async (requestBody: { file: File }) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
                "content-type": "multipart/formdata",
            },
            params: {
                scheduleId,
            },
        }

        const formData = new FormData()
        formData.append("paymentEvidence", requestBody.file)

        const { data } = await axiosInstance.post(
            `/depot/payment-evidence`,
            formData,
            config
        )
        return data
    }

    return useMutation<PaymentEvidenceUpload, AxiosError, { file: File }>(
        ["uploadPaymentEvidence"],
        (requestBody: { file: File }) => uploadPaymentEvidence(requestBody),
        {
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

export {
    useGetShiftHistory,
    useGetShiftHistoryByJobListingId,
    useGetSingleSchedule,
    usePaymentEvidenceUpload,
    useGetScheduleByScheduleId,
}
