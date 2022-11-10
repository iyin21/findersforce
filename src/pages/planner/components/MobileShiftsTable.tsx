import { Checkbox } from "@mantine/core"
import dayjs from "dayjs"
import { AiFillStar } from "react-icons/ai"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { ShiftsTableInterface } from "../../../types/planner/interfaces"

const MobileShiftsTable = ({
    elements,
    status,
}: ShiftsTableInterface) => {

    const navigate = useNavigate()
    const handleNavigate = (id: string, status:string) => {
    navigate(`/planner/${id}`, { state: {status: status}})
  }

    const currentTime = Number(dayjs().format("HH:mm:ss"))
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
                            <div className="cursor-pointer">
                                <IoIosArrowForward
                                    size={20}
                                    style={{ color: "#889088" }}
                                    onClick={() => handleNavigate(element?.jobListing?._id, status)} 
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
                        <div className="flex justify-between mt-3">
                            <div>
                                    <h6 className="text-black-50 text-3sm">
                                        NAME
                                    </h6>
                                    <p className="text-2md mt-1">
                                    {element?.operative?.firstName} {element?.operative?.lastName}
                                    </p>
                            </div>
                            {status !== "active" && 
                                (<div>
                                    <h6 className="text-black-50 text-3sm">
                                        DURATION
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {element?.jobListing?.shiftDurationInHours}hours
                                    </p>
                                </div>)
                            }
                        </div>
                        
                        <div className="flex justify-between mt-3">
                            {status !== "active" ? 
                            (<div>
                                <h6 className="text-black-50 text-3sm">DATE</h6>
                                <p className="text-2md mt-1">
                                    {dayjs(element?.jobListing?.jobDate).format(
                                        "DD/MM/YYYY"
                                    )}
                                </p>
                            </div>)
                                :
                            (<div>
                                <h6 className="text-black-50 text-3sm">SCHEDULE</h6>
                                <p className="text-2md mt-1">
                                {new Date( '1970-01-01T' + element?.jobListing?.shiftStartTime + "z").toLocaleTimeString("en-US").slice(0,1)} - {dayjs(element?.jobListing.shiftEndTime).format("h:mm A")}
                                </p>
                            </div>)
                            }

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
                        {status === "completed" && 
                        (
                            <div className="flex justify-between mt-3">
                                <div>
                                        <h6 className="text-black-50 text-3sm">
                                            ACTIVE
                                        </h6>
                                        <p className="text-2md mt-1">
                                        {element?.jobListing?.numberOfOpsRequired}
                                        </p>
                                </div>
                                <div>
                                        <h6 className="text-black-50 text-3sm">
                                            RATING
                                        </h6>
                                        <div  className="flex items-center gap-1">
                                            <AiFillStar size={20} style={{color: "#FED70A"}}/>
                                            <p className="text-2md mt-1">
                                            {element?.operativeRating}
                                            </p>
                                        </div>
                                        
                                </div>
                            </div>
                            )}
                        
                        {status === "active" && 
                                (<div>
                                    <h6 className="text-black-50 text-3sm">
                                        ENDS_IN
                                    </h6>
                                    <p className="text-yellow-100 bg-black-100 rounded-lg text-center font-bold p-1 w-fit px-3 py-1 text-2lg font-creatoBlack font-extrabold">
                                        { currentTime - Number(dayjs(element?.jobListing?.shiftEndTime).format("HH:mm:ss"))}
                                    </p>
                                </div>)
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileShiftsTable
