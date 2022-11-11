import SupportModal from "../../components/Modals/SupportModal"
import { useState } from "react"
import Layout from "../../components/Layout"
import { useGetAllComplaints } from "./hooks/support.hook"
import EmptyState from "./components/emptyState"
import ReturningSupport from "./components/returningSupport"
import SingleComplaint from "./components/singleComplaint"
import { GoPlus } from "react-icons/go"
import { CgSpinner } from "react-icons/cg"

const Support = () => {
    const [openModal, setOpenModal] = useState(false)
    const [phase, setPhase] = useState(1)
    const [activeId, setActiveId] = useState("")

    const { data: allData, isLoading: isLoadingAllData } = useGetAllComplaints()
    const [handleRefetch,setHandleRefetch]=useState(false);

    return (
        <Layout pageTitle="Suppport">
            {openModal && (
                <SupportModal setOpened={setOpenModal} opened={openModal} setHandleRefetch={setHandleRefetch} />
            )}

            {isLoadingAllData ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <div className="p-6">
                    <div className="flex justify-between">
                        <div>
                            <h5 className="font-bold text-3xl mb-2">Support</h5>
                            <p className="text-black-60">
                                Send a formal complaint
                            </p>
                        </div>
                        {allData && allData?.data.length > 0 && (
                            <button
                                className="bg-yellow-100 rounded rounded-tr-2xl flex justify-center items-center font-bold body-medium py-4 text-2md px-8 mt-6"
                                onClick={() => setOpenModal(true)}
                            >
                                <GoPlus size="30px" color="black" />
                                <span className="pl-2">Send a complaint</span>
                            </button>
                        )}
                    </div>

                    {allData && allData?.data.length > 0 ? (
                        phase === 1 ? (
                            <ReturningSupport
                                setPhase={setPhase}
                                setActiveId={setActiveId}
                                handleRefetch={handleRefetch}
                            />
                        ) : (
                            <SingleComplaint
                                setPhase={setPhase}
                                activeId={activeId}
                            />
                        )
                    ) : (
                        <EmptyState
                            handleClick={() => setOpenModal(true)}
                            showSendComplaintButton
                        />
                    )}
                </div>
            )}
        </Layout>
    )
}
export default Support
