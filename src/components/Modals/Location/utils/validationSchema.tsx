import { object, string } from "yup"

const LocationInfoSchema = object().shape({
    regionAddress: string().required("Required"),
})

export { LocationInfoSchema }