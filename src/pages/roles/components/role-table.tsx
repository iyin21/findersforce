import { Menu, Table } from "@mantine/core"
import dayjs from "dayjs"
import { Dispatch, SetStateAction } from "react"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { IRolesResponse } from "../../../types/roles/role-interface"
import MobileRoleTable from "./mobile-role-table"

export interface RoleTableInterface {
    status: "accepted" | "pending"
    elements: IRolesResponse[] | undefined
    setOpenConfirmDelete: Dispatch<SetStateAction<boolean>>
    setUserId: Dispatch<SetStateAction<string>>
    setUserName: Dispatch<SetStateAction<string>>
    handleRevokeInvite: () => void
    handleResendInvite: () => void
}

const RoleTable = ({
    elements,
    status,
    setOpenConfirmDelete,
    setUserId,
    setUserName,
    handleRevokeInvite,
    handleResendInvite,
}: RoleTableInterface) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>
                {element?.firstName} {element?.lastName}
            </td>
            <td>{element?.address}</td>
            <td>{element.email}</td>
            <td>
                {dayjs(element?.createdAt).format("MMM D, YYYY")} |{" "}
                {dayjs(element?.createdAt).format("hh:mm a")}
            </td>
            <td> {element?.invitedRole}</td>
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
                            <Menu.Item
                                className="text-red-100"
                                onClick={() => {
                                    setOpenConfirmDelete(true)
                                    setUserId(element?._id)
                                    setUserName(element?.firstName)
                                }}
                            >
                                Delete {element?.firstName} {element?.lastName}
                            </Menu.Item>
                        )}
                        {status === "pending" && (
                            <div>
                                <Menu.Item
                                    className="text-black-100"
                                    onClick={() => {
                                        handleResendInvite()
                                        setUserId(element?._id)
                                    }}
                                >
                                    Resend Invite
                                </Menu.Item>
                                <Menu.Item
                                    className="text-red-100"
                                    onClick={() => {
                                        handleRevokeInvite()
                                        setUserId(element?._id)
                                    }}
                                >
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
                <MobileRoleTable
                    status={status}
                    elements={elements}
                    setOpenConfirmDelete={setOpenConfirmDelete}
                    setUserId={setUserId}
                    setUserName={setUserName}
                    handleRevokeInvite={handleRevokeInvite}
                    handleResendInvite={handleResendInvite}
                />
            </div>
        </>
    )
}

export default RoleTable
