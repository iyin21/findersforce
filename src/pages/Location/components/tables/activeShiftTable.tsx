import { Table } from "@mantine/core"
import TimeEstimate from "../../../../pages/planner/components/TimeEstimate"
import { BiUpArrowAlt } from "react-icons/bi"
import { IoIosArrowForward } from "react-icons/io"
import MobileLocationActiveShiftTable from "../mobile-tables/mobileLocationActiveShiftTable"
import dayjs from "dayjs"
import { Result } from "../../../../types/planner/interfaces"

const ActiveShift = ({
    elements,
    setPhase,
    setScheduleId,
    setJobListingId,
}: {
    elements: Result[]
    setPhase: (val: number) => void
    setJobListingId: (val: string) => void
    setScheduleId: (val: string) => void
}) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td className="font-bold">{element?.jobListing?.listingId}</td>
            <td>{element.jobListing.jobLocation.formattedAddress}</td>
            <td>
                {dayjs(element?.jobListing?.shiftStartTime).format("h")} -{" "}
                {dayjs(element?.jobListing.shiftEndTime).format("h A")}
            </td>
            <td>
                {element?.jobListing?.jobRate?.currency}
                {element?.jobListing?.jobRate?.jobRatePerHourDisplayedToDepot}
                /hr
            </td>
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
            <td>
                <TimeEstimate
                    initialDate={new Date(element?.jobListing?.shiftEndTime)}
                />
            </td>
            <td
                role="gridcell"
                className="cursor-pointer h-[60px] border-b border-neutral-5"
                data-testid="shifts_table"
            >
                <IoIosArrowForward
                    size={30}
                    style={{ color: "#889088" }}
                    onClick={() => {
                        setPhase(2)
                        setJobListingId(element.jobListing._id)
                        setScheduleId(element._id)
                    }}
                />
            </td>
        </tr>
    ))

    const tableHeadUpcoming = [
        { list: "SHIFT" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "RATE" },
        { list: "MODE" },
        { list: "ENDS IN" },
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
                        <tr>
                            {tableHeadUpcoming.map((item, index) =>
                                item?.list === "RATE" ? (
                                    <>
                                        <th
                                            key={index}
                                            style={{
                                                borderBottom: "none",
                                            }}
                                        >
                                            <div className="flex">
                                                <p className="text-black-30 pr-2">
                                                    {item?.list}
                                                </p>
                                                <BiUpArrowAlt
                                                    size={22}
                                                    color="rgba(15, 13, 0, 0.3)"
                                                />
                                            </div>
                                        </th>
                                    </>
                                ) : item.list === "ENDS IN" ? (
                                    <>
                                        <th
                                            key={index}
                                            style={{
                                                borderBottom: "none",
                                            }}
                                        >
                                            <div className="flex">
                                                <p className="text-black-30 pr-2">
                                                    {item?.list}
                                                </p>
                                                <BiUpArrowAlt
                                                    size={22}
                                                    color="rgba(15, 13, 0, 0.3)"
                                                />
                                            </div>
                                        </th>
                                    </>
                                ) : (
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
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden">
                <MobileLocationActiveShiftTable elements={elements} />
            </div>
        </>
    )
}

export default ActiveShift
