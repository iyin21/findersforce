// import { axiosInstance } from "../../../services/api.service"
// import { FormikValues } from "formik"
import AccountInfo from "../components/account-info"
import LocationInfo from "../components/location-info"
import HQProfileSummary from "../components/summary"
import { AccountInfoSchema, LocationInfoSchema } from "./validationSchema"

const ProfileFormFields = [
    {
        name: "AccountInfo",
        validationSchema: AccountInfoSchema,
        Component: AccountInfo,
        // onsubmit: (values: FormikValues) => {
        //     return axiosInstance.post(
        //         "/invitation/accept",
        //         JSON.stringify({
        //             firstName: values.firstName,
        //             lastName: values.lastName,
        //             password: values.password,
        //             passwordConfirm: values.confirmPassword,
        //             inviteCode: values.inviteCode,
        //         }),
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         }
        //     )
        // },
    },
    {
        name: "LocationInfo",
        validationSchema: LocationInfoSchema,
        Component: LocationInfo,
    },
    {
        name: "Profile Summary",
        validationSchema: "",
        Component: HQProfileSummary,
    },
]

export default ProfileFormFields
