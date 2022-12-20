import { Table } from "@mantine/core"
import { FiChevronRight } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { DepotSingleTableInterface } from "../../../../../../../types/depot/depot-inteface"
import MobileShiftTable from "./mobile-shift-table"

const DepotShiftTable = ({ elements }: DepotSingleTableInterface) => {
    const navigate = useNavigate()
    const rows = elements?.map((element, index) => (
        <tr
            key={index}
            onClick={() => {
                navigate(`/planner/${element?._id}}`)
            }}
        >
            <td>{index + 1}</td>
            <td>{element?.shift_id}</td>
            <td>{element?.location}</td>
            <td>
                <p className="bg-yellow-100 w-fit rounded-full px-3 py-1">
                    {element?.mode}
                </p>{" "}
            </td>
            <td>{element?.date}</td>
            <td>{element?.applied}</td>
            <td>{element?.hired}</td>
            <td>{element?.completed}</td>
            <td>{element?.cancelled}</td>
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
