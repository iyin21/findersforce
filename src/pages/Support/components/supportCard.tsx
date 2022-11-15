import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"

interface ComplaintProps {
    complaintCategory: string
    description: string
    ticketID: string
    createdAt: Date
    comments: number

    handleClick: () => void
}
const SupportCard = ({
    complaintCategory,
    description,
    ticketID,
    createdAt,
    comments,
    handleClick,
}: ComplaintProps) => {
    return (
        <div
            className="mb-4 bg-[#F4F4F4] py-2 mt-4 lg:mr-14 rounded-lg cursor-pointer"
            onClick={() => {
                handleClick()
            }}
        >
            <div className="flex justify-between p-4">
                <p className="font-medium text-2lg">{complaintCategory}</p>
                <p className="text-black-60 hidden lg:block ">
                    Date created: {dayjs(createdAt).format("DD MMMM YYYY")}
                </p>
                <IoIosArrowForward
                    size={20}
                    style={{ color: "#889088" }}
                    className="block lg:hidden"
                />
            </div>
            <hr className="text-black-5 mb-2" />
            <p className="text-md px-4 py-2 hidden lg:block">Ticket ID: {ticketID}</p>
            <div className="flex justify-between block lg:hidden items-end px-4 mb-2">
                <div>
                    <h6 className="text-black-50 text-3sm">Ticket ID</h6>
                    <p className="text-2md mt-1">{ticketID}</p>
                </div>
                <h6 className="text-black-50 text-3sm"> Date: {dayjs(createdAt).format("DD MMMM YYYY")}</h6>
            </div>
            <p className="px-4 pb-2 text-md">{description}</p>
            <p className="text-green-100 px-4 text-md">
                {comments} comment{comments > 1 && "s"}
            </p>
        </div>
    )
}
export default SupportCard
