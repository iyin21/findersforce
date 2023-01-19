import CanceledShifts from "../../../assets/CanceledShifts.svg"
import Arrow from "../../../assets/Arrow.svg"
import UpperRightArrow from "../../../assets/UpperRightArrow.svg"
import { Chart } from "react-google-charts"
import { useGetDashboardAnalytics } from "../../../hooks/dashboard/useDashboard.hook"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

const BarChart = ({
    value,
    selectValue,
}: {
    value: [Date | null, Date | null]
    selectValue?: any
}) => {
    const { data: dashboardAnalytics } = useGetDashboardAnalytics({
        dateFrom: value[0],
        dateTo: value[1],
        regionId: selectValue,
    })

    const navigate = useNavigate()

    const shiftsPerDayOfMonth: any =
        dashboardAnalytics?.shiftsCompletedPerDayOfMonth?.map((item, index) => {
            const arr = []
            arr.push(item?.dayOfMonth)
            arr.push(item?.count)
            return arr
        })

    shiftsPerDayOfMonth?.unshift(["daysOfMonth", "count"])

    return (
        <>
            <div className="w-[100%] my-8">
                <div className="bg-yellow-5 rounded-t-lg cursor-pointer ">
                    <div className="flex justify-between">
                        <div className="px-4">
                            <p className="font-extrabold text-2xl font-creatoBold">
                                {dashboardAnalytics?.shiftsCompleted?.total}
                            </p>
                            <p className="text-3sm tracking-wider font-creato">
                                SHIFTS COMPLETED
                            </p>
                        </div>
                        <p className="text-md p-4 font-creato">
                            This Month{" "}
                            <span className="text-green-100 text-lg font-extrabold font-creatoBold">
                                {dashboardAnalytics?.shiftsCompleted?.thisMonth}
                            </span>
                        </p>
                    </div>
                    <div className="">
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="10%"
                            data={shiftsPerDayOfMonth}
                        />
                    </div>
                </div>
                <div className="flex justify-between gap- bg-red-10 rounded-b-lg py-2">
                    <div className="flex w-[80%] ">
                        <img src={CanceledShifts} alt="" className=" px-2" />
                        <p className="text-3sm font-medium text-red-100 font-creatoMedium">
                            SHIFTS CANCELED <br />
                            <span className="text-xl font-extrabold text-black-100 font-creatoBold">
                                {dashboardAnalytics?.shiftsCancelled?.thisMonth}{" "}
                            </span>
                            <span className="text-sm text-black-70 font-creato">
                                From {dayjs(value?.[0]).format("YYYY-MM-DD")}{" "}
                            </span>
                            <img
                                src={Arrow}
                                alt="arrow icon"
                                className="inline px-1"
                            />
                            <span className="text-sm text-black-70 font-creato">
                                {dayjs(value[1]).format("YYYY-MM-DD")}
                            </span>
                        </p>
                    </div>
                    <div className="w-[30%]">
                        <span
                            className=" font-bold text-3sm pt-1 font-creatoBold cursor-pointer"
                            onClick={() => navigate("/planner")}
                        >
                            View Details{" "}
                        </span>
                        <img src={UpperRightArrow} alt="" className="inline" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BarChart
