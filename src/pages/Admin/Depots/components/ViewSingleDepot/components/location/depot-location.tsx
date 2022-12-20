import { Menu, Table } from "@mantine/core"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { MdOutlineStarPurple500 } from "react-icons/md"
import { DepotSingleTableInterface } from "../../../../../../../types/depot/depot-inteface"
import MobileLocationTable from "./mobile-location-table"

const DepotLocationTable = ({ elements }: DepotSingleTableInterface) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{element?.location}</td>
            <td>{element?.completed}</td>
            <td>{element?.cancelled}</td>
            <td>{element?.subscription}</td>
            <td>{element?.date}</td>
            <td>
                <p className="flex items-center gap-1">
                    <MdOutlineStarPurple500 color="#FED70A" size={20} />{" "}
                    {element?.rating}
                </p>
            </td>
            <td>
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
            </td>
        </tr>
    ))
    const tableHead = [
        "NO",
        "LOCATION",
        "REGIONAL MANAGER",
        "SHIFT MANAGER",
        "SUBSCRIPTION",
        "DATE ADDED",
        "RATING",
    ]
    return (
        <>
            <div className="hidden lg:block " data-testid="shift_table">
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
                        {" "}
                        <tr>
                            {tableHead.map((item, index) => (
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
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>{" "}
            </div>
            <div className="block lg:hidden">
                <MobileLocationTable elements={elements} />
            </div>
        </>
    )
}

export default DepotLocationTable
