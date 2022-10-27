import Arrow from "./assets/Arrow.svg"
import Calender from "./assets/Calender.svg"
import CalenderIcon from "./assets/CalenderIcon.svg"
import ClockIcon from "./assets/ClockIcon.svg"
import LocationIcon from "./assets/LocationIcon.svg"
import TaskIcon from "./assets/TaskIcon.svg"
import MessageIcon from "./assets/MessageIcon.svg"
import UpperRightArrow2 from "./assets/UpperRightArrow2.svg"


import Money from "./assets/Money.svg"
import Time from "./assets/Time.svg"
import Operative from "./assets/Operative.svg"
import ProfileImage from "./assets/ProfileImage.svg"
import Card from "./components/Card"
import ShiftCard from "./components/ShiftCard"
import Chart from "./components/Chart"
import PieChart from "./components/PieChart"
import Rating from "./components/rating/Rating"
import Layout from "../layout/Layout"

const Dashboard = () => {
  return (
    <Layout pageTitle={"Dashboard"}>
      <main className="px-8 py-6 bg-white-1 h-screen overflow-hidden">
        <section className=" flex bg-white-1 justify-between" >
          <div>
            <h1 className="font-extrabold text-4xl">Dashboard</h1>
            <p className="text-primary-20 text-base pb-5">Here&apos;s a snippet of all your activity on FindersForce.</p>
          </div>
          <div className="text-primary-30 border border-primary-40 rounded-lg h-12 px-5 pt-3 ">
            <span> 2022 -11-22   </span>
            <img src={Arrow} alt="arrow icon" className="inline px-4" />
            <span> 2022 -12- 31</span>
            <img src={Calender} alt="Calender icon" className="inline px-2 cursor-pointer " />
          </div>
        </section>
        <div className="flex flex-row gap-8 justify-between">
          <div className="basis-3/4">
            <section className="bg-dashboard-pattern h-42 bg-cover text-white-30 pl-5 pb-5 rounded-lg">
              <p className="font-extrabold text-2xl w-96 pt-5">Access to top quality traffic management talents.</p>
              <p className="text-primary-60 pt-2">Manage your hiring in 2 steps</p>
              <span className="text-yellow-10 font-medium pt-2 pb-5">Start posting jobs</span>
              <img src={UpperRightArrow2} alt=""  className="inline"/>
            </section>
            <section>
              <div className="flex justify-between my-8">
                <Card title={"AMOUNT PAID"} amount={"£ 12,000"} icon={Money} style={"bg-green-10 rounded-full p-4"}/>
                <Card title={"HOURS COMPLETED"} amount={"12,098 hrs"} icon={Time} style={"bg-yellow-20 rounded-full p-4"}/>
                <Card title={"OPERATIVES HIRED"} amount={"209"} icon={Operative} style={"bg-green-10 rounded-full p-4"}/>
              </div>  
            </section>
            <section className="flex justify-between">
              <Chart/>
              <PieChart/>
            </section>
          </div>
          <div className="basis-1/4">
            <Rating/>
            <section>
              <div className="relative my-5 rounded-lg">
                <p className="text-sm font-medium  sticky top-0 bg-white-40 py-3 pl-4 "> ACTIVE SHIFTS <span className="text-sm font-bold text-green-1 sticky top-0 bg-white-40 cursor-pointer ml-12">See All</span></p>
                <ShiftCard
                    profileImage={ProfileImage}
                    profileName={"Shaquan Roberts"}
                    locationIcon={LocationIcon}
                    location={"Iolaire Road, New Invention"}
                    taskIcon={TaskIcon} task={"2-Way"}
                    messageIcon={MessageIcon}
                    calenderIcon={""}
                    date={""}
                    clockIcon={""}
                    time={""} 
                    hour={"01:"} minute={"59:"} second={"04"}            />
              </div>
              
              <div className="overflow-y-scroll  h-52 relative rounded-t-lg my-5">
                <p className="text-sm font-medium sticky z-20 top-0 bg-white-40 py-3 pl-4 "> UPCOMING SHIFTS  <span className="text-sm font-bold text-green-1 sticky top-0 bg-white-40 cursor-pointer ml-4">See All</span></p>
                  <ShiftCard 
                    profileImage={ProfileImage}
                    profileName={"Shaquan Roberts"}
                    calenderIcon={CalenderIcon}
                    date={"Wed, 14 Dec 22"}
                    clockIcon={ClockIcon}
                    time={"07:00 - 09:00 (2H)"}
                    locationIcon={LocationIcon}
                    location={"Iolaire Road, New Invention"}
                    taskIcon={TaskIcon} task={"2-Way"}
                    messageIcon={MessageIcon} 
                    hour={""} minute={""} second={""}/>
                    
                  <ShiftCard 
                    profileImage={ProfileImage}
                    profileName={"Shaquan Roberts"}
                    calenderIcon={CalenderIcon}
                    date={"Wed, 14 Dec 22"}
                    clockIcon={ClockIcon}
                    time={"07:00 - 09:00 (2H)"}
                    locationIcon={LocationIcon}
                    location={"Iolaire Road, New Invention"}
                    taskIcon={TaskIcon} task={"2-Way"}
                    messageIcon={MessageIcon} 
                    hour={""} minute={""} second={""}/>
                </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Dashboard