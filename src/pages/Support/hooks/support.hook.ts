import { axiosInstance } from "../../../services/api.service"
import { showNotification } from "@mantine/notifications"
import { AxiosError, AxiosRequestConfig } from "axios"
// import { useQuery, useMutation } from "react-query"
import {
    ComplaintResponse,
    UpdateComplaintResponse,
    SingleComplaintResponse,
} from "../types"
import useAuthContext from "../../../hooks/auth-hooks/useAuth"
import { useMutation, useQuery } from "@tanstack/react-query"
// import { FormikValues } from "formik"

interface UpdateComplaintCommentRequest {
    message: string
}
// interface CreateComplaintRequest {
//     complaintCategory: string
//     image?: File | null
//     complaintIssues: string[]
//     description: string
// }

function useGetAllComplaints() {
    const { state } = useAuthContext()
    const getAllComplaints = async () => {
        const { data } = await axiosInstance.get("/complaints", {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data
    }

    return useQuery<unknown, AxiosError, ComplaintResponse>(
        ["allComplaints"],
        getAllComplaints,

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

function useGetComplaints({ status }: { status: string }) {
    // const { auth } =  useAuth()
    // console.log(auth)
    const { state } = useAuthContext()
    const getComplaints = async () => {
        const { data } = await axiosInstance.get("/complaints", {
            params: { status },
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data
    }

    return useQuery<unknown, AxiosError, ComplaintResponse>(
        ["complaints", { status }],
        getComplaints,

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

function useGetSingleComplaint({ id }: { id: string }) {
    const { state } = useAuthContext()
    const getSingleComplaint = async () => {
        const { data } = await axiosInstance.get(`/complaints/${id}`, {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        })
        return data.data
    }

    return useQuery<unknown, AxiosError, SingleComplaintResponse["data"]>(
        ["applications", id],
        getSingleComplaint,

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

function useCreateComplaint() {
    const { state } = useAuthContext()

    const createComplaint = async ({ formData }: { formData: FormData }) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
                // "content-type": "multipart/formdata",
            },
        }
        // const formData = new FormData()

        // complaintIssues?.map((item) =>
        //     formData.append("complaintIssues[]", item)
        // )
        // if(complaintCategory){
        //     formData.append("complaintCategory", complaintCategory)
        // }

        // formData.append("description", description)
        // if (image) {
        //     formData.append("image", image)
        // }

        const { data } = await axiosInstance.post(
            `/complaints`,
            formData,
            config
        )

        return data
    }
    return useMutation<
        SingleComplaintResponse,
        AxiosError,
        { formData: FormData }
    >(
        ["CreateComplaint"],
        ({ formData }) =>
            createComplaint({
                formData,
            }),
        {
            onError: (err) => {
                showNotification({
                    message: err?.message || "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
        }
    )
}

function useUpdateComplaintComment({ id }: { id: string }) {
    const { state } = useAuthContext()

    const updateComplaintComment = async ({
        message,
    }: UpdateComplaintCommentRequest) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
            },
        }
        const { data } = await axiosInstance.post(
            `/complaints/${id}`,
            { message },
            config
        )

        return data
    }
    return useMutation<
        UpdateComplaintResponse,
        AxiosError,
        UpdateComplaintCommentRequest
    >(
        ["UpdateComplaintComment"],
        ({ message }: UpdateComplaintCommentRequest) =>
            updateComplaintComment({ message }),
        {
            onError: (err) => {
                showNotification({
                    message: err?.message || "An error occurred",
                    title: "Error",
                    color: "red",
                })
            },
        }
    )
}

export {
    useGetAllComplaints,
    useGetComplaints,
    useCreateComplaint,
    useGetSingleComplaint,
    useUpdateComplaintComment,
}
