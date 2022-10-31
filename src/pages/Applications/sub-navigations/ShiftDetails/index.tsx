import Avatar from "../../assets/avatar.png"
import { HiArrowLeft } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import Message from "../../assets/message.svg"
import ShiftTable from "./components/shift-table"
import { useParams } from "react-router-dom"
import { useGetShiftHistory } from "../../hooks/application.hook"

const ShiftDetails = () => {
    const { shiftId } = useParams<{ shiftId: string }>()
    const navigate = useNavigate()

    const { data } = useGetShiftHistory({
        operativeId: "6334119fc4127125020e3d13",
        //completed:true
    })
    //6334119fc4127125020e3d13
    console.log(data);
    console.log(data?.results);
    return (
        <div className="pt-4 px-6">
            <span
                onClick={() => navigate(-1)}
                onKeyDown={() => navigate(-1)}
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
                        <h5 className="font-bold"> Shaquan Roberts</h5>
                        <p className="text-black-70">
                            Joined 2 years ago
                            <span className="text-black-10 pl-1">|</span>
                            <span className="text-green-100 pl-1 font-bold">
                                90% Match
                            </span>
                        </p>
                    </div>
                </div>
                <button className="bg-green-10 p-6 mr-4 flex text-green-100 font-bold items-center px-10 rounded rounded-tr-2xl">
                    <img src={Message} alt="" className="mr-2" />
                    Message Shaquan
                </button>
            </div>
            <ShiftTable
                 elements={data?.results||[]}
                //{new Array(5).fill({
                //     date: "11 jan 2022",
                //     location: "Iolaire Road, New Invent...",
                //     timeIn: "11:01AM",
                //     timeOut: "1:01AM",
                //     duration: "2 hrs 2 mins",
                //     amount: "$140/hr",
                //     rating: "4.9",
                //     status: "completed",
                // })}
            />
        </div>
    )
}

export default ShiftDetails
