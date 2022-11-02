import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { axiosInstance } from "../services/api.service"
import { IDepotRating } from "../types/dashboard/interfaces";

function useRating ({ id }: { id: string }) {
    
    const fetchDepotRating = async (id: string) => {
        const { data } = await axiosInstance.get (`/rating/depot/:631f05557c24da7374b20642/summary`, {
            headers: {
            "Content-Type": "application/json",
                },        
            });
            return data.data;
        };

        return useQuery<string, AxiosError, IDepotRating>(
        ["depotRating", id ], 
        ()  => fetchDepotRating(id),
        {
        onError: (error: AxiosError) => {
            showNotification({
                title: 'Error',
                color: 'red',
                message: error.message,
            });
        },
                });
}

export {useRating}



// import { axiosInstance } from "../../../services/api.service"

// export const getDepotRatings = async ({ id }: {id:string}) => {
//     try {
//         const response = await axiosInstance.get(`/rating/depot/:${id}/summary`);
//         console.log(response.data);
//         return response.data;
        
//     } catch (error) {
//         console.log(error);
//     }
// }