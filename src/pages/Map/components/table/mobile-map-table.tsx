import TimeEstimate from "../../../planner/components/TimeEstimate"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { MapTableInterface } from "./map-table"

const MobileMapTable = ({ elements }: MapTableInterface) => {
    const navigate = useNavigate()
    const handleNavigate = (listingId: string) => {
        navigate(`/maps/${listingId}`)
    }
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div
                    className="rounded bg-black-5 mb-4"
                    key={index}
                    onClick={() => handleNavigate(element?.listingId)}
                >
                    <div className="flex justify-between items-center border-b border-black-20 p-4">
                        <div>
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">
                                {element?.listingId}
                            </p>
                        </div>
                        <div className="">
                            <IoIosArrowForward
                                size={20}
                                style={{ color: "#889088" }}
                            />
                        </div>
                    </div>
                    <div className="p-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">LOCATION</h6>
                            <p className="text-2md mt-1">{element?.location}</p>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    SCHEDULE
                                </h6>
                                <p className="text-2md mt-1">
                                    {element?.schedule}
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    WAGES
                                </h6>
                                <p className="text-2md mt-1">
                                    {element?.wages}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3">
                            <h6 className="text-black-50 text-3sm">MODE</h6>
                            <div className="mt-2">
                                {element?.jobMeetingPoint === "SITE" ? (
                                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoMedium">
                                        MEET ONSITE
                                    </p>
                                ) : (
                                    <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold  border-2 border-black-100 text-3sm w-fit px-3 py-1">
                                        DEPOT FIRST
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="mt-3">
                            <h6 className="text-black-50 text-3sm">ENDS IN</h6>
                            <p className="text-2md mt-1">
                                <TimeEstimate initialDate={element?.ends_in} />
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileMapTable
