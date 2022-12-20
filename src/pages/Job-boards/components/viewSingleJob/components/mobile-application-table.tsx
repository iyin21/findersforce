import dayjs from "dayjs"
import { BsFillStarFill } from "react-icons/bs"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { ApplicationJobInterface } from "./application-table"

const MobileApplicationTable = ({ elements }: ApplicationJobInterface) => {
    const renderStatus = (status: string) => {
        switch (status) {
            case "PENDING":
                return (
                    <span className="bg-black-10 text-black-100 rounded-2xl px-3 py-1 font-semibold">
                        PENDING
                    </span>
                )
            case "LOST":
                return (
                    <span className="bg-red-100 rounded-2xl text-white-100 px-3 py-2 font-semibold">
                        REJECTED
                    </span>
                )
            case "WON":
                return (
                    <span className="bg-green-100 rounded-2xl text-white-100 px-3 py-2 font-semibold">
                        ACCEPTED
                    </span>
                )
            default:
                break
        }
    }
    const navigate = useNavigate()
    const handleNavigate = (id: string) => {
        navigate(`/planner/${id}`)
    }
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div
                    className="rounded bg-black-5 mb-4"
                    key={index}
                    onClick={() => handleNavigate(element?._id)}
                >
                    <div className="flex justify-between items-center border-b border-black-20 p-4">
                        <div>
                            <h6 className="text-black-50 text-3sm">NAME</h6>
                            <p className="text-2md mt-1">
                                {element?.user?.firstName}{" "}
                                {element?.user?.lastName}
                            </p>
                        </div>
                        <div className="">
                            <IoIosArrowForward
                                size={25}
                                style={{ color: "#889088" }}
                            />
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="flex justify-between items-center mt-1">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    QUALIFICATION
                                </h6>
                                <p className="text-2md mt-1">
                                    {
                                        element?.jobListing?.jobQualification
                                            ?.name
                                    }
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    MATCH
                                </h6>
                                <p className="text-2md mt-1 text-green-100">
                                    {element?.jobMatchPercentage}%
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center  mt-4">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    DATE APPLIED
                                </h6>
                                <p className="text-2md mt-1 ">
                                    {dayjs(element?.jobDate).format(
                                        "MMM D, YYYY"
                                    )}{" "}
                                    <span className="mx-1 text-black-30">
                                        |
                                    </span>
                                    {dayjs(element?.jobDate).format("hh:mm A")}
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    RATING
                                </h6>
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <BsFillStarFill color="#FED70A" />{" "}
                                    {element?.user?.averageRating}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 pb-4">
                            <h6 className="text-black-50 text-3sm">STATUS</h6>
                            <p className="text-2md mt-4 text-green-100">
                                {renderStatus(element?.status)}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileApplicationTable
