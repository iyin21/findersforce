import { Table } from "@mantine/core"
import dayjs from "dayjs"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"
import MobileLocationRoleTable from "../mobile-tables/mobilelocationRoleTable"

const elements = [
    {
        _id: "123456789",
        role: "Regional Manager",
        user: {
            username: "Shaquan Roberts",
            firstName: "Shaquan",
            lastName: "Roberts",
            email: "theshaquanroberts@gmail.com",
        },
        numberOfShiftManagers: 12,
        createdAt: "2022-08-25T08:53:12.211Z",
    },
    {
        _id: "123456789",
        role: "Shift Manager",
        user: {
            username: "Shaquan Roberts",
            firstName: "Shaquan",
            lastName: "Roberts",
            email: "theshaquanroberts@gmail.com",
        },
        numberOfShiftManagers: 12,
        createdAt: "2022-08-25T08:53:12.211Z",
    },
    {
        _id: "123456789",
        role: "Shift Manager",
        user: {
            username: "Shaquan Roberts",
            firstName: "Shaquan",
            lastName: "Roberts",
            email: "theshaquanroberts@gmail.com",
        },
        numberOfShiftManagers: 12,
        createdAt: "2022-08-25T08:53:12.211Z",
    },
    {
        _id: "123456789",
        role: "Shift Manager",
        user: {
            username: "Shaquan Roberts",
            firstName: "Shaquan",
            lastName: "Roberts",
            email: "theshaquanroberts@gmail.com",
        },
        numberOfShiftManagers: 12,
        createdAt: "2022-08-25T08:53:12.211Z",
    },
]
const RolesTable = () => {
    const rows = elements.map((item, index) => (
        <tr key={index} className={"text-black-100 font-medium font-creato"}>
            <td>
                <p className="flex">
                    <div className="bg-black-20 rounded-[30px] px-1.5 pb-1">
                        <span className="font-bold text-black-100 text-3sm">
                            {item.user.firstName[0].toUpperCase() +
                                item.user.lastName[0].toUpperCase()}
                        </span>
                    </div>
                    <span className="pl-2">
                        {item.user.firstName + " " + item.user.lastName}
                    </span>
                </p>
            </td>
            <td>
                <span>{item.role}</span>
            </td>
            <td>{item.user.email}</td>
            <td>
                {dayjs(item.createdAt).format("MMM D, YYYY")} |{" "}
                {dayjs(item.createdAt).format("h:mm A")}
            </td>
            <td>
                {index === 0 ? (
                    <MdEdit color="rgba(15, 13, 0, 0.6)" size={16} />
                ) : (
                    <RiDeleteBin5Line color="#E94444" size={16} />
                )}
            </td>
        </tr>
    ))

    const tableHead = ["name", "role type", "email address", "date added", ""]
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
