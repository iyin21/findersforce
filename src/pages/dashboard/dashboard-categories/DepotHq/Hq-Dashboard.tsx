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
import {
    useGetDashboardAnalytics,
    useGetDepotRegions,
} from "../../../../hooks/dashboard/useDashboard.hook"
import { useGetShiftHistory } from "../../../../hooks/planner/usePlanner.hooks"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import Empty from "../../../../assets/Empty.png"
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates"
import { useState } from "react"
import { Select } from "@mantine/core"
import useAuthContext from "../../../../hooks/auth-hooks/useAuth"

const DepotHqDashboard = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/planner`)
    }

    const { state } = useAuthContext()
    const companyId = state?.user?.company?._id

    const { data: regionData } = useGetDepotRegions({
        id: companyId,
    })
    // console.log(regionData)

    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 7)

    const [value, setValue] = useState<DateRangePickerValue>([
        currentDate,
        new Date(),
    ])

    const [selectValue, setSelectValue] = useState<string | null>(null)

    const { data: dashboardAnalytics } = useGetDashboardAnalytics({
        dateFrom: value?.[0],
        dateTo: value?.[1],
        regionId: selectValue,
    })

    const { data: upcomingShiftsData } = useGetShiftHistory({
        upcoming: true,
    })
    const { data: ongoingShiftsData } = useGetShiftHistory({
        ongoing: true,
    })

    let regionAddress: any
    if (regionData) {
        regionAddress = regionData?.map((item) => {
            return {
                label: item?.address,
                value: item?._id,
            }
        })
    } else {
        regionAddress = []
    }

    return (
        <Layout pageTitle={"Dashboard"}>
            <main className="md:p-6 p-6 mt-4 md:mt-14 bg-white-100 ">
                <section className=" lg:flex bg-white-100 justify-between block">
                    <div>
                        <h1 className="font-extrabold text-3.5xl font-creatoBold">
                            Dashboard
                        </h1>
                        <p className="text-black-60 text-base font-creato pb-5">
                            Analyse a performance snapshot across your entire
                            Organisation.
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
                            data={regionAddress}
                            value={selectValue}
                            onChange={setSelectValue}
                        />
                    </div>
                </section>
                <div className="lg:flex flex-row gap-8 justify-between block">
                    <div className="lg:basis-[75%]">
                        <section className="bg-[url('/src/assets/Thumbnail2.png')] relative  bg-cover text-white-100 pl-5 pb-5 rounded-lg">
                            <div className="lg:block flex justify-between gap-4">
                                <div>
                                    <p className=" lg:text-2xl text-2md lg:w-96 pt-5 font-creato">
                                        Post shifts in just 2 steps. Stop
                                        recruiting.{" "}
                                        <span className="font-bold font-creatoBold text-yellow-100">
                                            {" "}
                                            Start managing
                                        </span>
                                        .
                                    </p>
                                    <p className="pt-2 text-white-30 lg:text-3md text-2md font-creato">
                                        {" "}
                                        Experience the new industry standard of
                                        depot performance.{" "}
                                    </p>
                                    <span className="text-yellow-100 lg:text-3md  text-2md font-medium pt-2 pb-5 font-creatoBoldMedium">
                                        Post your next shift
                                    </span>
                                    <img
                                        src={UpperRightArrow2}
                                        alt=""
                                        className="inline"
                                    />
                                </div>
                            </div>
                        </section>
                        <section className="overflow-x-scroll lg:overflow-x-hidden my-5">
                            <div className="lg:flex justify-between grid grid-cols-3 lg:w-full w-[850px]  gap-4">
                                <Card
                                    title={"WAGES"}
                                    desc={"PAID"}
                                    amount={
                                        dashboardAnalytics?.amountPaid?.total
                                    }
                                    icon={Money}
                                    subtitle={`£ ${dashboardAnalytics?.amountPaid?.thisMonth}`}
                                    onClick={() => handleNavigate()}
                                />
                                <Card
                                    title={"HOURS"}
                                    desc={"COMPLETED"}
                                    amount={
                                        dashboardAnalytics?.hoursCompleted
                                            ?.total
                                    }
                                    icon={Time}
                                    subtitle={`${dashboardAnalytics?.hoursCompleted?.thisMonth} hrs`}
                                    onClick={() => handleNavigate()}
                                />
                                <Card
                                    title={"OPERATIVES"}
                                    desc={"HIRED"}
                                    amount={
                                        dashboardAnalytics?.operativesHired
                                            ?.total
                                    }
                                    icon={Operative}
                                    subtitle={`${dashboardAnalytics?.operativesHired?.thisMonth} ops`}
                                    onClick={() => navigate("/pending")}
                                />
                            </div>
                        </section>
                        <section className="lg:flex justify-between gap-8">
                            <BarChart value={value} selectValue={selectValue} />
                            <PieChart value={value} selectValue={selectValue} />
                        </section>
                    </div>
                    <div className="lg:basis-[25%]">
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
                                            <img
                                                src={Empty}
                                                alt="empty-state"
                                            />
                                            <p className=" text-center text-3sm font-creato">
                                                Ongoing shifts will appear here
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <ShiftCard
                                        profileImage={
                                            ongoingShiftsData?.results[0]
                                                ?.operative?.profileImageUrl
                                        }
                                        firstName={
                                            ongoingShiftsData?.results[0]
                                                ?.operative?.firstName
                                        }
                                        lastName={
                                            ongoingShiftsData?.results[0]
                                                ?.operative?.lastName
                                        }
                                        locationIcon={LocationIcon}
                                        location={
                                            ongoingShiftsData?.results[0]
                                                ?.jobListing?.jobLocation
                                                ?.formattedAddress
                                        }
                                        taskIcon={TaskIcon}
                                        task={
                                            ongoingShiftsData?.results[0]
                                                ?.jobListing?.jobType?.name
                                        }
                                        messageIcon={MessageIcon}
                                        calenderIcon={""}
                                        date={""}
                                        clockIcon={""}
                                        startTime={""}
                                        endTime={""}
                                        duration={""}
                                        initialDate={
                                            new Date(
                                                ongoingShiftsData?.results[0]?.jobListing?.shiftEndTime
                                            )
                                        }
                                        status={"ongoing"}
                                    />
                                )}
                            </div>

                            <div className="overflow-y-scroll h-52 relative rounded-t-lg my-5">
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
                                            <img
                                                src={Empty}
                                                alt="empty-state"
                                            />
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
                                                            ?.profileImageUrl
                                                    }
                                                    firstName={
                                                        item?.operative
                                                            ?.firstName
                                                    }
                                                    lastName={
                                                        item?.operative
                                                            ?.lastName
                                                    }
                                                    calenderIcon={CalenderIcon}
                                                    date={dayjs(
                                                        item?.jobListing
                                                            ?.jobDate
                                                    ).format("ddd, DD MMM, YY")}
                                                    clockIcon={ClockIcon}
                                                    locationIcon={LocationIcon}
                                                    location={
                                                        item?.jobListing
                                                            ?.jobLocation
                                                            ?.formattedAddress
                                                    }
                                                    taskIcon={TaskIcon}
                                                    task={
                                                        item?.jobListing
                                                            ?.jobType?.name
                                                    }
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
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default DepotHqDashboard
