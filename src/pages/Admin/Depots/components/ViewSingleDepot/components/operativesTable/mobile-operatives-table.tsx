import { Menu } from "@mantine/core"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { DepotSingleTableInterface } from "../../../../../../../types/depot/depot-inteface"

const MobileOperativesTable = ({ elements }: DepotSingleTableInterface) => {
    const navigate = useNavigate()

    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4 p-4" key={index}>
                    <div className="flex justify-between items-center border-b border-black-20 pb-2">
                        <div>
                            <h6 className="text-black-50 text-3sm">NAME</h6>
                            <p className="text-2md mt-1">{element?.name}</p>
                        </div>
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
                                            navigate(
                                                `/planner/${element?._id}}`
                                            )
                                        }}
                                    >
                                        View shift history
                                    </Menu.Item>
                                </div>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                    <div className="flex  justify-between items-center mt-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">EMAIL</h6>
                            <p className="text-2md mt-1">{element?.email}</p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                SHIFT JOINED
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.shift_joined}
                            </p>
                        </div>
                    </div>
                    <div className="my-4">
                        <h6 className="text-black-50 text-3sm">PHONE NUMBER</h6>
                        <p className="text-2md mt-1">{element?.phone_number}</p>
                    </div>
                    <div className="flex  justify-between items-center mt-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                QUALIFICATION
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.qualification}
                            </p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                DATE JOINED
                            </h6>
                            <p className="text-2md mt-1">{element?.date}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileOperativesTable
