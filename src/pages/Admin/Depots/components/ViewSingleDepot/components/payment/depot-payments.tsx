import { Table } from "@mantine/core"
import { FiCheck } from "react-icons/fi"
import { Button } from "../../../../../../../components"
import { DepotSingleTableInterface } from "../../../../../../../types/depot/depot-inteface"

const DepotPaymentTable = ({ elements }: DepotSingleTableInterface) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{element?.date}</td>
            <td>{element?.depot}</td>
            <td>{element?.email}</td>
            <td>{element?.month}</td>
            <td>
                <a
                    href="/"
                    download={"/"}
                    className="border-b border-black-100"
                >
                    View receipt
                </a>
            </td>
            <td>
                <Button variant="green" iconLeft={<FiCheck size={25} />}>
                    Verify
                </Button>
            </td>
        </tr>
    ))

    const tableHead = ["NO", "DATE RECEIVED", "DEPOT", "EMAIL", "MONTH"]
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
            </div>{" "}
        </>
    )
}

export default DepotPaymentTable
