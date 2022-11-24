import { Menu } from "@mantine/core"
import dayjs from "dayjs"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { RoleTableInterface } from "./role-table"

const MobileRoleTable = ({
    elements,
    status,
    setUserId,
    setOpenConfirmDelete,
    setUserName,
    handleRevokeInvite,
    handleResendInvite,
}: RoleTableInterface) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded-lg bg-black-5 mb-4" key={index}>
                    <div className="flex justify-between  items-center border-b border-black-10 p-4">
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                FULL NAME
                            </h6>
                            <p>
                                {element?.firstName} {element?.lastName}
                            </p>
                        </div>
                        <Menu
                            width={200}
                            shadow="md"
                            position="left-start"
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
                                        Delete {element?.firstName}{" "}
                                        {element?.lastName}
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
                    </div>
                    <div className="p-4">
                        <div>
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">
                                {element?.regionAddress || "N/A"}
                            </p>
                        </div>
                        <div className="flex justify-between items-center gap-2 mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    EMAIL
                                </h6>
                                <p className="text-2md mt-1">{element.email}</p>
                            </div>
                            {status === "pending" && (
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        STATUS
                                    </h6>

                                    <p className="text-red-100  text-center p-1  text-3sm w-fit px-3 py-1">
                                        Inactive
                                    </p>
                                </div>
                            )}
                        </div>{" "}
                        <div className="mt-3">
                            <h6 className="text-black-50 text-3sm">
                                DATE ADDED
                            </h6>
                            <p className="text-2md mt-1">
                                {" "}
                                {dayjs(element?.createdAt).format(
                                    "MMM D, YYYY"
                                )}{" "}
                                | {dayjs(element?.createdAt).format("hh:mm a")}
                            </p>
                        </div>
                        <div className="mt-3">
                            <h6 className="text-black-50 text-3sm">ROLE</h6>
                            <p className="text-2md mt-1">
                                {element.invitedRole}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileRoleTable
