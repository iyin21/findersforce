import React, { MutableRefObject } from "react"
import { TextInput, Alert, Modal, PasswordInput, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import LandingPageText from "../../components/Layout/landing-page-txt"
import Button from "../../components/Core/Buttons/Button"
import successIcon from "../../assets/check.svg"
import styles from "./profile.module.scss"
import { NavLink, useLocation } from "react-router-dom"
import {
    emailInputStyle,
    mobileEmailInputStyle,
    mobilePasswordInputStyle,
    passwordInputStyle,
} from "../auth/utils"
import { useMediaQuery } from "@mantine/hooks"
import logo from "../../assets/FF-logo.svg"
import { CiLocationOn } from "react-icons/ci"
import setProfile from "../../hooks/profile/use-profile"

const CheckBox = ({ check }: { check: boolean }) => {
    return (
        <div>
            <label className={styles["container"]}>
                <input type="checkbox" checked={check} readOnly />
                <span className={styles["checkmark"]}></span>
            </label>
        </div>
    )
}

const PasswordRequirement = ({
    meets,
    label,
}: {
    meets: boolean
    label: string
}) => {
    return (
        <Text
            color={meets ? "teal" : "red"}
            sx={{ display: "flex", alignItems: "center" }}
            mt={7}
            size="sm"
        >
            {meets ? <CheckBox check={true} /> : <CheckBox check={false} />}{" "}
            <span className="ml-2.5 pt-4">{label}</span>
        </Text>
    )
}

const requirements = [
    { re: /[a-z]/, label: "A Lowercase letter (a)" },
    { re: /[A-Z]/, label: "An Uppercase letter (A)" },
    {
        re: /[$&+,:;=?@#|'<>.^*()%!-]/,
        label: "A special character letter (!@#)",
    },
    { re: /[0-9]/, label: "A number (1)" },
]

const getStrength = (password: string) => {
    let multiplier = password.length > 5 ? 0 : 1

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1
        }
    })

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)
}

