import { Alert, Modal } from "@mantine/core"
import { Form, Formik, FormikConfig, FormikValues } from "formik"
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/Core/Buttons/Button"
import { Header } from "./components/header"
import JobFormFields from "./utils/formfields"
import { initialValues } from "./utils/initialValues"

export interface IPostJobProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    setOpenSuccess: Dispatch<SetStateAction<boolean>>
}

const PostJob = ({ opened, setOpened, setOpenSuccess }: IPostJobProps) => {
    return (
        <div>
            <Modal
                opened={opened}
                withCloseButton={false}
                onClose={() => setOpened(false)}
                size="xl"
                centered
            >
                <FormikStepper
                    initialValues={initialValues}
                    data-testid="post_job_form"
                    onSubmit={(values) => {
                        setOpenSuccess(true)
                        setOpened(false)
                        // handleSubmit(values)
                    }}
                >
                    {JobFormFields.map(
                        ({ validationSchema, Component, name }) => (
                            <FormikStep
                                key={name}
                                name={name}
                                onSubmit={() => {}}
                                validationSchema={validationSchema}
                            >
                                <Component />
                            </FormikStep>
                        )
                    )}
                </FormikStepper>
            </Modal>
        </div>
    )
}
export default PostJob

export interface FormikStepProps
    extends Pick<
        FormikConfig<FormikValues>,
        "children" | "validationSchema" | "onSubmit"
    > {
    children: ReactNode
    name: string
}

export function FormikStep({ children }: FormikStepProps): any {
    return children
}

interface TWizardProps extends FormikConfig<FormikValues> {}

export function FormikStepper({ ...props }: TWizardProps) {
    const childrenArray = React.Children.toArray(
        // @ts-ignore
        props.children
    ) as React.ReactElement<FormikStepProps>[]

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [step, setStep] = useState(0)
    const currentChild = childrenArray[step]

    // const handleBackButton = () => {
    //     setStep(step - 1)
    // }

    function isLastStep() {
        return step === childrenArray.length - 1
    }

    const handlePreviousStep = () => {
        if (!(step === 0)) {
            setStep(step - 1)
        } else {
            navigate(`/job-boards`)
        }
    }

    return (
        <div>
            {" "}
            <Header step={step} />
            <div className="">
                <Formik
                    {...props}
                    validationSchema={currentChild.props.validationSchema}
                    onSubmit={(values, helpers) => {
                        helpers.setSubmitting(true)
                        if (!isLastStep()) {
                            setStep(step + 1)
                        } else {
                            props.onSubmit(values, helpers) as Promise<any>

                            props.onSubmit(values, helpers)
                        }
                        helpers.setSubmitting(false)
                    }}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            {currentChild}

                            <div className="flex justify-between items-center">
                                {step === 2 ? (
                                    <Button
                                        className="text-black-100"
                                        type="button"
                                        onClick={() => handlePreviousStep}
                                    >
                                        Go back
                                    </Button>
                                ) : (
                                    <Button
                                        className="text-green-100"
                                        type="submit"
                                    >
                                        Save to drafts
                                    </Button>
                                )}

                                <div className="flex items-center">
                                    {step < 2 && (
                                        <Button className="">Cancel</Button>
                                    )}{" "}
                                    <Button
                                        size="normal"
                                        className="w-full my-5"
                                        variant="primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Saving..."
                                            : isLastStep()
                                            ? "Publish"
                                            : "Next"}
                                    </Button>
                                </div>
                            </div>

                            {error && (
                                <div>
                                    <Alert
                                        color="red"
                                        onClose={() => setError("")}
                                        classNames={{
                                            root: "bg-red-10 border-2 border-l-red-100",
                                            message: "text-red-100",
                                        }}
                                    >
                                        {error ||
                                            " Bummer! something went is wrong"}
                                    </Alert>
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
