import { Alert, Modal } from "@mantine/core"
import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react"
import { Form, Formik, FormikValues } from "formik"
import { Header } from "./components/header"
import SupportForm1 from "./components/supportForm1"
import SupportForm2 from "./components/supportForm2"
import { validationSchema } from "./utils/validationSchema"
import { useAuthContext } from "../../../pages/auth/context/authContext"

import { useCreateComplaint } from "../../../pages/Support/hooks/support.hook"
import { showNotification } from "@mantine/notifications"

export interface SupportModalProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    setHandleRefetch: (val: boolean) => void
}

const SupportModal = ({
    opened,
    setOpened,
    setHandleRefetch,
}: SupportModalProps) => {
    const { state } = useAuthContext()
    const [step, setStep] = useState(1)
    const { data, isLoading, mutate } = useCreateComplaint()

    useEffect(() => {
        if (data) {
            showNotification({
                title: "Success",
                message: data.message,
                color: "green",
            })
            setOpened(false)
            setHandleRefetch(true)
        }
    }, [data])
    const handleSubmit = (values: FormikValues) => {
        const formData = new FormData()

        values.complaintIssue?.map((item: string) =>
            formData.append("complaintIssues[]", item)
        )

        formData.append("complaintCategory", values.complaintCategory)

        formData.append("description", values.description)
        if (values.image) {
            formData.append("image", values.image)
        }
        mutate({
            formData,
        })
    }
    return (
        <Modal
            opened={opened}
            withCloseButton={false}
            onClose={() => setOpened(false)}
            size="xl"
            centered
        >
            <Header step={step} />

            <Formik
                onSubmit={(values) => {
                    if (step === 1) {
                        //console.log(values)
                        setStep(step + 1)
                    } else {
                        
                        handleSubmit(values)
                    }
                }}
                validationSchema={validationSchema}
                initialValues={{
                    emailAddress: state?.user?.email,
                    complaintCategory: "",
                    complaintIssue: [],
                    description: "",
                    image: null,
                }}
            >
                {() => (
                    <Form>
                        {step === 1 ? <SupportForm1 /> : <SupportForm2 />}
                        <div className="flex justify-end items-center mt-4">
                            <p
                                className="cursor-pointer"
                                onClick={() =>
                                    step === 1 ? setOpened(false) : setStep(1)
                                }
                            >
                                {step === 1 ? "Cancel" : "Back"}
                            </p>

                            <button
                                className="bg-yellow-100 rounded rounded-tr-2xl flex justify-center items-center font-bold body-medium p-4  px-10 ml-4"
                                type="submit"
                                style={{
                                    backgroundColor: "rgba(254, 215, 10, 1)",
                                }}
                            >
                                {isLoading ? "Loading.." : "Next"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {/* </FormikStepper> */}
        </Modal>
    )
}

export default SupportModal
