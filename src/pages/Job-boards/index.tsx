import { Button, Filter, Pagination } from "../../components/index"
import { FiPlus } from "react-icons/fi"
import { useEffect, useState } from "react"
import { Tabs } from "@mantine/core"
import JobBoardTable from "./components/table/job-table"
import PostJob from "../../components/Modals/PostJob"
import JobSuccessful from "../../components/Modals/PostJob/components/success"
import { FilterRequest } from "../../types/filter/filter"
import { CgSpinner } from "react-icons/cg"
import { BsFillTrashFill } from "react-icons/bs"
import {
    useDeleteJobList,
    useJobBoards,
} from "../../hooks/job-board/useJobBoard.hooks"
import { showNotification } from "@mantine/notifications"
import { JobBoardResponseInterface } from "../../hooks/job-board/interface"
import Layout from "../../components/Layout/index"

const JobBoards = () => {
    const [activeTab, setActiveTab] = useState<string | null>("active")
    const [openJobPost, setOpenJobPost] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [activeActivePage, setActivePage] = useState(1)
    const [activeDraftPage, setDraftPage] = useState(1)
    const [deleteBtn, setDeleteBtn] = useState(false)
    const [checkedJob, setCheckedJob] = useState<string[]>([])
    const [deleteId, setDeleteId] = useState("")
    const [newJobId, setNewJobId] = useState("")
    const [draftStatus, setDraftStatus] = useState("")
    const [draftElement, setdraftElement] =
        useState<JobBoardResponseInterface | null>(null)

    const handleActivePage = (pageNumber: number) => {
        setActivePage(pageNumber)
    }
    const handleDraftPage = (pageNumber: number) => {
        setDraftPage(pageNumber)
    }

    const handleCheckedJob = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setDeleteBtn(true)
            setCheckedJob([...checkedJob, value])
        } else {
            setDeleteBtn(false)
            setCheckedJob(checkedJob.filter((item) => item !== value))
        }
    }

    const [activeJobFilter, setActiveJobFilter] = useState<FilterRequest>({
        meetingPoint: "",
        // amount: [],
    })
    const [draftJobFilter, setDraftJobFilter] = useState<FilterRequest>({
        meetingPoint: "",
        // amount: [],
    })

    const applyFilter = (filter: FilterRequest) => {
        if (activeTab === "active") {
            setActiveJobFilter(filter)
            setActivePage(1)
        } else {
            setDraftJobFilter(filter)
            setDraftPage(1)
        }
    }

    const {
        data: activeData,
        isLoading: isLoadingActiveData,
        refetch: refetchActiveJobList,
    } = useJobBoards({
        isPublished: true,
        page: activeActivePage,
        limit: 15,
        meetingPoint: activeJobFilter.meetingPoint,
        // amount: activeJobFilter.amount,
    })
    const {
        data: draftData,
        isLoading: isLoadingDraftData,
        refetch: refetchDraftJobList,
    } = useJobBoards({
        isPublished: false,
        page: activeDraftPage,
        limit: 15,
        meetingPoint: draftJobFilter.meetingPoint,
        // amount: draftJobFilter.amount,
    })

    const handleDelete = () => {
        mutate()
    }

    const {
        data: deletedJob,
        isLoading: isDeleting,
        mutate,
        isSuccess: isSuccessful,
        error,
    } = useDeleteJobList({ id: deleteId })

    useEffect(() => {
        if (checkedJob.length === 0) {
            setDeleteBtn(false)
        }
        if (isSuccessful) {
            refetchActiveJobList()
            refetchDraftJobList()
            showNotification({
                title: "Success",
                message: "Job list has been deleted successfully",
                color: "green",
            })
        }
        if (openSuccess && newJobId) {
            refetchActiveJobList()
            refetchDraftJobList()
        }
        if (error) {
            showNotification({
                title: "Error",
                message: error.message,
                color: "red",
            })
        }
        refetchActiveJobList()
        refetchDraftJobList()
    }, [deletedJob, activeData, draftData])

    return (
        <Layout pageTitle={"Shifts"}>
            <div className="md:p-6 p-6 mt-4 md:mt-14">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold">
                            Job Board
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            All talents applying for your shifts in one glance
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        className="py-3 font-semibold font-creatoMedium"
                        iconLeft={<FiPlus size={20} />}
                        onClick={() => setOpenJobPost(true)}
                    >
                        Post a job
                    </Button>
                </div>
                <div className="px-3 pt-10 md:pt-4">
                    {" "}
                    <div className="relative bottom-0 lg:bottom-0">
                        <div className="absolute right-0 ">
                            {" "}
                            <div className="flex justify-between gap-3">
                                {deleteBtn && (
                                    <Button
                                        variant="danger"
                                        size="normal"
                                        iconLeft={
                                            <BsFillTrashFill color="#fff" />
                                        }
                                        data-testid="delete_btn"
                                        onClick={() => handleDelete()}
                                        className="text-white-100 min-w-[50px] lg:w-auto mr-3 py-3 lg:py-4"
                                    >
                                        <span className="lg:block hidden text-white-100">
                                            {isDeleting
                                                ? "is deleting"
                                                : "Delete"}
                                        </span>
                                    </Button>
                                )}
                                <Filter applyFilter={applyFilter} />
                            </div>
                        </div>
                    </div>
                    {isLoadingActiveData || isLoadingDraftData ? (
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
                                    <Tabs.Tab value="active">
                                        {" "}
                                        <p
                                            className={
                                                activeTab === "active"
                                                    ? "text-black-100 text-lg font-creatoMedium active"
                                                    : "font-creatoMedium text-black-40 text-lg inactive"
                                            }
                                        >
                                            Active
                                        </p>
                                    </Tabs.Tab>
                                    <Tabs.Tab value="draft">
                                        <p
                                            className={
                                                activeTab === "draft"
                                                    ? "text-black-100 text-lg font-creatoMedium active"
                                                    : `font-creatoMedium text-black-40 text-lg inactive`
                                            }
                                        >
                                            Drafts
                                        </p>
                                    </Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="active">
                                    <JobBoardTable
                                        elements={activeData?.data}
                                        status="active"
                                        handleCheckedJob={handleCheckedJob}
                                        checkedJob={checkedJob}
                                        setDeleteId={setDeleteId}
                                        setOpenJobPost={setOpenJobPost}
                                        setDraftStatus={setDraftStatus}
                                        setdraftElement={setdraftElement}
                                    />
                                    <Pagination
                                        page={activeActivePage}
                                        total={
                                            activeData?.pagination?.next
                                                ?.page || 0
                                        }
                                        onChange={handleActivePage}
                                        boundaries={1}
                                        recordPerpage={activeData?.count || 0}
                                    />
                                </Tabs.Panel>
                                <Tabs.Panel value="draft" className="p-3">
                                    <JobBoardTable
                                        elements={draftData?.data}
                                        handleCheckedJob={handleCheckedJob}
                                        checkedJob={checkedJob}
                                        setDeleteId={setDeleteId}
                                        status="draft"
                                        setOpenJobPost={setOpenJobPost}
                                        setDraftStatus={setDraftStatus}
                                        setdraftElement={setdraftElement}
                                    />
                                    <Pagination
                                        page={activeDraftPage}
                                        total={
                                            draftData?.pagination?.next?.page ||
                                            0
                                        }
                                        onChange={handleDraftPage}
                                        boundaries={1}
                                        recordPerpage={draftData?.count || 0}
                                    />
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    )}
                </div>{" "}
                {openJobPost && (
                    <PostJob
                        opened={openJobPost}
                        setOpened={setOpenJobPost}
                        setOpenSuccess={setOpenSuccess}
                        setNewJobId={setNewJobId}
                        draftStatus={draftStatus}
                        singleDraftData={draftElement}
                    />
                )}
                {openSuccess && (
                    <JobSuccessful
                        opened={openSuccess}
                        setOpened={setOpenSuccess}
                        newJobId={newJobId}
                    />
                )}
            </div>
        </Layout>
    )
}

export default JobBoards
