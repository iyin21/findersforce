import { Table } from "@mantine/core"
import dayjs from "dayjs"
import { IRolesResponse } from "../../../../../../../types/roles/role-interface"
import MobileManagerTable from "./mobile-manager-table"

export interface ManagersTableProps {
    elements: IRolesResponse[] | undefined
}

const ManagersTable = ({ elements }: ManagersTableProps) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                {element?.firstName} {element?.lastName}
            </td>
            <td>{element?.email}</td>
            <td>{element?.depotCompany?.address}</td>
            <td>{element?.depotRole}</td>
            <td>{dayjs(element.createdAt).format("MMM, D, YYYY")}</td>
        </tr>
    ))

    const tableHead = ["NO", "NAME", "EMAIL", " LOCATION", "ROLE", "DATE ADDED"]
    return (
        <>
            <div className="hidden lg:block " data-testid="managers_table">
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
                <MobileManagerTable elements={elements} />
            </div>
        </>
    )
}

export default ManagersTable
