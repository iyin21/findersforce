import dayjs from "dayjs"
import { IShiftTableProps } from "./shift-table"

const MobileShiftTable = ({ elements }: IShiftTableProps) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4 p-4" key={index}>
                    <div className="mt-2 border-b border-black-20 pb-2">
                        <h6 className="text-black-50 text-3sm">LOCATION</h6>
                        <p className="text-2md mt-1">
                            {element?.jobLocation?.formattedAddress}
                        </p>
                    </div>
                    <div className="flex  justify-between items-center mt-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">APPLIED</h6>
                            <p className="text-2md mt-1">
                                {element?.applicationCount}
                            </p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-3sm">HIRED</h6>
                            <p className="text-2md mt-1">
                                {element?.hireCount}
                            </p>
                        </div>
                    </div>
                    <div className="flex  justify-between items-center mt-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                COMPLETED
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.completedShiftCount}
                            </p>
                        </div>
                        <div>
                            <h6 className="text-black-50 text-3sm">
                                CANCELLED
                            </h6>
                            <p className="text-2md mt-1">
                                {element?.cancelledShiftCount}
                            </p>
                        </div>
                    </div>

                    <div className="mt-3 ">
                        <div>
                            <h6 className="text-black-50 text-3sm">DATE</h6>
                            <p className="text-2md mt-1">
                                {" "}
                                {dayjs(element?.createdAt).format(
                                    "MMM, D,YYYY"
                                )}{" "}
                                | {dayjs(element?.createdAt).format("hh:mm A")}
                            </p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h6 className="text-black-50 text-3sm">MODE</h6>
                        {element?.jobMeetingPoint === "SITE" ? (
                            <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack mt-2">
                                MEET ONSITE
                            </p>
                        ) : (
                            <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1 mt-2">
                                DEPOT FIRST
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileShiftTable
