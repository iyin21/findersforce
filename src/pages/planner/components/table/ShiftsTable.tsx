import { Menu, Table } from "@mantine/core"
import { IoIosArrowForward } from "react-icons/io"
import {
    Result,
    ShiftsTableInterface,
} from "../../../../types/planner/interfaces"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import MobileShiftsTable from "./MobileShiftsTable"
import TimeEstimate from "../TimeEstimate"
import { IoEllipsisVerticalSharp } from "react-icons/io5"

const ShiftsTable = ({ elements, status }: ShiftsTableInterface) => {
    const navigate = useNavigate()

    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td className="font-bold">{element?.jobListing?.listingId}</td>
            <td>{element?.jobListing?.jobLocation?.formattedAddress}</td>
            {status !== "ongoing" ? (
                <td>
                    {dayjs(element?.jobListing?.jobDate).format("MMM D, YYYY")}{" "}
                    |{" "}
                    {dayjs(element?.jobListing?.shiftStartTime).format("HH:mm")}{" "}
                    - {dayjs(element?.jobListing.shiftEndTime).format("HH:mm")}
                </td>
            ) : (
                <td>
                    {dayjs(element?.jobListing?.shiftStartTime).format("HH:mm")}{" "}
                    - {dayjs(element?.jobListing.shiftEndTime).format("HH:mm")}
                </td>
            )}
            {element?.jobListing.jobMeetingPoint === "DEPOT" ? (
                <td>
                    {element?.jobListing?.jobRate?.currency}
                    {
                        element?.jobListing?.jobRate
                            ?.jobRateDepotFirstDisplayedToDepot
                    }
                </td>
            ) : (
                <td>
                    {element?.jobListing?.jobRate?.currency}
                    {
                        element?.jobListing?.jobRate
                            ?.jobRateMeetOnsiteDisplayedToDepot
                    }
                </td>
            )}

            <td>
                {element?.jobListing?.jobMeetingPoint === "SITE" ? (
                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        MEET ONSITE
                    </p>
                ) : (
                    <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                        DEPOT FIRST
                    </p>
                )}
            </td>
            {status === "completed" ? (
                element?.jobListing?.fullyPaidByDepot === true ? (
                    <td>
                        <p className="text-green-100 bg-green-10 rounded-3xl text-center border-green-100 border-2 font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                            PAID
                        </p>
                    </td>
                ) : (
                    <td>
                        <p className="text-red-100 bg-red-10 rounded-3xl text-center border-red-100 border-2 font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                            NOT PAID
                        </p>
                    </td>
                )
            ) : null}
            {status === "ongoing" && (
                <td>
                    <TimeEstimate
                        initialDate={
                            new Date(element?.jobListing?.shiftEndTime)
                        }
                    />
                </td>
            )}

            {status === "completed" ? (
                <td>
                    <CustomMenu element={element} status={status} />
                </td>
            ) : (
                <td
                    role="gridcell"
                    className="cursor-pointer h-[60px] border-b border-neutral-5"
                    data-testid="shifts_table"
                >
                    <IoIosArrowForward
                        size={30}
                        style={{ color: "#889088" }}
                        onClick={() =>
                            navigate(`/planner/${element?.jobListing?._id}`, {
                                state: {
                                    status: status,
                                    scheduleId: element?._id,
                                },
                            })
                        }
                    />
                </td>
            )}
        </tr>
    ))

    const tableHeadCancelled = [
        { list: "NO" },
        { list: "SHIFT" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "WAGES" },
        { list: "MODE" },
    ]
    const tableHeadActive = [
        { list: "NO" },
        { list: "SHIFT" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "WAGES" },
        { list: "MODE" },
        { list: "ENDS IN" },
    ]
    const tableHeadCompleted = [
        { list: "NO" },
        { list: "SHIFT" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "WAGES" },
        { list: "MODE" },
        { list: "STATUS" },
    ]
    return (
        <>
            <div
                className="hidden lg:block overflow-x-hidden "
                data-testid="planner"
            >
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
                        {status === "cancelled" && (
                            <tr>
                                {tableHeadCancelled.map((item, index) => (
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
                            </tr>
                        )}
                        {status === "ongoing" && (
                            <tr>
                                {tableHeadActive.map((item, index) => (
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
                            </tr>
                        )}
                        {status === "completed" && (
                            <tr>
                                {tableHeadCompleted.map((item, index) => (
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
                            </tr>
                        )}
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden">
                <MobileShiftsTable elements={elements} status={status} />
            </div>
        </>
    )
}

export default ShiftsTable

export const CustomMenu = ({
    element,
    status,
}: {
    element: Result | undefined
    status: string
}) => {
    const navigate = useNavigate()
    const MenuItems = [
        {
            route: `/planner/${element?.jobListing?._id}`,
            label: `View Shift`,
        },
        {
            route: `/planner/rate-ops/${element?.jobListing?._id}`,
            label: `Rate Operatives`,
        },
    ]
    return (
        <>
            <Menu transition="fade">
                <Menu.Target>
                    <button type="button">
                        <IoEllipsisVerticalSharp className="" />
                    </button>
                </Menu.Target>
                <Menu.Dropdown>
                    {MenuItems.map(({ route, label }) => {
                        return (
                            <Menu.Item
                                component="a"
                                className="p-4 hover:bg-accent-10 font-sans hover:text-primary-100"
                                // href={route}
                                key={label}
                                onClick={() =>
                                    navigate(`${route}`, {
                                        state: {
                                            status: status,
                                            scheduleId: element?._id,
                                        },
                                    })
                                }
                            >
                                {label}{" "}
                            </Menu.Item>
                        )
                    })}
                </Menu.Dropdown>
            </Menu>
        </>
    )
}
