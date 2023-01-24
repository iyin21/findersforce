import SupportModal from "../../components/Modals/SupportModal"
import { useState } from "react"
import Layout from "../../components/Layout"
import { useGetAllComplaints } from "./hooks/support.hook"
import EmptyState from "../../components/EmptyStates/index"
import ReturningSupport from "./components/returningSupport"
import SingleComplaint from "./components/singleComplaint"
import { GoPlus } from "react-icons/go"
import { CgSpinner } from "react-icons/cg"
import { useAuthContext } from "../../pages/auth/context/authContext"
import ComplaintModal from "./components/supportModal"

const Support = () => {
    const [openModal, setOpenModal] = useState(false)
    const [phase, setPhase] = useState(1)
    const [activeId, setActiveId] = useState("")

    const { state } = useAuthContext()

    const { data: allData, isLoading: isLoadingAllData } = useGetAllComplaints()
    const [handleRefetch, setHandleRefetch] = useState(false)

    const [opened, setOpened] = useState(false)

    return (
        <Layout pageTitle="Support">
            {openModal && (
                <SupportModal
                    setOpened={setOpenModal}
                    opened={openModal}
                    setHandleRefetch={setHandleRefetch}
                />
            )}
            {opened && (
                <ComplaintModal
                    opened={opened}
                    setOpened={setOpened}
                    email={state.user?.email || " "}
                />
            )}
            {isLoadingAllData ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <div className="md:p-6 p-6 mt-4 md:mt-14 font-creato">
                    <div className="flex justify-between pl-6 pr-6">
                        <div>
                            <h5 className="font-bold lg:text-3xl text-2xl mb-2">
                                Support
                            </h5>
                            <p className="text-black-60">
                            Enable Finders Force to conduct full investigations on your Organisations behalf.
                            </p>
                        </div>
                        {allData && allData?.data.length > 0 && (
                            <button
                                className="bg-yellow-100 rounded rounded-tr-2xl flex justify-center items-center font-bold body-medium py-4 lg:text-2md px-2 mt-6"
                                onClick={() => setOpened(true)}
                                data-testid="support_btn"
                            >
                                <GoPlus size="30px" color="black" />
                                <span className="pl-2">Log complaint</span>
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
                            buttonText="Log complaint"
                            handleButtonClick={() => setOpened(true)}
                            title="No complaints pending."
                            description="If ever you submit a complaint, it will show here once you have sent it."
                        />
                    )}
                </div>
            )}
        </Layout>
    )
}
export default Support
