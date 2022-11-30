import { Key } from "react"
import { IoIosArrowForward } from "react-icons/io"

const MobileLocationUpcomingShiftTable = ({ elements }: { elements: any }) => {
    const handleNavigate = (id: string) => {}
    return (
        <div className="mt-4">
            {elements?.map(
                (
                    element: {
                        _id: string
                        operative: {
                            firstName: string
                            lastName: string
                        }
                        jobListing: {
                            jobType: { name: string | undefined }
                            shiftEndTime: string | number | Date
                        }
                        id: string | number | readonly string[] | undefined
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
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    LOCATION
                                </h6>
                                <p className="text-2md mt-1">
                                    {"Iolaire Road, New Invent..."}
                                </p>
                            </div>
                            <div className="flex justify-between mt-3">
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        JOB TYPE
                                    </h6>
                                    <p className="text-2md mt-1">{"2-Way"}</p>
                                </div>
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        DURATION
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {"2 hour(s)"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between mt-3">
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        DATE
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {"Nov 15, 2022 | 9-11AM"}
                                    </p>
                                </div>

                                <div className="pr-3">
                                    <h6 className="text-black-50 text-3sm">
                                        RATE
                                    </h6>
                                    <p className="text-2md mt-1">{"$140/hr"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default MobileLocationUpcomingShiftTable
