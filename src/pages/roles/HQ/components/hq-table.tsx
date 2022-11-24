import { Menu, Table } from "@mantine/core"
import dayjs from "dayjs"
import { Dispatch, SetStateAction } from "react"
import { BsFillTrashFill } from "react-icons/bs"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { IRolesResponse } from "../../../../types/roles/role-interface"
import MobileHQRoleTable from "./mobile-hq-roles"

export interface HQRoleTableInterface {
    status: "REGIONAL-MANAGER" | "pending" | "SHIFT-MANAGER"
    elements: IRolesResponse[] | undefined
    setUserId: Dispatch<SetStateAction<string>>
    setOpenConfirmDelete: Dispatch<SetStateAction<boolean>>
    setUserEmail: Dispatch<SetStateAction<string>>
    handleRevokeInvite: () => void
    handleResendInvite: () => void
}

const HQRoleTable = ({
    status,
    elements,
    setUserId,
    setUserEmail,
    handleRevokeInvite,
    handleResendInvite,
    setOpenConfirmDelete,
}: HQRoleTableInterface) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            {status === "pending" ? (
                <td className="hidden"></td>
            ) : (
                <td>
                    <p>
                        {element?.firstName} {element?.lastName}
                    </p>
                </td>
            )}

            <td>{element.email}</td>
            <td>{element?.regionAddress || "N/A"} </td>
            {status === "SHIFT-MANAGER" && <td>{element?.inviterRole}</td>}
            {status === "pending" && <td>{element?.invitedRole}</td>}
            <td>
                {dayjs(element?.createdAt).format("MMM D, YYYY")} |{" "}
                {dayjs(element?.createdAt).format("hh:mm a")}
            </td>
            {status === "pending" ? (
                <td className="hidden"></td>
            ) : (
                <td
                    onClick={() => {
                        setOpenConfirmDelete(true)
                        setUserId(element?._id)
                        setUserEmail(element?.email)
                    }}
                >
                    <BsFillTrashFill color="#E94444" size={25} />
                </td>
            )}
            <td>
                {status === "pending" && (
                    <p className="text-red-100">Inactive</p>
                )}
            </td>
            <td>
                {status === "pending" && (
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
                            <div>
                                <Menu.Item
                                    className="text-black-100"
                                    onClick={() => {
                                        handleResendInvite()
                                        setUserId(element?._id)
                                        setUserEmail(element?.email)
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
                        </Menu.Dropdown>
                    </Menu>
                )}
            </td>
        </tr>
    ))

    const rMTableHead = ["NAME", "EMAIL ADDRESS", "LOCATION", "DATE ADDED"]
    const sMTableHead = [
        "NAME",
        "EMAIL ADDRESS",
        "LOCATION",
        "REPORTS TO",
        "DATE ADDED",
    ]
    const pendingTableHead = [
        "EMAIL",
        "LOCATION",
        "ROLE",
        "DATE ADDED",
        "STATUS",
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
                        {status === "REGIONAL-MANAGER" && (
                            <tr>
                                {rMTableHead.map((item, index) => (
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
                        )}
                        {status === "SHIFT-MANAGER" && (
                            <tr>
                                {sMTableHead.map((item, index) => (
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
                        )}
                        {status === "pending" && (
                            <tr>
                                {pendingTableHead.map((item, index) => (
                                    <th
                                        key={index}
                                        style={{
                                            borderBottom: "none",
                                        }}
                                    >
                                        {" "}
                                        <p className="text-black-30 ">{item}</p>
                                    </th>
                                ))}
                            </tr>
                        )}
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden">
                <MobileHQRoleTable
                    status={status}
                    elements={elements}
                    setOpenConfirmDelete={setOpenConfirmDelete}
                    setUserId={setUserId}
                    setUserEmail={setUserEmail}
                    handleRevokeInvite={handleRevokeInvite}
                    handleResendInvite={handleResendInvite}
                />
            </div>
        </>
    )
}

export default HQRoleTable
