import { Table } from "@mantine/core"
import dayjs from "dayjs"
import { FiChevronRight } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { JobBoardResponseInterface } from "../../../../../../../types/job-board/interface"
import MobileShiftTable from "./mobile-shift-table"

export interface IShiftTableProps {
    elements: JobBoardResponseInterface[] | undefined
}

const DepotShiftTable = ({ elements }: IShiftTableProps) => {
    const navigate = useNavigate()
    const rows = elements?.map((element, index) => (
        <tr
            key={index}
            onClick={() => {
                navigate(`/shifts/${element?._id}}`)
            }}
        >
            <td>{index + 1}</td>
            <td>{element?.listingId}</td>
            <td>{element?.jobLocation?.formattedAddress}</td>
            <td>
                {element?.jobMeetingPoint === "SITE" ? (
                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        MEET ONSITE
                    </p>
                ) : (
                    <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                        DEPOT FIRST
                    </p>
                )}
            </td>
            <td>
                {dayjs(element?.createdAt).format("MMM, D,YYYY")} |{" "}
                {dayjs(element?.createdAt).format("hh:mm A")}
            </td>
            <td>{element?.applicationCount}</td>
            <td>{element?.hireCount}</td>
            <td>{element?.completedShiftCount}</td>
            <td>{element?.cancelledShiftCount}</td>
            <td>
                <FiChevronRight color="#0F0D0099" size={30} />
            </td>
        </tr>
    ))

    const tableHead = [
        "NO",
        "SHIFT ID",
        "LOCATION",
        "MODE",
        "DATE",
        "APPLIED",
        "HIRED",
        "COMPLETED",
        "CANCELLED",
        "ACTION",
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
                </Table>
            </div>
            <div className="block lg:hidden">
                {" "}
                <MobileShiftTable elements={elements} />
            </div>
        </>
    )
}

export default DepotShiftTable
