import { Tabs } from "@mantine/core"
import ApplicationTable from "./components/application-table"
import { useMemo, useState } from "react"
import { useGetApplications } from "./hooks/application.hook"
import { CgSpinner } from "react-icons/cg"
import ApplicationDetails from "./sub-navigations/ApplicationDetails"
import ShiftDetails from "./sub-navigations/ShiftDetails"
import Layout from "../../components/Layout/index"
import EmptyState from "../../components/EmptyStates/index"
import { useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination/pagination"
import { ApplicationFilterRequest } from "../../types/filter/filter"
import Filter from "../../components/ApplicationFilter/index"
import { useAuthContext } from "../../pages/auth/context/authContext"
import { HQDepotType, RegionalManager } from "../../utils/user-types"

const Applications = () => {
    const [activeTab, setActiveTab] = useState<string | null>("PENDING")
    // console.log(activeTab)

    const { state } = useAuthContext()

    const userState = useMemo(() => {
        return state.user
    }, [state.user])

    const [activePendingPage, setPendingPage] = useState(1)
    const [activeAcceptedPage, setAcceptedPage] = useState(1)
    const [activeRejectedPage, setRejectedPage] = useState(1)

    const handlePendingPage = (pageNumber: number) => {
        setPendingPage(pageNumber)
    }
    const handleAcceptedPage = (pageNumber: number) => {
        setAcceptedPage(pageNumber)
    }
    const handleRejectedPage = (pageNumber: number) => {
        setRejectedPage(pageNumber)
    }

    const [pendingDataFilter, setPendingDataFilter] =
        useState<ApplicationFilterRequest>({
            jobTypeId: "",
            jobMatchPercentageMin: "",
            jobMatchPercentageMax: "",
        })
    const [acceptedDataFilter, setAcceptedDataFilter] =
        useState<ApplicationFilterRequest>({
            jobTypeId: "",
            jobMatchPercentageMin: "",
            jobMatchPercentageMax: "",
        })
    const [rejectedDataFilter, setRejectedDataFilter] =
        useState<ApplicationFilterRequest>({
            jobTypeId: "",
            jobMatchPercentageMin: "",
            jobMatchPercentageMax: "",
        })
    const applyFilter = (filter: ApplicationFilterRequest) => {
        if (activeTab === "PENDING") {
            setPendingDataFilter(filter)
            setPendingPage(1)
        } else if (activeTab === "WON") {
            setAcceptedDataFilter(filter)
            setAcceptedPage(1)
        } else {
            setRejectedDataFilter(filter)
            setRejectedPage(1)
        }
    }

    const { data: pendingData, isLoading: isLoadingPendingData } =
        useGetApplications({
            status: "PENDING",
            jobTypeId: pendingDataFilter?.jobTypeId,
            jobMatchPercentageMin: pendingDataFilter?.jobMatchPercentageMin,
            jobMatchPercentageMax: pendingDataFilter?.jobMatchPercentageMax,
            // page: 1,
        })
    const { data: acceptedData, isLoading: isLoadingAcceptedData } =
        useGetApplications({
            status: "WON",
            jobTypeId: acceptedDataFilter?.jobTypeId,
            jobMatchPercentageMin: acceptedDataFilter?.jobMatchPercentageMin,
            jobMatchPercentageMax: acceptedDataFilter?.jobMatchPercentageMax,
            page: 1,
        })
    const { data: rejectedData, isLoading: isLoadingRejectedData } =
        useGetApplications({
            status: "LOST",
            jobTypeId: rejectedDataFilter?.jobTypeId,
            jobMatchPercentageMin: rejectedDataFilter?.jobMatchPercentageMin,
            jobMatchPercentageMax: rejectedDataFilter?.jobMatchPercentageMax,
            page: 1,
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
                        Applications
                    </h5>
                    {userState?.depotRole === HQDepotType ? (
                        <p className="text-black-60 mb-2">
                            Review every Operative that has applied to your
                            Organisation’s shift posts.
                        </p>
                    ) : userState?.depotRole === RegionalManager ? (
                        <p className="text-black-60 mb-2">
                            Review every Operative that has applied to your
                            Depot’s shift posts.
                        </p>
                    ) : (
                        <p className="text-black-60 mb-2">
                            Review every Operative that has applied to your
                            Depot’s shift posts.
                        </p>
                    )}

                    {isLoadingPendingData ||
                    isLoadingAcceptedData ||
                    isLoadingRejectedData ? (
                        <div className="h-screen w-full flex mt-24 justify-center">
                            <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                        </div>
                    ) : (
                        <div>
                            <div className=" hidden lg:block relative lg:pb-4 bottom-0 lg:bottom-0">
                                <div className="absolute right-0 w-fit ">
                                    {" "}
                                    <Filter
                                        applyFilter={applyFilter}
                                        className=""
                                    />
                                </div>
                            </div>
                            <div className=" lg:hidden relative mb-16">
                                <div className="absolute right-0 bottom-2">
                                    {" "}
                                    <Filter
                                        applyFilter={applyFilter}
                                        className=""
                                    />
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
                                    <Tabs.Tab value="PENDING">
                                        <p
                                            className={
                                                activeTab === "PENDING"
                                                    ? "text-yellow-100 text-lg font-creatoMedium active"
                                                    : `font-creatoMedium text-black-40 text-lg inactive`
                                            }
                                        >
                                            Applied
                                            <span
                                                className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                    activeTab === "PENDING"
                                                        ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                        : "bg-gray-100 text-white-100 text-3sm"
                                                }`}
                                            >
                                                {pendingData?.data?.length}
                                            </span>
                                        </p>
                                    </Tabs.Tab>

                                    <Tabs.Tab value="WON">
                                        <p
                                            className={
                                                activeTab === "WON"
                                                    ? "text-green-100 text-lg font-creatoMedium active"
                                                    : `font-creatoMedium text-black-40 text-lg inactive`
                                            }
                                        >
                                            Approved
                                            <span
                                                className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                    activeTab === "WON"
                                                        ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                        : "bg-gray-100 text-white-100 text-3sm"
                                                }`}
                                            >
                                                {acceptedData?.data?.length}
                                            </span>
                                        </p>
                                    </Tabs.Tab>
                                    <Tabs.Tab value="LOST">
                                        <p
                                            className={
                                                activeTab === "LOST"
                                                    ? "text-red-100 text-lg font-creatoMedium active"
                                                    : `font-creatoMedium text-black-40 text-lg inactive`
                                            }
                                        >
                                            Passed
                                            <span
                                                className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                    activeTab === "LOST"
                                                        ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                        : "bg-gray-100 text-white-100 text-3sm"
                                                }`}
                                            >
                                                {rejectedData?.data?.length}
                                            </span>
                                        </p>
                                    </Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="PENDING">
                                    {pendingData?.data &&
                                    pendingData?.data?.length > 0 ? (
                                        <ApplicationTable
                                            elements={pendingData?.data || []}
                                            setPhase={setPhase}
                                            setActiveId={setActiveId}
                                            setActiveTab={setActiveTab}
                                            activeTab={activeTab}
                                        />
                                    ) : (
                                        <EmptyState
                                            title="Your Depot has no applications yet."
                                            description="When Operatives apply for any shift, you will be able to manage all applications here."
                                            buttonText="Post Shift"
                                            handleButtonClick={() =>
                                                handleNavigate()
                                            }
                                        />
                                    )}
                                    <Pagination
                                        page={activePendingPage}
                                        total={activePendingPage}
                                        onChange={handlePendingPage}
                                        boundaries={1}
                                        recordPerpage={
                                            pendingData?.data
                                                ? pendingData?.data.length
                                                : 1
                                        }
                                    />
                                </Tabs.Panel>
                                <Tabs.Panel value="WON">
                                    {acceptedData?.data &&
                                    acceptedData?.data?.length > 0 ? (
                                        <ApplicationTable
                                            elements={acceptedData?.data || []}
                                            setPhase={setPhase}
                                            setActiveId={setActiveId}
                                            setActiveTab={setActiveTab}
                                            activeTab={activeTab}
                                        />
                                    ) : (
                                        <EmptyState
                                            title="You have approved zero Operatives."
                                            description="When you approve Operative applications, you will be able to manage them here."
                                            buttonText="View Applications"
                                            handleButtonClick={() =>
                                                handleNavigate()
                                            }
                                        />
                                    )}
                                    <Pagination
                                        page={activeAcceptedPage}
                                        total={activeAcceptedPage}
                                        onChange={handleAcceptedPage}
                                        boundaries={1}
                                        recordPerpage={
                                            acceptedData?.data
                                                ? acceptedData?.data.length
                                                : 1
                                        }
                                    />
                                </Tabs.Panel>
                                <Tabs.Panel value="LOST">
                                    {rejectedData?.data &&
                                    rejectedData?.data?.length > 0 ? (
                                        <ApplicationTable
                                            elements={rejectedData?.data || []}
                                            setPhase={setPhase}
                                            setActiveId={setActiveId}
                                            setActiveTab={setActiveTab}
                                            activeTab={activeTab}
                                        />
                                    ) : (
                                        <EmptyState
                                            title="You have passed on zero Operatives."
                                            description="When you pass on Operative applications, you will be able to manage them here."
                                            buttonText="View Applications"
                                            handleButtonClick={() =>
                                                handleNavigate()
                                            }
                                        />
                                    )}
                                    <Pagination
                                        page={activeRejectedPage}
                                        total={activeRejectedPage}
                                        onChange={handleRejectedPage}
                                        boundaries={1}
                                        recordPerpage={
                                            rejectedData?.data
                                                ? rejectedData?.data.length
                                                : 1
                                        }
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
                    activeTab={activeTab}
                />
            ) : (
                <ShiftDetails shiftId={shiftId} setPhase={setPhase} />
            )}
        </Layout>
    )
}

export default Applications
