
import { Progress } from "@mantine/core"
import { useGetDashboardAnalytics } from "../../../../hooks/dashboard/useDashboard.hook";
import { AiFillStar } from "react-icons/ai";



const Rating = ({value}:{value: [Date | null, Date | null]} ) => {
  
  const {data:dashboardAnalytics} = useGetDashboardAnalytics({
    dateFrom: value[0] ,
    dateTo: value[1]
  });
  
  return (
      <section className="bg-black-100 rounded-lg px-4 py-4 text-white-100">
        <p className="text-md  ">RATING <span className="font-medium font-creatoMedium">PERFORMANCE</span> </p>
        <div className="py-2">
          <span className="text-2mxl font-extrabold tracking-wide px-2 font-creatoBold">  <AiFillStar size={30} style={{color: "#FED70A"}} className="inline mx-2"/>{dashboardAnalytics?.rating?.averageScore}</span>
          <span className="text-3sm font-medium tracking-wide font-creatoMedium">(from {dashboardAnalytics?.rating?.totalShiftsRated} shifts)</span>
        </div>
        
        <div className="flex justify-between mb-3 place-items-center">
          <p className=" text-sm font-medium font-creatoMedium">Communication</p>
         {Number(dashboardAnalytics?.rating?.professionalismScore) <= 2 ? (<Progress value={Number(dashboardAnalytics?.rating?.professionalismScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
          :
          (<Progress value={Number(dashboardAnalytics?.rating?.professionalismScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
        }
        </div>
        <div className="flex justify-between mb-3 place-items-center">
          <p className=" text-sm font-medium font-creatoMedium">Organisation</p>
          {Number(dashboardAnalytics?.rating?.organizationScore) <= 2 ? (<Progress value={Number(dashboardAnalytics?.rating?.organizationScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
          :
          (<Progress value={Number(dashboardAnalytics?.rating?.organizationScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
        }
        </div>
        <div className="flex justify-between place-items-center ">
          <p className=" text-sm font-medium font-creatoMedium">Vibe</p>
          {Number(dashboardAnalytics?.rating?.helpfulnessScore) <= 2 ? (<Progress value={Number(dashboardAnalytics?.rating?.helpfulnessScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
          :
          (<Progress value={Number(dashboardAnalytics?.rating?.helpfulnessScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
        }
        </div>
      </section>
  )
}

export default Rating