import { Menu, Table } from "@mantine/core"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import MobileRoleTable from "./mobile-role-table"

export interface RoleTableInterface {
    status: "accepted" | "pending"
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
            <td>{element.role}</td>
            <td>
                {status === "pending" && (
                    <p className="text-red-100">Inactive</p>
                )}
            </td>

            <td className="relative">
                <Menu
                    width={200}
                    shadow="md"
                    offset={8}
                    closeOnClickOutside={true}
                >
                    <Menu.Target>
                        <div>
                            <IoEllipsisVerticalSharp />
                        </div>
                    </Menu.Target>

                    <Menu.Dropdown>
                        {status === "accepted" && (
                            <Menu.Item className="text-red-100">
                                Delete {element.name}
                            </Menu.Item>
                        )}
                        {status === "pending" && (
                            <div>
                                <Menu.Item className="text-black-100">
                                    Resend Invite
                                </Menu.Item>
                                <Menu.Item className="text-red-100">
                                    Revoke Invite
                                </Menu.Item>
                            </div>
                        )}
                    </Menu.Dropdown>
                </Menu>
            </td>
        </tr>
    ))

    const tableHead = [
        { list: "NAME" },
        { list: "LOCATION" },
        { list: "EMAIL" },
        { list: "DATE ADDED" },
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
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                            >
                                <p className="text-black-30 ">ROLE</p>
                            </th>
                            {status === "pending" && (
                                <th
                                    style={{
                                        borderBottom: "none",
                                    }}
                                >
                                    <p className="text-black-30 ">STATUS</p>
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden">
                <MobileRoleTable status={status} elements={elements} />
            </div>
        </>
    )
}

export default RoleTable
