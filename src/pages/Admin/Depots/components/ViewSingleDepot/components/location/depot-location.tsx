import { Menu, Table } from "@mantine/core"
import dayjs from "dayjs"
import { Dispatch, SetStateAction } from "react"
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { MdOutlineStarPurple500 } from "react-icons/md"
import { Regions } from "../../../../../../../types/dashboard/interfaces"
import MobileLocationTable from "./mobile-location-table"

export interface DepotLocationTableInterface {
    elements: Regions[]
}

const DepotLocationTable = ({
    elements,
    setOpenDeleteModal,
    setRegionId,
}: {
    elements: DepotLocationTableInterface["elements"]
    setOpenDeleteModal: Dispatch<SetStateAction<boolean>>
    setRegionId: Dispatch<SetStateAction<string[]>>
}) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{element?.location?.formattedAddress}</td>
            <td>{element?.regionalManagerCount || 0} </td>
            <td>{element?.shiftManagerCount || 0}</td>
            <td>{element?.subscriptionPlan}</td>
            <td>{dayjs(element?.createdAt).format("MMM, D, YYYY")}</td>
            <td>
                <p className="flex items-center gap-1">
                    <MdOutlineStarPurple500 color="#FED70A" size={20} />{" "}
                    {element?.averageRating}
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
                                    setOpenDeleteModal(true)
                                    setRegionId([element?._id])
                                }}
                            >
                                Remove {element?.location?.formattedAddress}
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
                <MobileLocationTable
                    elements={elements}
                    setOpenDeleteModal={setOpenDeleteModal}
                    setRegionId={setRegionId}
                />
            </div>
        </>
    )
}

export default DepotLocationTable
