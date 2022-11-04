import React, { MutableRefObject } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { TextInput, Alert } from "@mantine/core"
import LandingPageText from "../../components/Layout/landing-page-txt"
import backIcon from "../../assets/backIcon.svg"
import { emailInputStyle } from "./utils"
import { useForm } from "@mantine/form"
import axios from "./utils"
import Button from "../../components/Core/Buttons/Button"

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
        axios
            .post("/request-password-reset", JSON.stringify({ email: email }), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then((response) => {
                navigate("/verify-email", { state: { email: email } })
            })
            .catch((err) => {
                try {
                    setErrorMsg(err.response.data.error)
                } catch (error) {
                    setErrorMsg("Hmmm, something went wrong, try again later.")
                } finally {
                    showError(true)
                    setIsSubmitting(false)
                }
            })
    }

    return (
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
                        style={!isSubmitting ? {backgroundColor: "rgba(254, 215, 10, 1)"} : {backgroundColor: "rgba(254, 215, 10, 1)", opacity: "0.7"}}
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
    )
}

export default RecoverPassword
