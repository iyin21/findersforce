import TimeEstimate from "../../../../pages/planner/components/TimeEstimate"
import { IoIosArrowForward } from "react-icons/io"
import { Result } from "../../../../types/planner/interfaces"
import dayjs from "dayjs"

const MobileLocationActiveShiftTable = ({
    elements,
}: {
    elements: Result[]
}) => {
    const handleNavigate = (id: string) => {}
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4" key={index}>
                    <div className="flex justify-between border-b border-black-20 p-4">
                        <p className="font-bold">
                            {element?.jobListing?.listingId}
                        </p>

                        <div className="flex items-center gap-2">
                            {element?.jobListing?.jobMeetingPoint === "SITE" ? (
                                <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                    MEET ONSITE
                                </p>
                            ) : (
                                <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                                    DEPOT FIRST
                                </p>
                            )}
                            <div className="cursor-pointer">
                                <IoIosArrowForward
                                    size={20}
                                    style={{ color: "#889088" }}
                                    onClick={() => handleNavigate(element?._id)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    LOCATION
                                </h6>
                                <p className="text-2md mt-1 pr-5">
                                    {
                                        element.jobListing.jobLocation
                                            .formattedAddress
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3 pr-14">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    SCHEDULE
                                </h6>
                                <p className="text-2md mt-1">
                                    {dayjs(
                                        element?.jobListing?.shiftStartTime
                                    ).format("h")}{" "}
                                    -{" "}
                                    {dayjs(
                                        element?.jobListing.shiftEndTime
                                    ).format("h A")}
                                </p>
                            </div>

                            <div>
                                <h6 className="text-black-50 text-3sm">RATE</h6>
                                <p className="text-2md mt-1">
                                    {element?.jobListing?.jobRate?.currency}
                                    {
                                        element?.jobListing?.jobRate
                                            ?.jobRatePerHourDisplayedToDepot
                                    }
                                    /hr
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    ENDS IN
                                </h6>
                                <TimeEstimate
                                    initialDate={
                                        new Date(
                                            element?.jobListing?.shiftEndTime
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileLocationActiveShiftTable
