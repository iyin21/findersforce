import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../services/api.service"
import { AxiosError, AxiosResponse } from "axios"
import {
    JobBoardByIdResponse,
    JobBoardRequest,
    JobBoardResponse,
    JobBoardResponseInterface,
} from "./interface"
import { showNotification } from "@mantine/notifications"
import { FormikValues } from "formik"
import useAuthContext from "../auth-hooks/useAuth"

// get job listing
function useJobBoards({ isPublished }: JobBoardRequest) {
    const { state } = useAuthContext()

    /** API methods */
    const getJobBoards = async ({ isPublished, signal }: JobBoardRequest) => {
        const { data } = await axiosInstance.get("/job-listing", {
            signal,
            params: { isPublished },
            headers: {
                Authorization: `${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<JobBoardRequest, AxiosError, JobBoardResponse["data"]>(
        ["JobBoards", { isPublished }],
        ({ signal }) => getJobBoards({ isPublished, signal }),
        {
            onError: (err: AxiosError) => {
                showNotification({
                    title: "Error",
                    // @ts-ignore
                    message: err.message || err?.response?.data?.error,
                })
            },
        }
    )
}

// get single job listing by application
function useGetSingleJobApplication({
    jobListing,
}: {
    jobListing: string | undefined
}) {
    const { state } = useAuthContext()

    // /** API methods */
    const getSingleJobApplication = async (jobListing: string | undefined) => {
        const { data } = await axiosInstance.get(`/applications`, {
            params: { jobListing },
            headers: {
                Authorization: `${state?.jwt?.token}`,
            },
        })
        return data
    }

    return useQuery<string, AxiosError, JobBoardResponse["data"]>(
        ["singleJobApplication", jobListing],
        () => getSingleJobApplication(jobListing),
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

// get job types
function useGetJobType() {
    const { state } = useAuthContext()

    /** API methods */
    const getJobType = async () => {
        const { data } = await axiosInstance.get("/job-listing/job-type", {
            headers: {
                Authorization: `${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<string, AxiosError, JobBoardByIdResponse[]>(
        ["JobBoards"],
        ({ signal }) => getJobType(),
        {
            onError: (err) => {
                showNotification({
                    title: "Error",
                    message: err.message,
                    // err.response?.data?.error ||
                })
            },
        }
    )
}

// get job qualification
function useGetJobQualification() {
    const { state } = useAuthContext()

    /** API methods */
    const getJobType = async () => {
        const { data } = await axiosInstance.get(
            "/job-listing/job-qualification",
            {
                headers: {
                    Authorization: `${state?.jwt?.token}`,
                },
            }
        )
        return data.data
    }

    return useQuery<string, AxiosError, JobBoardByIdResponse[]>(
        ["jobQualification"],
        ({ signal }) => getJobType(),
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

// delete job listing
function useDeleteJobList({ id }: { id: string | undefined }) {
    const { state } = useAuthContext()

    /** API methods */
    const deleteJob = async () => {
        const { data } = await axiosInstance.delete(`/job-listing/${id}`, {
            headers: {
                Authorization: `${state?.jwt?.token}`,
            },
        })

        return data
    }
    return useMutation<AxiosResponse, AxiosError>(deleteJob)
}

// get job listing by id
function useGetJobListingById({ id }: { id: string | undefined }) {
    const { state } = useAuthContext()

    // /** API methods */
    const getJobByID = async (id: string | undefined) => {
        const { data } = await axiosInstance.get(`/job-listing/${id}`, {
            headers: {
                Authorization: `${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<string, AxiosError, JobBoardResponseInterface>(
        ["JobByID", id],
        () => getJobByID(id),
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

// create job listing
function useCreateJobList() {
    const { state } = useAuthContext()

    const createJobListRequest = async (values: FormikValues) => {
        const formData: FormikValues = {
            ...values,
        }

        const { data } = await axiosInstance.post(
            "/job-listing/",
            formData,

            {
                signal: new AbortController().signal,
                headers: {
                    Authorization: `${state?.jwt?.token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        )

        return data.data
    }

    return useMutation<any, AxiosError, FormikValues>(
        ["createJobList"],
        (FormikValues) => createJobListRequest(FormikValues),
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

// update job listing
function useUpdateJobList({ id }: { id: string | undefined }) {
    const { state } = useAuthContext()

    const updateJobListRequest = async (values: FormikValues) => {
        const formData: FormikValues = {
            ...values,
        }

        const { data } = await axiosInstance.patch(
            `/job-listing/${id}`,
            formData,
            {
                signal: new AbortController().signal,
                headers: {
                    Authorization: `${state?.jwt?.token}`,
                },
            }
        )

        return data.data
    }

    return useMutation<any, AxiosError, FormikValues>(
        ["updateJobList", id],
        (FormikValues) => updateJobListRequest(FormikValues),
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

export {
    useJobBoards,
    useDeleteJobList,
    useGetJobListingById,
    useGetJobType,
    useGetJobQualification,
    useCreateJobList,
    useGetSingleJobApplication,
    useUpdateJobList,
}
