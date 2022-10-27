import PieCharts from "../assets/PieChart.svg"

const PieChart = () => {
  return (
      <div className="bg-white-30 py-4 px-4 border border-white-40 rounded-lg text-primary-1 cursor-pointer">
        <p className="text-sm font-medium">GENDER DISTRIBUTION</p>
        <p className="text-xs text-primary-20 pb-4">Gender distribution for operatives you have hired</p>
        <img src={PieCharts} alt="" className="m-auto" />
        <div className="flex justify-around">
          <p className="text-xs tracking-wide">
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline m-2">
          <circle cx="4" cy="4.5" r="4" fill="#6C56F9"/>
          </svg>
          Male
          </p>
          <p className="text-xs tracking-wide">
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline m-2">
          <circle cx="4" cy="4.5" r="4" fill="#2196F3"/>
          </svg>
          Female
          </p>
          <p className="text-xs tracking-wide">
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
