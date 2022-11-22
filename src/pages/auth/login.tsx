import React, { MutableRefObject } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { TextInput, PasswordInput, Alert } from "@mantine/core"
import { useForm } from "@mantine/form"
import Button from "../../components/Core/Buttons/Button"
import LandingPageText from "../../components/Layout/landing-page-txt"
import { emailInputStyle, passwordInputStyle } from "./utils"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import logo from "../../assets/FF-logo.svg"
import login from "../../hooks/auth-hooks/use-login"

const Login = () => {
    const [error, showError] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")
    const { dispatch } = useAuthContext()
    const userRef = React.useRef<HTMLInputElement>(
        null
    ) as MutableRefObject<HTMLInputElement>
    const loginForm = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (value) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
                    ? null
                    : "Invalid email",
        },
    })

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/dashboard"

    const handleLogin = ({
        email,
        password,
    }: {
        email: string
        password: string
    }) => {
        setIsSubmitting(true)
        login(
            email,
            password,
            from,
            setErrorMsg,
            showError,
            setIsSubmitting,
            dispatch,
            navigate
        )
    }

    React.useEffect(() => {
        userRef.current.focus()
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 text-white h-fit lg:bg-black-100">
            <div className="hidden lg:block">
                <LandingPageText />
            </div>
            <section className="my-8 md:mr-8 bg-white-100 md:pt-12 px-6 md:px-16 flex flex-col rounded-[10px]">
                <div className="block lg:hidden">
                    <img src={logo} alt="finders force logo" className="pb-4" />
                </div>
                <h1 className="text-black-100 font-extrabold text-3xl md:text-4xl md:pb-2.5">
                    Log In
                </h1>

                <form
                    onSubmit={loginForm.onSubmit((values) =>
                        handleLogin(values)
                    )}
                    className="pt-6 md:pt-14"
                >
                    <div onFocusCapture={() => showError(false)}>
                        <TextInput
                            placeholder="example@gmail.com"
                            label="Email Address"
                            id="email"
                            withAsterisk
                            required
                            ref={userRef}
                            {...loginForm.getInputProps("email")}
                            styles={() => emailInputStyle}
                        />
                    </div>
                    <div></div>
                    <PasswordInput
                        placeholder="password"
                        id="password"
                        label="Password"
                        withAsterisk
                        radius="md"
                        size="xl"
                        required
                        {...loginForm.getInputProps("password")}
                        styles={() => passwordInputStyle}
                        onFocusCapture={() => showError(false)}
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        style={
                            !isSubmitting
                                ? {
                                      backgroundColor: "rgba(254, 215, 10, 1)",
                                  }
                                : {
                                      backgroundColor: "rgba(254, 215, 10, 1)",
                                      opacity: "0.7",
                                  }
                        }
                        className="text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                    >
                        {!isSubmitting ? "Enters finders force" : "Loading..."}
                    </Button>
                </form>
                {error && (
                    <Alert
                        id="alert"
                        title="Error!"
                        color="red"
                        styles={() => ({ root: { marginTop: "20px" } })}
                    >
                        {errorMsg}
                    </Alert>
                )}

                <div className="text-end mt-14 pb-32">
                    <span className="text-base font-normal text-black-90">
                        Forgot password?
                    </span>
                    <NavLink
                        to="/recover-password"
                        className="text-black-90 font-semibold pl-1.5"
                    >
                        Recover
                    </NavLink>
                    <div className="flex flex-row-reverse">
                        <hr className="w-[61px] border-t-2 border-yellow-100" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
