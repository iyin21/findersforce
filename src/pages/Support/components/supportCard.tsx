import dayjs from "dayjs"

interface ComplaintProps{
    complaintCategory: string;
    description:string;
    ticketID: string;
    createdAt: Date;
    comments: number;

    handleClick: () => void
}
const SupportCard=({complaintCategory, description, ticketID, createdAt, comments, handleClick}:ComplaintProps)=>{
    return(
        <div className="mb-4 bg-[#F4F4F4] py-2 mt-4 mr-14 rounded-lg" onClick={
            () => {
                handleClick()
            }
            
        }>
            <div className="flex justify-between p-4">
            <p className="font-medium text-2lg">{complaintCategory}</p>
            <p className="text-black-60">Date created: {dayjs(createdAt).format("DD MMMM YYYY")}</p>
            </div>
            <hr className="text-black-5 mb-2" />
            <p className="text-md px-4 py-2">Ticket ID: {ticketID}</p>
            <p className="px-4 pb-2 text-md">{description}</p>
            <p className="text-green-100 px-4 text-md">{comments} comment{comments>1 &&"s"}</p>
        </div>
    )
}
export default SupportCard;