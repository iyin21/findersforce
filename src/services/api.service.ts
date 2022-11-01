import axios from "axios"

export const axiosInstance = axios.create({
            baseURL: "https://findersforce-api.workcube.com.ng/api/v1",
            headers: {
              "Content-Type": "application/json",
            },
        });