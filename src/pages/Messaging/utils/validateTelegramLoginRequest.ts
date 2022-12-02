import { number, object, string } from "yup";

export const validateTelegramLoginRequest = object().shape({
   
    phoneNumber: string().required("required"),
   
});
