import useAuth from "./useAuth";
import axios from "../pages/auth/utils";


const UseRefreshToken = ({refreshToken}: any) => {
    const { setAuth } = useAuth();
    
    const refresh = async () => {
        const response = await axios.get('/refresh-token', {
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