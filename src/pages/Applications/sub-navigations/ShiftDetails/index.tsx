import Avatar from "../../assets/avatar.png"
import { HiArrowLeft } from "react-icons/hi"
import Message from "../../assets/message.svg"
import ShiftTable from "./components/shift-table"
// import { useParams } from "react-router-dom"
import { useGetShiftHistory } from "../../hooks/application.hook"
import { CgSpinner } from "react-icons/cg"
// import Layout from "../../components/layout/Layout"
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs"
dayjs.extend(relativeTime)

const ShiftDetails = ({
    shiftId,
    setPhase,
}: {
    shiftId: string
    setPhase: (val: number) => void
}) => {
    // const { shiftId } = useParams<{ shiftId: string }>()

    const { data, isLoading } = useGetShiftHistory({
        operativeId: shiftId || "",
    })

    const item = data?.results.find((item) => item.operative._id === shiftId)
    return (
        <>
            {isLoading ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <div className="pt-4 px-6">
                    <span
                        onClick={() => setPhase(2)}
                        className="p-3 rounded inline-flex items-center justify-center bg-black-10 cursor-pointer"
                        aria-hidden="true"
                    >
                        <HiArrowLeft className="text-2lg" />
                    </span>
                    <div className="mt-10 mb-6 flex justify-between">
                        <div className="flex">
                            <div>
                                <img src={Avatar} alt="" />{" "}
                            </div>

                            <div className="pl-4 ">
                                <h5 className="font-bold">
                                    {" "}
                                    {item?.operative.firstName +
                                        " " +
                                        item?.operative.lastName}
                                </h5>
                                <p className="text-black-70">
                                    Joined{" "}
                                    {dayjs(item?.operative.createdAt).fromNow()}
                                    <span className="text-black-10 pl-1">
                                        |
                                    </span>
                                    <span className="text-green-100 pl-1 font-bold">
                                        {item?.jobListing.jobMatchPercentage}%
                                        Match
                                    </span>
                                </p>
                            </div>
                        </div>
                        <button className="bg-green-10 lg:p-6 mr-4 flex text-green-100 font-bold items-center lg:px-10 px-2 rounded rounded-tr-2xl">
                            <img src={Message} alt="" className="mr-2" />
                            Message {item?.operative.firstName}
                        </button>
                    </div>
                    <ShiftTable elements={data?.results || []} />
                </div>
            )}
        </>
    )
}

export default ShiftDetails
