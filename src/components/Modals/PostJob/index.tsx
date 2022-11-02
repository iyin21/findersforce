import { Alert, Modal } from "@mantine/core"
import { Form, Formik, FormikConfig, FormikValues } from "formik"
import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react"
import { useNavigate } from "react-router-dom"
import {
    useCreateJobList,
    useGetJobQualification,
    useGetJobType,
    useUpdateJobList,
} from "../../../hooks/job-board/useJobBoard.hooks"
import Button from "../../../components/Core/Buttons/Button"
import { Header } from "./components/header"
import JobFormFields from "./utils/formfields"
import {
    JobBoardByIdResponse,
    JobBoardResponseInterface,
} from "../../../hooks/job-board/interface"

export interface IPostJobProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    setOpenSuccess: Dispatch<SetStateAction<boolean>>
    setNewJobId: Dispatch<SetStateAction<string>>
    draftStatus: string
    singleDraftData: JobBoardResponseInterface | null
}

const PostJob = ({
    opened,
    setOpened,
    setOpenSuccess,
    setNewJobId,
    draftStatus,
    singleDraftData,
}: IPostJobProps) => {
    const { mutate: createJob, isSuccess, data } = useCreateJobList()
    const { mutate: updateJob } = useUpdateJobList({ id: singleDraftData?._id })
    useEffect(() => {
        if (isSuccess) {
            setOpenSuccess(true)
            setOpened(false)
            setNewJobId(data?._id)
        }
    }, [data])

    const { data: jobType } = useGetJobType()
    const { data: jobQualification } = useGetJobQualification()

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
                    initialValues={{
                        jobTypeId: singleDraftData?.jobType?.name || "",
                        jobAddress:
                            singleDraftData?.jobLocation?.formattedAddress ||
                            "",
                        jobMeetingPoint: singleDraftData?.jobMeetingPoint || "",
                        jobDate: singleDraftData?.jobDate || "",
                        shiftStartTime: singleDraftData?.shiftStartTime || "",
                        shiftDurationInHours:
                            singleDraftData?.shiftDurationInHours || "",
                        jobQualificationId:
                            singleDraftData?.jobQualification?.name || "",
                        numberOfOpsRequired:
                            singleDraftData?.numberOfOpsRequired || "",
                        jobDescription: singleDraftData?.jobDescription || "",
                        additionalInfoImageUrls:
                            singleDraftData?.additionalInfoImageUrls || [],
                        isPublished: singleDraftData?.isPublished || "",
                        jobAccessibleTo: singleDraftData?.jobAccessibleTo || "",
                    }}
                    data-testid="post_job_form"
                    onSubmit={(values) => {
                        const jobObject = {
                            ...values,
                            // this updates the jobType field to the id of the jobType if it is in draft state
                            jobTypeId: jobType?.filter(
                                (item) => item?.name === values?.jobTypeId
                            )[0]?._id,
                            jobQualificationId: jobQualification?.filter(
                                (item) =>
                                    item.name === values?.jobQualificationId
                            )[0]?._id,
                            isPublished: true,
                        }

                        // this checks if the draft is being edited or created
                        if (draftStatus === "draft") {
                            updateJob(jobObject)
                        } else {
                            createJob(jobObject)
                        }
                    }}
                    setOpened={setOpened}
                    createJob={createJob}
                    draftStatus={draftStatus}
                    jobQualification={jobQualification}
                    jobType={jobType}
                >
                    {JobFormFields.map(
                        ({ validationSchema, Component, name }) => (
                            <FormikStep
                                key={name}
                                name={name}
                                onSubmit={() => {}}
                                validationSchema={validationSchema}
                            >
                                <Component
                                    jobQualification={jobQualification}
                                    jobType={jobType}
                                />
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

interface TWizardProps extends FormikConfig<FormikValues> {
    setOpened: Dispatch<SetStateAction<boolean>>
    createJob: (values: FormikValues) => void
    draftStatus: string
    jobQualification: JobBoardByIdResponse[] | undefined
    jobType: JobBoardByIdResponse[] | undefined
}

export function FormikStepper({ ...props }: TWizardProps) {
    const childrenArray = React.Children.toArray(
        // @ts-ignore
        props.children
    ) as React.ReactElement<FormikStepProps>[]

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [step, setStep] = useState(0)
    const currentChild = childrenArray[step]

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

    // this function handles the create job mutation
    const handleDraft = (values: FormikValues) => {
        const jobObject = {
            ...values,
            jobTypeId: props.jobType?.filter(
                (item) => item?.name === values?.jobTypeId
            )[0]?._id,
            jobQualificationId: props.jobQualification?.filter(
                (item) => item.name === values?.jobQualificationId
            )[0]?._id,
        }

        props.createJob(jobObject)
    }

    return (
        <div>
            {" "}
            <Header step={step} draftStatus={props.draftStatus} />
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
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            {currentChild}

                            <div className="flex justify-between items-center">
                                {step === 2 ? (
                                    <Button
                                        className="text-black-100"
                                        type="button"
                                        onClick={() => handlePreviousStep()}
                                    >
                                        Go back
                                    </Button>
                                ) : (
                                    <>
                                        {" "}
                                        {step === 0 ? (
                                            <div></div>
                                        ) : (
                                            <Button
                                                className="text-green-100"
                                                type="button"
                                                disabled={isSubmitting}
                                                onClick={() => {
                                                    setFieldValue(
                                                        "isPublished",
                                                        false
                                                    )
                                                    handleDraft(values)
                                                }}
                                            >
                                                {isSubmitting
                                                    ? "Saving"
                                                    : "Save as draft"}
                                            </Button>
                                        )}
                                    </>
                                )}

                                <div className="flex items-center">
                                    {step < 2 && (
                                        <Button
                                            onClick={() =>
                                                props.setOpened(false)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    )}{" "}
                                    <Button
                                        size="normal"
                                        className="w-full my-5"
                                        variant="primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                        onClick={() => {
                                            setFieldValue("isPublished", true)
                                            setFieldValue(
                                                "jobAccessibleTo",
                                                "ALL_OPERATIVES"
                                            )
                                        }}
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
