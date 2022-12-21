import { useGetDashboardAnalytics } from "../../../hooks/dashboard/useDashboard.hook";
import { Chart } from "react-google-charts"

const PieChart = ({value, selectValue}:{value: [Date | null, Date | null], selectValue?:any}) => {
  const {data:dashboardAnalytics} = useGetDashboardAnalytics({
    dateFrom: value[0] ,
    dateTo: value[1],
    regionId: selectValue
  });

  // const pieChartData = [
  //   ["genderDistribution", "percentage"],
  //   ["percentageFemale", dashboardAnalytics?.genderDistribution?.percentageFemale],
  //   ["percentageMale", dashboardAnalytics?.genderDistribution?.percentageMale],
  //   ["percentageRatherNotSay", dashboardAnalytics?.genderDistribution?.percentageRatherNotSay]
  // ];


  const taskDistribution:any = dashboardAnalytics?.jobTypeDistribution?.map((item ) => {
    const arr = [];
    arr.push(item?.jobType);
    arr.push(item?.count);
    return arr;
  } )

  taskDistribution?.unshift(["jobType", "count"])


  const options = {
    pieHole: 0.4,
    is3D: false,
    legend: "none",
  }
  return (
      <div className="bg-white-100 py-4 border border-black-10 rounded-lg cursor-pointer w-[100%] my-8">
        <p className=" font-medium px-8 text-md">TASK TYPE DISTRIBUTION</p>
        <p className="text-sm text-black-50 pb-4 px-8">Task type distribution for operatives you have hired</p>
        <Chart
        chartType="PieChart"
        data={taskDistribution}
        options={options}
        />

      </div>
  )
}

export default PieChart
