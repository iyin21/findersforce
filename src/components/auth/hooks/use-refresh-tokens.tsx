import useAuth from "./useAuth";
import axios from "../utils";
import { authType } from "../context/authContext";
import React from "react";

const UseRefreshToken = ({refreshToken}: any) => {
    const { setAuth } = useAuth();
    
    const refresh = async () => {
        const response = await axios.get('/auth/refresh-token', {
            withCredentials: true,
            headers: {'Cookie': `refreshToken=${refreshToken}`}
        });
        setAuth((prev) => {
            console.log(response.data.data.jwt.accessToken);
            return { ...prev, accessToken: response.data.data.jwt.token }
        });
        return response.data.data.jwt.token;
    }

    
    return refresh
}

export default UseRefreshToken;