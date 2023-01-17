import React, { MutableRefObject } from "react"
import { TextInput, Alert, PasswordInput, Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import LandingPageText from "../../components/Layout/landing-page-txt"
import Button from "../../components/Core/Buttons/Button"
import { useSearchParams } from "react-router-dom"
import { emailInputStyle, passwordInputStyle } from "../auth/utils"
import logo from "../../assets/FF-logo.svg"
import setProfile from "../../hooks/profile/set-profile"
import locationIcon from "../../assets/location.svg"
import { SuccessfulLogin } from "../../components"
import {
    getStrength,
    PasswordRequirement,
    requirements,
} from "./utils/passwordRequirement"
import HQProfile from "./hq-profile"
import { selectData } from "./utils/subscriptionSelectData"
import videoBg from "../../assets/videoBg.mp4"

const Profile = () => {
    const [searchParams] = useSearchParams()

    return (
        <div>
            {searchParams.get("accountType") === "HQ-MANAGER" ? (
                <HQProfile />
            ) : (
                <RMProfile />
            )}
        </div>
    )
}

export default Profile

const RMProfile = () => {
    const [opened, setOpened] = React.useState(false)
    const [selectValue, setSelectValue] = React.useState<string | null>("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [errorText, showErrorText] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")
    const [error, showError] = React.useState(false)
    const userRef = React.useRef<HTMLInputElement>(
        null
    ) as MutableRefObject<HTMLInputElement>

    const profileForm = useForm({
        initialValues: {
            firstName: "",
            password: "",
            confirmPassword: "",
            lastName: "",
            courseLink: "",
        },

        validate: {
            confirmPassword: (value, values) =>
                value !== values.password ? (
                    <span className="text-sm">Passwords did not match</span>
                ) : null,
        },
    })

    const password = profileForm.values.password

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(password)}
        />
    ))

    const strength = getStrength(password)

    const [searchParams] = useSearchParams()

    const inviteCode = searchParams.get("code") ?? " "
    const address = searchParams.get("address") ?? " "
    const accountType = searchParams.get("accountType") ?? " "

    const handleProfileSetUp = ({
        password,
        confirmPassword,
        firstName,
        lastName,
        courseLink,
    }: {
        password: string
        confirmPassword: string
        firstName: string
        lastName: string
        courseLink: string
    }) => {
        if (strength === 100) {
            showErrorText(false)
            setIsSubmitting(true)
            setProfile(
                password,
                confirmPassword,
                inviteCode,
                opened,
                firstName,
                lastName,
                accountType,
                selectValue,
                setIsSubmitting,
                setErrorMsg,
                showError,
                setOpened,
                courseLink
            )
        } else showErrorText(true)
    }

    return (
        <div>
            <video
                autoPlay
                loop
                muted
                id="video"
                className="hidden md:block h-screen w-full object-cover fixed"
                src={videoBg}
            ></video>
            <div className="grid grid-cols-1 lg:grid-cols-2 text-white h-fit lg:bg-black-60 font-creato lg:absolute lg:top-0">
                <div className="hidden lg:block">
                    {" "}
                    <LandingPageText />
                </div>
                <div className="md:my-8 lg:mr-8 bg-white-100 pt-12 px-6 md:px-16 flex flex-col rounded-[10px]">
                    <div className="block m-auto lg:hidden">
                        <img src={logo} alt="finders force" className="mb-5" />
                    </div>
                    <h1 className="text-black-100 text-3xl font-extrabold">
                        Set up your Profile
                    </h1>
                    <span className="text-black-90 opacity-70 pt-2">
                        Please provide the following information
                    </span>
                    <div className="flex pt-2.5">
                        <img
                            src={locationIcon}
                            alt="location icon"
                            className="w-7 h-7"
                        />
                        <span className="pl-2.5 text-black-60 text-lg">
                            {address}
                        </span>
                    </div>

                    <form
                        onSubmit={profileForm.onSubmit((values) =>
                            handleProfileSetUp(values)
                        )}
                        className="pt-6"
                    >
                        <div className="grid grid-cols-2 gap-4 pt-3.5">
                            <TextInput
                                placeholder="First name"
                                label="First Name"
                                id="firstName"
                                withAsterisk
                                required
                                size="md"
                                onFocusCapture={() => {
                                    showErrorText(false)
                                    showError(false)
                                }}
                                ref={userRef}
                                {...profileForm.getInputProps("firstName")}
                                styles={() => emailInputStyle}
                            />
                            <TextInput
                                placeholder="Last name"
                                id="lastName"
                                label="Last Name"
                                required
                                withAsterisk
                                size="md"
                                onFocusCapture={() => {
                                    showErrorText(false)
                                    showError(false)
                                }}
                                {...profileForm.getInputProps("lastName")}
                                styles={() => emailInputStyle}
                            />
                        </div>
                        {accountType === "REGIONAL-MANAGER" && (
                            <TextInput
                                placeholder="Provide your video link"
                                label="Depot Video Link"
                                aria-label="Depot Video Link"
                                id="courseLink"
                                type="text"
                                withAsterisk
                                required
                                size="md"
                                ref={userRef}
                                onFocusCapture={() => {
                                    showErrorText(false)
                                    showError(false)
                                }}
                                {...profileForm.getInputProps("courseLink")}
                                styles={() => emailInputStyle}
                            />
                        )}
                        <Select
                            label="Choose subscription plan"
                            placeholder="Pick one"
                            value={selectValue}
                            onChange={setSelectValue}
                            required
                            data={selectData}
                            styles={() => emailInputStyle}
                        />
                        <div
                            onFocusCapture={() => {
                                showErrorText(false)
                                showError(false)
                            }}
                        >
                            <PasswordInput
                                placeholder="password"
                                label="Create password"
                                withAsterisk
                                radius="md"
                                size="xl"
                                required
                                {...profileForm.getInputProps("password")}
                                styles={() => emailInputStyle}
                            />
                        </div>
                        <div className="rounded bg-black-2 p-5">
                            <span className="text-[#132013] font-medium text-[14px]">
                                Your password should contain:
                            </span>
                            <PasswordRequirement
                                label="Includes at least 8 characters"
                                meets={password.length >= 8}
                            />
                            {checks}
                        </div>
                        <div className="mb-7" />
                        <div
                            onFocusCapture={() => {
                                showErrorText(false)
                                showError(false)
                            }}
                        >
                            <PasswordInput
                                placeholder="password"
                                label="Confirm password"
                                withAsterisk
                                radius="md"
                                size="xl"
                                required
                                {...profileForm.getInputProps(
                                    "confirmPassword"
                                )}
                                styles={() => passwordInputStyle}
                            />
                        </div>
                        {errorText && (
                            <span className="text-[14px] text-[#f01e2c]">
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
                                {errorMsg}
                            </Alert>
                        )}
                        <div
                            className="mb-[25px]"
                            onClick={() => {
                                profileForm.setFieldValue("password", password)
                            }}
                        >
                            <Button
                                variant="primary"
                                type="submit"
                                style={
                                    !isSubmitting
                                        ? {
                                              backgroundColor:
                                                  "rgba(254, 215, 10, 1)",
                                          }
                                        : {
                                              backgroundColor:
                                                  "rgba(254, 215, 10, 1)",
                                              opacity: "0.7",
                                          }
                                }
                                className="text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                            >
                                {!isSubmitting ? "Proceed" : "Loading..."}
                            </Button>
                        </div>
                    </form>
                </div>
                {opened && (
                    <SuccessfulLogin opened={opened} setOpened={setOpened} />
                )}
            </div>
        </div>
    )
}

// export default RMProfile
