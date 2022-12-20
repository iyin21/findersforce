import { object, string } from "yup"

const PersonalDetailsSchema = object().shape({
    phoneNumber: string().required("Required"),
    // email: string().required("Required"),
    companyEmail: string().required("Required"),
    companyName: string().required("Required"),
    logo: string().required("Required"),
    address: string().required("Required"),
    // subscription_plan: string().required("Required"),
    regionLimit: string().required("Required"),
    // trial_period: string().required("Required"),
})

const QualificationSchema = object().shape({
    jobQualificationId: string().required("Required"),
    jobRateDepotFirstDisplayedToDepot: string().required("Required"),
    jobRateDepotFirstDisplayedToOp: string().required("Required"),
    jobRateMeetOnsiteDisplayedToDepot: string().required("Required"),
    jobRateMeetOnsiteDisplayedToOp: string().required("Required"),
})

export { PersonalDetailsSchema, QualificationSchema }
