import React, { MutableRefObject } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { TextInput, PasswordInput, Alert } from "@mantine/core";
import { useForm } from '@mantine/form';
import Button from "../../components/button";
import LandingPageText from "../../components/landing-page-txt";
import { emailInputStyle, passwordInputStyle } from "./utils";
import axios from "./utils";
import useAuthContext from "./hooks/useAuth";


const LOGINURL = '/login'

const Login = () => {
    const [error, showError] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');
    const { dispatch }  = useAuthContext();
    const userRef = React.useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
    const loginForm = useForm({
        initialValues: {
          email: '',
          password: '',
        },
    
        validate: {
          email: (value) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? null : 'Invalid email'),
        },
    });


    let navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";

    const handleLogin = ({email, password}: {email: string, password: string} ) => {
        setIsSubmitting(true)
        axios.post(LOGINURL, JSON.stringify({email: email, password: password}), {
            headers: {'Content-Type': 'application/json'},  
            withCredentials: true
        }).then((response) => {
            const user = response.data?.data?.user;
            if (user.accountType === "DEPOT") {
                dispatch({
                    type: "SET_USER_DATA",
                    payload: {
                        user: user,
                        jwt: response.data.data.jwt,
                    },
                });
                navigate(from, { replace: true });
            }
            else {
                showError(true);
                setErrorMsg("Unauthorized! You have to be a Depot manager to have access")
                setIsSubmitting(false);
            }
            
        }).catch(err => {
            try {
                if (err?.response.status === 400) {
                    setErrorMsg(err.response.data.error)
                }
                else if (err?.response.status === 422) {
                    setErrorMsg(err.response.data.error)
                }
                else {
                    setErrorMsg("Hmmm, something went wrong, try again later.")
                }
            }
            catch (error) {
                setErrorMsg("Hmmm, something went wrong, try again later.");
            }
            finally {
                showError(true);
                setIsSubmitting(false);
            }
        })
    }

    React.useEffect(() => {
        userRef.current.focus();
    }, [])

    return (
        <div className="grid grid-cols-2 text-white h-fit bg-[black]">
            <LandingPageText />
            <section className="my-8 mr-8 bg-white-100 pt-12 px-16 flex flex-col rounded-[10px]">
                <h1 className="text-[rgb(5,0,1)] font-extrabold text-4xl pb-2.5">Log In</h1>
                <div>
                    <span className="text-[rgba(5, 0, 1, 0.7)] text-2lg font-normal">Don't have an account? </span>
                    <a href="" className="text-2lg text-green-100 font-normal">Request access</a>
                </div>
                
                <form onSubmit={loginForm.onSubmit((values) => handleLogin(values))} className="pt-14">
                    <div
                        onFocusCapture={() => showError(false)}
                        >
                        <TextInput 
                            placeholder="example@gmail.com"
                            label="Email Address"
                            withAsterisk
                            required
                            ref={userRef}
                            {...loginForm.getInputProps('email')}
                            styles={() => (emailInputStyle)}
                        />
                    </div>
                    <div></div>
                    <PasswordInput
                        placeholder="password"
                        label="Password"
                        withAsterisk
                        radius="md"
                        size="xl"
                        required
                        {...loginForm.getInputProps('password')}
                        styles={() => (passwordInputStyle)}
                        onFocusCapture={() => showError(false)}
                    />
                    <Button buttonText={!isSubmitting ? "Enter finders force" : "Loading..."} submit={isSubmitting}/>
                </form>
                {error && (
                    <Alert title="Error!" color="red" styles={() => ({root: {marginTop: "20px"}})}>
                        {errorMsg}
                    </Alert>
                )}
                
                <div className="text-end mt-14 pb-32">
                    <span className="text-base font-normal text-black-90">Forgot password?</span>
                    <NavLink to="/recover-password" className="text-black-90 font-semibold pl-1.5">
                        Recover
                    </NavLink>
                    <div className="flex flex-row-reverse">
                        <hr className="w-[61px] border-t-2 border-yellow-100"/>
                    </div>
                    
                </div>
                
            </section>
        </div>
    );
}

export default Login;