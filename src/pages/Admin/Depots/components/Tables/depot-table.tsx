import { Table } from "@mantine/core"
import dayjs from "dayjs"
import { FiChevronRight } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { IRolesResponse } from "../../../../../types/roles/role-interface"
import MobileDepotTable from "./mobile-depot-table"

export interface DepotTableInterface {
    status: "active" | "pending"
    elements: IRolesResponse[] | undefined
    handleRevokeInvite: () => void
    setUserId: (id: string) => void
}

const DepotTable = ({
    status,
    elements,
    handleRevokeInvite,
    setUserId,
}: DepotTableInterface) => {
    const navigate = useNavigate()
    const handleNavigate = (id: string) => {
        if (status === "active") {
            navigate(`/depots/${id}`)
        }
    }
    const rows = elements?.map((element, index) => (
        <tr key={index} onClick={() => handleNavigate(element._id)}>
            <td>{index + 1}</td>
            <td>
                {element?.firstName} {element?.lastName}
            </td>
            <td>{element?.email}</td>
            <td>{element?.depotCompany?.address || element?.regionAddress}</td>
            {status === "active" && (
                <>
                    <td>{element?.depotCompany?.completedShifts}</td>
                    <td>{element?.depotCompany?.totalOperatives}</td>
                    <td>{element?.depotCompany?.regionLimit}</td>
                    <td>
                        <FiChevronRight color="#0F0D0099" size={30} />
                    </td>
                </>
            )}

            {status === "pending" && (
                <>
                    <td>{dayjs(element.createdAt).format("MMM, D, YYYY")}</td>
                    <td>
                        <p
                            className="text-red-100"
                            onClick={() => {
                                handleRevokeInvite()
                                setUserId(element._id)
                            }}
                        >
                            {" "}
                            Revoke Invite
                        </p>
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
                <MobileDepotTable
                    elements={elements}
                    status={status}
                    handleRevokeInvite={handleRevokeInvite}
                    setUserId={setUserId}
                />
            </div>
        </>
    )
}

export default DepotTable
