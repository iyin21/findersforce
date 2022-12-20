import { Field, Formik, Form, FormikValues,  } from "formik"
import TelegramLogo from "../assets/telegramLogo.svg"
import { useState,  Dispatch, SetStateAction, } from "react"
import { TelegramClient, Api } from "telegram"
import FormikControls from "../../../components/Form/FormControls/form-controls"
import { showNotification } from "@mantine/notifications"
import {
    
    validateTelegramSigninRequest,
} from "../utils/validateTelegramLoginRequest"

interface SignInInterface{
    newClient?:TelegramClient
    phoneCodeHash: string
    setPhase:Dispatch<SetStateAction<number|null>>
    phone: string;
    
}
const SignIn=({newClient, setPhase, phone, phoneCodeHash}: SignInInterface)=>{

    const [isSigningIn, setIsSigningIn] = useState(false)

    const handleSignIn = async (values: FormikValues) => {
        //await client.connect()
        setIsSigningIn(true)

        try {
            const result = await newClient?.invoke(
                new Api.auth.SignIn({
                    phoneNumber: phone,
                    phoneCodeHash,
                    phoneCode: values.code,
                })
            )

            if (result) {
                
                sessionStorage.setItem("session", newClient?.session.save()||"")
                setPhase(3)
            }
        } catch (err: any) {
            setIsSigningIn(false)
            showNotification({
                title: "Error",
                message:
                    err.errorMessage || "An error occured, pleease try again",
                color: "red",
            })
        } finally {
            setIsSigningIn(false)
        }
    }

    return(
        <div className="flex justify-center items-center mt-40">
        <div className="text-center ">
            <div className="flex justify-center text-center items-center">
                <img
                    src={TelegramLogo}
                    alt=""
                    width="150px"
                    height="150px"
                />
            </div>
            <h5 className="font-normal text-3xl mb-4">
                {phone}
            </h5>
            <p>Please enter the code you've just</p>
            <p className="mb-10">
                received in your previous telegram app.
            </p>
            <Formik
                initialValues={{
                    code: "",
                }}
                validationSchema={validateTelegramSigninRequest}
                onSubmit={(values) => {
                    handleSignIn(values)
                }}
            >
                {({}) => (
                    <Form>
                        <div className="w-full">
                            <FormikControls
                                data-testid="code"
                                id="code"
                                control="input"
                                name="code"
                                type="text"
                                placeholder="Code"
                                className="rounded"
                                //aria-label="quantity"
                            />
                        </div>
                        <button
                            className="text-white-100 rounded rounded-tr-2xl w-full items-center font-bold body-medium p-4  px-10 mt-6"
                            type="submit"
                            style={{
                                backgroundColor:
                                    "rgba(65, 159, 217, 1)",
                            }}
                            disabled={isSigningIn}
                        >
                            {isSigningIn ? "Loading.." : "Next"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
    )
}

export default SignIn;