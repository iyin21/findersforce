import { Tabs } from "@mantine/core"
import ApplicationTable from "./components/application-table"
import { useState } from "react"
import { useGetApplications } from "./hooks/application.hook"
import { CgSpinner } from "react-icons/cg"
import ApplicationDetails from "./sub-navigations/ApplicationDetails"
import ShiftDetails from "./sub-navigations/ShiftDetails"
import Layout from "../../components/Layout/index"
import EmptyState from "../../components/EmptyStates/index"
import { useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination/pagination"
import  {ApplicationFilterRequest}  from "../../types/filter/filter"
import Filter  from "../../components/ApplicationFilter/index"

const Applications = () => {
    const [activeTab, setActiveTab] = useState<string | null>("pending")

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

    const [pendingDataFilter, setPendingDataFilter] = useState<ApplicationFilterRequest>({
        jobTypeId: "", 
        jobMatchPercentageMin: "", 
        jobMatchPercentageMax: ""
    })
    const [acceptedDataFilter, setAcceptedDataFilter] = useState<ApplicationFilterRequest>({
        jobTypeId: "", 
        jobMatchPercentageMin: "", 
        jobMatchPercentageMax: ""
    })
    const [rejectedDataFilter, setRejectedDataFilter] = useState<ApplicationFilterRequest>({
        jobTypeId: "", 
        jobMatchPercentageMin: "", 
        jobMatchPercentageMax: ""
    })
    const applyFilter = (filter: ApplicationFilterRequest) => {
        if (activeTab === "pending") {
            setPendingDataFilter(filter)
            setPendingPage(1)
        } else if ( activeTab === "accepted"){
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
            jobMatchPercentageMax: pendingDataFilter?.jobMatchPercentageMax
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
                            <div className=" hidden lg:block relative lg:pb-4 bottom-0 lg:bottom-0">
                              <div className="absolute right-0 w-fit ">
                                  {" "}
                                  <Filter applyFilter={applyFilter} className="" />
                              </div>
                          </div>
                          <div className=" lg:hidden relative mb-16">
                              <div className="absolute right-0 bottom-2">
                                  {" "}
                                  <Filter applyFilter={applyFilter} className="" />
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
                                            {pendingData?.data?.length || 0}
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
                                            {acceptedData?.data?.length ?? 0}
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
                                            {rejectedData?.data?.length || 0}
                                        </span>
                                    </Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="pending">
                                    {pendingData?.data &&
                                    pendingData?.data?.length > 0 ? (
                                        <ApplicationTable
                                            elements={pendingData?.data || []}
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
                                <Tabs.Panel value="accepted">
                                    {acceptedData?.data &&
                                    acceptedData?.data?.length > 0 ? (
                                        <ApplicationTable
                                            elements={acceptedData?.data || []}
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
                                <Tabs.Panel value="rejected">
                                    {rejectedData?.data &&
                                    rejectedData?.data?.length > 0 ? (
                                        <ApplicationTable
                                            elements={rejectedData?.data || []}
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
                />
            ) : (
                <ShiftDetails shiftId={shiftId} setPhase={setPhase} />
            )}
        </Layout>
    )
}

export default Applications
