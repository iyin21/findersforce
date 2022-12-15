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
        <p className=" font-medium px-8 text-md">TASK TYPE DISTRIBUTION</p>
        <p className="text-sm text-black-50 pb-4 px-8">Task type distribution for operatives you have hired</p>
        <Chart
        chartType="PieChart"
        data={pieChartData}
        options={options}
        />

      </div>
  )
}

export default PieChart
