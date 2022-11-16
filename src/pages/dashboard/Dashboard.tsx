import Arrow from "../../assets/Arrow.svg"
import Calender from "../../assets/Calender.svg"
import CalenderIcon from "../../assets/CalenderIcon.svg"
import ClockIcon from "../../assets/ClockIcon.svg"
import LocationIcon from "../../assets/LocationIcon.svg"
import TaskIcon from "../../assets/TaskIcon.svg"
import MessageIcon from "../../assets/MessageIcon.svg"
import UpperRightArrow2 from "../../assets/UpperRightArrow2.svg"

import Money from "../../assets/Money.svg"
import Time from "../../assets/Time.svg"
import Operative from "../../assets/Operative.svg"
import Card from "./components/Card"
import ShiftCard from "./components/ShiftCard"
import Chart from "./components/Chart"
import PieChart from "./components/PieChart"
import Rating from "./components/rating/Rating"
import Layout from "../../components/Layout"
import { useGetDashboardAnalytics } from "../../hooks/dashboard/useDashboard.hook"
import { useGetShiftHistory } from "../../hooks/planner/usePlanner.hooks"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import Empty from "../../assets/Empty.png"

const Dashboard = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/planner`)
      }
    const {data:dashboardAnalytics} = useGetDashboardAnalytics();
    const {
        data: upcomingShiftsData,
    } = useGetShiftHistory({
        upcoming: true,
    })
    const {
        data: ongoingShiftsData,
    } = useGetShiftHistory({
        ongoing: true,
    })
    return (
        <Layout pageTitle={"Dashboard"}>
            <main className="px-8 mt-6 py-6 bg-white-100 overflow-hidden">
                <section className=" flex bg-white-100 justify-between">
                    <div>
                        <h1 className="font-extrabold text-4xl font-creatoBold">Dashboard</h1>
                        <p className="text-primary-20 text-base pb-5">
                            Here&apos;s a snippet of all your activity on
                            FindersForce.
                        </p>
                    </div>
                    <div className="text-black-70 border border-black-10 rounded-lg h-12 px-5 pt-3 ">
                        <span> 2022 -11-22 </span>
                        <img
                            src={Arrow}
                            alt="arrow icon"
                            className="inline px-4"
                        />
                        <span> 2022 -12- 31</span>
                        <img
                            src={Calender}
                            alt="Calender icon"
                            className="inline px-2 cursor-pointer "
                        />
                    </div>
                </section>
                <div className="flex flex-row gap-8 justify-between">
                    <div className="basis-3/4">
                        <section className="bg-dashboard-pattern h-42 bg-cover text-white-100 pl-5 pb-5 rounded-lg">
                            <p className="font-extrabold text-2xl w-96 pt-5 font-creatoBold">
                                Access to top quality traffic management
                                talents.
                            </p>
                            <p className="pt-2 text-white-30 font-creato">
                                {" "}
                                Manage your hiring in 2 steps{" "}
                            </p>
                            <span className="text-yellow-100 font-medium pt-2 pb-5 font-creatoBoldMedium">
                                Start posting jobs
                            </span>
                            <img
                                src={UpperRightArrow2}
                                alt=""
                                className="inline"
                            />
                        </section>
                        <section>
                            <div className="flex justify-between my-8">
                                <Card
                                    title={"AMOUNT PAID"}
                                    amount={dashboardAnalytics?.amountPaid?.total}
                                    icon={Money}
                                    style={"bg-green-10 rounded-full p-4"}
                                    subtitle={dashboardAnalytics?.amountPaid?.thisMonth}
                                />
                                <Card
                                    title={"HOURS COMPLETED"}
                                    amount={dashboardAnalytics?.hoursCompleted?.total}
                                    icon={Time}
                                    style={"bg-yellow-20 rounded-full p-4"}
                                    subtitle={dashboardAnalytics?.hoursCompleted?.thisMonth}
                                />
                                <Card
                                    title={"OPERATIVES HIRED"}
                                    amount={dashboardAnalytics?.operativesHired?.total}
                                    icon={Operative}
                                    style={"bg-green-10 rounded-full p-4"}
                                    subtitle={dashboardAnalytics?.operativesHired?.thisMonth}
                                />
                            </div>
                        </section>
                        <section className="flex justify-between">
                            <Chart />
                            <PieChart />
                        </section>
                    </div>
                    <div className="basis-1/4">
                        <Rating/>
                        <section>
                            <div className="relative my-5 rounded-lg">
                                <p className="text-md font-medium  sticky top-0 bg-gray-100 rounded-t-lg py-3 pl-4 ">
                                    {" "}
                                    ACTIVE SHIFTS{" "}
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${ "bg-red-100 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {ongoingShiftsData?.results?.length}
                                    </span>
                                    <span className="text-md font-bold text-green-100 sticky top-0 cursor-pointer ml-12" onClick={() => handleNavigate()} data-testid="ongoingData_link">
                                        See All
                                    </span>
                                </p>
                                {ongoingShiftsData?.results?.length === 0 ? 
                                (<div className=" bg-gray-100 rounded-b-lg pb-4 px-4 relative">
                                    <div className="bg-white-100 px-6 py-3 rounded-lg">
                                        <img src={Empty} alt="empty-state" />
                                        <p className=" text-center text-3sm font-creato">Ongoing shifts will appear here</p>
                                    </div> 
                                </div>) 
                                : 
                                (<ShiftCard
                                        profileImage={ongoingShiftsData?.results[0]?.operative?.profileImageUrl}
                                        firstName={ongoingShiftsData?.results[0]?.operative?.firstName}
                                        lastName={ongoingShiftsData?.results[0]?.operative?.lastName}
                                        locationIcon={LocationIcon}
                                        location={ongoingShiftsData?.results[0]?.jobListing?.jobLocation?.formattedAddress}
                                        taskIcon={TaskIcon}
                                        task={ongoingShiftsData?.results[0]?.jobListing?.jobType?.name}
                                        messageIcon={MessageIcon}
                                        calenderIcon={""}
                                        date={""}
                                        clockIcon={""}
                                        startTime={""} endTime={""} duration={""}
                                        initialDate={new Date(ongoingShiftsData?.results[0]?.jobListing?.shiftStartTime)}
                                        currentDate={new Date()} 
                                        status={"ongoing"}                                        
                                    />)
                                }
                            </div>

                            <div className="overflow-y-scroll  h-52 relative rounded-t-lg my-5">
                                <p className="text-md font-medium sticky z-20 top-0 bg-gray-100 rounded-t-lg py-3 pl-4 ">
                                    {" "}
                                    UPCOMING SHIFTS{" "}
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${ "bg-red-100 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {upcomingShiftsData?.results?.length}
                                    </span>
                                    <span className="text-md font-bold text-green-100 sticky top-0  cursor-pointer ml-12" onClick={() => handleNavigate()} data-testid="upcomingData_link">
                                        See All
                                    </span>
                                </p>
                                {upcomingShiftsData?.results?.length === 0 ?
                                (<div className=" bg-gray-100 rounded-b-lg pb-4 px-4 relative">
                                    <div className="bg-white-100 px-6 py-3 rounded-lg">
                                        <img src={Empty} alt="empty-state" />
                                        <p className=" text-center font-creato text-3sm">Upcoming shifts will appear here</p>
                                    </div> 
                                </div>)
                                :
                                (<div>
                                    {upcomingShiftsData?.results?.map((item,index) => (
                                    <ShiftCard key={index}
                                    profileImage={item?.operative?.profileImageUrl}
                                    firstName={item?.operative?.firstName}
                                    lastName={item?.operative?.lastName}
                                    calenderIcon={CalenderIcon}
                                    date={dayjs(item?.jobListing?.jobDate).format("ddd, DD MMM, YY")}
                                    clockIcon={ClockIcon}
                                    locationIcon={LocationIcon}
                                    location={item?.jobListing?.jobLocation?.formattedAddress}
                                    taskIcon={TaskIcon}
                                    task={item?.jobListing?.jobType?.name}
                                    messageIcon={MessageIcon}
                                    startTime={dayjs(item?.jobListing?.shiftStartTime).format("h:mm A")}
                                    endTime={` - ${dayjs(item?.jobListing.shiftEndTime).format("h:mm A")}`}
                                    duration={`(${item?.jobListing?.shiftDurationInHours}H)`} 
                                    status={"upcoming"}                                    
                                    />
                                ))}
                                </div>)}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Dashboard