const Profile = () => {
    const matches = useMediaQuery("(min-width: 900px)")
    const [opened, setOpened] = React.useState(false)
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

    const location = useLocation()
    const inviteCode = location.search?.split("?")[1]?.split("=")[1].split("&")[0]
    const address = location.search?.split("?")[1]?.split("&")[1].split("=")[1]
    const re = /%20/g
    const formattedAddress = address.replace(re, " ")

    const handleProfileSetUp = ({
        password,
        confirmPassword,
        firstName,
        lastName
    }: {
        password: string
        confirmPassword: string
        firstName: string
        lastName: string
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
                setIsSubmitting,
                setErrorMsg,
                showError,
                setOpened
            )
        } else showErrorText(true)
    }

    return (
        <>
            {matches ? (
                <div className="grid grid-cols-2 text-white h-fit bg-[black]">
                    <LandingPageText />
                    <div className="my-8 mr-8 bg-white-100 pt-12 px-16 flex flex-col rounded-[10px]">
                        <h1 className="text-[#050001] text-[32px] font-extrabold">
                            Set up your Profile
                        </h1>
                        <span className="text-[#0F0D00] opacity-70 pt-2">
                            Please provide the following information
                        </span>
                        <div className="flex pt-2.5">
                            <CiLocationOn
                                style={{ color: "#E94444", fontSize: "25px" }}
                            />
                            <span className="pl-2.5 text-black-60 text-lg">{formattedAddress}</span>
                        </div>

                        <form
                            onSubmit={profileForm.onSubmit((values) =>
                                handleProfileSetUp(values)
                            )}
                            className="pt-6"
                        >
                            <div className="flex justify-between items-center pt-3.5">
                                <TextInput
                                    placeholder="First name"
                                    label="First Name"
                                    id="firstName"
                                    withAsterisk
                                    required
                                    size="md"
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
                                    {...profileForm.getInputProps("lastName")}
                                    styles={() => emailInputStyle}
                                />
                            </div>
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
                                    profileForm.setFieldValue(
                                        "password",
                                        password
                                    )
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
                    <Modal
                        opened={opened}
                        centered
                        withCloseButton={false}
                        onClose={() => setOpened(!opened)}
                        closeOnClickOutside={false}
                        closeOnEscape={false}
                        overlayOpacity={0.55}
                        overlayBlur={3}
                        sx={{
                            borderRadius: "10px",
                            width: "350px",
                            margin: "0 auto",
                        }}
                    >
                        <div className="flex flex-col items-center">
                            <img
                                src={successIcon}
                                alt="success"
                                className="pt-7"
                            ></img>
                            <h1 className="font-extrabold text-[28px] text-[#050001] pt-2">
                                You are all set!
                            </h1>
                            <span className="text-[#0F0D00B2] opacity-70 text-[14px]">
                                Please provide the following information
                            </span>
                            <NavLink to="/login" className="w-[183px] pt-7">
                                <Button
                                    variant="primary"
                                    style={{
                                        backgroundColor:
                                            "rgba(254, 215, 10, 1)",
                                    }}
                                    className="text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                                >
                                    Get In
                                </Button>
                            </NavLink>
                        </div>
                    </Modal>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center mx-5">
                        <img
                            src={logo}
                            alt="finders force logo"
                            className="pt-[17px]"
                        />
                        <h1 className="pt-5 text-black-100 font-extrabold text-2xl self-start">
                            Set up your Profile
                        </h1>
                        <span className="text-black-100 opacity-70 pt-2 text-2md self-start">
                            Please provide the following information
                        </span>
                        <form
                            onSubmit={profileForm.onSubmit((values) =>
                                handleProfileSetUp(values)
                            )}
                            className="pt-5 w-full"
                        >
                            <div
                                onFocusCapture={() => {
                                    showErrorText(false)
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
                                    styles={() => mobileEmailInputStyle}
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
                            <div onFocusCapture={() => showErrorText(false)}>
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
                                    styles={() => mobilePasswordInputStyle}
                                />
                            </div>
                            {errorText && (
                                <span className="text-[14px] text-[#f01e2c]">
                                    Password must meet requirements
                                </span>
                            )}
                            <div
                                className="mb-[25px]"
                                onClick={() => {
                                    profileForm.setFieldValue(
                                        "password",
                                        password
                                    )
                                }}
                            >
                                {error && (
                                    <Alert
                                        title="Error!"
                                        color="red"
                                        styles={() => ({
                                            root: { marginTop: "20px" },
                                        })}
                                    >
                                        {errorMsg}
                                    </Alert>
                                )}
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
                                    className="text-black-100 mt-2 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                                >
                                    {!isSubmitting ? "Proceed" : "Loading..."}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <Modal
                        opened={opened}
                        centered
                        withCloseButton={false}
                        onClose={() => setOpened(!opened)}
                        closeOnClickOutside={false}
                        closeOnEscape={false}
                        overlayOpacity={0.55}
                        overlayBlur={3}
                        sx={{
                            borderRadius: "10px",
                            width: "auto",
                            margin: "0 auto",
                        }}
                    >
                        <div className="flex flex-col items-center">
                            <img
                                src={successIcon}
                                alt="success"
                                className="pt-7"
                            ></img>
                            <h1 className="font-extrabold text-[28px] text-[#050001] pt-2">
                                You are all set!
                            </h1>
                            <span className="text-[#0F0D00B2] opacity-70 text-[14px]">
                                Please provide the following information
                            </span>
                            <NavLink to="/login" className="w-[183px] pt-7">
                                <Button
                                    variant="primary"
                                    style={{
                                        backgroundColor:
                                            "rgba(254, 215, 10, 1)",
                                    }}
                                    className="text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                                >
                                    Get In
                                </Button>
                            </NavLink>
                        </div>
                    </Modal>
                </>
            )}
        </>
    )
}

export default Profile
