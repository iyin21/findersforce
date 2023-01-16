import { Table } from "@mantine/core"
import dayjs from "dayjs"
import { RiDeleteBin5Line } from "react-icons/ri"
import AllManagersResponse from "types/location/interface"
import MobileLocationRoleTable from "../mobile-tables/mobilelocationRoleTable"

const RolesTable = ( {elements}: {elements: AllManagersResponse["data"]}) => {
    const rows = elements.map((item, index) => (
        <tr key={index} className={"text-black-100 font-medium font-creato"}>
            <td>{index + 1}</td>
            <td>
                <p className="flex">
                    <div className="bg-black-20 rounded-[30px] px-1.5 pb-1">
                        <span className="font-bold text-black-100 text-3sm">
                            {item.firstName[0].toUpperCase() +
                                item.lastName[0].toUpperCase()}
                        </span>
                    </div>
                    <span className="pl-2">
                        {item.firstName + " " + item.lastName}
                    </span>
                </p>
            </td>
            <td>
                <span>{item.depotRole}</span>
            </td>
            <td>{item.email}</td>
            <td>
                {dayjs(item.createdAt).format("MMM D, YYYY")} |{" "}
                {dayjs(item.createdAt).format("h:mm A")}
            </td>
            <td>
                <RiDeleteBin5Line color="#E94444" size={16} />
            </td>
        </tr>
    ))

    const tableHead = ["no", "name", "role type", "email address", "added", ""]
    return (
        <>
            <div className="hidden lg:block pt-6">
                <Table verticalSpacing="md">
                    <thead>
                        <tr>
                            {tableHead.map((item, index) => (
                                <th
                                    key={index}
                                    style={{
                                        color: "rgba(15, 13, 0, 0.3)",
                                        fontSize: "13px",
                                        borderBottom: "none",
                                    }}
                                    className="text-black-30"
                                >
                                    {item.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden">
                <MobileLocationRoleTable elements={elements} />
            </div>
        </>
    )
}
export default RolesTable
