import Empty from "../../../assets/Empty.png"


const EmptyView = ({status} : {status:string}) => {
  return (
                <div className="text-center flex justify-center mt-16">
                                <div>
                                <img src={Empty} alt="empty-state"/>
                                <p className="font-bold font-creatoBold pt-2">Nothing to see here</p>
                                <p className=" font-creato">{status} shifts will appear here.</p>
                                </div>
                </div>
  )
}

export default EmptyView
