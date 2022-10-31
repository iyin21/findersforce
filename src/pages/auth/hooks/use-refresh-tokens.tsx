import useAuthContext from "./useAuth";
import axios from "../utils";


const UseRefreshToken = ({refreshToken}: any) => {
    const { state, dispatch} = useAuthContext();
    
    const refresh = async () => {
        const response = await axios.get('/refresh-token', {
            withCredentials: true,
            headers: {'Cookie': `refreshToken=${refreshToken}`}
        });
        dispatch ({
            type: "UPDATE_USER_DATA",
                    payload: {
                        user: state?.user,
                        jwt: response.data.data.jwt,
                    },
        })
        
        return response.data.data.jwt.token;
    }

    
    return refresh
}

export default UseRefreshToken;