import { Alert, PasswordInput } from "@mantine/core"
import { emailInputStyle, passwordInputStyle } from "../../auth/utils"
import { useState } from "react"
import FormikControls from "../../../components/Form/FormControls/form-controls"
import { PasswordRequirement, requirements } from "../utils/passwordRequirement"
import { useFormikContext } from "formik"
import { selectData } from "../utils/subscriptionSelectData"
import { ToolTip } from "../../../components"
import { Link } from "react-router-dom"

const AccountInfo = () => {
    const { setFieldValue, values, errors } = useFormikContext<{
        password: string
        subscriptionPlan: string
    }>()
    // const { setFieldValue, values} = useFormikContext<{
    //     subscriptionPlan: string
    // }>()
    const [errorText, showErrorText] = useState(false)
    const [error, showError] = useState(false)
    // const [selectValue, setSelectValue] = useState<string | null>("");

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(values.password)}
        />
    ))
    return (
        <div className="font-creato">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        First name
                    </label>
                    <FormikControls
                        type="text"
                        name="firstName"
                        control="input"
                        placeholder="First name"
                        aria-label="First name"
                        required
                        className="rounded"
                        data-testid="firstName"
                    />
                </div>
                <div>
                    <label className="text-3md font-semibold text-neutral-80 block mb-2">
                        Last name
                    </label>
                    <FormikControls
                        type="text"
                        name="lastName"
                        control="input"
                        placeholder="Last name"
                        aria-label="Last name"
                        required
                        className="rounded"
                        data-testid="lastName"
                    />
                </div>
            </div>
            <div className="mt-3">
                <label className="text-3md font-semibold text-neutral-80 block mb-2 flex items-center gap-2">
                    Course Link{" "}
                    <ToolTip
                        title="Course Link"
                        description="Insert the link for your Depot Course which Finders
                            Force created with you. It should have been sent to
                            your email within the past 30 days."
                    />
                </label>
                <FormikControls
                    type="text"
                    name="courseLink"
                    control="input"
                    placeholder="Provide link for your depot"
                    aria-label="Course Link"
                    required
                    className="rounded"
                    data-testid="courseLink"
                />
            </div>
            <div className="mt-3"> </div>

            <label className="text-3md font-semibold text-black-100 block mb-2  flex items-center gap-2">
                Choose Subscription plan{" "}
                <ToolTip
                    title="Confirm Subscription Plan"
                    description={
                        <span>
                            Change your plan anytime.{" "}
                            <Link to={"/pricing"} className="text-yellow-100">
                                View pricing plans.
                            </Link>
                        </span>
                    }
                />
            </label>
            <FormikControls
                control="select"
                name="subscriptionPlan"
                aria-label="Choose Subscription plan"
                type="select"
                className="rounded text-black-50"
                data-testid="subscriptionPlan"
                defaultValue={values?.subscriptionPlan}
            >
                <option>Select an option---</option>
                {selectData?.map((item, index) => (
                    <option key={index} value={item?.value}>
                        {" "}
                        {item?.label}{" "}
                    </option>
                ))}
            </FormikControls>
            <div
                onFocusCapture={() => {
                    showErrorText(false)
                    showError(false)
                }}
                className="mt-3"
            >
                <PasswordInput
                    placeholder="password"
                    label="Create password"
                    withAsterisk
                    radius="md"
                    size="xl"
                    required
                    onChange={(e) => {
                        setFieldValue("password", e.target.value)
                    }}
                    styles={() => emailInputStyle}
                />
            </div>
            <div className="rounded bg-black-2 p-5">
                <span className="text-black-70 font-medium text-[14px]">
                    Your password should contain:
                </span>
                <PasswordRequirement
                    label="Includes at least 8 characters"
                    meets={values.password.length >= 8}
                />
                {checks}
            </div>
            <div
                onFocusCapture={() => {
                    showErrorText(false)
                    showError(false)
                }}
                className="mt-3"
            >
                <PasswordInput
                    placeholder="password"
                    label="Confirm password"
                    withAsterisk
                    radius="md"
                    size="xl"
                    required
                    onChange={(e) => {
                        setFieldValue("passwordConfirm", e.target.value)
                    }}
                    styles={() => passwordInputStyle}
                />
            </div>
            {errorText && (
                <span className="text-[14px] text-red-100">
                    Password must meet requirements
                </span>
            )}
            {error && (
                <Alert
                    title="Error!"
                    color="red"
                    styles={() => ({
                        root: { marginBottom: "20px" },
                    })}
                >
                    {errors.password}
                </Alert>
            )}
        </div>
    )
}

export default AccountInfo
