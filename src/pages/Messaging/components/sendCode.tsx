import { Formik, Form, FormikValues } from "formik"
import TelegramLogo from "../assets/telegramLogo.svg"
import { useState, Dispatch, SetStateAction } from "react"
import { TelegramClient } from "telegram"
import FormikControls from "../../../components/Form/FormControls/form-controls"
import { showNotification } from "@mantine/notifications"
import { validateTelegramLoginRequest } from "../utils/validateTelegramLoginRequest"

interface sendCodeInterface {
    client: TelegramClient
    setPhoneCodeHash: Dispatch<SetStateAction<string>>
    setNewClient: Dispatch<SetStateAction<TelegramClient | undefined>>
    setPhase: Dispatch<SetStateAction<number | null>>
    setPhone: Dispatch<SetStateAction<string>>
}
const SendCode = ({
    client,
    setPhoneCodeHash,
    setNewClient,
    setPhase,
    setPhone,
}: sendCodeInterface) => {
    const apiId = import.meta.env.VITE_TELEGRAM_API_ID as number

    const apiHash = import.meta.env.VITE_TELEGRAM_API_HASH

    const [isSendingCode, setIsSendingCode] = useState(false)

    const handleSendCode = async (values: FormikValues) => {
        setIsSendingCode(true)
        await client.connect()

        // const { phoneCodeHash, isCodeViaApp }
        try {
            const result = await client.sendCode(
                {
                    apiId: apiId,
                    apiHash: apiHash,
                },
                values.phoneNumber
                // forceSMS
            )
            if (result) {
                setNewClient(client)
                setPhoneCodeHash(result.phoneCodeHash)
                setPhase(2)
            }
        } catch (err: any) {
            showNotification({
                title: "Error",
                message:
                    err.errorMessage || "An error occured, pleease try again",
                color: "red",
            })
        } finally {
            setIsSendingCode(false)
        }
    }
    return (
        <div className="flex justify-center items-center mt-20">
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
                    Sign in to telegram
                </h5>
                <Formik
                    initialValues={{
                        phoneNumber: "",
                    }}
                    validationSchema={validateTelegramLoginRequest}
                    onSubmit={(values) => {
                        setPhone(values.phoneNumber)
                        handleSendCode(values)
                        //     handleSubmit(values, () => {
                        //         return client.sendCode(
                        //             {
                        //                 apiId: apiId,
                        //                 apiHash: apiHash,
                        //             },
                        //             values.phoneNumber
                        //         )
                        //     })
                    }}
                >
                    {({}) => (
                        <Form>
                            <div className="w-full">
                                <label
                                    htmlFor="phoneNumber"
                                    className="text-md md:text-3md mb-2 block text-left"
                                >
                                    Please input your phone number with the
                                    country code
                                </label>
                                <FormikControls
                                    data-testid="phoneNumber"
                                    id="phoneNumber"
                                    control="input"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="+2348108350294"
                                    className="rounded"
                                    aria-label="quantity"
                                />
                            </div>
                            <button
                                className="text-white-100 rounded  rounded-tr-2xl  font-bold body-medium p-4  px-10 mt-4 w-full"
                                type="submit"
                                style={{
                                    backgroundColor: "rgba(65, 159, 217, 1)",
                                }}
                                disabled={isSendingCode}
                            >
                                {isSendingCode ? "Loading.." : "Next"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default SendCode
