import { CardProps } from "../../../types/dashboard/interfaces"

const Card:React.FC<CardProps> = ({title,amount,icon,desc, subtitle, onClick}) => {
  return (
    <div className="bg-white-100 border border-black-10 rounded-xl text-left flex gap-x-8 py-3 px-2 w-[100%] cursor-pointer" onClick={onClick}>
      <div>
          <p className="font-bold text-3sm font-creatoMedium"> {title} <span className="font-normal font-creato">{desc}</span> </p>
          <h2 className="font-extrabold text-2xl font-creatoBold"> {amount} </h2>
          <p className="font-medium text-sm font-creatoMedium">This Month - {subtitle}</p>
      </div>
      <div className="mr-2 ml-auto">
        <img src={icon} alt="" />
      </div>
        
    </div>
  )
}

export default Card
