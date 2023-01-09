import { Menu, Table } from "@mantine/core"
import dayjs from "dayjs"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { IOperativeResponse } from "../../../../../../../types/depot/depot-inteface"
import MobileOperativesTable from "./mobile-operatives-table"

export interface OperativeTableProps {
    elements: IOperativeResponse[]
}

const OperativeTable = ({ elements }: OperativeTableProps) => {
    const navigate = useNavigate()

    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                {element?.firstName} {element?.lastName}
            </td>
            <td>{element?.email}</td>
            <td>{element?.phone_number || "N/A"} </td>
            <td>{element?.completedShifts}</td>
            <td>
                {element?.qualification.map((item) => (
                    <span key={item?._id} className="ml-1">
                        {item?.name}/
                    </span>
                ))}
            </td>
            <td>{dayjs(element?.createdAt).format("MMM, D, YYYY")}</td>
            <td>
                <Menu
                    width={200}
                    shadow="md"
                    offset={8}
                    closeOnClickOutside={true}
                >
                    <Menu.Target>
                        <div>
                            <IoEllipsisVerticalSharp />
                        </div>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <div>
                            <Menu.Item
                                className="text-black-100"
                                onClick={() => {
                                    navigate(`/shifts/${element?._id}}`)
                                }}
                            >
                                View shift history
                            </Menu.Item>
                        </div>
                    </Menu.Dropdown>
                </Menu>
            </td>
        </tr>
    ))

    const tableHead = [
        "NO",
        "NAME",
        "EMAIL",
        "PHONE NUMBER ",
        "SHIFT JOINED",
        "QUALIFICATION",
        "DATE JOINED",
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
                </Table>{" "}
            </div>
            <div className="block lg:hidden">
                <MobileOperativesTable elements={elements} />
            </div>
        </>
    )
}

export default OperativeTable
