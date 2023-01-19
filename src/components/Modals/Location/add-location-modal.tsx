import { Modal } from "@mantine/core"
import SuccessfulLogin from "../SuccessLogin/index"
import Button from "../../Core/Buttons/Button"
import Header from "../../Header/header"
import { Form, Formik, FormikConfig, FormikValues } from "formik"
import { useInviteHQ } from "../../../hooks/roles/use-roles"
import React, { ReactNode } from "react"
import { useEffect, useState } from "react"
import { ManagerInitialValue } from "./utils/initialValues"
import ManagerFormFields from "./utils/manager-form-field"
import useAuthContext from "../../../hooks/auth-hooks/useAuth"

interface prop {
    opened: boolean
    setOpened: (val: boolean) => void
}
const AddLocationModal = ({ opened, setOpened }: prop) => {
    const [step, setStep] = useState(0)
    const { state } = useAuthContext()
    const [LocationStateArray, setLocationStateArray] = useState([])
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const { mutate: mutateUser, isSuccess, data } = useInviteHQ()
    // this duplicates the LocationStateArray session storage for regional manager data
    const regionalData = LocationStateArray?.map((i: any) => ({ ...i }))
    // this duplicates the LocationStateArray session storage for shift manager data
    const shiftData = LocationStateArray?.map((i: any) => ({ ...i }))

    // this deletes the regional manager email from the LocationStateArray session storage in order to separate the regional manager as the backend requires
    const deleteRegionalManagerData = shiftData?.map(function (item: any) {
        delete item.regional_manager
        return item
    })
    // this deletes the shift manager email from the LocationStateArray session storage in order to separate the regional manager as the backend requires
    const deleteShiftManagerData = regionalData?.map(function (item: any) {
        delete item.shift_manager
        return item
    })

    // this adds the invited role to the shift manager array in order to send to the backend
    const addShiftInvitedRoleData = deleteRegionalManagerData?.map(
        (v: any) => ({
            ...v,
            invitedRole: "SHIFT_MANAGER",
            companyId: state?.user?.company?._id,
        })
    )

    // this adds the invited role to the regional manager array in order to send to the backend
    const addRegionalInvitedRoleData = deleteShiftManagerData?.map(
        (v: any) => ({
            ...v,
            invitedRole: "REGIONAL_MANAGER",
            companyId: state?.user?.company?._id,
        })
    )
    // this changes the shift_manager array to email in order to send to the backend
    const shiftManagerArray = addShiftInvitedRoleData?.map((item: any) => {
        return {
            email: item.shift_manager,
            invitedRole: item.invitedRole,
            regionAddress: item.regionAddress,
            companyId: state?.user?.company?._id,
        }
    })
    // this changes the regional_manager array to email in order to send to the backend
    const regionalManagerArray = addRegionalInvitedRoleData?.map(
        (item: any) => {
            return {
                email: item.regional_manager,
                invitedRole: item.invitedRole,
                regionAddress: item.regionAddress,
                companyId: state?.user?.company?._id,
            }
        }
    )

    // this combines the shift manager and regional manager arrays into one array to send to the backend
    const finalArray = shiftManagerArray?.concat(regionalManagerArray)

    // this functions gets the session storage and parses it
    const getSessionStorage = async () => {
        const locationArray: any =
            window.sessionStorage.getItem("locationArray")
        const parsedLocationArray = JSON.parse(locationArray)

        setLocationStateArray(parsedLocationArray)
    }

    const handleSubmit = () => {
        mutateUser({
            jwt: state?.jwt?.token,
            invitees: finalArray,
        })
    }

    useEffect(() => {
        if (isSuccess) {
            setOpened(false)
            setOpenSuccessModal(true)
            window.sessionStorage.removeItem("locationArray")
        }
    }, [data])

    useEffect(() => {
        getSessionStorage()
    }, [])

    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            centered
            closeOnClickOutside={false}
            closeOnEscape={false}
            withCloseButton={false}
            size={700}
            styles={() => ({
                body: {
                    padding: "30px",
                },
            })}
        >
            <div>
                {openSuccessModal && (
                    <SuccessfulLogin
                        opened={openSuccessModal}
                        setOpened={setOpenSuccessModal}
                    />
                )}

                <FormikStepper
                    // this is the initial values for the formik form
                    initialValues={ManagerInitialValue}
                    data-testid="post_job_form"
                    onSubmit={(values) => {
                        handleSubmit()
                    }}
                    setStep={setStep}
                    step={step}
                    close={setOpened}
                >
                    {ManagerFormFields.map(
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
                                    LocationStateArray={LocationStateArray}
                                />
                            </FormikStep>
                        )
                    )}
                </FormikStepper>
            </div>
        </Modal>
    )
}

interface TWizardProps extends FormikConfig<FormikValues> {
    setStep: React.Dispatch<React.SetStateAction<number>>
    step: number
    close: (val: boolean) => void
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

    const currentChild = childrenArray[props.step]

    function isLastStep() {
        return props.step === childrenArray.length - 1
    }

    return (
        <div>
            <Header
                step={props.step}
                title={props.step === 1 ? "Confirm Depots" : "Register Depots"}
                description={
                    props.step === 1
                        ? "Are these depot details correct?"
                        : "Add your depot location and corresponding managerial staff."
                }
                totalStep={2}
            />
            <Formik
                {...props}
                validationSchema={currentChild.props.validationSchema}
                onSubmit={(values, helpers) => {
                    helpers.setSubmitting(true)
                    if (!isLastStep()) {
                        props.setStep(props.step + 1)
                    } else {
                        props.onSubmit(values, helpers) as Promise<any>
                    }
                    helpers.setSubmitting(false)
                }}
            >
                <Form>
                    {currentChild}

                    <div className=" justify-between items-center">
                        {isLastStep() && (
                            <Button
                                size="normal"
                                className="w-full mt-16"
                                variant="primary"
                                type="submit"
                                style={{
                                    backgroundColor: "rgba(254, 215, 10, 1)",
                                }}
                                onClick={() => {
                                    props.step === 0
                                }}
                            >
                                {isLastStep() ? "Finish" : "Next"}
                            </Button>
                        )}

                        <div className="">
                            <Button
                                size="normal"
                                className="w-full  font-semibold"
                                variant="primary"
                                type="submit"
                                onClick={() => {
                                    props.close(false)
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default AddLocationModal
