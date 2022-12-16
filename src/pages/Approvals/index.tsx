import { Tabs } from "@mantine/core"
import { useState } from "react"
import { CgSpinner } from "react-icons/cg"
import { IoFilterSharp } from "react-icons/io5"
import ApplicationDetails from "./sub-navigations/application-details"
import ShiftDetails from "./sub-navigations/ShiftHistory/index"
import Layout from "../../components/Layout/index"
import EmptyState from "../../components/EmptyStates/index"
import { useNavigate } from "react-router-dom"
import PendingTable from "./components/Tables/pending-table"
import AcceptedTable from "./components/Tables/accepted-table"
import RejectedTable from "./components/Tables/rejected-table"
import { useGetAllOperativeUsers } from "../../hooks/approval-hooks/approval.hook"

const Approvals = () => {
    const [activeTab, setActiveTab] = useState<string | null>("pending")
    const { data: pendingData, isLoading: isLoadingPendingData } =
        useGetAllOperativeUsers({
            docStatus: "pending",
        })

    const { data: acceptedData, isLoading: isLoadingAcceptedData } =
        useGetAllOperativeUsers({
            docStatus: "accepted",
        })
    
    const { data: rejectedData, isLoading: isLoadingRejectedData } =
        useGetAllOperativeUsers({
            docStatus: "rejected",
        })

    const [phase, setPhase] = useState(1)
    const [activeId, setActiveId] = useState("")
    const [shiftId, setShiftId] = useState("")

    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate("/job-boards")
    }
    return (
        <Layout pageTitle={"Pending"}>
            {phase === 1 ? (
                <div className="md:p-6 p-6 mt-4 md:mt-14">
                    <h5 className="font-bold lg:text-3xl text-2xl mb-2">
                        Approvals
                    </h5>
                    <p className="text-black-60 mb-2">
                        Operatives who apply to Finders force appear here
                    </p>

                    {isLoadingPendingData ||
                    isLoadingAcceptedData ||
                    isLoadingRejectedData ? (
                        <div className="h-screen w-full flex mt-24 justify-center">
                            <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                        </div>
                    ) : (
                        <div>
                            <div className="relative">
                                <div className="flex absolute right-10 items-center cursor-pointer">
                                    <IoFilterSharp />
                                    <p className="pl-2">Filter</p>
                                </div>
                            </div>
                            <Tabs
                                value={activeTab}
                                // active={activeTab}
                                onTabChange={setActiveTab}
                                color="yellow"
                                keepMounted={false}
                                // variant="lg:default pills"
                            >
                                <Tabs.List>
                                    <Tabs.Tab
                                        value="pending"
                                        className={`body-regular mr-6 rounded ${
                                            activeTab === "pending"
                                                ? "text-yellow-100 font-bold active bg-black-100 lg:bg-white-100"
                                                : "text-black-60 inactive bg-black-5 lg:bg-white-100"
                                        }`}
                                    >
                                        Pending
                                        <span className="bg-red-100 rounded ml-2 py-0.5 px-1 text-white-100 text-sm">
                                            {pendingData?.data?.results?.length ?? 0}
                                        </span>
                                    </Tabs.Tab>

                                    <Tabs.Tab
                                        value="accepted"
                                        className={`body-regular mr-6 ${
                                            activeTab === "accepted"
                                                ? "text-green-100 font-bold active"
                                                : "text-black-60 inactive"
                                        }`}
                                    >
                                        Accepted
                                        <span className="bg-red-100 rounded ml-2 py-0.5 px-1 text-white-100 text-sm">
                                            {acceptedData?.data?.results?.length || 0}
                                        </span>
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        value="rejected"
                                        className={`body-regular ${
                                            activeTab === "rejected"
                                                ? "text-yellow-100 font-bold active"
                                                : "text-black-60 inactive"
                                        }`}
                                    >
                                        Rejected
                                        <span className="bg-red-100 rounded ml-2 py-0.5 px-1 text-white-100 text-sm">
                                            {rejectedData?.data?.results?.length || 0}
                                        </span>
                                    </Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="pending">
                                    {pendingData?.data?.results &&
                                    pendingData?.data?.results?.length > 0 ? (
                                        <PendingTable
                                            elements={pendingData?.data?.results || []}
                                            setPhase={setPhase}
                                            setActiveId={setActiveId}
                                        />
                                    ) : (
                                        <EmptyState 
                                            description="Applications you send will show here until the depot makes a decision"
                                            buttonText="Add new application"
                                            handleButtonClick={
                                                () => handleNavigate()
                                            }
                                        />
                                    )}
                                </Tabs.Panel>
                                <Tabs.Panel value="accepted">
                                    {acceptedData?.data?.results &&
                                    acceptedData?.data?.results?.length > 0 ? (
                                        <AcceptedTable
                                            elements={acceptedData?.data?.results || []}
                                            setPhase={setPhase}
                                            setActiveId={setActiveId}
                                        />
                                    ) : (
                                        <EmptyState 
                                            description="Accepted applications will show here."
                                            buttonText="Add new application"
                                            handleButtonClick={
                                                () => handleNavigate()
                                            }
                                        />
                                    )}
                                </Tabs.Panel>
                                <Tabs.Panel value="rejected">
                                    {rejectedData?.data?.results &&
                                    rejectedData?.data?.results?.length > 0 ? (
                                        <RejectedTable
                                            elements={rejectedData?.data?.results || []}
                                            setPhase={setPhase}
                                            setActiveId={setActiveId}
                                        />
                                    ) : (
                                        <EmptyState 
                                            description="Rejected applications will show here"
                                            buttonText="Add new application"
                                            handleButtonClick={
                                                () => handleNavigate()
                                            }
                                        />
                                    )}
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    )}
                </div>
            ) : phase === 2 ? (
                <ApplicationDetails
                    setPhase={setPhase}
                    activeId={activeId}
                    setShiftId={setShiftId}
                />
            ) : (
                <ShiftDetails shiftId={shiftId} setPhase={setPhase} />
            )}
        </Layout>
    )
}

export default Approvals
