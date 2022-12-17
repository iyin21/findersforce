import { Alert } from "@mantine/core"
import { Button } from "../../../../../components"
import { Form, Formik, FormikConfig, FormikValues } from "formik"
import React, { ReactNode, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom"
import Layout from "../../../../../components/Layout"
import DepotFormField from "./utils/depot-form-field"
import { DepotInitialValue } from "./utils/depot-initialvalues"
import Header from "./components/header"
import { useInviteDepot } from "../../../../../hooks/depots/use-depot"
import { UseMutateFunction } from "react-query"
import { AxiosError } from "axios"
import { InviteDepotInterface } from "../../../../../types/roles/role-interface"
import { showNotification } from "@mantine/notifications"

const AddDepot = () => {
    const {
        mutate: mutateDepot,
        isError,
        error: errorDepot,
        data: InviteDepotData,
    } = useInviteDepot()

    useEffect(() => {
        if (isError) {
            showNotification({
                message:
                    // @ts-ignore
                    errorDepot.message || "An error occurred",
                title: "Error",
                color: "red",
            })
        }
    }, [InviteDepotData, isError])

    return (
        <Layout>
            <div className="bg-black-10 p-2 w-fit mx-4 rounded-lg relative z-20 hidden md:block">
                <Link to={"/depots"}>
                    {" "}
                    <BiArrowBack size={30} />
                </Link>
            </div>
            <div className="md:p-6 p-6 mt-4 md:mt-4">
                <FormikStepper
                    // this is the initial values for the formik form
                    initialValues={DepotInitialValue}
                    data-testid="post_job_form"
                    onSubmit={() => {
                        // mutateUser({
                        //     email: values.email,
                        //     invitedRole: values.accountType,
                        //     regionAddress: values.regionAddress,
                        //     jwt: profileData?.jwt.token,
                        //     companyId: profileData?.user?.depotCompany?._id,
                        // })
                    }}
                    mutateDepot={mutateDepot}
                    isLoading={false}
                    isError={isError}
                >
                    {DepotFormField.map(
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
        </Layout>
    )
}

export default AddDepot

interface TWizardProps extends FormikConfig<FormikValues> {
    isError: boolean
    isLoading: boolean
    mutateDepot: UseMutateFunction<
        any,
        AxiosError<unknown, any>,
        InviteDepotInterface,
        unknown
    >
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
    const [step, setStep] = useState(0)
    const [error, setError] = useState("")

    const childrenArray = React.Children.toArray(
        // @ts-ignore
        props.children
    ) as React.ReactElement<FormikStepProps>[]
    const currentChild = childrenArray[step]

    function isLastStep() {
        return step === childrenArray.length - 1
    }

    const handleCreateProfile = (values: FormikValues) => {
        props.mutateDepot({
            email: values.email,
            invitedRole: "HQ-MANAGER",
            address: values.address,
            logo: values.logo,
            companyName: values.companyName,
            phoneNumber: values.phoneNumber,
            subscription_plan: values.subscription_plan,
            num_of_locations: values.num_of_locations,
            trial_period: values.trial_period,
            personal_email: values.personal_email,
        })
    }
    return (
        <div>
            <Header step={step} title="Depots" />
            <Formik
                {...props}
                validationSchema={currentChild.props.validationSchema}
                onSubmit={(values, helpers) => {
                    helpers.setSubmitting(true)
                    if (props.isError === true) {
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
                            <div className="">
                                {step === 2 ? (
                                    ""
                                ) : (
                                    <Button
                                        size="normal"
                                        className=" w-full lg:w-[50%] mt-16"
                                        variant="primary"
                                        type="submit"
                                        disabled={props.isLoading}
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
