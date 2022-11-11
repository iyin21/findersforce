import React, { MutableRefObject } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { TextInput, Alert } from "@mantine/core"
import LandingPageText from "../../components/Layout/landing-page-txt"
import backIcon from "../../assets/backIcon.svg"
import { emailInputStyle } from "./utils"
import { useForm } from "@mantine/form"
import Button from "../../components/Core/Buttons/Button"
import { useMediaQuery } from "@mantine/hooks"
import logo from "../../assets/FF-logo.svg"
import forgotPassword from "../../hooks/auth-hooks/use-forgot-password"

const RecoverPassword = () => {
    const matches = useMediaQuery("(min-width: 900px)")
    const userRef = React.useRef<HTMLInputElement>(
        null
    ) as MutableRefObject<HTMLInputElement>
    const [error, showError] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {
        userRef.current.focus()
    }, [])

    const recoverPasswordForm = useForm({
        initialValues: {
            email: "",
        },

        validate: {
            email: (value) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
                    ? null
                    : "Invalid email",
        },
    })

    const handleSubmit = ({ email }: { email: string }) => {
        setIsSubmitting(true)
        forgotPassword(email, navigate, setIsSubmitting, setErrorMsg, showError)
    }

    return (
        <>
            {matches ? (
                <div className="bg-black-1 grid grid-cols-2 text-white">
                    <LandingPageText />
                    <div className="my-8 mr-8 bg-white-100 pt-[82px] px-16 flex flex-col rounded-[10px]">
                        <div className="bg-black-10 w-fit h-fit rounded">
                            <NavLink to="/login">
                                <img
                                    src={backIcon}
                                    alt="back button"
                                    className="p-2.5"
                                />
                            </NavLink>
                        </div>
                        <h1 className="pt-[34px] text-black-100 font-extrabold text-3.5xl">
                            Forgot Password
                        </h1>
                        <span className="text-2md text-blaq-0 pt-2 pb-[35px] max-w-[439px]">
                            Enter your email address linked to your accout below
                            and we`ll send you an OTP to reset your password.
                        </span>
                        <form
                            onSubmit={recoverPasswordForm.onSubmit((values) =>
                                handleSubmit(values)
                            )}
                        >
                            <TextInput
                                placeholder="example@gmail.com"
                                label="Email Address"
                                withAsterisk
                                required
                                ref={userRef}
                                onFocusCapture={() => showError(false)}
                                {...recoverPasswordForm.getInputProps("email")}
                                styles={() => emailInputStyle}
                            />
                            <br className="mt-[-2px]" />
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
                                styles={() => ({ root: { marginTop: "20px" } })}
                            >
                                {errorMsg}
                            </Alert>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center mx-5">
                    <img
                        src={logo}
                        alt="finders force logo"
                        className="pt-[17px]"
                    />
                    <h1 className="pt-5 text-black-100 font-extrabold text-2xl self-start">
                        Forgot Password
                    </h1>
                    <span className="text-2md text-blaq-0 pt-2 pb-5 text-justify">
                        Enter your email address linked to your accout below and
                        we`ll send you an OTP to reset your password.
                    </span>
                    <form
                        className="w-full"
                        onSubmit={recoverPasswordForm.onSubmit((values) =>
                            handleSubmit(values)
                        )}
                    >
                        <TextInput
                            placeholder="example@gmail.com"
                            label="Email"
                            withAsterisk
                            required
                            ref={userRef}
                            onFocusCapture={() => showError(false)}
                            {...recoverPasswordForm.getInputProps("email")}
                            styles={() => ({
                                innerInput: {
                                    color: "rgba(15, 13, 0, 0.8)",
                                    fontSize: "14px",
                                    paddingTop: "7px",
                                    "&::placeholder": {
                                        color: "#E7E7E5",
                                        fontSize: "14px",
                                        lineHeight: "17px",
                                    },
                                },
                                input: {
                                    border: "1px solid rgba(15, 13, 0, 0.1)",
                                    height: "60px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                },
                                label: {
                                    color: "#0F0D00",
                                    fontSize: "14px",
                                    fontWeight: "700",
                                },
                            })}
                        />
                        {error && (
                            <Alert
                                title="Error!"
                                color="red"
                                styles={() => ({ root: { marginTop: "20px" } })}
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
                            className="text-black-100 absolute bottom-12 bg-yellow-100 font-bold text-base w-[90%] text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                        >
                            {!isSubmitting ? "Reset password" : "Loading..."}
                        </Button>
                    </form>
                </div>
            )}
        </>
    )
}

export default RecoverPassword
