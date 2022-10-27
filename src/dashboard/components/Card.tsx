type CardProps = {
                title:string,
                amount:string,
                icon: string,
                style: string,
            }
const Card:React.FC<CardProps> = ({title,amount,icon, style}) => {
  return (
    <div className="bg-white-1 border border-primary-50 rounded-xl text-left flex gap-x-8 py-3 px-2 ">
      <div>
                <p className="font-medium text-xs"> {title} </p>
                <h2 className="font-extrabold text-2xl"> {amount} </h2>
      </div>
      <div className={style}>
        <img src={icon} alt="" />
      </div>
    </div>
  )
}

export default Card
