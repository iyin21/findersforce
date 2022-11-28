import CalenderIcon from "../../../../assets/CalenderIcon.svg"
import ClockIcon from "../../../../assets/ClockIcon.svg"
import LocationIcon from "../../../../assets/LocationIcon.svg"
import TaskIcon from "../../../../assets/TaskIcon.svg"
import MessageIcon from "../../../../assets/MessageIcon.svg"
import UpperRightArrow2 from "../../../../assets/UpperRightArrow2.svg"
import Time from "../../../../assets/Time.svg"
import Money from "../../../../assets/Money.svg"
import Operative from "../../../../assets/Operative.svg"
import Card from "../../components/Card"
import ShiftCard from "../../components/ShiftCard"
import BarChart from "../../components/BarChart"
import PieChart from "../../components/PieChart"
import Rating from "../../components/rating/Rating"
import Layout from "../../../../components/Layout"
import { useGetDashboardAnalytics } from "../../../../hooks/dashboard/useDashboard.hook"
import { useGetShiftHistory } from "../../../../hooks/planner/usePlanner.hooks"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import Empty from "../../../../assets/Empty.png"
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates"
import { useState } from "react"
import Desktop from "../../../../assets/desktop.png"
import { Select } from "@mantine/core"
const DepotHqDashboard = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/planner`)
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7)


    const [value, setValue] = useState<DateRangePickerValue>([
        currentDate,
        new Date(),
      ]);

    const {data:dashboardAnalytics} = useGetDashboardAnalytics({
        dateFrom: value?.[0],
        dateTo: value?.[1]
    });

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
            <main className="md:p-6 p-6 mt-4 md:mt-14 bg-white-100 lg:block">
                <section className=" lg:flex bg-white-100 justify-between block">
                    <div>
                        <h1 className="font-extrabold text-3xl font-creatoBold">Dashboard</h1>
                        <p className="text-primary-20 text-base pb-5">
                            Here&apos;s a snippet of all your activity on
                            FindersForce.
                        </p>
                    </div>
                    <div className=" flex gap-4 my-3">
                        <DateRangePicker
                            placeholder="Start date - End date"
                            value={value}
                            onChange={setValue}
                            radius="md"
                            amountOfMonths={2}
                        />
                         <Select
                                
                                placeholder="All Locations"
                                data={[
                                { value: 'react', label: 'React' },
                                { value: 'ng', label: 'Angular' },
                                { value: 'svelte', label: 'Svelte' },
                                { value: 'vue', label: 'Vue' },
                                ]}
                         />
                    </div>
                </section>
                <div className="lg:flex flex-row gap-8 justify-between block">
                    <div className="lg:basis-3/4">
                        <section className="bg-dashboard-pattern relative text-2md bg-cover text-white-100 pl-5 pb-5 rounded-lg">
                            <div className="lg:block flex justify-between gap-4">
                                <div>
                                    <p className="font-extrabold lg:text-2xl text-2md lg:w-96 pt-5 font-creatoBold">
                                        Access to top quality traffic management
                                        talents.
                                    </p>
                                    <p className="pt-2 text-white-30 text-2md font-creato">
                                        {" "}
                                        Manage your hiring in 2 steps{" "}
                                    </p>
                                    <span className="text-yellow-100 text-2md font-medium pt-2 pb-5 font-creatoBoldMedium">
                                        Start posting jobs
                                    </span>
                                    <img
                                        src={UpperRightArrow2}
                                        alt=""
                                        className="inline"
                                    />
                                </div>
                                <div className="lg:absolute lg:right-10 lg:bottom-3  ">
                                    <img 
                                        src={Desktop} 
                                        alt="desktop" />
                                </div>
                            </div>
                        </section>
                        <section className="overflow-x-scroll lg:overflow-x-hidden my-5">
                            <div className="lg:flex justify-between grid grid-cols-3 lg:w-full w-[850px]  gap-4">
                                <Card
                                    title={"AMOUNT PAID"}
                                    amount={dashboardAnalytics?.amountPaid?.total}
                                    icon={Money}
                                    style={"bg-green-10 rounded-full p-4"}
                                    subtitle={`£ ${dashboardAnalytics?.amountPaid?.thisMonth}`}
                                />
                                <Card
                                    title={"HOURS COMPLETED"}
                                    amount={dashboardAnalytics?.hoursCompleted?.total}
                                    icon={Time}
                                    style={"bg-yellow-20 rounded-full p-4"}
                                    subtitle={`${dashboardAnalytics?.hoursCompleted?.thisMonth} hrs`}
                                />
                                <Card
                                    title={"OPERATIVES HIRED"}
                                    amount={dashboardAnalytics?.operativesHired?.total}
                                    icon={Operative}
                                    style={"bg-green-10 rounded-full p-4"}
                                    subtitle={`${dashboardAnalytics?.operativesHired?.thisMonth} operatives`}
                                />
                            </div>
                        </section>
                        <section className="lg:flex justify-between gap-8">
                            <BarChart value={value} />
                            <PieChart value={value} />
                        </section>
                    </div>
                    <div className="lg:basis-1/4">
                        <Rating value={value}/>
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
                                        initialDate={new Date(ongoingShiftsData?.results[0]?.jobListing?.shiftEndTime)}
                                        status={"ongoing"}                                        
                                    />)
                                }
                            </div>

                            <div className="overflow-y-scroll  relative rounded-t-lg my-5">
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

export default DepotHqDashboard
