import Money from "../../../assets/Money.svg"
import Time from "../../../assets/Time.svg"
import Operative from "../../../assets/Operative.svg"
import Card from "../../../pages/dashboard/components/Card"
import BarChart from "../../../pages/dashboard/components/BarChart"
import PieChart from "../../../pages/dashboard/components/PieChart"
import ShiftCard from "../../../pages/dashboard/components/ShiftCard"
import Rating from "../../../pages/dashboard/components/rating/Rating"
import LocationIcon from "../../../assets/LocationIcon.svg"
import TaskIcon from "../../../assets/TaskIcon.svg"
import MessageIcon from "../../../assets/MessageIcon.svg"
import Empty from "../../../assets/Empty.png"
import ClockIcon from "../../../assets/ClockIcon.svg"
import { useNavigate } from "react-router-dom"

const ongoingShiftsData = {
    results: [],
}

const upcomingShiftsData = {
    results: [],
}

const Analytics = ({ value }: { value: [Date | null, Date | null] }) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/planner`)
    }
    return (
        <div className="flex flex-row gap-8 justify-between">
            <div className="basis-3/4">
                <section>
                    <div className="flex justify-between my-8">
                        <Card
                            title={"AMOUNT PAID"}
                            amount={0}
                            icon={Money}
                            style={"bg-green-10 rounded-full p-4"}
                            subtitle={`£ ${"0"}`}
                        />
                        <Card
                            title={"HOURS COMPLETED"}
                            amount={0}
                            icon={Time}
                            style={"bg-yellow-20 rounded-full p-4"}
                            subtitle={`${"0"} hrs`}
                        />
                        <Card
                            title={"OPERATIVES HIRED"}
                            amount={0}
                            icon={Operative}
                            style={"bg-green-10 rounded-full p-4"}
                            subtitle={`${"0"} operatives`}
                        />
                    </div>
                </section>
                <section className="flex justify-between">
                    <BarChart value={value} />
                    <PieChart value={value} />
                </section>
            </div>
            <div className="basis-1/4">
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
                                profileImage={""}
                                firstName={""}
                                lastName={""}
                                locationIcon={LocationIcon}
                                location={""}
                                taskIcon={TaskIcon}
                                task={""}
                                messageIcon={MessageIcon}
                                calenderIcon={""}
                                date={""}
                                clockIcon={""}
                                startTime={""}
                                endTime={""}
                                duration={""}
                                initialDate={new Date()}
                                status={"ongoing"}
                            />
                        )}
                    </div>

                    <div className="overflow-y-scroll  h-52 relative rounded-t-lg my-5">
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
                                            profileImage={""}
                                            firstName={""}
                                            lastName={""}
                                            calenderIcon={""}
                                            date={""}
                                            clockIcon={ClockIcon}
                                            locationIcon={LocationIcon}
                                            location={""}
                                            task={""}
                                            messageIcon={MessageIcon}
                                            startTime={""}
                                            endTime={""}
                                            duration={""}
                                            status={"upcoming"}
                                            taskIcon={undefined}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Analytics
