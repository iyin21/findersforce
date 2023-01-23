import { Checkbox } from "@mantine/core"
import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"
import { Result } from "types/planner/interfaces"

const MobileLocationCompletedShiftTable = ({
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
                                {element.jobListing.listingId}
                            </label>
                        </div>

                        <div className="flex items-center gap-2">
                            {element?.jobListing.jobMeetingPoint ===
                            "onsite" ? (
                                <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                    MEET ONSITE
                                </p>
                            ) : (
                                <p className="text-yellow-100 border-yellow-100 border-2 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                    {element?.jobListing.jobMeetingPoint.toUpperCase()}
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
                        <div className="flex justify-between mt-1">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    LOCATION
                                </h6>
                                <p className="text-2md mt-1">
                                    {
                                        element.jobListing.jobLocation
                                            .formattedAddress
                                    }
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    PAID STATUS
                                </h6>
                                {element?.jobListing.fullyPaidByDepot ? (
                                    <p className="mt-1 text-green-100 bg-green-10 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                        PAID
                                    </p>
                                ) : (
                                    <p className="mt-1 text-red-100 bg-red-10 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                        NOT PAID
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            {/* <div>
                                    <h6 className="text-black-50 text-3sm">
                                        APPLICANTS
                                    </h6>
                                    <p className="text-2md mt-1">{12}</p>
                                </div> */}
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
                                    {dayjs(element?.jobListing?.jobDate).format(
                                        "MMM D, YYYY"
                                    )}
                                </p>
                            </div>

                            <div>
                                <h6 className="text-black-50 text-3sm">RATE</h6>
                                <p className="text-2md mt-1">
                                    {element?.jobListing?.jobRate?.currency}
                                    {
                                        element?.jobListing?.jobRate
                                            ?.jobRateDepotFirstDisplayedToDepot
                                    }
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

export default MobileLocationCompletedShiftTable
