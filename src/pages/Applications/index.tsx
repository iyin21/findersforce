import { Tabs } from "@mantine/core"
import ApplicationTable from "./components/application-table"
import { useState } from "react"
import { useGetApplications } from "./hooks/application.hook"
// import { useAuthContext } from "../auth/context/authContext"
import { CgSpinner } from "react-icons/cg"
import { IoFilterSharp } from "react-icons/io5"
import ApplicationDetails from "./sub-navigations/ApplicationDetails"
import ShiftDetails from "./sub-navigations/ShiftDetails"
import Layout from "../../components/layout"
// import Layout from "../../components/layout/Layout"

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
                <div className="p-4">
                    <h5 className="font-bold">Applications</h5>
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
                            <div className="flex absolute right-10 items-center cursor-pointer">
                                <IoFilterSharp />
                                <p className="pl-2">Filter</p>
                            </div>
                            <Tabs
                                value={activeTab}
                                //active={activeTab}
                                onTabChange={setActiveTab}
                                color="yellow"
                                keepMounted={false}
                            >
                                <Tabs.List>
                                    <Tabs.Tab
                                        value="pending"
                                        className={`body-regular mr-6 ${
                                            activeTab === "pending"
                                                ? "text-yellow-100 font-bold"
                                                : "text-black-60"
                                        }`}
                                    >
                                        Pending
                                    </Tabs.Tab>

                                    <Tabs.Tab
                                        value="accepted"
                                        className={`body-regular mr-6 ${
                                            activeTab === "accepted"
                                                ? "text-yellow-100 font-bold"
                                                : "text-black-60"
                                        }`}
                                    >
                                        Accepted
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        value="rejected"
                                        className={`body-regular ${
                                            activeTab === "rejected"
                                                ? "text-yellow-100 font-bold"
                                                : "text-black-60"
                                        }`}
                                    >
                                        Rejected
                                    </Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="pending">
                                    <ApplicationTable
                                        elements={pendingData?.data || []}
                                        setPhase={setPhase}
                                        setActiveId={setActiveId}
                                    />
                                </Tabs.Panel>
                                <Tabs.Panel value="accepted">
                                    <ApplicationTable
                                        elements={acceptedData?.data || []}
                                        setPhase={setPhase}
                                        setActiveId={setActiveId}
                                    />
                                </Tabs.Panel>
                                <Tabs.Panel value="rejected">
                                    <ApplicationTable
                                        elements={rejectedData?.data || []}
                                        setPhase={setPhase}
                                        setActiveId={setActiveId}
                                    />
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
