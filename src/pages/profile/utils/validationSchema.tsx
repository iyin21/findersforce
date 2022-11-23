import { object, string } from "yup"

const AccountInfoSchema = object().shape({
    password: string().required("Required"),
    firstName: string().required("Required"),
    lastName: string().required("Required"),
    passwordConfirm: string().required("Required"),
})

const LocationInfoSchema = object().shape({
    location: string().required("Required"),
    accountType: string().required("Required"),
    // email: string().required("Required"),
})

export { AccountInfoSchema, LocationInfoSchema }
