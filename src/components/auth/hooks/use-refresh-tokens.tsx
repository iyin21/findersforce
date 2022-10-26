import useAuth from "./useAuth";
import axios from "../utils";
import { authType } from "../context/authContext";
import React from "react";

const UseRefreshToken = ({refreshToken}: any) => {
    const { setAuth } = useAuth();
    const [obj, setObj] = React.useState({
        name: 'timothu',
        age: 50
    })
    const refresh = async () => {
        const response = await axios.get('/auth/refresh-token', {
            withCredentials: true,
            headers: {'Cookie': `refreshToken=${refreshToken}`}
        });
        setAuth((prev) => {
            console.log(response.data.jwt.accessToken);
            return { ...prev, accessToken: response.data.jwt.accessToken }
        });
        return response.data.jwt.accessToken;
    }

    setObj(state => ({...state, age: 54}))
    
    return refresh
}

export default UseRefreshToken;