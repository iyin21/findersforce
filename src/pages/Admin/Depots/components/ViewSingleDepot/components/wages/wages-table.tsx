import { Table } from "@mantine/core"
import { Dispatch, SetStateAction } from "react"
import { FiChevronRight } from "react-icons/fi"
import { DepotSingleTableInterface } from "../../../../../../../types/depot/depot-inteface"

const DepotWagesTable = ({
    elements,
    setOpenEditWageModal,
}: {
    elements: DepotSingleTableInterface["elements"]
    setOpenEditWageModal: Dispatch<SetStateAction<boolean>>
}) => {
    const rows = elements?.map((element, index) => (
        <tr key={index} onClick={() => setOpenEditWageModal(true)}>
            <td>{index + 1}</td>
            <td>{element?.qualification}</td>
            <td>{element?.mos_depots_pays}</td>
            <td>{element?.mos_op_receives}</td>
            <td>{element?.dpf_depots_pays}</td>
            <td>{element?.dpf_op_receives}</td>
            <td>{element?.registered_by}</td>
            <td>{element?.date}</td>
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
        <div>
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
        </div>
    )
}

export default DepotWagesTable
