import { CardProps } from "../../../types/dashboard/interfaces"

const Card:React.FC<CardProps> = ({title,amount,icon, style,subtitle}) => {
  return (
    <div className="bg-white-100 border border-black-10 rounded-xl text-left flex gap-x-8 py-3 px-2 w-[100%]">
      <div>
          <p className="font-medium text-3sm font-creatoMedium"> {title} </p>
          <h2 className="font-extrabold text-2xl font-creatoBold"> {amount} </h2>
          <p className="font-medium text-sm font-creatoMedium">This Month - {subtitle}</p>
      </div>
      <div className={style}>
        <img src={icon} alt="" />
      </div>
        
    </div>
  )
}

export default Card
