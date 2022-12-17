import PersonalDetails from "../components/personal-details"
import Qualifications from "../components/qualifications"
import Summary from "../components/summary"
import {
    PersonalDetailsSchema,
    QualificationSchema,
} from "./depot-validation-schema"

const DepotFormField = [
    {
        name: "personalInfo",
        validationSchema: PersonalDetailsSchema,
        Component: PersonalDetails,
    },
    {
        name: "Qualification",
        validationSchema: QualificationSchema,
        Component: Qualifications,
    },
    {
        name: "Summary",
        validationSchema: "",
        Component: Summary,
    },
]

export default DepotFormField
