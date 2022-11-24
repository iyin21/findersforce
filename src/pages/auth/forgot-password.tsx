import React, { MutableRefObject } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { TextInput, Alert } from "@mantine/core"
import LandingPageText from "../../components/Layout/landing-page-txt"
import backIcon from "../../assets/backIcon.svg"
import { emailInputStyle } from "./utils"
import { useForm } from "@mantine/form"
import Button from "../../components/Core/Buttons/Button"
import logo from "../../assets/FF-logo.svg"
import forgotPassword from "../../hooks/auth-hooks/use-forgot-password"

const RecoverPassword = () => {
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
            <div className="grid grid-cols-1 lg:grid-cols-2 text-white lg:bg-black-1">
                <div className="hidden lg:block">
                    <LandingPageText />
                </div>
                <div className="my-8 md:mr-8 bg-white-100 md:pt-12 px-6 md:px-16 flex flex-col rounded-[10px]">
                    <div className="hidden lg:block bg-black-10 w-fit h-fit rounded mb-8">
                        <NavLink to="/login">
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
                    <h1 className="text-black-100 font-extrabold text-2xl md:text-4xl md:pb-2.5">
                        Forgot Password
                    </h1>
                    <span className="text-2md text-blaq-0 pt-2 pb-[35px] max-w-[439px]">
                        Enter your email address linked to your accout below and
                        we`ll send you an OTP to reset your password.
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
                            {!isSubmitting ? "Reset password" : "Loading..."}
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
        </>
    )
}

export default RecoverPassword
