import AccountInfo from "../components/account-info"
import LocationInfo from "../components/location-info"
import HQProfileSummary from "../components/summary"
import { AccountInfoSchema, LocationInfoSchema } from "./validationSchema"

const ProfileFormFields = [
    {
        name: "AccountInfo",
        validationSchema: AccountInfoSchema,
        Component: AccountInfo,
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
