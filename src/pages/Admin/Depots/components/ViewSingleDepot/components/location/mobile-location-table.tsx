import { Menu } from "@mantine/core"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { MdOutlineStarPurple500 } from "react-icons/md"
import { DepotSingleTableInterface } from "../../../../../../../types/depot/depot-inteface"

const MobileLocationTable = ({ elements }: DepotSingleTableInterface) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4 p-4" key={index}>
                    <div className="flex justify-between items-center border-b border-black-20 pb-2">
                        <div>
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">{element?.location}</p>
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
                                        className="text-red-100"
                                        onClick={() => {
                                            // setOpenDeactivateModal(true)
                                        }}
                                    >
                                        Remove {element?.location}
                                    </Menu.Item>
                                </div>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <div>
                            <h6 className="text-black-50 text-sm md:text3sm">
                                COMPLETED SHIFTS
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.completed}
                            </p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-sm md:text3sm">
                                CANCELLED SHIFTS
                            </h6>
                            <p className="text-2md mt-1 text-end">
                                {element?.cancelled}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">MANAGERS</h6>
                            <p className="text-2md mt-1">{element?.managers}</p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-3sm ">RATING</h6>
                            <p className="flex items-center gap-1">
                                <MdOutlineStarPurple500
                                    color="#FED70A"
                                    size={20}
                                />{" "}
                                {element?.rating}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h6 className="text-black-50 text-3sm">DATE ADDED</h6>
                        <p className="text-2md mt-1">{element?.date}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileLocationTable
