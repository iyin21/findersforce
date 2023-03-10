import { Tabs } from "@mantine/core"
import { useEffect, useState } from "react"
import { HiPencil } from "react-icons/hi"
import { BsTrashFill } from "react-icons/bs"
import Button from "../../../../components/Core/Buttons/Button"
import JobInformation from "./components/job-information"
import { BiFilter } from "react-icons/bi"
import EmptyApplication from "../../../../components/EmptyApplication"
import { useNavigate, useParams } from "react-router-dom"
import {
    useDeleteJobList,
    useGetJobListingById,
    useGetSingleJobApplication,
} from "../../../../hooks/job-board/useJobBoard.hooks"
import { CgSpinner } from "react-icons/cg"
import { showNotification } from "@mantine/notifications"
import ApplicationJobTable from "./components/application-table"
import Layout from "../../../../components/Layout"
import PostJob from "../../../../components/Modals/PostJob"
import { BackButton, Pagination } from "../../../../components"

const SingleJobBoard = () => {
    const { jobBoardId } = useParams<string>()
    const [activeTab, setActiveTab] = useState<string | null>("first")
    const [openJobPost, setOpenJobPost] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [newJobId, setNewJobId] = useState("")
    const [activeApplicationPage, setActiveApplicationPage] = useState(1)

    const handleActivePage = (pageNumber: number) => {
        setActiveApplicationPage(pageNumber)
    }

    const navigate = useNavigate()
    const {
        data,
        isLoading: isLoadingSingleData,
        refetch: refetchJobListing,
    } = useGetJobListingById({
        id: jobBoardId,
    })

    const { data: applicationData, isLoading: isLoadingSingleApplicationData } =
        useGetSingleJobApplication({ jobListing: jobBoardId })

    const {
        mutate,
        isLoading,
        isSuccess,
        data: deletedJob,
    } = useDeleteJobList({
        id: jobBoardId,
    })

    const handleDelete = () => {
        mutate()
    }

    useEffect(() => {
        if (isSuccess) {
            refetchJobListing()
            showNotification({
                title: "Success",
                message: "Job List deleted successfully",
            })
            navigate("/job-boards")
        }
        if (openSuccess && newJobId) {
            refetchJobListing()
            showNotification({
                title: "Success",
                message: "Job Listed successfully",
            })
        }
        refetchJobListing()
    }, [deletedJob])
    const handleNavigate = () => {
        navigate(`/job-boards`)
    }
    return (
        <Layout pageTitle="single shift">
            {openJobPost && (
                <PostJob
                    opened={openJobPost}
                    setOpened={setOpenJobPost}
                    setOpenSuccess={setOpenSuccess}
                    setNewJobId={setNewJobId}
                    draftStatus={"edit"}
                    singleDraftData={data}
                />
            )}
            <BackButton handleBackButton={() => handleNavigate()} />
            <div className="md:p-6 p-6">
                <div className="relative md:pb-4 bottom-4 hidden lg:block md:bottom-0">
                    {activeTab === "first" ? (
                        <div className="flex justify-between absolute right-0 ">
                            {" "}
                            <Button
                                variant="clear"
                                iconLeft={<HiPencil size={25} />}
                                onClick={() => setOpenJobPost(true)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="clear"
                                iconLeft={
                                    <BsTrashFill size={20} color="#E94444" />
                                }
                                className="text-red-100"
                                onClick={() => handleDelete()}
                            >
                                {isLoading ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    ) : (
                        <div className="absolute right-0 ">
                            {" "}
                            <Button
                                variant="clear"
                                iconLeft={<BiFilter size={30} />}
                            >
                                Filter
                            </Button>
                        </div>
                    )}
                </div>
                {isLoadingSingleData && isLoadingSingleApplicationData ? (
                    <div className="h-screen w-full flex mt-24 justify-center">
                        <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                    </div>
                ) : (
                    <div>
                        <Tabs
                            value={activeTab}
                            onTabChange={setActiveTab}
                            color="yellow"
                            keepMounted={false}
                        >
                            <Tabs.List>
                                <Tabs.Tab value="first">
                                    {" "}
                                    <p
                                        className={
                                            activeTab === "first"
                                                ? "text-black-100 text-lg font-creatoMedium active"
                                                : "font-creatoMedium text-black-40 text-lg inactive"
                                        }
                                    >
                                        Job Information
                                    </p>
                                </Tabs.Tab>
                                <Tabs.Tab value="second">
                                    <p
                                        className={
                                            activeTab === "second"
                                                ? "text-black-100 text-lg font-creatoMedium active"
                                                : "font-creatoMedium text-black-40 text-lg inactive"
                                        }
                                    >
                                        Applications
                                        <span
                                            className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                activeTab === "second"
                                                    ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                    : "bg-red-100 text-white-100 text-3sm"
                                            }`}
                                        >
                                            {applicationData?.data?.length}
                                        </span>
                                    </p>
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="first">
                                <JobInformation
                                    listingId={data?.listingId}
                                    description={data?.jobDescription}
                                    jobType={data?.jobType?.name}
                                    hourlyPay={
                                        data?.jobMeetingPoint === "SITE" ? (
                                            <span>
                                                {
                                                    data?.jobRate
                                                        ?.jobRateMeetOnsiteDisplayedToDepot
                                                }
                                            </span>
                                        ) : (
                                            <span>
                                                {
                                                    data?.jobRate
                                                        ?.jobRateDepotFirstDisplayedToDepot
                                                }
                                            </span>
                                        )
                                    }
                                    currency={data?.jobRate?.currency}
                                    date={data?.jobDate}
                                    location={
                                        data?.jobLocation?.formattedAddress
                                    }
                                    noOfOperativesRequired={
                                        data?.numberOfOpsRequired
                                    }
                                    createdAt={data?.createdAt}
                                    requiredQualification={
                                        data?.jobQualification?.name
                                    }
                                    shiftEndTime={data?.shiftEndTime}
                                    shiftStartTime={data?.shiftStartTime}
                                    shiftMode={data?.jobMeetingPoint}
                                    additionalInfoImageUrls={
                                        data?.additionalInfoImageUrls
                                    }
                                />
                            </Tabs.Panel>
                            <Tabs.Panel value="second">
                                {applicationData?.data?.length === 0 ? (
                                    <EmptyApplication id={jobBoardId} />
                                ) : (
                                    <div>
                                        <ApplicationJobTable
                                            elements={applicationData?.data}
                                        />
                                        <Pagination
                                            page={activeApplicationPage}
                                            total={
                                                applicationData?.pagination
                                                    ?.totalPages || 0
                                            }
                                            onChange={handleActivePage}
                                            boundaries={1}
                                            recordPerpage={
                                                applicationData?.pagination
                                                    .totalRecords || 0
                                            }
                                        />
                                    </div>
                                )}
                            </Tabs.Panel>
                        </Tabs>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default SingleJobBoard
