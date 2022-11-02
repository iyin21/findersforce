import PieCharts from "../../../assets/PieChart.svg"

const PieChart = () => {
  return (
      <div className="bg-white-100 py-4 px-10 border border-black-10 rounded-lg cursor-pointer">
        <p className=" font-medium">GENDER DISTRIBUTION</p>
        <p className="text-sm text-black-50 pb-4">Gender distribution for operatives you have hired</p>
        <img src={PieCharts} alt="" className="m-auto" />
        <div className="flex justify-around">
          <p className="text-sm tracking-wide">
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline m-2">
          <circle cx="4" cy="4.5" r="4" fill="#6C56F9"/>
          </svg>
          Male
          </p>
          <p className="text-sm tracking-wide">
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline m-2">
          <circle cx="4" cy="4.5" r="4" fill="#2196F3"/>
          </svg>
          Female
          </p>
          <p className="text-sm tracking-wide">
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline m-2">
          <circle cx="4" cy="4.5" r="4" fill="#FED70A"/>
          </svg>
          Rather not say
          </p>
        </div>
      </div>
  )
}

export default PieChart
