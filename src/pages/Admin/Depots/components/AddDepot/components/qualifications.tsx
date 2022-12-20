import { useFormikContext } from "formik"
import { useGetJobQualification } from "../../../../../../hooks/job-board/useJobBoard.hooks"
import FormikControls from "../../../../../../components/Form/FormControls/form-controls"
import { FiPlus } from "react-icons/fi"
import { useEffect } from "react"
import { Table } from "@mantine/core"

const Qualifications = () => {
    const { values } = useFormikContext<{
        jobQualificationId: string
        jobRateDepotFirstDisplayedToDepot: string
        jobRateDepotFirstDisplayedToOp: string
        jobRateMeetOnsiteDisplayedToDepot: string
        jobRateMeetOnsiteDisplayedToOp: string
    }>()

    const { data: qualificationData } = useGetJobQualification()

    const handleAddQualification = () => {
        const wageArray: any = window.sessionStorage.getItem("wageArray")

        if (wageArray === null || wageArray === 0) {
            const newWage = [
                {
                    jobQualificationId: values.jobQualificationId,
                    jobRateDepotFirstDisplayedToDepot:
                        values.jobRateDepotFirstDisplayedToDepot,
                    jobRateDepotFirstDisplayedToOp:
                        values.jobRateDepotFirstDisplayedToOp,
                    jobRateMeetOnsiteDisplayedToDepot:
                        values.jobRateMeetOnsiteDisplayedToDepot,
                    jobRateMeetOnsiteDisplayedToOp:
                        values.jobRateMeetOnsiteDisplayedToOp,
                },
            ]
            window.sessionStorage.setItem("wageArray", JSON.stringify(newWage))
        } else {
            const newWageArray = JSON.parse(wageArray)
            window.sessionStorage.setItem(
                "wageArray",
                JSON.stringify([
                    ...newWageArray,
                    {
                        jobQualificationId: values.jobQualificationId,
                        jobRateDepotFirstDisplayedToDepot:
                            values.jobRateDepotFirstDisplayedToDepot,
                        jobRateDepotFirstDisplayedToOp:
                            values.jobRateDepotFirstDisplayedToOp,
                        jobRateMeetOnsiteDisplayedToDepot:
                            values.jobRateMeetOnsiteDisplayedToDepot,
                        jobRateMeetOnsiteDisplayedToOp:
                            values.jobRateMeetOnsiteDisplayedToOp,
                    },
                ])
            )
        }
        reset()
    }

    const reset = () => {
        values.jobRateDepotFirstDisplayedToDepot = ""
        values.jobRateDepotFirstDisplayedToOp = ""
        values.jobRateMeetOnsiteDisplayedToDepot = ""
        values.jobRateMeetOnsiteDisplayedToOp = ""
        values.jobQualificationId = ""
    }

    const wageArray: any = window.sessionStorage.getItem("wageArray")

    useEffect(() => {}, [
        values,
        values.jobRateDepotFirstDisplayedToDepot,
        values.jobRateDepotFirstDisplayedToOp,
        values.jobRateMeetOnsiteDisplayedToDepot,
        values.jobRateMeetOnsiteDisplayedToOp,
        values.jobQualificationId,
        wageArray,
    ])

    return (
        <div className="py-3 font-creato">
            <div className="mt-4">
                <label className="text-3md font-semibold text-black-100 block mb-2">
                    Qualification category
                </label>
                <FormikControls
                    control="select"
                    name="jobQualificationId"
                    aria-label="Qualification"
                    type="select"
                    className="rounded text-black-50 w-[70%]"
                    data-testid="jobQualificationId"
                    defaultValue={values?.jobQualificationId}
                >
                    <option>Select an option---</option>
                    {qualificationData?.map((item) => (
                        <option key={item._id} value={item._id}>
                            {" "}
                            {item.name}{" "}
                        </option>
                    ))}
                </FormikControls>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-3 ">
                <div className="mt-4">
                    <label className="text-3md font-semibold text-black-100 block mb-2">
                        Meet on site: Depot pays
                    </label>
                    <FormikControls
                        type="text"
                        name="jobRateMeetOnsiteDisplayedToDepot"
                        control="input"
                        placeholder="0"
                        aria-label="Meet on site: Depot pays"
                        required
                        className="rounded"
                        data-testid="jobRateMeetOnsiteDisplayedToDepot"
                    />
                </div>
                <div className="mt-4">
                    <label className="text-3md font-semibold text-black-100 block mb-2">
                        Meet on site: Op pays
                    </label>
                    <FormikControls
                        type="text"
                        name="jobRateMeetOnsiteDisplayedToOp"
                        control="input"
                        placeholder="0"
                        aria-label=" Meet on site: Op pays"
                        required
                        className="rounded"
                        data-testid="jobRateMeetOnsiteDisplayedToOp"
                    />
                </div>
                <div className="mt-4">
                    <label className="text-3md font-semibold text-black-100 block mb-2">
                        Depot First: Depot pays
                    </label>
                    <FormikControls
                        type="text"
                        name="jobRateDepotFirstDisplayedToDepot"
                        control="input"
                        placeholder="0"
                        aria-label=" Depot First: Depot pays"
                        required
                        className="rounded"
                        data-testid="jobRateDepotFirstDisplayedToDepot"
                    />
                </div>
                <div className="mt-4">
                    <label className="text-3md font-semibold text-black-100 block mb-2">
                        Depot First: Op Receives
                    </label>
                    <FormikControls
                        type="text"
                        name="jobRateDepotFirstDisplayedToOp"
                        control="input"
                        placeholder="0"
                        aria-label="Depot First: Op Receives"
                        required
                        className="rounded"
                        data-testid="jobRateDepotFirstDisplayedToOp"
                    />
                </div>
            </div>

            <p
                className="bg-black-100 p-2 flex items-center gap-2 w-fit text-white-100 rounded mt-6"
                onClick={() => {
                    handleAddQualification()
                    reset()
                }}
            >
                <FiPlus size={20} /> Add New
            </p>

            <div className="mt-16">
                <Table
                    style={{
                        backgroundColor: "#0F0D000D",
                        fontFamily: "CreatoDisplay",
                    }}
                >
                    <thead>
                        <tr>
                            <th>Qualification</th>
                            <th>
                                <p className="bg-black-100 text-yellow-100 px-3 py-1 rounded-lg w-fit">
                                    MOS Depot pays
                                </p>
                            </th>
                            <th>
                                <p className="bg-black-100 text-yellow-100 px-3 py-1 rounded-lg w-fit">
                                    MOS OP Receives
                                </p>
                            </th>
                            <th>
                                <p className="bg-black-100 text-white-100 px-3 py-1 rounded-lg w-fit">
                                    DPF Depot pays
                                </p>
                            </th>
                            <th>
                                <p className="bg-black-100 text-white-100 px-3 py-1 rounded-lg w-fit">
                                    DPF OP Receives
                                </p>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {wageArray &&
                            JSON.parse(wageArray).map(
                                (item: any, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            {
                                                qualificationData?.filter(
                                                    (item2) =>
                                                        item2._id ===
                                                        item?.jobQualificationId
                                                )[0]?.name
                                            }
                                        </td>
                                        <td>
                                            £
                                            {
                                                item?.jobRateMeetOnsiteDisplayedToDepot
                                            }
                                        </td>
                                        <td>
                                            £
                                            {
                                                item?.jobRateMeetOnsiteDisplayedToOp
                                            }
                                        </td>
                                        <td>
                                            £
                                            {
                                                item?.jobRateDepotFirstDisplayedToDepot
                                            }
                                        </td>
                                        <td>
                                            £
                                            {
                                                item?.jobRateDepotFirstDisplayedToOp
                                            }
                                        </td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Qualifications
