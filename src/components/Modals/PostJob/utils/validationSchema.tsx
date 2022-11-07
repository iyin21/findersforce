import { object, string } from "yup"

const PostJobOneSchema = object().shape({
    jobTypeId: string().required("Required"),
    jobAddress: string().required("Required"),
    jobMeetingPoint: string().required("Please select an option"),
    jobDate: string().required("Required"),
    shiftStartTime: string().required("Required"),
    shiftDurationInHours: string().required("Required"),
})

const PostJobTwoSchema = object().shape({
    jobQualificationId: string().required("Required"),
    numberOfOpsRequired: string().required("Required"),
    jobDescription: string().required("Required"),
})

export { PostJobOneSchema, PostJobTwoSchema }
