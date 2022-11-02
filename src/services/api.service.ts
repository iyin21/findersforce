import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://findersforce-api.workcube.com.ng/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

