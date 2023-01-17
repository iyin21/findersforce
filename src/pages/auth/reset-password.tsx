import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import { PasswordInput, Alert } from "@mantine/core"
import LandingPageText from "../../components/Layout/landing-page-txt"
import backIcon from "../../assets/backIcon.svg"
import Button from "../../components/Core/Buttons/Button"
import successIcon from "../../assets/success.svg"
import { useForm } from "@mantine/form"
import logo from "../../assets/FF-logo.svg"
import passwordLock from "../../assets/password-lock.svg"
import useResetPassword from "../../hooks/auth-hooks/use-reset-password"
import videoBg from "../../assets/videoBg.mp4"

const ResetPassword = () => {
    const [passwordChanged, setPasswordChanged] = React.useState(false)
    const [error, showError] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")
    const location = useLocation()

    const resetPasswordForm = useForm({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },

        validate: {
            confirmPassword: (value, values) =>
                value !== values.newPassword ? (
                    <span className="text-[14px]">Passwords did not match</span>
                ) : null,
        },
    })

    const resetPassword = ({
        newPassword,
        confirmPassword,
    }: {
        newPassword: string
        confirmPassword: string
    }) => {
        setIsSubmitting(true)
        useResetPassword(
            newPassword,
            confirmPassword,
            location,
            setPasswordChanged,
            setErrorMsg,
            showError,
            setIsSubmitting,
            passwordChanged
        )
    }

    return (
        <>
        <video
                autoPlay
                loop
                muted
                id="video"
                className="hidden md:block h-screen w-full object-cover fixed"
                src={videoBg}
            ></video>
        <div className="grid grid-cols-1 lg:grid-cols-2 text-white font-creato lg:bg-black-60 lg:absolute lg:top-0">
            <div className="hidden lg:block">
                <LandingPageText />
            </div>
            <div className="my-8 md:mr-8 bg-white-100 md:pt-12 px-6 md:px-16 flex flex-col rounded-[10px]">
                {!passwordChanged ? (
                    <>
                        <div className="hidden lg:block bg-black-10 w-fit h-fit rounded mb-8">
                            <NavLink to="/verify-email">
                                <img
                                    src={backIcon}
                                    alt="back button"
                                    className="p-2.5"
                                />
                            </NavLink>
                        </div>
                        <div className="block m-auto lg:hidden">
                            <img
                                src={logo}
                                alt="finders force logo"
                                className="pb-4"
                            />
                        </div>
                        <h1 className="font-extrabold text-black-100 text-[36px] pt-4 m-0">
                            Reset Password
                        </h1>
                        <span className="text-base pt-2.5 text-[#132013] opacity-80 font-normal">
                            Your new password must be different from the old
                            one.
                        </span>

                        <form
                            className="pt-8"
                            onSubmit={resetPasswordForm.onSubmit((values) =>
                                resetPassword(values)
                            )}
                        >
                            <PasswordInput
                                placeholder="new password"
                                label="Enter new password"
                                withAsterisk
                                required
                                radius="md"
                                size="xl"
                                {...resetPasswordForm.getInputProps(
                                    "newPassword"
                                )}
                                styles={() => ({
                                    innerInput: {
                                        color: "rgba(15, 13, 0, 0.8)",
                                        fontSize: "16px",
                                        paddingTop: "7px",
                                        backgroundColor: "#FAFAFA",
                                        "&::placeholder": {
                                            color: "rgba(15, 13, 0, 0.3)",
                                            fontSize: "16px",
                                            lineHeight: "19px",
                                        },
                                    },
                                    input: {
                                        border: "1px solid rgba(15, 13, 0, 0.1)",
                                        height: "64px",
                                        marginBottom: "11px",
                                        borderRadius: "10px",
                                        paddingLeft: "25px",
                                    },
                                    label: {
                                        color: "#0F0D00",
                                        fontSize: "16px",
                                        fontWeight: "700",
                                    },
                                })}
                            />

                            <PasswordInput
                                placeholder="new password"
                                label="Confirm password"
                                withAsterisk
                                required
                                radius="md"
                                size="xl"
                                {...resetPasswordForm.getInputProps(
                                    "confirmPassword"
                                )}
                                styles={() => ({
                                    innerInput: {
                                        color: "rgba(15, 13, 0, 0.8)",
                                        fontSize: "16px",
                                        paddingTop: "7px",
                                        backgroundColor: "#FAFAFA",
                                        "&::placeholder": {
                                            color: "rgba(15, 13, 0, 0.3)",
                                            fontSize: "16px",
                                            lineHeight: "19px",
                                        },
                                    },
                                    input: {
                                        border: "1px solid rgba(15, 13, 0, 0.1)",
                                        height: "64px",
                                        marginBottom: "32px",
                                        borderRadius: "10px",
                                        paddingLeft: "25px",
                                    },
                                    label: {
                                        color: "#0F0D00",
                                        fontSize: "16px",
                                        fontWeight: "700",
                                        paddingTop: "20px",
                                    },
                                })}
                            />

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
                                {!isSubmitting
                                    ? "Reset password"
                                    : "Loading..."}
                            </Button>
                        </form>
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
                    </>
                ) : (
                    <>
                        <h1 className="pt-60 text-3.5xl font-[800] text-black-1">
                            Password changed
                        </h1>
                        <span className="pt-2 text-black-100 opacity-60 text-base">
                            Your password has been changed successfully
                        </span>
                        <figure className="self-center mt-8 block lg:hidden">
                            <img
                                src={passwordLock}
                                alt="password successfully changed"
                            />
                        </figure>
                        <figure className="hidden lg:block lg:self-center lg:mt-8">
                            <img
                                src={successIcon}
                                alt="password successfully changed"
                            />
                        </figure>
                        <NavLink to="/login">
                            <Button
                                style={{
                                    backgroundColor: "rgba(254, 215, 10, 1)",
                                }}
                                className="text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                            >
                                Back to login
                            </Button>
                        </NavLink>
                    </>
                )}
            </div>
        </div>
        </>
    )
}

export default ResetPassword
