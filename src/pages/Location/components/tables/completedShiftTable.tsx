import { Checkbox, Table } from "@mantine/core"
import dayjs from "dayjs"
import { BiUpArrowAlt } from "react-icons/bi"
import { IoIosArrowForward } from "react-icons/io"
import { Result } from "types/planner/interfaces"
import MobileLocationCompletedShiftTable from "../mobile-tables/mobileLocationComlepletedShiftTable"

const CompletedShiftTable = ({ elements }: { elements: Result[] }) => {
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={element?._id}
                        className="rounded-lg"
                        name={element?.jobListing?.jobType?.name}
                        // onChange={handleCheckedProduct}
                        // checked={checkedProduct.includes(element?._id)}
                        value={element?.id}
                        data-testid="checkbox"
                    />
                </div>
            </td>
            <td className="font-bold">{element.jobListing.listingId}</td>
            <td>{element.jobListing.jobLocation.formattedAddress}</td>
            <td>{dayjs(element?.jobListing?.jobDate).format("MMM D, YYYY")}</td>
            <td>
                {element?.jobListing.jobMeetingPoint === "SITE" ? (
                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        MEET ONSITE
                    </p>
                ) : (
                    <p className="text-yellow-100 border-yellow-100 border-2 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        DEPOT FIRST
                    </p>
                )}
            </td>
            <td>
                {element?.jobListing?.jobRate?.currency}
                {element?.jobListing?.jobRate?.jobRateDepotFirstDisplayedToDepot}
                /hr
            </td>
            <td>{element.jobListing.shiftDurationInHours}</td>
            <td>
                {element?.jobListing.fullyPaidByDepot === true ? (
                    <p className="text-green-100 bg-green-10 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        PAID
                    </p>
                ) : (
                    <p className="text-red-100 bg-red-10 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        NOT PAID
                    </p>
                )}
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
        { list: "MODE" },
        { list: "RATE" },
        { list: "DURATION" },
        { list: "PAYMENT STATUS" },
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
                <MobileLocationCompletedShiftTable elements={elements} />
            </div>
        </>
    )
}

export default CompletedShiftTable
