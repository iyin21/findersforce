import { Tabs } from "@mantine/core"
import EmptyState from "../../../Approvals/components/EmptyState"
import Pagination from "../../../../components/Pagination/pagination"
import { useState } from "react"
import { CgSpinner } from "react-icons/cg"
import { HiArrowLeft } from "react-icons/hi"
import { IoFilterSharp } from "react-icons/io5"
import Avatar from "../../../Applications/assets/avatar.png"
import PendingTable from "./Tables/pending-table"
import PendingCompletedTable from "./Tables/CompletedTables/pending-table"
import ApprovedTable from "./Tables/CompletedTables/approved-table"
import ApprovedDetailTable from "./Tables/CompletedTables/approved-detail-table"
import { useGetSingleSchedule } from "../../../../hooks/planner/usePlanner.hooks"
import { useGetTransactionHistoryByJobListingId } from "../../../../hooks/payment/usePayment.hook"
import dayjs from "dayjs"

interface Prop {
    setPhase: (val: number) => void
    status: string | null
    shiftId: string
}
const ActiveShiftDetails = ({ setPhase, status, shiftId }: Prop) => {
    const [approvedPhase, setApprovedPhase] = useState(1)
    const [activePendingPage, setPendingPage] = useState(1)
    const [activePendingCompletedPage, setPendingCompletedPage] = useState(1)
    const [activeApprovedPage, setApprovedPage] = useState(1)
    const [activeTab, setActiveTab] = useState<string | null>("pending")

    const handlePendingPage = (pageNumber: number) => {
        setPendingPage(pageNumber)
    }

    const handlePendingCompletedPage = (pageNumber: number) => {
        setPendingCompletedPage(pageNumber)
    }

    const handleApprovedPage = (pageNumber: number) => {
        setApprovedPage(pageNumber)
    }

    const { data: singleShiftData, isLoading: isLoadingData } =
        useGetSingleSchedule({
            jobListingId: shiftId,
        })

    const { data: transactionData } = useGetTransactionHistoryByJobListingId({
        jobListingId: shiftId,
    })

    const pendingCompletedData = transactionData?.results.filter(
        (item) => item.adminStatus === "expected"
    )

    const approvedPaymentData = transactionData?.results.filter(
        (item) =>
            item.adminStatus === "confirmed" || item.adminStatus === "pending"
    )

    return (
        <div className="pt-12 px-5 lg:pt-8 lg:px-6">
            <span
                onClick={() =>
                    approvedPhase === 1 ? setPhase(1) : setPhase(1)
                }
                className="p-3 rounded inline-flex items-center justify-center bg-black-10 cursor-pointer"
                aria-hidden="true"
            >
                <HiArrowLeft className="text-2lg" />
            </span>
            <div className="pt-4 lg: flex justify-between items-center">
                <div className="pt-4 lg:flex pb-4">
                    <div className="flex justify-between">
                        <img
                            src={Avatar}
                            className="rounded-full  h-14 w-14"
                            alt="profile pictogram"
                        />
                    </div>

                    <div className="lg:pl-4 font-creato">
                        <div className="flex justify-between mt-2 lg:mt-0">
                            <h5 className="font-extrabold text-2mxl font-creato">
                                {status === "active"
                                    ? singleShiftData?.results[0].jobListing
                                          .companyName
                                    : transactionData?.results[0].schedule
                                          .jobListing.companyName}
                            </h5>
                        </div>

                        <p className="text-black-100">
                            <span className="text-lg">
                                {" "}
                                {status === "active"
                                    ? dayjs(
                                          singleShiftData?.results[0].jobListing
                                              .createdAt
                                      ).format("MMM D, YYYY")
                                    : dayjs(
                                          transactionData?.results[0].schedule
                                              .jobListing.createdAt
                                      ).format("MMM D, YYYY")}{" "}
                            </span>
                            <span className="text-black-10 pl-1">|</span>
                            <span className="text-black-100 pl-1 font-normal">
                                {status === "active"
                                    ? singleShiftData?.results[0].jobListing
                                          .jobLocation.formattedAddress
                                    : transactionData?.results[0].depotRegion
                                          .address}
                            </span>
                            <span className="text-black-10 pl-1">|</span>
                            <span>{" "}
                                {status === "active"
                                    ? singleShiftData?.results[0].jobListing
                                          .jobType.name
                                    : transactionData?.results[0].schedule
                                          .jobListing.jobType.name}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {isLoadingData ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <>
                    <div className="relative hidden lg:block ">
                        <div className="flex font-creatoMedium  absolute right-10 pt-2 items-center cursor-pointer">
                            <IoFilterSharp size={20} />
                            <p className="pl-2">Filter</p>
                        </div>
                    </div>
                    {status === "active" ? (
                        <Tabs
                            value={"pending"}
                            color="yellow"
                            keepMounted={false}
                        >
                            <Tabs.List>
                                <Tabs.Tab value="pending">
                                    <p
                                        className={
                                            "text-yellow-100 text-lg font-creatoMedium active"
                                        }
                                    >
                                        Pending
                                    </p>
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="pending">
                                {singleShiftData &&
                                singleShiftData?.results.length > 0 ? (
                                    <PendingTable
                                        elements={singleShiftData?.results}
                                        setPhase={setPhase}
                                    />
                                ) : (
                                    <EmptyState description="Active Shift will appear here" />
                                )}
                                <Pagination
                                    page={activePendingPage}
                                    total={activePendingPage}
                                    onChange={handlePendingPage}
                                    boundaries={1}
                                    recordPerpage={
                                        singleShiftData?.results
                                            ? singleShiftData?.results.length
                                            : 1
                                    }
                                />
                            </Tabs.Panel>
                        </Tabs>
                    ) : (
                        <Tabs
                            value={activeTab}
                            onTabChange={setActiveTab}
                            color="yellow"
                            keepMounted={false}
                        >
                            <Tabs.List>
                                <Tabs.Tab value="pending">
                                    <p
                                        onClick={() => setApprovedPhase(1)}
                                        className={
                                            activeTab === "pending"
                                                ? "text-yellow-100 text-lg font-creatoMedium active"
                                                : "font-creatoMedium text-black-40 text-lg inactive"
                                        }
                                    >
                                        Pending
                                    </p>
                                </Tabs.Tab>
                                <Tabs.Tab value="approved">
                                    <p
                                        className={
                                            activeTab === "approved"
                                                ? "text-green-100 text-lg font-creatoMedium active"
                                                : "font-creatoMedium text-black-40 text-lg inactive"
                                        }
                                    >
                                        Approved
                                    </p>
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="pending">
                                {pendingCompletedData &&
                                pendingCompletedData.length > 0 ? (
                                    <PendingCompletedTable
                                        elements={pendingCompletedData}
                                    />
                                ) : (
                                    <EmptyState description="Active Shift will appear here" />
                                )}
                                <Pagination
                                    page={activePendingCompletedPage}
                                    total={activePendingCompletedPage}
                                    onChange={handlePendingCompletedPage}
                                    boundaries={1}
                                    recordPerpage={
                                        pendingCompletedData
                                            ? pendingCompletedData.length
                                            : 1
                                    }
                                />
                            </Tabs.Panel>
                            <Tabs.Panel value="approved">
                                {approvedPaymentData &&
                                approvedPaymentData.length > 0 ? (
                                    <>
                                        {approvedPhase === 1 ? (
                                            <ApprovedTable
                                                elements={approvedPaymentData}
                                                setApprovedPhase={
                                                    setApprovedPhase
                                                }
                                            />
                                        ) : (
                                            <ApprovedDetailTable
                                                elements={approvedPaymentData}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <EmptyState description="Active Shift will appear here" />
                                )}
                                <Pagination
                                    page={activeApprovedPage}
                                    total={activeApprovedPage}
                                    onChange={handleApprovedPage}
                                    boundaries={1}
                                    recordPerpage={
                                        approvedPaymentData
                                            ? approvedPaymentData.length
                                            : 1
                                    }
                                />
                            </Tabs.Panel>
                        </Tabs>
                    )}
                </>
            )}
        </div>
    )
}

export default ActiveShiftDetails
