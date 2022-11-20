import { Tabs } from "@mantine/core"
import { useState } from "react"
import ShiftsTable from "./components/ShiftsTable"
import { useGetShiftHistory } from "../../hooks/planner/usePlanner.hooks"
import Pagination from "../../components/Pagination/pagination"
import { CgSpinner } from "react-icons/cg"
import Layout from "../../components/Layout/index"
import Filter from "../../components/Filter/index"
import { FilterRequest } from "../../types/filter/filter"
import EmptyView from "./components/EmptyView"

const Planner = () => {
    const [activeTab, setActiveTab] = useState<string | null>("first")
    const [activeUpcomingPage, setUpcomingPage] = useState(1)
    const [activeOngoingPage, setOngoingPage] = useState(1)
    const [activeCompletedPage, setCompletedPage] = useState(1)

    const handleUpcomingPage = (pageNumber: number) => {
        setUpcomingPage(pageNumber)
    }
    const handleOngoingPage = (pageNumber: number) => {
        setOngoingPage(pageNumber)
    }
    const handleCompletedPage = (pageNumber: number) => {
        setCompletedPage(pageNumber)
    }

    const applyFilter = (filter: FilterRequest) => {}

    const { data: upcomingShiftsData, isLoading: isLoadingUpcomingData } =
        useGetShiftHistory({
            upcoming: true,
        })
    const { data: ongoingShiftsData, isLoading: isLoadingOngoingData } =
        useGetShiftHistory({
            ongoing: true,
        })
    const { data: completedShiftsData, isLoading: isLoadingCompletedData } =
        useGetShiftHistory({
            completed: true,
        })

    return (
        <Layout>
            <main className="md:p-6 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold">
                            Shifts
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            Operatives who apply for shifts appear here
                        </p>
                    </div>
                </div>

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
                        {isLoadingUpcomingData ||
                        isLoadingOngoingData ||
                        isLoadingCompletedData ? (
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
                                >
                                    <Tabs.List>
                                        <Tabs.Tab value="first">
                                            {" "}
                                            <p
                                                className={
                                                    activeTab === "first"
                                                        ? "text-black-100 text-lg font-creatoMedium active"
                                                        : "font-creatoMedium text-black-40 text-lg inactive"
                                                }
                                            >
                                                Upcoming
                                                <span
                                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                        activeTab === "first"
                                                            ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                            : "bg-red-100 text-white-100 text-3sm"
                                                    }`}
                                                >
                                                    {
                                                        upcomingShiftsData
                                                            ?.results?.length
                                                    }
                                                </span>
                                            </p>
                                        </Tabs.Tab>
                                        <Tabs.Tab value="second">
                                            <p
                                                className={
                                                    activeTab === "second"
                                                        ? "text-black-100 text-lg font-creatoMedium active"
                                                        : `font-creatoMedium text-black-40 text-lg inactive`
                                                }
                                            >
                                                Active
                                                <span
                                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                        activeTab === "second"
                                                            ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                            : "bg-red-100 text-white-100 text-3sm"
                                                    }`}
                                                >
                                                    {
                                                        ongoingShiftsData
                                                            ?.results?.length
                                                    }
                                                </span>
                                            </p>
                                        </Tabs.Tab>
                                        <Tabs.Tab value="third">
                                            <p
                                                className={
                                                    activeTab === "third"
                                                        ? "text-black-100 text-lg font-creatoMedium active"
                                                        : `font-creatoMedium text-black-40 text-lg inactive`
                                                }
                                            >
                                                Completed
                                                <span
                                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                        activeTab === "third"
                                                            ? "bg-white-100 lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                            : "bg-red-100 text-white-100 text-3sm"
                                                    }`}
                                                >
                                                    {
                                                        completedShiftsData
                                                            ?.results?.length
                                                    }
                                                </span>
                                            </p>
                                        </Tabs.Tab>
                                    </Tabs.List>

                                    <Tabs.Panel value="first">
                                        {upcomingShiftsData?.results?.length ===
                                        0 ? (
                                            <EmptyView status={"upcoming"} />
                                        ) : (
                                            <ShiftsTable
                                                elements={
                                                    upcomingShiftsData?.results
                                                }
                                                status="upcoming"
                                            />
                                        )}
                                        <Pagination
                                            page={activeUpcomingPage}
                                            total={activeUpcomingPage}
                                            onChange={handleUpcomingPage}
                                            boundaries={1}
                                            recordPerpage={
                                                upcomingShiftsData?.results
                                                    ? upcomingShiftsData
                                                          ?.results.length
                                                    : 1
                                            }
                                        />
                                    </Tabs.Panel>
                                    <Tabs.Panel value="second">
                                        {ongoingShiftsData?.results?.length ===
                                        0 ? (
                                            <EmptyView status={"ongoing"} />
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
                                    <Tabs.Panel value="third">
                                        {completedShiftsData?.results
                                            ?.length === 0 ? (
                                            <EmptyView status={"completed"} />
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

export default Planner
