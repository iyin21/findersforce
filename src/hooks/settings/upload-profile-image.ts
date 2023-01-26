import { showNotification } from "@mantine/notifications"
import { useAuthContext } from "../../pages/auth/context/authContext"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosRequestConfig } from "axios"
import useAxiosInstance from "../../services/useAxiosInstance"

interface profileImageSucessResponse {
    status: string
    message: string
    data: {
        _id: string
        username: string
        firstName: string
        lastName: string
        email: string
        accountType: string
        verified: boolean
        banned: boolean
        createdAt: Date
        updatedAt: Date
        __v: 0
        gender: "male"
        profileImageUrl: string
    }
}

function useProfileImageUpload() {
    const { state } = useAuthContext()
    const axiosInstance = useAxiosInstance()

    const uploadPaymentEvidence = async (requestBody: { file: File }) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${state?.jwt?.token}`,
                "content-type": "multipart/formdata",
            },
        }

        const formData = new FormData()
        formData.append("profileImage", requestBody.file)

        const { data } = await axiosInstance.patch(
            `/user/profile/image`,
            formData,
            config
        )
        return data
    }

    return useMutation<profileImageSucessResponse, AxiosError, { file: File }>(
        ["uploadProfileImage"],
        (requestBody: { file: File }) => uploadPaymentEvidence(requestBody),
        {
            onSuccess: (response) => {
                showNotification({
                    message: response.message || "Profile image updated successfully",
                    title: "Success",
                    color: "green",
                })
            },
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

export default useProfileImageUpload
