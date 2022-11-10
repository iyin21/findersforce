import { Checkbox } from "@mantine/core"
import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"
import { ShiftsTableInterface } from "../../../types/planner/interfaces"

const MobileJobTable = ({
    elements,
    status,
}: ShiftsTableInterface) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4" key={index}>
                    <div className="flex justify-between border-b border-black-20 p-4">
                        <div
                            className="flex items-center gap-2"
                        >
                            <Checkbox
                                id={element?._id}
                                className="rounded-lg"
                                name={element?.jobListing?.jobType?.name}
                                // onChange={handleCheckedProduct}
                                // checked={checkedProduct.includes(element?._id)}
                                value={element?.id}
                                data-testid="checkbox"
                            />
                            <label htmlFor={element?.jobListing?.jobType?.name} className="capitalize">
                                {element?.jobListing?.jobType?.name}
                            </label>
                        </div>

                        <div className="flex items-center gap-2">
                                <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                    {element?.jobListing?.jobMeetingPoint}
                                </p>
                            <div className="">
                                <IoIosArrowForward
                                    size={20}
                                    style={{ color: "#889088" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div>
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">
                                {element?.jobListing?.jobLocation?.formattedAddress}
                            </p>
                        </div>
                        <div>
                                <h6 className="text-black-50 text-3sm">
                                    NAME
                                </h6>
                                <p className="text-2md mt-1">
                                {element?.operative?.firstName} {element?.operative?.lastName}
                                </p>
                            </div>
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    DURATION
                                </h6>
                                <p className="text-2md mt-1">
                                    {element?.jobListing?.shiftDurationInHours}hours
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">DATE</h6>
                                <p className="text-2md mt-1">
                                    {dayjs(element?.jobListing?.jobDate).format(
                                        "DD/MM/YYYY"
                                    )}
                                </p>
                            </div>

                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    HOURLY RATE
                                </h6>
                                <p className="text-2md mt-1">
                                    {
                                        element?.jobListing?.jobRate
                                            ?.jobRatePerHourDisplayedToDepot
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileJobTable
