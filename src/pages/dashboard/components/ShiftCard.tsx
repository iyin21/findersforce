import TimeEstimate from "../../../pages/planner/components/TimeEstimate"
import { ShiftCardProps } from "../../../types/dashboard/interfaces"

const Card:React.FC<ShiftCardProps> = ({profileImage,firstName, lastName,messageIcon,calenderIcon,date,clockIcon,startTime,endTime,duration,locationIcon,location,taskIcon,task,initialDate,currentDate,status}) => {

  
  return (
    <div className=" bg-gray-100 rounded-b-lg pb-4 px-4 relative">
        
        <div className="bg-white-100 px-6 py-3 rounded-lg">
          <div className="flex gap-4 text-2md  mb-3 font-bold">
            <img src={profileImage} alt="" className="rounded-lg w-5 " />
            <p className="pt-1">{firstName} {lastName}</p>
            <img src={messageIcon} alt="" className="" />
          </div>
          <div className="flex gap-4 text-sm mb-3">
            <img src={calenderIcon} alt="" />
            <p>{date}</p>
          </div>
          <div className="flex gap-4 text-sm mb-3">
            <img src={clockIcon} alt="" />
            <p>{startTime} {endTime} <span className="font-extrabold">{duration}</span></p>
          </div>
          <div className="flex gap-4 text-sm mb-3">
            <img src={locationIcon} alt="" />
            <p>{location}</p>
          </div>
          <div className="flex gap-4 text-sm mb-3">
            <img src={taskIcon} alt="" />
            <p>{task}</p>
          </div>
          {status === "ongoing" && (
            <div>
            <TimeEstimate 
            initialDate={initialDate} 
            currentDate={currentDate}/>
          </div>
          )}
        </div>
    </div>
  )
}

export default Card
