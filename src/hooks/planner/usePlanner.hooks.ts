import { showNotification } from "@mantine/notifications"
import {
    PaymentEvidenceUpload,
    RateOperativeRequest,
    RateOperativeResponse,
    ShiftByScheduleIdResponse,
    ShiftResponse,
} from "../../types/planner/interfaces"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosRequestConfig } from "axios"
import useAuthContext from "../auth-hooks/useAuth"
import useAxiosInstance from "../../services/useAxiosInstance"

function useGetShiftHistory({
    upcoming,
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
    const axiosInstance = useAxiosInstance()
    const getShiftHistory = async () => {
        const { data } = await axiosInstance.get(`/schedule`, {
            params: {
                upcoming,
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
            { upcoming, ongoing, completed, cancelled, jobMeetingPoint, regionId },
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
    const axiosInstance = useAxiosInstance()
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
    const axiosInstance = useAxiosInstance()
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
    const axiosInstance = useAxiosInstance()
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
function usePaymentEvidenceUpload() {
    const { state } = useAuthContext()
    const axiosInstance = useAxiosInstance()

    const uploadPaymentEvidence = async (requestBody: { file: File , scheduleId: string}) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
                "content-type": "multipart/formdata",
            },
        }

        const formData = new FormData()
        formData.append("paymentEvidence", requestBody.file)
        formData.append("scheduleId", requestBody.scheduleId )

        const { data } = await axiosInstance.post(
            `/depot/payment-evidence`,
            formData,
            config
        )
        return data
    }

    return useMutation<PaymentEvidenceUpload, AxiosError, { file: File, scheduleId: string }>(
        ["uploadPaymentEvidence"],
        (requestBody: { file: File, scheduleId: string }) => uploadPaymentEvidence(requestBody),
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

function useRateOperative() {
    const {
        state: { jwt },
    } = useAuthContext();
    const axiosInstance = useAxiosInstance()

    const rateOperative = async (requestBody: RateOperativeRequest) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${jwt?.token}`,
            },
        };
        const { data } = await axiosInstance.post("/rating/operative", requestBody, config);

        return data;
    };

    return useMutation<RateOperativeResponse, AxiosError, RateOperativeRequest>(
        ["RateOperativeRequest"],
        (requestBody: RateOperativeRequest) => rateOperative(requestBody),
        {
            onSuccess: (data) => {
                showNotification({
                    title: "Success",
                    message: data.message,
                    color: "green",
                });
            },
        },
    );
}


export {
    useGetShiftHistory,
    useGetShiftHistoryByJobListingId,
    useGetSingleSchedule,
    usePaymentEvidenceUpload,
    useGetScheduleByScheduleId,
    useRateOperative,
}
