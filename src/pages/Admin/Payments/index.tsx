import Layout from "../../../components/Layout"
import { CgSpinner } from "react-icons/cg"
import { IoFilterSharp } from "react-icons/io5"
import { Tabs } from "@mantine/core"
import { useState } from "react"
import EmptyState from "../../Approvals/components/EmptyState"
import Pagination from "../../../components/Pagination/pagination"
import ActiveTable from "./components/Tables/active-table"
import ActiveShiftDetails from "./components/ActiveShiftDetails"
import { useGetShiftHistory } from "../../../hooks/planner/usePlanner.hooks"

const AdminPayment = () => {
    const [activeTab, setActiveTab] = useState<string | null>("active")
    const [activeActivePage, setActivePage] = useState(1)
    const [activeCompletedPage, setCompletedPage] = useState(1)
    const [phase, setPhase] = useState(1)
    const [shiftId, setShiftId] = useState("")
    const { data: activeShiftsData, isLoading: isLoadingActivePayment } =
        useGetShiftHistory({
            ongoing: true,
        })
    const { data: completedShiftsData, isLoading: isLoadingCompletedPayment } =
        useGetShiftHistory({
            completed: true,
        })
    const handleActivePage = (pageNumber: number) => {
        setActivePage(pageNumber)
    }
    const handleCompletedPage = (pageNumber: number) => {
        setCompletedPage(pageNumber)
    }

    return (
        <Layout pageTitle="Payment">
            {phase === 1 ? (
                <div className="p-6 mt-4 md:mt-14">
                    <h5 className="font-bold lg:text-3xl text-2xl mb-2 font-creatoMedium ">
                        Payment
                    </h5>
                    <div className="flex justify-between items-center">
                        <p className="text-black-60 mb-2 font-creatoMedium ">
                            Operatives who apply to Finders force appear here
                        </p>
                    </div>
                    {isLoadingActivePayment || isLoadingCompletedPayment ? (
                        <div className="h-screen w-full flex mt-24 justify-center">
                            <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                        </div>
                    ) : (
                        <div>
                            <div className="relative hidden lg:block ">
                                <div className="flex font-creatoMedium  absolute right-10 pt-4 items-center cursor-pointer">
                                    <IoFilterSharp size={20} />
                                    <p className="pl-2">Filter</p>
                                </div>
                            </div>
                            <Tabs
                                value={activeTab}
                                onTabChange={setActiveTab}
                                color="yellow"
                                keepMounted={false}
                            >
                                <Tabs.List>
                                    <Tabs.Tab value="active">
                                        <p
                                            className={
                                                activeTab === "active"
                                                    ? "text-yellow-100 text-lg font-creatoMedium active"
                                                    : "font-creatoMedium text-black-40 text-lg inactive"
                                            }
                                        >
                                            Active
                                        </p>
                                    </Tabs.Tab>
                                    <Tabs.Tab value="completed">
                                        <p
                                            className={
                                                activeTab === "completed"
                                                    ? "text-green-100 text-lg font-creatoMedium active"
                                                    : "font-creatoMedium text-black-40 text-lg inactive"
                                            }
                                        >
                                            Completed
                                        </p>
                                    </Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="active">
                                    {activeShiftsData?.results &&
                                    activeShiftsData?.results.length > 0 ? (
                                        <ActiveTable
                                            elements={activeShiftsData?.results}
                                            setPhase={setPhase}
                                            setShiftId={setShiftId}
                                        />
                                    ) : (
                                        <EmptyState description="Active Shift will appear here" />
                                    )}
                                    <Pagination
                                        page={activeActivePage}
                                        total={activeActivePage}
                                        onChange={handleActivePage}
                                        boundaries={1}
                                        recordPerpage={
                                            activeShiftsData?.results
                                                ? activeShiftsData.results
                                                      .length
                                                : 1
                                        }
                                    />
                                </Tabs.Panel>
                                <Tabs.Panel value="completed">
                                    {completedShiftsData?.results &&
                                    completedShiftsData.results.length > 0 ? (
                                        <ActiveTable
                                            elements={
                                                completedShiftsData.results
                                            }
                                            setPhase={setPhase}
                                            setShiftId={setShiftId}
                                        />
                                    ) : (
                                        <EmptyState description="Active Shift will appear here" />
                                    )}
                                    <Pagination
                                        page={activeCompletedPage}
                                        total={activeCompletedPage}
                                        onChange={handleCompletedPage}
                                        boundaries={1}
                                        recordPerpage={
                                            completedShiftsData?.results
                                                ? completedShiftsData.results
                                                      .length
                                                : 1
                                        }
                                    />
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    )}
                </div>
            ) : (
                <ActiveShiftDetails
                    setPhase={setPhase}
                    status={activeTab}
                    shiftId={shiftId}
                />
            )}
        </Layout>
    )
}

export default AdminPayment
