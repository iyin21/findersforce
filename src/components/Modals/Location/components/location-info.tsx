import { useFormikContext } from "formik"
import { useState } from "react"
import GoogleAutoComplete from "../../../GoogleAutoComplete/index"
import Button from "../../../Core/Buttons/Button"
import { ReactMultiEmail } from "react-multi-email"
import "react-multi-email/dist/style.css"

const LocationInfo = () => {
    const { setFieldValue, errors, values } = useFormikContext<{
        accountType: string
        shift_manager: string[]
        regional_manager: string[]
        email: string
        regionAddress: string
    }>()

    const [shiftEmails, setShiftEmails] = useState<string[]>([])
    const [regionalEmails, setRegionalEmails] = useState<string[]>([])

    const handleAddLocationToSessionStorage = () => {
        const locationArray: any =
            window.sessionStorage.getItem("locationArray")

        if (locationArray === null || locationArray === 0) {
            const newLocation = [
                {
                    regionAddress: values.regionAddress,
                    shift_manager: values.shift_manager,
                    regional_manager: values.regional_manager,
                },
            ]
            window.sessionStorage.setItem(
                "locationArray",
                JSON.stringify(newLocation)
            )
        } else {
            const newLocationArray = JSON.parse(locationArray)
            window.sessionStorage.setItem(
                "locationArray",
                JSON.stringify([
                    ...newLocationArray,
                    {
                        regionAddress: values.regionAddress,
                        shift_manager: values.shift_manager,
                        regional_manager: values.regional_manager,
                    },
                ])
            )
        }
    }

    return (
        <div className="font-creato">
            <GoogleAutoComplete
                fieldName="regionAddress"
                title="Enter Location"
            />

            <div className="mt-6">
                <div className="mb-2">
                <label className="text-3md font-semibold text-neutral-80 block">
                        Add Depot Manager(s)
                    </label>
                    <span className="text-md text-black-40">
                        Separate email addresses with a comma ( , ).
                    </span>
                </div>

                <ReactMultiEmail
                    placeholder="Enter email address"
                    emails={regionalEmails}
                    onChange={(regionalEmails: string[]) => {
                        setRegionalEmails(regionalEmails)
                        setFieldValue("regional_manager", regionalEmails)
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
                    onDisabled={() => {
                        regionalEmails.length <= 2
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
            <div className="mt-6">
                <div className="mb-2">
                    <label className="text-3md font-semibold text-neutral-80 block">
                        Add Shift Manager(s)
                    </label>
                    <span className="text-md text-black-40">
                        Separate email addresses with a comma ( , ).
                    </span>
                </div>

                <ReactMultiEmail
                    placeholder="Enter email address"
                    emails={shiftEmails}
                    onChange={(shiftEmails: string[]) => {
                        setShiftEmails(shiftEmails)
                        setFieldValue("shift_manager", shiftEmails)
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

            <Button
                size="normal"
                className="w-full mt-16"
                variant="primary"
                type="submit"
                style={{
                    backgroundColor: "rgba(254, 215, 10, 1)",
                }}
                onClick={() => {
                    handleAddLocationToSessionStorage()
                   
                }}
            >
                Next
            </Button>
        </div>
    )
}

export default LocationInfo
