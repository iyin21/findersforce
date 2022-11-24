import { Button, SuccessfulLogin } from "../../components"
import { Form, Formik, FormikConfig, FormikValues } from "formik"
import React, { ReactNode, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import LandingPageText from "../../components/Layout/landing-page-txt"
import Header from "./components/header"
import { HqProfileInitialValue } from "./utils/hq-initialvalues"
import ProfileFormFields from "./utils/profile-form-fields"
import { Alert } from "@mantine/core"
import { useCreateProfile } from "../../hooks/profile/use-profile"
import { useInviteShiftManger } from "../../hooks/roles/use-roles"

const HQProfile = () => {
    const [searchParams] = useSearchParams()
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const { mutate: mutateUser, isSuccess, data } = useInviteShiftManger()

    useEffect(() => {
        if (isSuccess) {
            setOpenSuccessModal(true)
        }
    }, [data])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 text-white h-screen lg:bg-[black]">
            {openSuccessModal && (
                <SuccessfulLogin
                    opened={openSuccessModal}
                    setOpened={setOpenSuccessModal}
                />
            )}
            <div className="hidden lg:block">
                {" "}
                <LandingPageText />
            </div>
            <div className="my-4 md:my-8 lg:mr-8 bg-white-100 pt-12 px-6 md:px-16 flex flex-col rounded-[10px]">
                <FormikStepper
                    // this is the initial values for the formik form
                    initialValues={HqProfileInitialValue}
                    data-testid="post_job_form"
                    onSubmit={(values) => {
                        mutateUser({
                            email: values.email,
                            invitedRole: values.accountType,
                            regionAddress: values.location,
                            companyName: searchParams.get("companyName"),
                        })
                    }}
                >
                    {ProfileFormFields.map(
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
            </div>
        </div>
    )
}

export default HQProfile

interface TWizardProps extends FormikConfig<FormikValues> {}

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

export function FormikStepper({ ...props }: TWizardProps) {
    const childrenArray = React.Children.toArray(
        // @ts-ignore
        props.children
    ) as React.ReactElement<FormikStepProps>[]

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [error, setError] = useState("")
    const [step, setStep] = useState(0)
    const currentChild = childrenArray[step]

    function isLastStep() {
        return step === childrenArray.length - 1
    }

    // const handlePreviousStep = () => {
    //     if (!(step === 0)) {
    //         setStep(step - 1)
    //     } else {
    //         navigate(`/auth/sign-up`)
    //     }
    // }
    const { mutate, isLoading, isError } = useCreateProfile()

    const handleCreateProfile = (values: FormikValues) => {
        mutate({
            firstName: values.firstName,
            lastName: values.lastName,
            passwordConfirm: values.passwordConfirm,
            password: values.password,
            inviteCode: searchParams.get("code"),
        })
    }

    return (
        <div>
            <Header step={step} />
            <Formik
                {...props}
                validationSchema={currentChild.props.validationSchema}
                onSubmit={(values, helpers) => {
                    helpers.setSubmitting(true)
                    if (!isError) {
                        setStep(0)
                    } else if (!isLastStep()) {
                        setStep(step + 1)
                    } else {
                        props.onSubmit(values, helpers) as Promise<any>
                    }
                    helpers.setSubmitting(false)
                }}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                        {currentChild}

                        <div className=" justify-between items-center">
                            {/* {step === 2 && (
                                <Button
                                    className="text-black-100"
                                    type="button"
                                    onClick={() => handlePreviousStep()}
                                >
                                    Go back
                                </Button>
                            )} */}

                            <div className="">
                                <Button
                                    size="normal"
                                    className="w-full mt-16"
                                    variant="primary"
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                        backgroundColor:
                                            "rgba(254, 215, 10, 1)",
                                    }}
                                    onClick={() => {
                                        step === 0
                                            ? handleCreateProfile(values)
                                            : ""
                                    }}
                                >
                                    {isSubmitting
                                        ? "Finishing..."
                                        : isLastStep()
                                        ? "Finish"
                                        : "Next"}
                                </Button>
                                {step === 1 && (
                                    <Button
                                        size="normal"
                                        className="w-full  font-semibold"
                                        variant="primary"
                                        type="submit"
                                        onClick={() => {
                                            navigate("/login")
                                        }}
                                    >
                                        Do this Later
                                    </Button>
                                )}
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
    )
}
