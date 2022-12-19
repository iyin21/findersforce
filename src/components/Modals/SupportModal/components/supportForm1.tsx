import FormikControls from "../../../../components/Form/FormControls/form-controls"
import { useFormikContext } from "formik"
import Checkbox from "../../../Core/Checkbox/checkbox"
import { useState } from "react"

const SupportForm1 = () => {
    const { setFieldValue } = useFormikContext<{
        emailAddress: string
        complaintCategory: string
        complaintIssue: string
        description: string
    }>()
    const [checkedComplaint, setCheckedComplaint] = useState<string[]>([])

    const complaintIssues = [
        "Violence",
        "Foul Language",
        "Verbal Abuse",
        "Bullying",
        "Rude",
        "Unsupporting/Unhelpful",
        "Inappropriate Behaviour",
        "Disrespectful",
        "Equipment/Paperwork",
        "Messy/Dirty",
        "Not Working/Broken",
        "Unclear/Vague",
        " Unsuitable/Outdated",
    ]

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedComplaint([...checkedComplaint, value])
            setFieldValue("complaintIssue", [...checkedComplaint, value])
        } else {
            setCheckedComplaint(
                checkedComplaint.filter((item) => item !== value)
            )
            setFieldValue(
                "complaintIssue",
                checkedComplaint.filter((item) => item !== value)
            )
        }
    }

    return (
        <div className="px-4">
            <div className="w-full ">
                <label
                    htmlFor="emailAddress"
                    className="text-md md:text-3md mb-2 block text-3md font-semibold"
                >
                    Email Address
                </label>
                <FormikControls
                    control="input"
                    name="emailAddress"
                    // type="text"
                    className="rounded bg-white-100"
                    disabled
                    // defaultValue={values.emailAddress}
                />
            </div>
            <div className="w-full mt-4">
                <label
                    htmlFor="complaintCategory"
                    className="text-md md:text-3md mb-2 block text-3md font-semibold"
                >
                    Who/what is the complaint about?
                </label>
                <FormikControls
                    control="input"
                    name="complaintCategory"
                    type="text"
                    // placeholder="Select an option--"
                    className="rounded"
                    aria-label="Who/what is the complaint about?"
                    id="complaintCategory"
                />
            </div>
            <div className="w-full mt-4">
                <label
                    htmlFor="complaintIssue"
                    className="text-md md:text-3md mb-2 block text-3md font-semibold"
                >
                    What is the issue?
                </label>
                <div className="grid grid-cols-2">
                    {complaintIssues.map((item) => (
                        <Checkbox
                            key={item}
                            value={item}
                            label={item}
                            id={item}
                            onChange={handleChecked}
                            checked={checkedComplaint.includes(item)}
                        />
                    ))}
                </div>
            </div>
            <div className="w-full">
                <label
                    htmlFor="description"
                    className="text-md md:text-3md mb-2 block text-3md font-semibold mt-4"
                >
                    Description
                </label>
                <FormikControls
                    control="textarea"
                    name="description"
                    type="text"
                    id="description"
                    className="rounded bg-white-100"
                    style={{
                        resize: "none",
                    }}
                />
            </div>
        </div>
    )
}

export default SupportForm1
