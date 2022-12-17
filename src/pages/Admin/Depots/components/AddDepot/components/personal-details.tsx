import { GoogleAutoComplete } from "../../../../../../components"
import { useFormikContext } from "formik"
import FormikControls from "../../../../../../components/Form/FormControls/form-controls"
// import { Switch } from "@mantine/core"
import { useEffect, useRef, useState } from "react"
import AvatarIcon from "../../../../../../assets/ProfileImage.svg"
import AvatarUploadIcon from "../../../../../../assets/upload.svg"

const PersonalDetails = () => {
    const { setFieldValue, values } = useFormikContext<{
        subscription_plan: string
        logo: string
    }>()
    // const [checked, setChecked] = useState(false)
    const ref = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<string>("")

    // const subscriptionPlan = ["Entry", "Pro", "Elite", "Enterprice"]

    // const handleSwitch = () => {
    //     setChecked(!checked)
    //     setFieldValue("trial_period", checked ? "true" : "false")
    // }
    function uploadSingleFile(e: any) {
        if (!e.target.files || e.target.files.length === 0) {
            setFile("")
            return
        }
        setFile(e.target.files[0])
    }

    useEffect(() => {
        if (!file) {
            setFile("")
            return
        }

        // @ts-ignore
        const objectUrl = URL.createObjectURL(file)
        setFieldValue("logo", objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    return (
        <div className="py-3 lg:w-[50%]">
            <h6 className="font-creatoLight text-lg text-black-60">
                HQ Manager Information
            </h6>
            <div className="py-6">
                <div>
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        Phone number (Optional)
                    </label>
                    <FormikControls
                        type="text"
                        name="phoneNumber"
                        control="input"
                        placeholder="Phone number (Optional)"
                        aria-label="Phone number (Optional)"
                        required
                        className="rounded"
                        data-testid="phoneNumber"
                    />
                </div>
                <div className="mt-4">
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        Email
                    </label>
                    <FormikControls
                        type="text"
                        name="personal_email"
                        control="input"
                        placeholder="Email"
                        aria-label="Email"
                        required
                        className="rounded"
                        data-testid="personal_email"
                    />
                </div>
                <div className="py-5">
                    <h6 className="font-creatoLight text-lg text-black-60">
                        Business Information
                    </h6>

                    <div className="mt-4">
                        <label className="text-3md text-neutral-80 block mb-2 font-creato">
                            Upload business logo
                        </label>
                        <div
                            className="rounded-full bg-yellow-100 w-fit p-3 relative"
                            onClick={() => {
                                ref.current?.click()
                            }}
                        >
                            <img
                                src={values?.logo || AvatarIcon}
                                alt="logo"
                                width={80}
                                className="rounded-full min-h-[80px] min-w-[80px] object-cover"
                            />
                            <img
                                src={AvatarUploadIcon}
                                alt=""
                                className="absolute right-1 bottom-0 w-[30px]"
                            />
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => uploadSingleFile(e)}
                            multiple
                            accept="image/png,image/jpeg"
                            ref={ref}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="text-3md font-semibold text-neutral-80 block mb-2">
                            Depot name
                        </label>
                        <FormikControls
                            type="text"
                            name="companyName"
                            control="input"
                            placeholder="Depot name"
                            aria-label="Depot name"
                            required
                            className="rounded"
                            data-testid="companyName"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-3md font-semibold text-neutral-80 block mb-2">
                            Depot email
                        </label>
                        <FormikControls
                            type="text"
                            name="email"
                            control="input"
                            placeholder="Depot email"
                            aria-label="Depot email"
                            required
                            className="rounded"
                            data-testid="email"
                        />
                    </div>
                    <div className="mt-4">
                        <GoogleAutoComplete
                            fieldName="address"
                            title="Address (Headquater)"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-3md font-semibold text-neutral-80 block mb-2">
                            How many locations do you have?
                        </label>
                        <FormikControls
                            type="text"
                            name="num_of_locations"
                            control="input"
                            placeholder=" How many locations do you have?"
                            aria-label=" How many locations do you have?"
                            required
                            className="rounded"
                            data-testid="num_of_locations"
                        />
                    </div>
                    {/* <div className="mt-4">
                        <label className="text-3md font-semibold text-black-100 block mb-2">
                            Choose subsciption plan
                        </label>
                        <FormikControls
                            control="select"
                            name="subscription_plan"
                            aria-label="Shift type"
                            type="select"
                            className="rounded text-black-50"
                            data-testid="subscription_plan"
                            defaultValue={values?.subscription_plan}
                        >
                            <option>Select an option---</option>
                            {subscriptionPlan?.map((item) => (
                                <option key={item} value={item}>
                                    {" "}
                                    {item}{" "}
                                </option>
                            ))}
                        </FormikControls>
                    </div>
                    <div className="flex justify-between bg-black-5 p-6 rounded-lg mt-6">
                        <div className="flex flex-col">
                            <span className="font-bold text-lg font-creatoMedium">
                                Trial Period
                            </span>
                            <span className=" mt-1 font-creatoLight text-lg text-black-90 leading-4">
                                Activates 30 day discount for this depot
                            </span>
                        </div>
                        <Switch
                            checked={checked}
                            color="green"
                            size="md"
                            onChange={handleSwitch}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails
