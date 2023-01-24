import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { ShiftsTableInterface } from "../../../../types/planner/interfaces"
import { CustomMenu } from "./ShiftsTable"
import TimeEstimate from "../TimeEstimate"

const MobileShiftsTable = ({ elements, status }: ShiftsTableInterface) => {
    const navigate = useNavigate()

    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4" key={index}>
                    <div className="flex justify-between border-b border-black-20 p-4">
                        <div className="flex items-center gap-2">
                            <p className="text-2md mt-1 font-creato">
                                {element?.jobListing?.listingId}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {element?.jobListing.jobMeetingPoint === "SITE" ? (
                                <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoMedium">
                                    MEET ONSITE
                                </p>
                            ) : (
                                <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                                    DEPOT FIRST
                                </p>
                            )}
                            {status === "completed" ? (
                                <div className="cursor-pointer">
                                    <CustomMenu
                                        element={element}
                                        status={status}
                                    />
                                </div>
                            ) : (
                                <div className="cursor-pointer">
                                    <IoIosArrowForward
                                        size={20}
                                        style={{ color: "#889088" }}
                                        onClick={() =>
                                            navigate(
                                                `/planner/${element?.jobListing?._id}`,
                                                {
                                                    state: {
                                                        status: status,
                                                        scheduleId:
                                                            element?._id,
                                                    },
                                                }
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-4">
                        <div>
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">
                                {
                                    element?.jobListing?.jobLocation
                                        ?.formattedAddress
                                }
                            </p>
                        </div>
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">NAME</h6>
                                <p className="text-2md mt-1">
                                    {element?.operative?.firstName}{" "}
                                    {element?.operative?.lastName}
                                </p>
                            </div>
                            {status !== "ongoing" ? (
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        SCHEDULE
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {dayjs(
                                            element?.jobListing?.jobDate
                                        ).format("MMM D, YYYY")}{" "}
                                        |{" "}
                                        {dayjs(
                                            element?.jobListing?.shiftStartTime
                                        ).format("h")}{" "}
                                        -{" "}
                                        {dayjs(
                                            element?.jobListing.shiftEndTime
                                        ).format("h A")}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        SCHEDULE
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {dayjs(
                                            element?.jobListing?.shiftStartTime
                                        ).format("HH:mm")}{" "}
                                        -{" "}
                                        {dayjs(
                                            element?.jobListing.shiftEndTime
                                        ).format("HH:mm")}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between mt-3 mb-2">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    WAGES
                                </h6>
                                {element?.jobListing.jobMeetingPoint ===
                                "DEPOT" ? (
                                    <p className="text-2md mt-1">
                                        {element?.jobListing.jobRate.currency}
                                        {element?.jobListing
                                            ?.amountPaidByDepot *
                                            element?.jobListing?.numberOfOpsRequired}
                                    </p>
                                ) : (
                                    <p className="text-2md mt-1">
                                        {element?.jobListing.jobRate.currency}
                                        {element?.jobListing
                                            ?.amountPaidByDepot *
                                            element?.jobListing?.numberOfOpsRequired}
                                    </p>
                                )}
                            </div>
                        </div>
                        {status === "ongoing" && (
                            <div>
                                <h6 className="text-black-50 text-3sm text-center mb-2">
                                    ENDS_IN
                                </h6>
                                <TimeEstimate
                                    initialDate={
                                        new Date(
                                            element?.jobListing?.shiftEndTime
                                        )
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileShiftsTable
