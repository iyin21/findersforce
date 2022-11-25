import { useFormikContext } from "formik"
import { useState } from "react"
import TagsInput from "react-tagsinput"
import { GoogleAutoComplete, RadioButton } from "../../../components"

const LocationInfo = () => {
    const [emails, setEmails] = useState<any[]>([])

    const handleChecked = (value: string) => {
        setFieldValue("accountType", value)
    }
    const { setFieldValue, values, errors } = useFormikContext<{
        accountType: string
        email: string
    }>()
    const handleEmailChange = (tags: any[]) => {
        setEmails(tags)
    }

    return (
        <div>
            <GoogleAutoComplete fieldName="regionAddress" />
            <div className="mt-8">
                <label className="text-3md font-semibold text-neutral-80 block mb-2">
                    Select user type to add
                </label>
                <div className="flex items-center gap-10 mt-4">
                    <RadioButton
                        label="Regional Manager"
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
                <label className="text-3md font-semibold mb-3 text-neutral-80 block">
                    Email
                </label>

                <TagsInput
                    value={emails}
                    onChange={(tags) => {
                        handleEmailChange(tags)
                        setFieldValue("email", tags)
                    }}
                    inputProps={{
                        placeholder: "Email address",
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
