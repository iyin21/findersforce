import { Tabs } from "@mantine/core"
import ApplicationTable from "./components/application-table"
import { useState } from "react"
import { useGetApplications } from "./hooks/application.hook"
import { CgSpinner } from "react-icons/cg"
import { IoFilterSharp } from "react-icons/io5"
import ApplicationDetails from "./sub-navigations/ApplicationDetails"
import ShiftDetails from "./sub-navigations/ShiftDetails"
import Layout from "../../components/Layout/index"
import EmptyState from "../Support/components/emptyState"

const Applications = () => {
    const [activeTab, setActiveTab] = useState<string | null>("pending")
    const { data: pendingData, isLoading: isLoadingPendingData } =
        useGetApplications({
            status: "PENDING",
            // page: 1,
        })
    const { data: acceptedData, isLoading: isLoadingAcceptedData } =
        useGetApplications({
            status: "WON",
            page: 1,
        })
    const { data: rejectedData, isLoading: isLoadingRejectedData } =
        useGetApplications({
            status: "LOST",
            page: 1,
        })

    const [phase, setPhase] = useState(1)
    const [activeId, setActiveId] = useState("")
    const [shiftId, setShiftId] = useState("")
    return (
        <Layout pageTitle={"Pending"}>
            {phase === 1 ? (
                <div className="md:p-6 p-6 mt-4 md:mt-14">
                    <h5 className="font-bold lg:text-3xl text-2xl mb-2">
                        Applications
                    </h5>
                    <p className="text-black-60 mb-2">
                        Operatives who apply for shifts appear here
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
                                            {pendingData?.data.length}
                                        </span>
                                    </Tabs.Tab>

                                    <Tabs.Tab
                                        value="accepted"
                                        className={`body-regular mr-6 ${
                                            activeTab === "accepted"
                                                ? "text-yellow-100 font-bold active"
                                                : "text-black-60 inactive"
                                        }`}
                                    >
                                        Accepted
                                        <span className="bg-red-100 rounded ml-2 py-0.5 px-1 text-white-100 text-sm">
                                            {acceptedData?.data.length}
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
                                            {rejectedData?.data.length}
                                        </span>
                                    </Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="pending">
                                    {pendingData?.data &&
                                    pendingData?.data.length > 0 ? (
                                        <ApplicationTable
                                            elements={pendingData?.data || []}
                                            setPhase={setPhase}
                                            setActiveId={setActiveId}
                                        />
                                    ) : (
                                        <EmptyState />
                                    )}
                                </Tabs.Panel>
                                <Tabs.Panel value="accepted">
                                    {acceptedData?.data &&
                                    acceptedData?.data.length > 0 ? (
                                        <ApplicationTable
                                            elements={acceptedData?.data || []}
                                            setPhase={setPhase}
                                            setActiveId={setActiveId}
                                        />
                                    ) : (
                                        <EmptyState />
                                    )}
                                </Tabs.Panel>
                                <Tabs.Panel value="rejected">
                                    {rejectedData?.data &&
                                    rejectedData?.data.length > 0 ? (
                                        <ApplicationTable
                                            elements={rejectedData?.data || []}
                                            setPhase={setPhase}
                                            setActiveId={setActiveId}
                                        />
                                    ) : (
                                        <EmptyState />
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

export default Applications
