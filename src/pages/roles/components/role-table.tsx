import { Menu, Table } from "@mantine/core"
import { IoEllipsisVerticalSharp } from "react-icons/io5"

export interface RoleTableInterface {
    status: "active" | "pending"
    elements: {
        name: string
        location: string
        email: string
        date: string
        role: string
        status: string
    }[]
}

const RoleTable = ({ elements, status }: RoleTableInterface) => {
    const rows = elements.map((element, index) => (
        <tr key={index}>
            <td>{element.name}</td>
            <td>{element.location}</td>
            <td>{element.email}</td>
            <td>{element.date}</td>
            {status === "active" && <td>{element.role}</td>}
            <td>
                {element.status === "active" ? (
                    <p className="text-green-100">Active</p>
                ) : (
                    <p className="text-red-100">Inactive</p>
                )}{" "}
            </td>

            <td className="relative">
                {status === "active" ? (
                    <Menu
                        width={200}
                        shadow="md"
                        position="left-start"
                        offset={8}
                        closeOnClickOutside={true}
                    >
                        <Menu.Target>
                            <IoEllipsisVerticalSharp />
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item>Make Regional Manager</Menu.Item>

                            <Menu.Item className="text-red-100">
                                Delete {element.name}
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                ) : (
                    <p className="text-white-100 bg-black-100 rounded-full text-center text-md p-2">
                        Resend Invite
                    </p>
                )}
            </td>
        </tr>
    ))

    const tableHead = [
        { list: "NAME" },
        { list: "LOCATION" },
        { list: "EMAIL" },
        { list: "DATE ADDED" },
        // { list: "ROLE" },
        // { list: "STATUS" },
        // { list: "ACTION" },
    ]
    return (
        <>
            <div className="hidden lg:block " data-testid="job_board">
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
                        <tr>
                            {tableHead.map((item, index) => (
                                <th
                                    key={index}
                                    style={{
                                        borderBottom: "none",
                                    }}
                                >
                                    <p className="text-black-30 ">
                                        {item?.list}
                                    </p>
                                </th>
                            ))}
                            {status === "active" && (
                                <th
                                    style={{
                                        borderBottom: "none",
                                    }}
                                >
                                    <p className="text-black-30 ">ROLE</p>
                                </th>
                            )}
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                            >
                                <p className="text-black-30 ">STATUS</p>
                            </th>
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                            >
                                <p className="text-black-30 ">ACTION</p>
                            </th>
                        </tr>
                    </thead>

                    <tbody>{rows}</tbody>
                </Table>
            </div>
        </>
    )
}

export default RoleTable
