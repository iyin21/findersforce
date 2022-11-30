import { useGetDashboardAnalytics } from "../../../hooks/dashboard/useDashboard.hook";
import { Chart } from "react-google-charts"

const PieChart = ({value}:{value: [Date | null, Date | null]}) => {
  const {data:dashboardAnalytics} = useGetDashboardAnalytics({
    dateFrom: value[0] ,
    dateTo: value[1]
  });

  const pieChartData = [
    ["genderDistribution", "percentage"],
    ["percentageFemale", dashboardAnalytics?.genderDistribution?.percentageFemale],
    ["percentageMale", dashboardAnalytics?.genderDistribution?.percentageMale],
    ["percentageRatherNotSay", dashboardAnalytics?.genderDistribution?.percentageRatherNotSay]
  ];

  const options = {
    pieHole: 0.4,
    is3D: false,
    legend: "none",
    slices: {
      1: {  color: "#6C56F9"  },
      2: {color: "#2196F3", offset: 0.4,},
      3: {color: "#FED70A"}
    },
  }
  return (
      <div className="bg-white-100 py-4 border border-black-10 rounded-lg cursor-pointer w-[100%] my-8">
        <p className=" font-medium px-8">GENDER DISTRIBUTION</p>
        <p className="text-sm text-black-50 pb-4 px-8">Gender distribution for operatives you have hired</p>
        <Chart
        chartType="PieChart"
        data={pieChartData}
        options={options}
        />

        <div className="flex justify-around">
          <p className="text-sm tracking-wide font-creato">
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline m-2">
          <circle cx="4" cy="4.5" r="4" fill="#6C56F9"/>
          </svg>
          Male
          </p>
          <p className="text-sm tracking-wide font-creato">
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline m-2">
          <circle cx="4" cy="4.5" r="4" fill="#2196F3"/>
          </svg>
          Female
          </p>
          <p className="text-sm tracking-wide font-creato">
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
