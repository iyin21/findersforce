import { Table } from "@mantine/core"
import dayjs from "dayjs"
import { Dispatch, SetStateAction } from "react"
import { FiChevronRight } from "react-icons/fi"
import { IJobRateResponse } from "../../../../../../../types/depot/depot-inteface"
import MobileWageTable from "./mobile-wage-table"
import { useGetJobQualification } from "../../../../../../../hooks/job-board/useJobBoard.hooks"

export interface DepotWagesTableProps {
    elements: IJobRateResponse[]
}

const DepotWagesTable = ({
    elements,
    setOpenEditWageModal,
    setWageId,
}: {
    elements: DepotWagesTableProps["elements"]
    setOpenEditWageModal: Dispatch<SetStateAction<boolean>>
    setWageId: Dispatch<SetStateAction<string>>
}) => {
    const { data: qualificationData } = useGetJobQualification()
    const rows = elements?.map((element, index) => (
        <tr
            key={index}
            onClick={() => {
                setOpenEditWageModal(true)
                setWageId(element._id)
            }}
        >
            <td>{index + 1}</td>
            <td>
                {
                    qualificationData?.filter(
                        (item) => item?._id === element.jobQualification
                    )[0]?.name
                }
            </td>
            <td>{element?.jobRateMeetOnsiteDisplayedToDepot}</td>
            <td>{element?.jobRateMeetOnsiteDisplayedToOp}</td>
            <td>{element?.jobRateDepotFirstDisplayedToDepot}</td>
            <td>{element?.jobRateDepotFirstDisplayedToOp}</td>
            <td>{element?.company?.name}</td>
            <td>{dayjs(element?.company?.createdAt).format("MMM D, YYYY")}</td>
            <td>
                <FiChevronRight color="#0F0D0099" size={30} />
            </td>
        </tr>
    ))

    const tableHead = [
        "NO",
        "QUALIFICATION",
        "MOS (DEPOT PAYS)",
        "MOS (OP RECEIVES)",
        "DPF (DEPOT PAYS)",
        "DPF (OP RECEIVES)",
        "REGISTERED BY",
        "DATE ADDED",
    ]
    return (
        <>
            <div className="hidden lg:block " data-testid="shift_table">
                <Table
                    style={{
                        backgroundColor: "#FFFFFF",
                        fontFamily: "CreatoDisplay",
                    }}
                    className={"table"}
                    verticalSpacing="md"
                    data-testid="table-data"
                    role="grid"
                >
                    <thead>
                        {" "}
                        <tr>
                            {tableHead.map((item, index) => (
                                <th
                                    key={index}
                                    style={{
                                        borderBottom: "none",
                                    }}
                                >
                                    <p className="text-black-30 ">{item}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>{" "}
            </div>
            <div className="block lg:hidden">
                <MobileWageTable
                    elements={elements}
                    setOpenEditWageModal={setOpenEditWageModal}
                    qualificationData={qualificationData}
                />
            </div>
        </>
    )
}

export default DepotWagesTable
