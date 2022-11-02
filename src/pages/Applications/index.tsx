import { Tabs } from "@mantine/core"
import ApplicationTable from "./components/application-table"
import { useState } from "react"
import { useGetApplications } from "./hooks/application.hook"
// import { useAuthContext } from "../auth/context/authContext"
import { CgSpinner } from "react-icons/cg"
import { IoFilterSharp } from "react-icons/io5"
import ApplicationDetails from "./sub-navigations/ApplicationDetails"
import ShiftDetails from "./sub-navigations/ShiftDetails"
import Layout from "../../components/Layout"
// import Layout from "../../components/layout/Layout"

const Applications = () => {
    const [activeTab, setActiveTab] = useState(0)
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
                                variant="unstyled"
                                active={activeTab}
                                onTabChange={setActiveTab}
                            >
                                <Tabs.Tab
                                    label="Pending"
                                    className={`body-regular mr-6 ${
                                        activeTab === 0
                                            ? "text-yellow-100"
                                            : "text-black-60"
                                    }`}
                                >
                                    <ApplicationTable
                                        elements={pendingData?.data || []}
                                        setPhase={setPhase}
                                        setActiveId={setActiveId}
                                    />
                                </Tabs.Tab>
                                <Tabs.Tab
                                    label="Accepted "
                                    className={`body-regular mr-6 ${
                                        activeTab === 1
                                            ? "text-yellow-100"
                                            : "text-black-60"
                                    }`}
                                >
                                    <ApplicationTable
                                        elements={acceptedData?.data || []}
                                        setPhase={setPhase}
                                        setActiveId={setActiveId}
                                    />
                                </Tabs.Tab>
                                <Tabs.Tab
                                    label="Rejected"
                                    className={`body-regular ${
                                        activeTab === 2
                                            ? "text-yellow-100"
                                            : "text-black-60"
                                    }`}
                                >
                                    <ApplicationTable
                                        elements={rejectedData?.data || []}
                                        setPhase={setPhase}
                                        setActiveId={setActiveId}
                                    />
                                </Tabs.Tab>
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
