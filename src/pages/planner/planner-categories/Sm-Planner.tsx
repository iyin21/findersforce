import { Tabs } from "@mantine/core"
import { useState } from "react"
import ShiftsTable from "../components/table/ShiftsTable"
import { useGetShiftHistory } from "../../../hooks/planner/usePlanner.hooks"
import Pagination from "../../../components/Pagination/pagination"
import { CgSpinner } from "react-icons/cg"
import Layout from "../../../components/Layout/index"
import Filter from "../../../components/Filter/index"
import { FilterRequest } from "../../../types/filter/filter"
import EmptyView from "../../../components/EmptyStates/index"
import { useNavigate } from "react-router-dom"
// import { IoAlertCircle } from "react-icons/io5"

const SmPlanner = () => {
    const [activeTab, setActiveTab] = useState<string | null>("active")
    const [activeOngoingPage, setOngoingPage] = useState(1)
    const [activeCancelledPage, setCancelledPage] = useState(1)
    const [activeCompletedPage, setCompletedPage] = useState(1)

    const handleOngoingPage = (pageNumber: number) => {
        setOngoingPage(pageNumber)
    }
    const handleCancelledPage = (pageNumber: number) => {
        setCancelledPage(pageNumber)
    }
    const handleCompletedPage = (pageNumber: number) => {
        setCompletedPage(pageNumber)
    }

    const [ongoingShiftsFilter, setOngoingShiftsFilter] =
        useState<FilterRequest>()
    const [cancelledShiftsFilter, setCancelledShiftsFilter] =
        useState<FilterRequest>()
    const [completedShiftsFilter, setCompletedShiftsFilter] =
        useState<FilterRequest>()

    const applyFilter = (filter: FilterRequest) => {
        if (activeTab === "active") {
            setOngoingShiftsFilter(filter)
            setOngoingPage(1)
        } else if (activeTab === "cancelled") {
            setCancelledShiftsFilter(filter)
            setCancelledPage(1)
        } else {
            setCompletedShiftsFilter(filter)
            setCompletedPage(1)
        }
    }

    const { data: ongoingShiftsData, isLoading: isLoadingOngoingData } =
        useGetShiftHistory({
            ongoing: true,
            jobMeetingPoint: ongoingShiftsFilter?.meetingPoint,
        })
    const { data: cancelledShiftsData, isLoading: isLoadingCancelledData } =
        useGetShiftHistory({
            cancelled: true,
            jobMeetingPoint: cancelledShiftsFilter?.meetingPoint,
        })
    const { data: completedShiftsData, isLoading: isLoadingCompletedData } =
        useGetShiftHistory({
            completed: true,
            jobMeetingPoint: completedShiftsFilter?.meetingPoint,
        })

    const navigate = useNavigate()
    // const handleNavigate = () => {
    //     navigate("/job-boards")
    // }

    // const shiftsDuration: any = completedShiftsData?.results?.map((item) => {
    //     return item?.jobListing?.shiftDurationInHours
    // })

    // let totalDuration = 0
    // for (let i = 0; i < shiftsDuration?.length; i++) {
    //     totalDuration += Number(shiftsDuration[i])
    // }

    // const shiftsAmount: any = completedShiftsData?.results?.map((item) => {
    //     if (item?.jobListing?.jobMeetingPoint === "DEPOT") {
    //         return (
    //             Number(
    //                 item?.jobListing?.jobRate?.jobRateDepotFirstDisplayedToDepot
    //             ) * Number(item?.jobListing?.shiftDurationInHours)
    //         )
    //     } else {
    //         return (
    //             Number(
    //                 item?.jobListing?.jobRate?.jobRateMeetOnsiteDisplayedToDepot
    //             ) * Number(item?.jobListing?.shiftDurationInHours)
    //         )
    //     }
    // })
    // let totalAmount = 0
    // for (let i = 0; i < shiftsAmount?.length; i++) {
    //     totalAmount += Number(shiftsAmount[i])
    // }

    return (
        <Layout>
            <main className="md:p-6 p-6 mt-14 md:mt-14">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1
                            className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold"
                            id="header"
                        >
                            Planner
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            Monitor your Depot’s active shifts, view assigned
                            Operatives & their pay status.
                        </p>
                    </div>
                </div>
                {activeTab === "completed" && (
                    <div className="relative mt-4">
                        {/* <Alert
                            icon={<IoAlertCircle size={26} />}
                            color="red"
                            radius="md"
                        >
                            You have a total of {totalDuration} hours,{" "}
                            {completedShiftsData?.results?.length} completed
                            shift(s) to pay for, to the value of{" "}
                            <strong>£{totalAmount}</strong>
                        </Alert> */}
                    </div>
                )}

                <div className="px-0 pt-10 md:pt-4">
                    {" "}
                    <div className="relative lg:pb-4 bottom-0 lg:bottom-0">
                        <div className="absolute right-0 w-fit ">
                            {" "}
                            <Filter applyFilter={applyFilter} className="" />
                        </div>
                    </div>
                    <div className=" lg:hidden relative lg:pb-4 bottom-0 lg:bottom-0 mb-20">
                        <div className="absolute right-0 w-fit ">
                            {" "}
                            <Filter applyFilter={applyFilter} className="" />
                        </div>
                    </div>
                    <div>
                        {isLoadingOngoingData ||
                        isLoadingCompletedData ||
                        isLoadingCancelledData ? (
                            <div className="h-screen w-full flex mt-24 justify-center">
                                <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                            </div>
                        ) : (
                            <div>
                                <Tabs
                                    value={activeTab}
                                    onTabChange={setActiveTab}
                                    color="yellow"
                                    keepMounted={false}
                                    data-testid="planner_tabs"
                                >
                                    <Tabs.List>
                                        <Tabs.Tab value="active">
                                            <p
                                                className={
                                                    activeTab === "active"
                                                        ? "text-yellow-100 text-lg font-creatoMedium active"
                                                        : `font-creatoMedium text-black-40 text-lg inactive`
                                                }
                                            >
                                                Active
                                                <span
                                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                        activeTab === "active"
                                                            ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                            : "bg-gray-100 text-white-100 text-3sm"
                                                    }`}
                                                >
                                                    {
                                                        ongoingShiftsData
                                                            ?.results?.length
                                                    }
                                                </span>
                                            </p>
                                        </Tabs.Tab>
                                        <Tabs.Tab value="completed">
                                            <p
                                                className={
                                                    activeTab === "completed"
                                                        ? "text-green-100 text-lg font-creatoMedium active"
                                                        : `font-creatoMedium text-black-40 text-lg inactive`
                                                }
                                            >
                                                Completed
                                                <span
                                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                        activeTab ===
                                                        "completed"
                                                            ? "bg-white-100 lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                            : "bg-gray-100 text-white-100 text-3sm"
                                                    }`}
                                                >
                                                    {
                                                        completedShiftsData
                                                            ?.results?.length
                                                    }
                                                </span>
                                            </p>
                                        </Tabs.Tab>
                                        <Tabs.Tab value="cancelled">
                                            <p
                                                className={
                                                    activeTab === "cancelled"
                                                        ? "text-red-100 text-lg font-creatoMedium active"
                                                        : `font-creatoMedium text-black-40 text-lg inactive`
                                                }
                                            >
                                                Cancelled
                                                <span
                                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                        activeTab ===
                                                        "cancelled"
                                                            ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                            : "bg-gray-100 text-white-100 text-3sm"
                                                    }`}
                                                >
                                                    {
                                                        cancelledShiftsData
                                                            ?.results?.length
                                                    }
                                                </span>
                                            </p>
                                        </Tabs.Tab>
                                    </Tabs.List>
                                    <Tabs.Panel value="active">
                                        {ongoingShiftsData?.results?.length ===
                                        0 ? (
                                            <EmptyView
                                                title="You have no active shifts right now."
                                                description="When a shift starts, you can track it here."
                                                buttonText="Post shift"
                                                handleButtonClick={() => {
                                                    navigate("/job-boards")
                                                }}
                                            />
                                        ) : (
                                            <ShiftsTable
                                                elements={
                                                    ongoingShiftsData?.results
                                                }
                                                status="ongoing"
                                            />
                                        )}
                                        <Pagination
                                            page={activeOngoingPage}
                                            total={activeOngoingPage}
                                            onChange={handleOngoingPage}
                                            boundaries={1}
                                            recordPerpage={
                                                ongoingShiftsData?.results
                                                    ? ongoingShiftsData?.results
                                                          .length
                                                    : 1
                                            }
                                        />
                                    </Tabs.Panel>
                                    <Tabs.Panel value="cancelled">
                                        {cancelledShiftsData?.results
                                            ?.length === 0 ? (
                                            <EmptyView
                                                title="You have no cancelled shifts right now."
                                                description="When a shift is cancelled, you can investigate it here."
                                                buttonText="Post a shift"
                                                handleButtonClick={() => {
                                                    navigate("/job-boards")
                                                }}
                                            />
                                        ) : (
                                            <ShiftsTable
                                                elements={
                                                    cancelledShiftsData?.results
                                                }
                                                status="cancelled"
                                            />
                                        )}
                                        <Pagination
                                            page={activeCancelledPage}
                                            total={activeCancelledPage}
                                            onChange={handleCancelledPage}
                                            boundaries={1}
                                            recordPerpage={
                                                cancelledShiftsData?.results
                                                    ? cancelledShiftsData
                                                          ?.results.length
                                                    : 1
                                            }
                                        />
                                    </Tabs.Panel>
                                    <Tabs.Panel value="completed">
                                        {completedShiftsData?.results
                                            ?.length === 0 ? (
                                            <EmptyView
                                                title="You have no completed shifts right now."
                                                description="When a shift is complete, you can review it here and pay wages."
                                                buttonText="Post shift"
                                                handleButtonClick={() => {
                                                    navigate("/job-boards")
                                                }}
                                            />
                                        ) : (
                                            <ShiftsTable
                                                elements={
                                                    completedShiftsData?.results
                                                }
                                                status="completed"
                                            />
                                        )}
                                        <Pagination
                                            page={activeCompletedPage}
                                            total={activeCompletedPage}
                                            onChange={handleCompletedPage}
                                            boundaries={1}
                                            recordPerpage={
                                                completedShiftsData?.results
                                                    ? completedShiftsData
                                                          ?.results.length
                                                    : 1
                                            }
                                        />
                                    </Tabs.Panel>
                                </Tabs>
                            </div>
                        )}
                    </div>{" "}
                </div>
            </main>
        </Layout>
    )
}

export default SmPlanner
