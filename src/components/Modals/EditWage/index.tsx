import { Modal } from "@mantine/core"
import FormikControls from "../../../components/Form/FormControls/form-controls"
import { Form, Formik } from "formik"
import { Dispatch, SetStateAction } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { IoClose } from "react-icons/io5"
import { object, string } from "yup"
import Button from "../../../components/Core/Buttons/Button"
import {
    useGetSingleJobRates,
    useUpdateSingleJobRates,
} from "../../../hooks/depots/use-depot"
import { CgSpinner } from "react-icons/cg"
import dayjs from "dayjs"

export interface EditWageProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    setOpenNewWage: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    wageId: string
}

const EditWageModal = ({
    opened,
    setOpened,
    setOpenNewWage,
    wageId,
}: EditWageProps) => {
    const { data: singleJobRateData } = useGetSingleJobRates({
        id: wageId,
    })

    const { mutate: updateSingleJobRate } = useUpdateSingleJobRates({
        id: wageId,
    })

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
                        Edit Wage
                    </h3>
                    <div
                        onClick={() => {
                            setOpened(false)
                        }}
                    >
                        <IoClose color="#fff" size={50} />
                    </div>
                </div>

                <div className="px-6 md:px-10 py-5 font-creato">
                    <div
                        className="flex justify-end items-center gap-2"
                        onClick={() => {
                            setOpenNewWage(true)
                            setOpened(false)
                        }}
                    >
                        <AiOutlinePlus size={20} />
                        <p className="text-black-70 text-md">
                            Add new qualification
                        </p>
                    </div>

                    <div className="bg-yellow-10 p-5 my-4 rounded-lg flex flex-col md:flex-row  justify-between">
                        <div className="mt-1">
                            <h6 className="text-black-50 text-sm md:text3sm">
                                QUALIFICATION
                            </h6>
                            <p className="text-xl font-semibold mt-2">
                                {singleJobRateData?.jobQualification?.name}
                            </p>
                        </div>
                        <div className="place-self-auto md:place-self-end mt-4 md:mt-0">
                            <p className="text-black-60 text-md">
                                {dayjs(
                                    singleJobRateData?.jobQualification
                                        ?.createdAt
                                ).format("MMM D, YYYY")}{" "}
                                | {singleJobRateData?.company?.name}
                            </p>
                        </div>
                    </div>

                    {!singleJobRateData ? (
                        <div className="h-screen w-full flex mt-24 justify-center">
                            <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                        </div>
                    ) : (
                        <div className="my-8">
                            <Formik
                                initialValues={{
                                    jobRateDepotFirstDisplayedToDepot:
                                        "" ||
                                        singleJobRateData?.jobRateDepotFirstDisplayedToDepot,
                                    jobRateDepotFirstDisplayedToOp:
                                        "" ||
                                        singleJobRateData?.jobRateDepotFirstDisplayedToOp,
                                    jobRateMeetOnsiteDisplayedToDepot:
                                        "" ||
                                        singleJobRateData?.jobRateMeetOnsiteDisplayedToDepot,
                                    jobRateMeetOnsiteDisplayedToOp:
                                        "" ||
                                        singleJobRateData?.jobRateMeetOnsiteDisplayedToOp,
                                }}
                                validationSchema={object().shape({
                                    jobRateDepotFirstDisplayedToDepot:
                                        string().required("Required"),
                                    jobRateDepotFirstDisplayedToOp:
                                        string().required("Required"),
                                })}
                                onSubmit={(values) => {
                                    updateSingleJobRate(values)
                                }}
                            >
                                {({}) => (
                                    <Form className="my-6 ">
                                        <div className="flex justify-between flex-col md:flex-row  gap-2 mt-4">
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
                                        <div className="flex justify-between flex-col md:flex-row  gap-2 mt-6">
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
                                        <div className="flex  flex-col md:flex-row justify-between gap-2 mt-6">
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
                                        <div className="flex flex-col md:flex-row  justify-between gap-2 mt-6">
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
                                                Save changes
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default EditWageModal
