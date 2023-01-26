import HQProfileSummary from "../../../../pages/profile/components/summary"
import LocationInfo from "../components/location-info"
import { LocationInfoSchema } from "./validationSchema"

const ManagerFormFields = [
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

export default ManagerFormFields