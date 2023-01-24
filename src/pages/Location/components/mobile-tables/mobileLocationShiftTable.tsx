import { Checkbox } from "@mantine/core"
import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"
import { Result } from "../../../../types/planner/interfaces"

const MobileLocationShiftTable = ({ elements }: { elements: Result[] }) => {
    const handleNavigate = (id: string) => {}
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4" key={index}>
                    <div className="flex justify-between border-b border-black-20 p-4">
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
                            <label
                                htmlFor={"shift id"}
                                className="capitalize font-bold pr-2.5"
                            >
                                {element?.jobListing?.listingId}
                            </label>
                        </div>

                        <div className="flex items-center gap-2">
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
                        <div className="flex justify-between">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    LOCATION
                                </h6>
                                <p className="text-2md mt-1 pr-1">
                                    {
                                        element.jobListing.jobLocation
                                            .formattedAddress
                                    }
                                </p>
                            </div>
                            <>
                                {element?.jobListing?.jobMeetingPoint ===
                                "SITE" ? (
                                    <p className="text-black-100 bg-yellow-100 rounded-3xl flex items-center text-center font-bold w-fit px-3 text-3sm font-creatoBlack">
                                        MEET ONSITE
                                    </p>
                                ) : (
                                    <p className="text-black-100 bg-white-10 rounded-3xl flex items-center text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                                        DEPOT FIRST
                                    </p>
                                )}
                            </>
                        </div>
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    APPLICANTS
                                </h6>
                                <p className="text-2md mt-1">
                                    <span>
                                        {element.jobListing.applicationsCount}/
                                    </span>
                                    <span className="text-black-30">
                                        {element.jobListing.numberOfOpsRequired}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    DURATION
                                </h6>
                                <p className="text-2md mt-1 pr-5">
                                    {element.jobListing.shiftDurationInHours}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">DATE</h6>
                                <p className="text-2md mt-1">
                                    {dayjs(element.createdAt).format(
                                        "MMM D, YYYY"
                                    )}{" "}
                                    |{" "}
                                    {dayjs(element.createdAt).format("h:mm A")}
                                </p>
                            </div>

                            <div className="pr-3">
                                <h6 className="text-black-50 text-3sm">RATE</h6>
                                <p className="text-2md mt-1">
                                    {element.jobListing.jobRate.currency +
                                        " " +
                                        element.jobListing.jobRate
                                            .jobRateDepotFirstDisplayedToOp}
                                    /hr
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileLocationShiftTable
