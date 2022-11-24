import { Menu } from "@mantine/core"
import dayjs from "dayjs"
import { BsFillTrashFill } from "react-icons/bs"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { HQRoleTableInterface } from "./hq-table"

const MobileHQRoleTable = ({
    status,
    elements,
    setUserId,
    setUserEmail,
    handleRevokeInvite,
    handleResendInvite,
    setOpenConfirmDelete,
}: HQRoleTableInterface) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded-lg bg-black-5 mb-4" key={index}>
                    <div className="flex justify-between  items-center border-b border-black-10 p-4">
                        {status === "pending" ? (
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    EMAIL
                                </h6>
                                <p className="text-2md mt-1">{element.email}</p>
                            </div>
                        ) : (
                            <>
                                <div className=" items-center ">
                                    <h6 className="text-black-50 text-3sm">
                                        FULL NAME
                                    </h6>
                                    <p>
                                        {element?.firstName} {element?.lastName}
                                    </p>
                                </div>
                                <div
                                    onClick={() => {
                                        setOpenConfirmDelete(true)
                                        setUserId(element?._id)
                                        setUserEmail(element?.email)
                                    }}
                                >
                                    <BsFillTrashFill
                                        color="#E94444"
                                        size={25}
                                    />
                                </div>
                            </>
                        )}

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
                    </div>
                    <div className="p-4">
                        <div>
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">
                                {element?.regionAddress || "N/A"}
                            </p>
                        </div>
                        {status === "pending" ? (
                            ""
                        ) : (
                            <div className="mt-3">
                                <h6 className="text-black-50 text-3sm">
                                    EMAIL
                                </h6>
                                <p className="text-2md mt-1">
                                    {element?.email || "N/A"}
                                </p>
                            </div>
                        )}
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
                        {status === "SHIFT-MANAGER" && (
                            <div className="mt-3">
                                <h6 className="text-black-50 text-3sm">
                                    REPORTS TO
                                </h6>
                                <p className="text-2md mt-1">
                                    {element?.inviterRole}
                                </p>
                            </div>
                        )}
                        {status === "pending" && (
                            <div className="mt-4">
                                <h6 className="text-black-50 text-3sm">
                                    STATUS
                                </h6>

                                <p className="text-red-100 p-1  text-lg  py-1">
                                    Inactive
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileHQRoleTable
