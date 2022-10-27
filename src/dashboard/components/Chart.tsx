import CanceledShifts from "../assets/CanceledShifts.svg"
import Charts from "../assets/Chart.svg"
import Arrow from "../assets/Arrow.svg"
import UpperRightArrow from "../assets/UpperRightArrow.svg"

const Chart = () => {
  return (
        <div className="bg-white-10 rounded-t-lg pt-8 cursor-pointer ">
          <div className="flex justify-between">
            <div className="p-4">
              <p className="font-extrabold text-2xl">2,090</p>
              <p className="text-xs tracking-wider">SHIFTS COMPLETED</p>
            </div>
            <p className="text-xs p-4">This Month <span className="text-green-1 text-base font-extrabold">200</span></p>
          </div>
          <img src={Charts} alt="" className="px-4" />
          <span className="opacity-40 text-xs font-medium pl-4">Sep 1</span>
          <span className="opacity-90 text-xs font-medium ml-60">Today</span>
          <div className="flex bg-white-20 justify-between rounded-b-lg py-2">
            <div className="flex px-2"> 
              <img src={CanceledShifts} alt=""  className=" px-2"/>
              <p className="text-xs font-medium text-white-50">SHIFTS CANCELED <br />
                <span className="text-xl font-extrabold text-primary-1">200 </span>
                <span className="text-xs text-primary-1">FROM  2022 -11-22 </span> 
                <img src={Arrow} alt="arrow icon" className="inline px-1" /> 
                <span className="text-xs text-primary-1">2022 -12- 31</span> 
              </p>
            </div>
            <div className="px-2">
              <span className=" font-bold text-xs pt-3">View Details </span>
              <img src={UpperRightArrow} alt="" className="inline" />
            </div>
          </div>
        </div>
  )
}

export default Chart