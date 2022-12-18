import { Table } from "@mantine/core"
// import {  AiOutlineArrowUp } from "react-icons/ai"
import { IoIosArrowForward } from "react-icons/io"
import { ShiftsTableInterface } from "../../../types/planner/interfaces"
// import ProfileImage from "../../../assets/ProfileImage.svg"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import MobileShiftsTable from "./MobileShiftsTable"
import TimeEstimate from "./TimeEstimate"
// import ShiftStar from "../../../assets/ShiftStar.svg"

const ShiftsTable = ({ elements, status }: ShiftsTableInterface) => {
    const navigate = useNavigate()
    // const handleNavigate = (id: string, status: string) => {
    //     navigate(`/planner/${id}`, { state: { status: status } })
    // }

    // function getDurationBeforeCancel(millisec: number) {
    //   let seconds = Number((millisec / 1000).toFixed(0));
    //   let minutes = Math.floor(seconds / 60);
    //   const hours = Math.floor(minutes / 60)
    //   if (minutes > 59) {
    //      let  hours = Math.floor(minutes / 60);
    //       hours = (hours >= 10) ? hours : 0 + hours;
    //       minutes = minutes - (hours * 60);
    //       minutes = (minutes >= 10) ? minutes : 0 + minutes;
    //   }

    //   seconds = Math.floor(seconds % 60);
    //   seconds = (seconds >= 10) ? seconds : 0 + seconds;

    //       return `${hours}hr ${minutes}mins`;
    // }

    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{element?.jobListing?.listingId}</td>
            {/* {status !== "completed" && (<td>
          <div className="flex items-center gap-2">
            <img src={ProfileImage} alt="profile_image" />
            <p>{element?.operative?.firstName} {element?.operative?.lastName}</p>
          </div>
        </td>)} */}
            <td>{element?.jobListing?.jobLocation?.formattedAddress}</td>
            {status !== "ongoing" ? (
                <td>
                    {dayjs(element?.jobListing?.jobDate).format("MMM D, YYYY")}{" "}
                    | {dayjs(element?.jobListing?.shiftStartTime).format("h")} -{" "}
                    {dayjs(element?.jobListing.shiftEndTime).format("h A")}
                </td>
            ) : (
                <td>
                    {dayjs(element?.jobListing?.shiftStartTime).format("h")} -{" "}
                    {dayjs(element?.jobListing.shiftEndTime).format("h A")}
                </td>
            )}
            <td>
                {element?.jobListing?.jobRate?.currency}
                {element?.jobListing?.jobRate?.jobRatePerHourDisplayedToDepot}
                /hr
            </td>
            {/* {
          status === "cancelled" && (<td>{getDurationBeforeCancel(((new Date(element?.cancelTime).getTime()) - new Date(element?.clockInTime).getTime()))}</td>) 
        } */}

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

            <td
                role="gridcell"
                className="cursor-pointer h-[60px] border-b border-neutral-5"
                data-testid="shifts_table"
            >
                <IoIosArrowForward
                    size={30}
                    style={{ color: "#889088" }}
                    onClick={() =>
                        navigate(`/planner/${element?.jobListing?._id}`, {state:{status: status, scheduleId: element?._id}})
                    }
                />
            </td>
        </tr>
    ))

    const tableHeadCancelled = [
        { list: "NO" },
        { list: "SHIFTS ID" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "RATE" },
        { list: "MODE" },
    ]
    const tableHeadActive = [
        { list: "NO" },
        { list: "SHIFTS ID" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "RATE" },
        { list: "MODE" },
        { list: "ENDS IN" },
    ]
    const tableHeadCompleted = [
        { list: "NO" },
        { list: "SHIFTS ID" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "RATE" },
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
