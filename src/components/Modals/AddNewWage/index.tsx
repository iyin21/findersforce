import { Modal } from "@mantine/core"
import Button from "../../../components/Core/Buttons/Button"
import FormikControls from "../../../components/Form/FormControls/form-controls"
import { Form, Formik } from "formik"
import { useGetJobQualification } from "../../../hooks/job-board/useJobBoard.hooks"
import { Dispatch, SetStateAction, useEffect } from "react"
import { IoClose } from "react-icons/io5"
import { createJobRateInitialValues } from "./utils/initialvalues"
import { createJobRateValidationSchema } from "./utils/validationSchema"
import { useCreateJobRates } from "../../../hooks/depots/use-depot"

export interface NewWageProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    depotId: string | undefined
    companyId: string | undefined
}

const AddNewWageModal = ({
    opened,
    setOpened,
    depotId,
    companyId,
}: NewWageProps) => {
    const { data: jobQualification } = useGetJobQualification()

    const {
        mutate: createJobRate,
        isLoading: createJobRateLoading,
        isSuccess,
        data: createJobRateData,
    } = useCreateJobRates()

    useEffect(() => {
        if (isSuccess) {
            setOpened(false)
        }
    }, [createJobRateData])

    return (
        <div>
            <Modal
                opened={opened}
                withCloseButton={false}
                onClose={() => setOpened(false)}
                size="xl"
                centered
                classNames={{
                    modal: "p-0",
                }}
            >
                <div className="bg-black-100 rounded-t  py-5 px-6  flex items-center justify-between">
                    <h3 className="text-2xl md:text-3xl font-bold text-center text-white-100 mb-3">
                        Add new qualification
                    </h3>
                    <div
                        onClick={() => {
                            setOpened(false)
                        }}
                    >
                        <IoClose color="#fff" size={50} />
                    </div>
                </div>
                <div className="px-10 py-5 font-creato">
                    <Formik
                        initialValues={createJobRateInitialValues}
                        validationSchema={createJobRateValidationSchema}
                        onSubmit={(values) => {
                            createJobRate({
                                ...values,
                                // depotId: depotId,
                                companyId: companyId,
                            })
                        }}
                    >
                        {({ values }) => (
                            <Form className="my-6 ">
                                <h6>Choose a qualification</h6>
                                <div className="mt-4 ">
                                    <label
                                        htmlFor="emailAddress"
                                        className="text-md md:text-3md mb-2 block text-3md font-semibold"
                                    >
                                        Qualification
                                    </label>
                                    <FormikControls
                                        control="select"
                                        name="jobQualificationId"
                                        aria-label="Qualification"
                                        type="select"
                                        className="rounded text-black-50"
                                        data-testid="jobQualificationId"
                                        defaultValue={
                                            values?.jobQualificationId
                                        }
                                    >
                                        <option>Select an option---</option>
                                        {jobQualification?.map((item) => (
                                            <option
                                                key={item._id}
                                                value={item._id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </FormikControls>
                                </div>
                                <div className="mt-6 ">
                                    <div className="flex flex-col md:flex-row justify-between gap-2 mt-4">
                                        <div className="md:w-[20%]">
                                            <span className="text-black-40 text-2md">
                                                Meet on site
                                            </span>
                                            <span className="text-md md:text-3md mb-2 block text-3md font-semibold uppercase">
                                                Depot pays
                                            </span>
                                        </div>

                                        <FormikControls
                                            type="text"
                                            name="jobRateMeetOnsiteDisplayedToDepot"
                                            control="input"
                                            placeholder="0"
                                            aria-label="Depot pays"
                                            required
                                            className="rounded"
                                            data-testid="jobRateMeetOnsiteDisplayedToDepot"
                                            prefixIcon={
                                                <span className="text-black-100 text-2md font-creatoMedium">
                                                    £{" "}
                                                </span>
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row  justify-between gap-2 mt-6">
                                        <div className="md:w-[20%]">
                                            <span className="text-black-40 text-2md">
                                                Meet on site
                                            </span>
                                            <span className="text-md md:text-3md mb-2 block text-3md font-semibold uppercase">
                                                Op receives
                                            </span>
                                        </div>

                                        <FormikControls
                                            type="text"
                                            name="jobRateMeetOnsiteDisplayedToOp"
                                            control="input"
                                            placeholder="0"
                                            aria-label="Op receives"
                                            required
                                            className="rounded"
                                            data-testid="jobRateMeetOnsiteDisplayedToOp"
                                            prefixIcon={
                                                <span className="text-black-100 text-2md font-creatoMedium">
                                                    £{" "}
                                                </span>
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-between flex-col md:flex-row  gap-2 mt-6">
                                        <div className="md:w-[20%]">
                                            <span className="text-black-40 text-2md">
                                                Depot first
                                            </span>
                                            <span className="text-md md:text-3md mb-2 block text-3md font-semibold uppercase">
                                                Depot pays
                                            </span>
                                        </div>

                                        <FormikControls
                                            type="text"
                                            name="jobRateDepotFirstDisplayedToDepot"
                                            control="input"
                                            placeholder="0"
                                            aria-label="Depot pays"
                                            required
                                            className="rounded"
                                            data-testid="jobRateDepotFirstDisplayedToDepot"
                                            prefixIcon={
                                                <span className="text-black-100 text-2md font-creatoMedium">
                                                    £{" "}
                                                </span>
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-between flex-col md:flex-row  gap-2 mt-6">
                                        <div className="md:w-[20%]">
                                            <span className="text-black-40 text-2md">
                                                Depot first
                                            </span>
                                            <span className="text-md md:text-3md mb-2 block text-3md font-semibold uppercase">
                                                op receives
                                            </span>
                                        </div>

                                        <FormikControls
                                            type="text"
                                            name="jobRateDepotFirstDisplayedToOp"
                                            control="input"
                                            placeholder="0"
                                            aria-label="Depot first"
                                            required
                                            className="rounded"
                                            data-testid="jobRateDepotFirstDisplayedToOp"
                                            prefixIcon={
                                                <span className="text-black-100 text-2md font-creatoMedium">
                                                    £{" "}
                                                </span>
                                            }
                                        />
                                    </div>

                                    <div className="border-t border-black-5 flex justify-end pt-5 mt-8">
                                        <Button variant="primary">
                                            {createJobRateLoading
                                                ? "adding..."
                                                : "Add new"}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    )
}

export default AddNewWageModal
