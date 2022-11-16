import { Menu } from "@mantine/core"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { RoleTableInterface } from "./role-table"

const MobileRoleTable = ({ elements, status }: RoleTableInterface) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded-lg bg-black-5 mb-4" key={index}>
                    <div className="flex justify-between  items-center border-b border-black-10 p-4">
                        <div>
                            <p>{element.name}</p>
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
                                <Menu.Item className="text-red-100">
                                    Delete {element.name}
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                    <div className="p-4">
                        <div>
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">
                                {element?.location || "N/A"}
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
                        </div>
                        <div className="flex justify-between items-center gap-2 mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    DATE ADDED
                                </h6>
                                <p className="text-2md mt-1">{element.date}</p>
                            </div>

                            <div>
                                <h6 className="text-black-50 text-3sm">ROLE</h6>
                                <p className="text-2md mt-1">{element.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileRoleTable
