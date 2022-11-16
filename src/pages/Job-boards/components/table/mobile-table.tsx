import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"
import { JobBoardResponseInterface } from "../../../../types/job-board/interface"
import { Checkbox } from "../../../../components/index"
import { JobBoardInterface } from "./job-table"
import { useNavigate } from "react-router-dom"

const MobileJobTable = ({
    elements,
    status,
    handleCheckedJob,
    checkedJob,
    setDeleteId,
    setOpenJobPost,
    setDraftStatus,
    setdraftElement,
}: JobBoardInterface) => {
    const navigate = useNavigate()
    const handleNavigate = (id: string, element: JobBoardResponseInterface) => {
        if (status === "active") {
            navigate(`/job-boards/${id}`)
        } else {
            setOpenJobPost(true)
            setDraftStatus("draft")
            setdraftElement(element)
        }
    }
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div
                    className="rounded bg-black-5 mb-4"
                    key={index}
                    onClick={() => handleNavigate(element?._id, element)}
                >
                    <div className="flex justify-between border-b border-black-20 p-4">
                        <div
                            className="flex items-center"
                            onClick={(e) => {
                                e.stopPropagation()
                                setDeleteId(element?._id)
                            }}
                        >
                            <Checkbox
                                id={element?._id}
                                className="rounded-lg"
                                name={element?.jobType?.name}
                                onChange={handleCheckedJob}
                                checked={checkedJob.includes(element?._id)}
                                value={element?._id}
                                data-testid="checkbox"
                            />
                            <label
                                htmlFor={element?.jobType?.name}
                                className="capitalize text-black-80"
                            >
                                {element?.jobType?.name}
                            </label>
                        </div>

                        <div className="flex items-center gap-2">
                            {element?.jobMeetingPoint === "SITE" ? (
                                <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                    MEET ONSITE
                                </p>
                            ) : (
                                <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                                    DEPOT FIRST
                                </p>
                            )}
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
                                {element?.jobLocation?.formattedAddress}
                            </p>
                        </div>
                        <div className="flex justify-between mt-3">
                            {status === "active" && (
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        APPLICANTS
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {element.jobMatchPercentage}
                                    </p>
                                </div>
                            )}

                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    DURATION
                                </h6>
                                <p className="text-2md mt-1">
                                    {element?.shiftDurationInHours} hours
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">DATE</h6>
                                <p className="text-2md mt-1">
                                    {dayjs(element?.jobDate).format(
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
                                        element?.jobRate
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
