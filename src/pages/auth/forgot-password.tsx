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
import videoBg from "../../assets/video/videoBg.mp4"

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
                    <span className="text-[14px] pt-2 pb-[35px] max-w-[500px] font-creato">
                        Enter the <strong>email address</strong> linked to your
                        account below and we`ll send a{" "}
                        <strong>One Time Passcode </strong>(OTP) to your email,
                        so you can reset your password.
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
                            className="font-creato text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                        >
                            {!isSubmitting ? "Get OTP" : "Loading..."}
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
