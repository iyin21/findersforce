import { object, string } from "yup"

export const createJobRateValidationSchema = object().shape({
    jobRateDepotFirstDisplayedToDepot: string().required("Required"),
    jobRateDepotFirstDisplayedToOp: string().required("Required"),
    jobRateMeetOnsiteDisplayedToDepot: string().required("Required"),
    jobRateMeetOnsiteDisplayedToOp: string().required("Required"),
    jobQualificationId: string().required("Required"),
})
