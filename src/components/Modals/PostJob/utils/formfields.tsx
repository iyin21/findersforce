import PostJobOne from "../components/post-job-one"
import PostJobTwo from "../components/post-job-two"
import Summary from "../components/summary"
import { PostJobOneSchema, PostJobTwoSchema } from "./validationSchema"

const JobFormFields = [
    {
        name: "PostJobOne",
        validationSchema: PostJobOneSchema,
        Component: PostJobOne,
    },
    {
        name: "PostJobTwo",
        validationSchema: PostJobTwoSchema,
        Component: PostJobTwo,
    },
    {
        name: "Summary",
        validationSchema: "",
        Component: Summary,
    },
]

export default JobFormFields
