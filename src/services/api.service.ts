import axios from "axios"

export const axiosBaseInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    withCredentials: true,
})

