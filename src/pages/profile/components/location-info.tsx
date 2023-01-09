import { useFormikContext } from "formik"
import { useState } from "react"
import { GoogleAutoComplete, RadioButton } from "../../../components"
import { ReactMultiEmail } from "react-multi-email"
import "react-multi-email/dist/style.css"

const LocationInfo = () => {
    const { setFieldValue, values, errors } = useFormikContext<{
        accountType: string
        email: string
    }>()

    const [emails, setEmails] = useState<string[]>([])

    const handleChecked = (value: string) => {
        setFieldValue("accountType", value)
    }

    return (
        <div className="font-creato">
            <GoogleAutoComplete fieldName="regionAddress" />
            <div className="mt-8">
                <label className="text-3md font-semibold text-neutral-80 block mb-2">
                    Select Access
                </label>
                <div className="flex items-center gap-10 mt-4">
                    <RadioButton
                        label="Depot Manager"
                        id="regional_manger"
                        name="accountType"
                        checked={
                            values?.accountType === "REGIONAL-MANAGER"
                                ? true
                                : false
                        }
                        onChange={() => handleChecked("REGIONAL-MANAGER")}
                        value={values.accountType}
                    />
                    <RadioButton
                        label="Shift Manager"
                        id="shift_manager"
                        name="accountType"
                        checked={
                            values?.accountType === "SHIFT-MANAGER"
                                ? true
                                : false
                        }
                        onChange={() => handleChecked("SHIFT-MANAGER")}
                        value={values?.accountType}
                    />
                </div>
            </div>
            <div className="mt-6">
                <div className="mb-2">
                    <label className="text-3md font-semibold text-neutral-80 block">
                        Invite Manager(s)
                    </label>
                    <span className="text-md text-black-40">
                        Separate email addresses with a comma.
                    </span>
                </div>

                <ReactMultiEmail
                    placeholder="Enter email address"
                    emails={emails}
                    onChange={(_emails: string[]) => {
                        setEmails(_emails)
                        setFieldValue("email", _emails)
                    }}
                    getLabel={(email, index, removeEmail) => {
                        return (
                            <div data-tag key={index}>
                                <div data-tag-item>{email}</div>
                                <span
                                    data-tag-handle
                                    onClick={() => removeEmail(index)}
                                >
                                    ×
                                </span>
                            </div>
                        )
                    }}
                />

                {errors?.email && (
                    <div className="flex items-center gap-2 mt-4 px-2 md:p-4 rounded-md bg-red-10 border-l-4 border-red-100">
                        <p className=" text-sm md:text-lg">
                            Please insert an email
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LocationInfo
