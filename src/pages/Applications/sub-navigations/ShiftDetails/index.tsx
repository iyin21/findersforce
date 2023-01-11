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
import { useNavigate, useParams } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"
import { useAuthContext } from "../../../auth/context/authContext"
dayjs.extend(relativeTime)

const ShiftDetails = ({
    shiftId,
    setPhase,
}: {
    shiftId?: string
    setPhase: (val: number) => void
}) => {
    const { shiftIds } = useParams<string>()
    const navigate = useNavigate()
    
    const {state} = useAuthContext()
    console.log(state.jwt?.token)

    const { data, isLoading } = useGetShiftHistory({
        operativeId: shiftId
    })
    // console.log(data)
    

    const item = data?.results.find(
        (item) =>
            item.operative._id === shiftId || item.operative._id === shiftIds
    )
    return (
        <>
            {isLoading ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <div className="pt-4 px-6 mt-6">
                    <span
                        onClick={() => {
                            !navigate ? setPhase(2) : navigate(-1)
                        }}
                        className="p-3 rounded inline-flex items-center justify-center bg-black-10 cursor-pointer"
                        aria-hidden="true"
                    >
                        <HiArrowLeft className="text-2lg" />
                    </span>
                    <div className="mt-10 mb-6 flex flex-col md:flex-row justify-between">
                        <div className="flex">
                            <div>
                                <img
                                    src={
                                        item?.operative.profileImageUrl ||
                                        Avatar
                                    }
                                    className="rounded-full  h-14 w-14"
                                    alt="profile"
                                />
                            </div>

                            <div className="pl-4 ">
                                <h5 className="font-extrabold font-creatoBold text-2mxl">
                                    {" "}
                                    {item?.operative.firstName +
                                        " " +
                                        item?.operative.lastName} {}
                                </h5>
                                <p className="text-black-70">
                                    <span>  <AiFillStar
                                                size={20}
                                                style={{ color: "#FED70A" }}
                                                className="inline"
                                            /> {item?.operative.averageRating} <span>({})</span></span>
                                    <span className="text-black-10 pl-1">
                                        |
                                    </span>
                                    <span className="pl-1">
                                        {item?.jobListing.jobQualification.name}
                                    </span>
                                    <span className="text-black-10 px-1">
                                        |
                                    </span>
                                    Joined{" "}
                                    {dayjs(item?.operative.createdAt).fromNow()}
                                </p>
                            </div>
                        </div>
                        <button className="bg-blue-10 lg:p-6 mr-4 flex text-blue-100 font-bold items-center lg:px-10 p-3 rounded rounded-tr-2xl mt-3 md:mt-0">
                            <img src={Message} alt="" className="mr-2" />
                            Message {item?.operative?.firstName}
                        </button>
                    </div>
                    <ShiftTable elements={data?.results}  />
                </div>
            )}
        </>
    )
}

export default ShiftDetails
