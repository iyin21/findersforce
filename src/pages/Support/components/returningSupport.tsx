import { Tabs } from "@mantine/core"
import { useState, useEffect } from "react"
import SupportCard from "./supportCard"
import { useGetComplaints } from "../hooks/support.hook"
import EmptyState from "./emptyState"
import SupportModal from "../../../components/Modals/SupportModal"
import { CgSpinner } from "react-icons/cg"

interface Props {
    // status?: "pending" | "accepted" | "rejected" ;

    setPhase: (val: number) => void

    setActiveId: (val: string) => void
    handleRefetch: boolean
}
const ReturningSupport = ({ setPhase, setActiveId, handleRefetch }: Props) => {
    const [activeTab, setActiveTab] = useState<string | null>("pending")
    const [openModal, setOpenModal] = useState(false)

    const {
        data: pendingData,
        refetch,
        isLoading: isLoadingPendingData,
    } = useGetComplaints({ status: "PENDING" })
    const {
        data: inProgressData,
        isLoading: isLoadingInProgressData,
        //refetch: refetchInProgress,
    } = useGetComplaints({ status: "IN PROGRESS" })
    const {
        data: resolvedData,
        //refetch: refetchResolved,
        isLoading: isLoadingResolvedData,
    } = useGetComplaints({ status: "RESOLVED" })

    useEffect(() => {
        if (handleRefetch) {
            refetch()
        }
    }, [handleRefetch])

    return (
        <div className="mt-8 px-6">
            {/* {openModal && (
                <SupportModal setOpened={setOpenModal} opened={openModal} onDone={()=>{}}/>
            )} */}
            {isLoadingPendingData ||
            isLoadingInProgressData ||
            isLoadingResolvedData ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <Tabs
                    value={activeTab}
                    // active={activeTab}
                    onTabChange={setActiveTab}
                    color="yellow"
                    keepMounted={false}
                    className="mb-4"
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
                            <span className="bg-red-100 rounded ml-2 py-0.5 px-1 text-white-100 text-sm">
                                {pendingData?.data.length}
                            </span>
                        </Tabs.Tab>

                        <Tabs.Tab
                            value="inProgress"
                            className={`body-regular mr-6 ${
                                activeTab === "inProgress"
                                    ? "text-yellow-100 font-bold"
                                    : "text-black-60"
                            }`}
                        >
                            In Progress
                            <span className="bg-red-100 rounded ml-2 py-0.5 px-1 text-white-100 text-sm">
                                {inProgressData?.data.length}
                            </span>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="resolved"
                            className={`body-regular ${
                                activeTab === "resolved"
                                    ? "text-yellow-100 font-bold"
                                    : "text-black-60"
                            }`}
                        >
                            Resolved
                            <span className="bg-red-100 rounded ml-2 py-0.5 px-1 text-white-100 text-sm">
                                {resolvedData?.data.length}
                            </span>
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="pending">
                        {pendingData && pendingData?.data.length > 0 ? (
                            pendingData?.data.map((item, index) => (
                                <SupportCard
                                    key={index}
                                    complaintCategory={item.complaintCategory}
                                    description={item.description}
                                    ticketID={item.complaintId}
                                    comments={item.messageCount}
                                    createdAt={item.createdAt}
                                    handleClick={
                                        () => {
                                            setActiveId(item._id)
                                            setPhase(2)
                                        }
                                        // navigate(`/applications/${item._id}`)
                                    }
                                />
                            ))
                        ) : (
                            <EmptyState
                                //handleClick={() => setOpenModal(true)}
                                showSendComplaintButton={false}
                            />
                        )}
                    </Tabs.Panel>
                    <Tabs.Panel value="inProgress">
                        {inProgressData && inProgressData?.data.length > 0 ? (
                            inProgressData?.data.map((item, index) => (
                                <SupportCard
                                    key={index}
                                    complaintCategory={item.complaintCategory}
                                    description={item.description}
                                    ticketID={item.complaintId}
                                    comments={item.messageCount}
                                    createdAt={item.createdAt}
                                    handleClick={() => {
                                        setActiveId(item._id)
                                        setPhase(2)
                                    }}
                                />
                            ))
                        ) : (
                            <EmptyState
                                //handleClick={() => setOpenModal(true)}
                                showSendComplaintButton={false}
                            />
                        )}
                    </Tabs.Panel>
                    <Tabs.Panel value="resolved">
                        {resolvedData && resolvedData?.data.length > 0 ? (
                            resolvedData?.data.map((item, index) => (
                                <SupportCard
                                    key={index}
                                    complaintCategory={item.complaintCategory}
                                    description={item.description}
                                    ticketID={item.complaintId}
                                    comments={item.messageCount}
                                    createdAt={item.createdAt}
                                    handleClick={() => {
                                        setActiveId(item._id)
                                        setPhase(2)
                                    }}
                                />
                            ))
                        ) : (
                            <EmptyState
                                handleClick={() => setOpenModal(true)}
                                showSendComplaintButton={false}
                            />
                        )}
                    </Tabs.Panel>
                </Tabs>
            )}
        </div>
    )
}

export default ReturningSupport
