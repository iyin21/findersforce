import { Table } from "@mantine/core"
import { FiChevronRight } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import MobileDepotTable from "./mobile-depot-table"

export interface DepotTableInterface {
    status: "active" | "pending"
    elements: {
        _id: string
        name: string
        email: string
        headquarter: string
        date: string
        shift: string
        operatives: string
        location: string
    }[]
}

const DepotTable = ({ status, elements }: DepotTableInterface) => {
    const navigate = useNavigate()
    const handleNavigate = (id: string) => {
        if (status === "active") {
            navigate(`/depots/${id}`)
        }
    }
    const rows = elements?.map((element, index) => (
        <tr key={index} onClick={() => handleNavigate(element._id)}>
            <td>{index + 1}</td>
            <td>{element?.name}</td>
            <td>{element?.email}</td>
            <td>{element?.headquarter}</td>
            {status === "active" && (
                <>
                    <td>{element?.shift}</td>
                    <td>{element?.operatives}</td>
                    <td>{element?.location}</td>
                    <td>
                        <FiChevronRight color="#0F0D0099" size={30} />
                    </td>
                </>
            )}

            {status === "pending" && (
                <>
                    <td>{element.date}</td>
                    <td>
                        <p className="text-red-100"> Revoke Invite</p>
                    </td>
                </>
            )}
        </tr>
    ))

    const activeTableHead = [
        "NO",
        "NAME",
        "EMAIL",
        "HEADQUARTER",
        "SHIFTS",
        "OPERATIVES",
        "LOCATIONS",
    ]
    const pendingTableHead = [
        "NO",
        "NAME",
        "EMAIL",
        "HEADQUARTER",
        "DATE ADDED",
        "ACTION",
    ]
    return (
        <>
            <div className="hidden lg:block " data-testid="depot_table">
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
                        {status === "active" && (
                            <tr>
                                {activeTableHead.map((item, index) => (
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
                        )}
                        {status === "pending" && (
                            <tr>
                                {pendingTableHead.map((item, index) => (
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
                        )}
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>

            <div className="block lg:hidden">
                <MobileDepotTable elements={elements} status={status} />
            </div>
        </>
    )
}

export default DepotTable
