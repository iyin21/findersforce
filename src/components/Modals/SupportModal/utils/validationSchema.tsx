import { object, string, array } from "yup";

export const validationSchema= object().shape({
    emailAddress: string().required("Required"),
    complaintCategory: string().required("Required"),
    complaintIssue:array().min(1, 'You have to pick at least one issue.').required('You have to pick at least one issue.'),
    description: string().required("Required")
})