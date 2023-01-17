import { Checkbox, Table } from "@mantine/core"
import { IoIosArrowForward } from "react-icons/io"
import { BiUpArrowAlt } from "react-icons/bi"
import { Result } from "../../../../types/planner/interfaces"
import MobileLocationShiftTable from "../mobile-tables/mobileLocationShiftTable"
import dayjs from "dayjs"

const ShiftBoard = ({elements} : {elements: Result[]}) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={element?._id}
                        className="rounded-lg"
                        name={element?.jobListing?.jobType?.name}
                        value={element?.id}
                        data-testid="checkbox"
                    />
                </div>
            </td>
            <td className="font-bold">{element?.jobListing?.listingId}</td>
            <td>{element.jobListing.jobLocation.formattedAddress}</td>
            <td>{dayjs(element.createdAt).format("MMM D, YYYY")} |{" "}
                {dayjs(element.createdAt).format("h:mm A")}</td>
            <td>{element.jobListing.jobRate.currency + " " + element.jobListing.jobRate.jobRatePerHourDisplayedToOp}/hr</td>
            <td>{element.jobListing.shiftDurationInHours}</td>
            <td>
                <span>{element.jobListing.applicationsCount}/</span>
                <span className="text-black-30">{element.jobListing.numberOfOpsRequired}</span>
            </td>
            <td>
                <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                    {element.jobListing.jobMeetingPoint}
                </p>
            </td>
            <td
                role="gridcell"
                className="cursor-pointer h-[60px] border-b border-neutral-5"
                data-testid="shifts_table"
            >
                <IoIosArrowForward
                    size={30}
                    style={{ color: "#889088" }}
                    onClick={() => {}}
                />
            </td>
        </tr>
    ))

    const tableHeadUpcoming = [
        { list: "SHIFT" },
        { list: "LOCATION" },
        { list: "DATE" },
        { list: "RATE" },
        { list: "DURATION" },
        { list: "APPLICANTS" },
        { list: "MODE" },
    ]

    return (
        <>
            <div
                className="hidden lg:block overflow-x-hidden font-creato"
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
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                            >
                                <p className="text-black-30 ">{"NO"}</p>
                            </th>
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                                className="flex items-center gap-2 "
                            >
                                <Checkbox />
                            </th>
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
                                ) : item.list === "APPLICANTS" ? (
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
                <MobileLocationShiftTable elements={elements} />
            </div>
        </>
    )
}

export default ShiftBoard
