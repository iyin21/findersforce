import { ShiftCardProps } from "../../../types/dashboard/interfaces"

const Card:React.FC<ShiftCardProps> = ({profileImage,profileName,messageIcon,calenderIcon,date,clockIcon,time,locationIcon,location,taskIcon,task,hour,minute,second}) => {
  return (
    <div className=" bg-gray-100 rounded-b-lg pb-4 px-4 relative">
        
        <div className="bg-white-100 px-6 py-3 rounded-lg">
          <div className="flex gap-4 text-2md  mb-3 font-bold">
            <img src={profileImage} alt="" />
            <p className="pt-1">{profileName}</p>
            <img src={messageIcon} alt="" className="" />
          </div>
          <div className="flex gap-4 text-sm mb-3">
            <img src={calenderIcon} alt="" />
            <p>{date}</p>
          </div>
          <div className="flex gap-4 text-sm mb-3">
            <img src={clockIcon} alt="" />
            <p>{time}</p>
          </div>
          <div className="flex gap-4 text-sm mb-3">
            <img src={locationIcon} alt="" />
            <p>{location}</p>
          </div>
          <div className="flex gap-4 text-sm mb-3">
            <img src={taskIcon} alt="" />
            <p>{task}</p>
          </div>
          <div className="bg-black-100 text-yellow-100 text-3xl font-extrabold rounded-lg">
              <div className="flex justify-center gap-2  tracking-wider">
                <span>{hour}</span>
                <span>{minute}</span>
                <span>{second}</span>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Card
