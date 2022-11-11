import SupportForm1 from "../components/supportForm1"
import SupportForm2 from "../components/supportForm2"
import { validationSchema } from "./validationSchema"

const SupportFormSteps = [
    {
        name: "SupportForm1",
        component: SupportForm1,
        validationSchema: validationSchema,
    },
    {
        name: "SupportForm1",
        component: SupportForm2,
        validationSchema: validationSchema,
    },
]

export default SupportFormSteps
