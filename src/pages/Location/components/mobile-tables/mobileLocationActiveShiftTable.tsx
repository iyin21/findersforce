import { Key } from "react"
import { IoIosArrowForward } from "react-icons/io"

const timerStyles = {
    time: "mb-0 font-bold text-2md lg:text-2mxl",
    divider: "text-yellow-100 text-3md",
}

const MobileLocationActiveShiftTable = ({ elements }: { elements: any }) => {
    const handleNavigate = (id: string) => {}
    return (
        <div className="mt-4">
            {elements?.map(
                (
                    element: {
                        _id: string,                        
                        operative: {
                            firstName: string
                            lastName: string
                        }
                        jobListing: {
                            _id: string
                            shiftEndTime: string | number | Date
                        }
                    },
                    index: Key | null | undefined
                ) => (
                    <div className="rounded bg-black-5 mb-4" key={index}>
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <p>
                                {element?.operative?.firstName}{" "}
                                {element?.operative?.lastName}
                            </p>

                            <div className="flex items-center gap-2">
                                <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                    {"MEET ONSITE"}
                                </p>
                                <div className="cursor-pointer">
                                    <IoIosArrowForward
                                        size={20}
                                        style={{ color: "#889088" }}
                                        onClick={() =>
                                            handleNavigate(element?._id)
                                        }
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
                                        {"Iolaire Road, New Invent..."}
                                    </p>
                                </div>
                                <div>
                                    <h6 className="text-black-50 text-3sm pr-14">
                                        JOB TYPE
                                    </h6>
                                    <p className="text-2md mt-1">{"2 Way"}</p>
                                </div>
                            </div>
                            <div className="flex justify-between mt-3 pr-14">
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        SCHEDULE
                                    </h6>
                                    <p className="text-2md mt-1">{"9-11AM"}</p>
                                </div>

                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        RATE
                                    </h6>
                                    <p className="text-2md mt-1">{"$140/hr"}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        ENDS IN
                                    </h6>
                                    <div className="mt-1 bg-black-100 text-yellow-100 rounded-xl px-2 py-1">
                                        <div className=" flex items-center gap-4 justify-center  ">
                                            <div className="flex flex-col items-center text">
                                                <p
                                                    aria-label="hours-left"
                                                    className={timerStyles.time}
                                                >
                                                    {"00"}
                                                </p>
                                            </div>
                                            <p className={timerStyles.divider}>
                                                :
                                            </p>

                                            <div className="flex flex-col items-center">
                                                <p
                                                    aria-label="minutes-left"
                                                    className={timerStyles.time}
                                                >
                                                    {"00"}
                                                </p>
                                            </div>
                                            <p className={timerStyles.divider}>
                                                :
                                            </p>

                                            <div className="flex flex-col items-center">
                                                <p
                                                    aria-label="minutes-left"
                                                    className={timerStyles.time}
                                                >
                                                    {"00"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default MobileLocationActiveShiftTable
