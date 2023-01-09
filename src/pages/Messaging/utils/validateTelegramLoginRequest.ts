import { object, string } from "yup"

export const validateTelegramLoginRequest = object().shape({
    phoneNumber: string()
        .required("Phone number is required")
        .test(
            "Check prefix",
            "Please include the country code in your phone number",
            (value) => (value && value.startsWith("+")) || false
        ),
})
export const validateTelegramSigninRequest = object().shape({
    code: string()
        .required("Code is required")
        .min(5, "Please input the correct code"),
})
