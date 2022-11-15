
import { Progress } from "@mantine/core"
import { useGetDashboardAnalytics } from "../../../../hooks/dashboard/useDashboard.hook";
import { AiFillStar } from "react-icons/ai";



const Rating = () => {

  
  const {data:dashboardAnalytics} = useGetDashboardAnalytics();
  
  return (
      <section className="bg-yellow-100 rounded-lg px-4 py-4">
        <p className="text-2md font-medium">PERFORMANCE</p>
        
        <span className="text-2xl font-extrabold tracking-wide px-2">  <AiFillStar size={30} style={{color: "#FFFFFF"}} className="inline mx-2"/>{dashboardAnalytics?.rating?.averageScore}</span>
        <span className="text-sm font-medium tracking-wide">(from {dashboardAnalytics?.rating?.totalShiftsRated} shifts)</span>
        <div className="flex justify-between mb-3 place-items-center">
          <p className=" text-xs">Professionalism</p>
         {Number(dashboardAnalytics?.rating?.professionalismScore) <= 2 ? (<Progress value={Number(dashboardAnalytics?.rating?.professionalismScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
          :
          (<Progress value={Number(dashboardAnalytics?.rating?.professionalismScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
        }
        </div>
        <div className="flex justify-between mb-3 place-items-center">
          <p className=" text-xs">Punctuality</p>
          {Number(dashboardAnalytics?.rating?.helpfulnessScore) <= 2 ? (<Progress value={Number(dashboardAnalytics?.rating?.helpfulnessScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
          :
          (<Progress value={Number(dashboardAnalytics?.rating?.helpfulnessScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
        }
        </div>
        <div className="flex justify-between place-items-center ">
          <p className=" text-xs">Helpfulness</p>
          {Number(dashboardAnalytics?.rating?.organizationScore) <= 2 ? (<Progress value={Number(dashboardAnalytics?.rating?.organizationScore)/5 * 100} color="#F44336" className="w-[50%]"/>) 
          :
          (<Progress value={Number(dashboardAnalytics?.rating?.organizationScore)/5 * 100} color="#4DB25D" className="w-[50%]"/>)
        }
        </div>
      </section>
  )
}

export default Rating