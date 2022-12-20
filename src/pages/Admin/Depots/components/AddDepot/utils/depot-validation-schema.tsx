import { object, string } from "yup"

const PersonalDetailsSchema = object().shape({
    phoneNumber: string().required("Required"),
    email: string().required("Required"),
    companyEmail: string().required("Required"),
    companyName: string().required("Required"),
    logo: string().required("Required"),
    address: string().required("Required"),
    // subscription_plan: string().required("Required"),
    num_of_locations: string().required("Required"),
    // trial_period: string().required("Required"),
})

const QualificationSchema = object().shape({
    qualification_category: string().required("Required"),
    findersforce_depot_amount: string().required("Required"),
    findersforce_meet_amount: string().required("Required"),
    operative_depot_amount: string().required("Required"),
    operative_meet_amount: string().required("Required"),
})

export { PersonalDetailsSchema, QualificationSchema }
