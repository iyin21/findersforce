import { Table } from "@mantine/core"
import dayjs from "dayjs"
import { FiCheck } from "react-icons/fi"
import { Button } from "../../../../../../../components"
import { IPaymentResponse } from "../../../../../../../types/depot/depot-inteface"
import MobileDepotPayment from "./mobile-payment"

export interface DepotPaymentTableProps {
    elements: IPaymentResponse[]
}

const DepotPaymentTable = ({ elements }: DepotPaymentTableProps) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{dayjs(element?.createdAt).format("MMM D, YYYY")}</td>
            <td>{element?.schedule?.jobLocation?.formattedAddress || "N/A"}</td>
            <td>{element?.depot?.email || "N/A"}</td>
            <td>{dayjs(element?.createdAt).format("MMM, YYYY")}</td>
            <td>
                <a
                    href="/"
                    download={`${element?.schedule?.additionalInfoImageUrls}`}
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

    const tableHead = ["NO", "DATE RECEIVED", "LOCATION", "EMAIL", "MONTH"]
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
            <div className="block lg:hidden">
                <MobileDepotPayment elements={elements} />
            </div>
        </>
    )
}

export default DepotPaymentTable
