import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    withCredentials: true,
    // headers: {
    //     "Content-Type": "application/json",
    // },
})

export default axios.create({
    baseURL: "https://findersforce-api.workcube.com.ng/api/v1/auth",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const axiosPrivate = axios.create({
    baseURL: "https://findersforce-api.workcube.com.ng/api/v1/auth",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})