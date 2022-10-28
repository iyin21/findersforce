import { axiosInstance } from "@services/api.service";
import { showNotification } from '@mantine/notifications';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useQuery, useMutation } from "react-query";
import { ApplicationResponse } from "../interface";
//import { BidDetailsResponse, BidRequest, BidResponse, BidActivitiesResponse } from "./interface";
interface ApplicationRequest{
    status: string;
    page:number
}
function useGetApplications({status,page}:ApplicationRequest){
    const getApplications=async()=>{
        const {data} =await axiosInstance.get("/applications", {
            params:{status, page},
            headers: {
                Authorization: `Bearer`,
            },
        });
        return data.data;
    };

    return useQuery<ApplicationRequest, AxiosError, ApplicationResponse["data"]>(
        ["applications", { status, page }],
        getApplications,

        {
            // initialData:{page, status, commodity},
            onError: (err) => {
                showNotification({
                    title: "Error",
                    message:  err.message,
                    color: "red",
                });
            },
        },
    );

    }

    function useGetApplicationDetails({ id }: { id: string }){
        const getApplicationDetails=async()=>{
            const {data} =await axiosInstance.get(`/applications/${id}`, {
                
                headers: {
                    Authorization: `Bearer`,
                },
            });
            return data.data;
        };
    
        return useQuery<unknown, AxiosError, ApplicationResponse["data"]>(
            ["applicationDetails", id],
            getApplicationDetails,
    
            {
                // initialData:{page, status, commodity},
                onError: (err) => {
                    showNotification({
                        title: "Error",
                        message:  err.message,
                        color: "red",
                    });
                },
            },
        );
    
        }   
export { useGetApplications, useGetApplicationDetails};