import { Table } from "@mantine/core"
import { DepotSingleTableInterface } from "../../../../../../../types/depot/depot-inteface"

const ManagersTable = ({ elements }: DepotSingleTableInterface) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{element?.name}</td>
            <td>{element?.email}</td>
            <td>{element?.location}</td>
            <td>{element?.role}</td>
            <td>{element?.date}</td>
        </tr>
    ))

    const tableHead = ["NO", "NAME", "EMAIL", " LOCATION", "ROLE", "DATE ADDED"]
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
        </>
    )
}

export default ManagersTable
