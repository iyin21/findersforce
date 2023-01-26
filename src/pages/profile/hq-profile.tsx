import { BackButton, Button, SuccessfulLogin } from "../../components"
import { Form, Formik, FormikConfig, FormikValues } from "formik"
import React, { ReactNode, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import LandingPageText from "../../components/Layout/landing-page-txt"
import Header from "../../components/Header/header"
import { HqProfileInitialValue } from "./utils/hq-initialvalues"
import ProfileFormFields from "./utils/profile-form-fields"
import { Alert } from "@mantine/core"
import { useCreateProfile } from "../../hooks/profile/use-profile"
import { useInviteHQ } from "../../hooks/roles/use-roles"
import { UseMutateFunction } from "react-query"
import { AxiosError } from "axios"
import { ProfileRequest } from "../../types/profile/interface"
import videoBg from "../../assets/video/videoBg.mp4"

const HQProfile = () => {
    const [step, setStep] = useState(0)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const { mutate, isLoading, isError, data: profileData } = useCreateProfile()

    const {
        mutate: mutateUser,
        isSuccess,
        data,
        isLoading: isInviteLoading,
    } = useInviteHQ({
        jwt: profileData?.jwt?.token,
    })

    useEffect(() => {
        if (isSuccess) {
            setOpenSuccessModal(true)
            window.sessionStorage.removeItem("locationArray")
        }
    }, [data, isError])

    return (
        <div>
            <video
                autoPlay
                loop
                muted
                id="video"
                className="hidden lg:block h-screen w-full object-cover fixed"
                src={videoBg}
            ></video>
            <div className="grid grid-cols-1 lg:grid-cols-2 text-white h-fit lg:bg-black-60 lg:absolute lg:top-0">
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
                <div className="my-4 md:my-8 lg:mr-8 bg-white-100 z-30 pt-12 pb-10 px-6 md:px-16 flex flex-col rounded-[10px]">
                    <FormikStepper
                        // this is the initial values for the formik form
                        initialValues={HqProfileInitialValue}
                        data-testid="post_job_form"
                        onSubmit={(values) => {
                            // handleSubmit()
                        }}
                        mutate={mutate}
                        isLoading={isLoading}
                        isError={isError}
                        setStep={setStep}
                        step={step}
                    >
                        {ProfileFormFields?.map(
                            ({ validationSchema, Component, name }) => (
                                <FormikStep
                                    key={name}
                                    name={name}
                                    onSubmit={() => {}}
                                    validationSchema={validationSchema}
                                >
                                    <Component
                                        setStep={setStep}
                                        step={step}
                                        profileData={profileData}
                                        mutateUser={mutateUser}
                                        isInviteLoading={isInviteLoading}
                                    />
                                </FormikStep>
                            )
                        )}
                    </FormikStepper>
                </div>
            </div>
        </div>
    )
}

export default HQProfile

interface TWizardProps extends FormikConfig<FormikValues> {
    mutate: UseMutateFunction<
        any,
        AxiosError<unknown, any>,
        ProfileRequest,
        unknown
    >
    isLoading: boolean
    isError: boolean
    setStep: React.Dispatch<React.SetStateAction<number>>
    step: number
}

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
    const currentChild = childrenArray[props.step]

    function isLastStep() {
        return props.step === childrenArray.length - 1
    }

    const handleCreateProfile = (values: FormikValues) => {
        props.mutate({
            firstName: values.firstName,
            lastName: values.lastName,
            passwordConfirm: values.passwordConfirm,
            password: values.password,
            inviteCode: searchParams.get("code"),
            courseLink: values.courseLink,
            subscriptionPlan: values.subscriptionPlan,
        })
    }

    const handleBack = () => {
        if (props.step > 0) {
            props.setStep(props.step - 1)
        }
    }

    return (
        <div>
            {props?.step > 0 ? (
                <BackButton handleBackButton={() => handleBack()} />
            ) : (
                ""
            )}

            <Header
                step={props.step}
                title={
                    props.step === 0
                        ? "Set up your Profile"
                        : "Register Depots" || props.step === 2
                        ? "Confirm Depots"
                        : ""
                }
                description={
                    props.step === 0
                        ? ""
                        : "Add your depot location and corresponding managerial staff." ||
                          props.step === 2
                        ? "Are these depot details correct?"
                        : ""
                }
            />
            <Formik
                {...props}
                validationSchema={currentChild.props.validationSchema}
                onSubmit={(values, helpers) => {
                    helpers.setSubmitting(true)
                    if (props.isError === true) {
                        props.setStep(0)
                    } else if (!isLastStep()) {
                        props.setStep(props.step + 1)
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
                            <div className="">
                                {props.step === 1 ? (
                                    ""
                                ) : (
                                    <>
                                        {props.step === 2 ? (
                                            ""
                                        ) : (
                                            <Button
                                                size="normal"
                                                className="w-full mt-16"
                                                variant="primary"
                                                type="submit"
                                                disabled={props.isLoading}
                                                style={{
                                                    backgroundColor:
                                                        "rgba(254, 215, 10, 1)",
                                                }}
                                                onClick={() => {
                                                    props.step === 0
                                                        ? handleCreateProfile(
                                                              values
                                                          )
                                                        : ""
                                                }}
                                            >
                                                {isSubmitting
                                                    ? "Finishing..."
                                                    : isLastStep()
                                                    ? "Finish"
                                                    : "Next"}
                                            </Button>
                                        )}{" "}
                                    </>
                                )}

                                {props.step === 1 && (
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
