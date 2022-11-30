import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    withCredentials: true,
    // headers: {
    //     "Content-Type": "application/json",
    // },
})

export default axios.create({
    baseURL: `${import.meta.env.VITE_BASE_AUTH_URL}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const axiosPrivate = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_AUTH_URL}`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})

export const signupAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    headers: { "Content-Type": "application/json" },
})