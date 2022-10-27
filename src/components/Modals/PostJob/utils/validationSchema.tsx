import { object, string } from "yup"

const PostJobOneSchema = object().shape({
    shift_type: string().required("Required"),
    location: string().required("Required"),
    shift_mode: string().required("Please select an option"),
    date: string().required("Required"),
    from: string().required("Required"),
    to: string().required("Required"),
})

const PostJobTwoSchema = object().shape({
    required_qualification: string().required("Required"),
    num_of_operatives: string().required("Required"),
    hourly_pay: string().required("Required"),
    description: string().required("Required"),
})

export { PostJobOneSchema, PostJobTwoSchema }
