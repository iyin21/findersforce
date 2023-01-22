import Money from "../../../assets/Money.svg"
import Time from "../../../assets/Time.svg"
import Operative from "../../../assets/Operative.svg"
import Card from "../../dashboard/components/cards/Card"
import BarChart from "../../dashboard/components/charts/BarChart"
import PieChart from "../../dashboard/components/charts/PieChart"
import ShiftCard from "../../dashboard/components/cards/ShiftCard"
import Rating from "../../../pages/dashboard/components/rating/Rating"
import LocationIcon from "../../../assets/LocationIcon.svg"
import TaskIcon from "../../../assets/TaskIcon.svg"
import CalenderIcon from "../../../assets/CalenderIcon.svg"
import MessageIcon from "../../../assets/MessageIcon.svg"
import Empty from "../../../assets/Empty.png"
import ClockIcon from "../../../assets/ClockIcon.svg"
import { useNavigate } from "react-router-dom"
import { DateRangePicker } from "@mantine/dates"
import { BsCalendar2Date } from "react-icons/bs"
import { useGetDashboardAnalytics } from "../../../hooks/dashboard/useDashboard.hook"
import { useGetShiftHistory } from "../../../hooks/planner/usePlanner.hooks"
import dayjs from "dayjs"


const Analytics = ({
    value,
    setValue,
    regionId
}: {
    value: [Date | null, Date | null]
    setValue: any
    regionId: string
}) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/planner`)
    }

    const { data: dashboardAnalytics } = useGetDashboardAnalytics({
        dateFrom: value?.[0],
        dateTo: value?.[1],
        regionId: regionId
    })
    
    const { data: ongoingShiftsData } = useGetShiftHistory({
        ongoing: true,
        regionId: regionId
    })

    const { data: upcomingShiftsData } = useGetShiftHistory({
        upcoming: true,
        regionId: regionId
    })

    return (
        <>
            <div>
                <div className="block md:hidden">
                    <DateRangePicker
                        placeholder="Start date - End date"
                        value={value}
                        onChange={setValue}
                        radius="md"
                        amountOfMonths={2}
                        icon={<BsCalendar2Date />}
                    />
                </div>
            </div>
            <div className="lg:flex flex-row gap-8 justify-between block">
                <div className="lg:basis-3/4">
                    <section className="overflow-x-scroll lg:overflow-x-hidden my-5">
                        <div className="lg:flex justify-between grid grid-cols-3 lg:w-full w-[850px] my-8 gap-4">
                            <Card
                                title={"WAGES"}
                                amount={dashboardAnalytics?.amountPaid?.total}
                                icon={Money}
                                subtitle={`£ ${dashboardAnalytics?.amountPaid?.thisMonth}`}
                                desc={"PAID"}
                                onClick={() => handleNavigate()}
                            />
                            <Card
                                title={"HOURS"}
                                amount={dashboardAnalytics?.hoursCompleted
                                    ?.total}
                                icon={Time}
                                subtitle={`${dashboardAnalytics?.hoursCompleted?.thisMonth} hrs`}
                                desc={"COMPLETED"}
                                onClick={() => handleNavigate()}
                            />
                            <Card
                                title={"OPERATIVES"}
                                amount={dashboardAnalytics?.operativesHired
                                    ?.total}
                                icon={Operative}
                                subtitle={`${dashboardAnalytics?.operativesHired?.thisMonth} ops`}
                                desc={"HIRED"}
                                onClick={() => navigate("/pending")}
                            />
                        </div>
                    </section>
                    <section className="lg:flex justify-between gap-8">
                        <BarChart value={value} />
                        <PieChart value={value} />
                    </section>
                </div>
                <div className="lg:basis-1/4">
                    <Rating value={value} />
                    <section>
                        <div className="relative my-5 rounded-lg">
                            <p className="text-md font-medium  sticky top-0 bg-gray-100 rounded-t-lg py-3 pl-4 ">
                                {" "}
                                ACTIVE SHIFTS{" "}
                                <span
                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${"bg-red-100 text-white-100 text-3sm"}`}
                                >
                                    {ongoingShiftsData?.results?.length}
                                </span>
                                <span
                                    className="text-md font-bold text-green-100 sticky top-0 cursor-pointer ml-12"
                                    onClick={() => handleNavigate()}
                                    data-testid="ongoingData_link"
                                >
                                    See All
                                </span>
                            </p>
                            {ongoingShiftsData?.results?.length === 0 ? (
                                <div className=" bg-gray-100 rounded-b-lg pb-4 px-4 relative">
                                    <div className="bg-white-100 px-6 py-3 rounded-lg">
                                        <img src={Empty} alt="empty-state" />
                                        <p className=" text-center text-3sm font-creato">
                                            Ongoing shifts will appear here
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <ShiftCard
                                    profileImage={ongoingShiftsData?.results[0]
                                        ?.operative?.profileImageUrl}
                                    firstName={ ongoingShiftsData?.results[0]
                                        ?.operative?.firstName}
                                    lastName={ongoingShiftsData?.results[0]
                                        ?.operative?.lastName}
                                    locationIcon={LocationIcon}
                                    location={ongoingShiftsData?.results[0]
                                        ?.jobListing?.jobLocation
                                        ?.formattedAddress}
                                    taskIcon={TaskIcon}
                                    task={ongoingShiftsData?.results[0]
                                        ?.jobListing?.jobType?.name}
                                    messageIcon={MessageIcon}
                                    calenderIcon={""}
                                    date={""}
                                    clockIcon={""}
                                    startTime={""}
                                    endTime={""}
                                    duration={""}
                                    initialDate={ new Date(
                                        ongoingShiftsData?.results[0]?.jobListing?.shiftEndTime
                                    )
                                }
                                    status={"ongoing"}
                                />
                            )}
                        </div>

                        <div className="overflow-y-scroll relative rounded-t-lg my-5">
                            <p className="text-md font-medium sticky z-20 top-0 bg-gray-100 rounded-t-lg py-3 pl-4 ">
                                {" "}
                                UPCOMING SHIFTS{" "}
                                <span
                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${"bg-red-100 text-white-100 text-3sm"}`}
                                >
                                    {upcomingShiftsData?.results?.length}
                                </span>
                                <span
                                    className="text-md font-bold text-green-100 sticky top-0  cursor-pointer ml-12"
                                    onClick={() => handleNavigate()}
                                    data-testid="upcomingData_link"
                                >
                                    See All
                                </span>
                            </p>
                            {upcomingShiftsData?.results?.length === 0 ? (
                                <div className=" bg-gray-100 rounded-b-lg pb-4 px-4 relative">
                                    <div className="bg-white-100 px-6 py-3 rounded-lg">
                                        <img src={Empty} alt="empty-state" />
                                        <p className=" text-center font-creato text-3sm">
                                            Upcoming shifts will appear here
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {upcomingShiftsData?.results?.map(
                                        (item, index) => (
                                            <ShiftCard
                                                key={index}
                                                profileImage={
                                                    item?.operative
                                                        ?.profileImageUrl}
                                                firstName={item?.operative
                                                    ?.firstName}
                                                lastName={item?.operative
                                                    ?.lastName}
                                                calenderIcon={CalenderIcon}
                                                date={dayjs(
                                                    item?.jobListing
                                                        ?.jobDate
                                                ).format("ddd, DD MMM, YY")}
                                                clockIcon={ClockIcon}
                                                locationIcon={LocationIcon}
                                                location={item?.jobListing
                                                    ?.jobLocation
                                                    ?.formattedAddress}
                                                task={item?.jobListing
                                                    ?.jobType?.name}
                                                messageIcon={MessageIcon}
                                                startTime={dayjs(
                                                    item?.jobListing
                                                        ?.shiftStartTime
                                                ).format("h:mm A")}
                                                endTime={` - ${dayjs(
                                                    item?.jobListing
                                                        .shiftEndTime
                                                ).format("h:mm A")}`}
                                                duration={`(${item?.jobListing?.shiftDurationInHours}H)`}
                                                status={"upcoming"}
                                                taskIcon={TaskIcon}
                                            />
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Analytics
