import {
    AddNewWageModal,
    Button,
    ConfirmDelete,
    EditWage,
    EmptyState,
    HQAddUser,
    Pagination,
    SuccessModal,
} from "../../../../../components"
import { BiArrowBack } from "react-icons/bi"
import { Link, useNavigate, useParams } from "react-router-dom"
import Layout from "../../.../../../../../components/Layout"
import { FiPlus } from "react-icons/fi"
import { MdOutlineStarPurple500 } from "react-icons/md"
import Avatar from "../../.././../../assets/ProfileImage.svg"
import { useEffect, useState } from "react"
import { Tabs } from "@mantine/core"
import Profile from "./components/profile/profile"
import DepotShiftTable from "./components/shiftTable/shift-table"
import OperativeTable from "./components/operativesTable/operative-table"
import ManagersTable from "./components/managers/managers-tables"
import DepotLocationTable from "./components/location/depot-location"
import DepotPaymentTable from "./components/payment/depot-payments"
import DepotWagesTable from "./components/wages/wages-table"
import { useGetOperativeDetails } from "../../../../../hooks/approval-hooks/approval.hook"
import dayjs from "dayjs"
import { useJobBoards } from "../../../../../hooks/job-board/useJobBoard.hooks"
import {
    useDeleteRegion,
    useGetJobRates,
    useGetOperatives,
    useGetPayments,
} from "../../../../../hooks/depots/use-depot"
import {
    useGetRoles,
    useInviteShiftManger,
} from "../../../../../hooks/roles/use-roles"
import { useGetDepotRegions } from "../../../../../hooks/dashboard/useDashboard.hook"

const SingleDepot = () => {
    const navigate = useNavigate()
    const { depotId } = useParams<string>()
    const [activeTab, setActiveTab] = useState<string | null>("profile")
    const [openEditWageModal, setOpenEditWageModal] = useState(false)
    const [openAddUser, setOpenAddUser] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const [openNewWageModal, setOpenNewWageModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [regionId, setRegionId] = useState<string[]>([])

    const [activePostPage, setActivePostPage] = useState(1)
    const [activeOperativePage, setActiveOperativePage] = useState(1)
    const [activeManagerPage, setActiveManagerPage] = useState(1)
    const [activeLocationPage, setActiveLocationPage] = useState(1)
    const [activeWagePage, setActiveWagePage] = useState(1)
    const [activePaymentPage, setActivePaymentPage] = useState(1)
    const [wageId, setWageId] = useState("")

    const handleActivePostPage = (pageNumber: number) => {
        setActivePostPage(pageNumber)
    }

    const handleActiveOperativePage = (pageNumber: number) => {
        setActiveOperativePage(pageNumber)
    }

    const handleActiveManagerPage = (pageNumber: number) => {
        setActiveManagerPage(pageNumber)
    }

    const handleActiveLocationPage = (pageNumber: number) => {
        setActiveLocationPage(pageNumber)
    }

    const handleActivePaymentPage = (pageNumber: number) => {
        setActivePaymentPage(pageNumber)
    }

    const handleActiveWagePage = (pageNumber: number) => {
        setActiveWagePage(pageNumber)
    }

    const { data: profileData } = useGetOperativeDetails({
        id: depotId,
    })

    const { data: operativeData } = useGetOperatives({
        companyId: profileData?.results[0]?.depotCompany?._id,
    })

    const {
        mutate: MutateInvite,
        isLoading: isInviting,
        isSuccess: isSent,
        data: sentData,
    } = useInviteShiftManger()

    const { data: managerData, refetch: refetchActiveManagerData } =
        useGetRoles({
            status: "accepted",
            depotRole: "MANAGER",
            limit: 15,
            page: activeManagerPage,
        })

    const { data: activeData, refetch: refetchActiveJobList } = useJobBoards({
        isPublished: true,
        page: activePostPage,
        limit: 15,
        companyId: profileData?.results[0]?.depotCompany?._id,
    })

    const { data: locationData, refetch: refetchLocationData } =
        useGetDepotRegions({
            id: profileData?.results[0]?.depotCompany?._id,
        })

    const { data: wageData, refetch: refetchWageData } = useGetJobRates({
        company: profileData?.results[0]?.depotCompany?._id,
    })

    const { data: paymentData } = useGetPayments({
        regionId: depotId,
    })

    const { mutate: mutateDeleteRegion, isLoading: isDeleting } =
        useDeleteRegion()

    const handleRegionDelete = () => {
        mutateDeleteRegion({
            regionIds: regionId,
        })
        setOpenDeleteModal(false)
    }

    useEffect(() => {
        if (isSent) {
            setOpenSuccessModal(true)
            setOpenAddUser(false)
            setTimeout(() => {
                setOpenSuccessModal(false)
            }, 2000)
            refetchLocationData()
        }
        refetchActiveJobList()
        refetchActiveManagerData()
        refetchWageData()
    }, [activeData, managerData, sentData])

    return (
        <Layout>
            {openEditWageModal && (
                <EditWage
                    setOpened={setOpenEditWageModal}
                    opened={openEditWageModal}
                    isLoading={false}
                    setOpenNewWage={setOpenNewWageModal}
                    wageId={wageId}
                />
            )}
            {openNewWageModal && (
                <AddNewWageModal
                    opened={openNewWageModal}
                    setOpened={setOpenNewWageModal}
                    isLoading={false}
                    depotId={depotId}
                    companyId={profileData?.results[0]?.depotCompany?._id}
                />
            )}
            {openAddUser && (
                <HQAddUser
                    opened={openAddUser}
                    setOpened={setOpenAddUser}
                    isInviting={isInviting}
                    mutateInvite={MutateInvite}
                />
            )}
            {openSuccessModal && (
                <SuccessModal
                    opened={openSuccessModal}
                    setOpened={setOpenSuccessModal}
                    handleBack={() => {
                        setOpenSuccessModal(false)
                    }}
                    title="Invite sent"
                    description="This gives them administrative access to your depot
                    account"
                    buttonText="Back"
                />
            )}
            {openDeleteModal && (
                <ConfirmDelete
                    setOpened={setOpenDeleteModal}
                    opened={openDeleteModal}
                    handleDelete={handleRegionDelete}
                    isDeleting={isDeleting}
                    title="Delete Location"
                    description="Are you sure you want to delete this location?"
                />
            )}
            <div className="bg-black-10 p-2 w-fit mx-4 rounded-lg relative z-20 hidden md:block">
                <Link to={"/depots"}>
                    {" "}
                    <BiArrowBack size={30} />
                </Link>
            </div>
            <div className="md:p-6 p-6 mt-8 md:mt-14">
                <div className="flex flex-col lg:flex-row  gap-4 lg:justify-between lg:items-center">
                    <div className="flex flex-row gap-3">
                        <img
                            src={
                                profileData?.results[0]?.depotCompany?.logo ||
                                Avatar
                            }
                            alt="avatar"
                            className="w-[60px] object-cover"
                        />
                        <div className="">
                            <h1
                                className="text-2mxl md:text-3xl font-Medium text-black-100 font-bold"
                                data-testid="job_title"
                            >
                                {profileData?.results[0]?.depotCompany?.name}
                            </h1>
                            <p className="text-black-60 text-sm md:text-lg font-normal font-creatoLight flex items-center gap-2">
                                <span>
                                    {" "}
                                    Joined{" "}
                                    {dayjs(
                                        profileData?.results[0]?.depotCompany
                                            ?.createdAt
                                    ).format("MMM, D, YYYY")}
                                </span>{" "}
                                |{" "}
                                <MdOutlineStarPurple500
                                    color="#FED70A"
                                    size={30}
                                />{" "}
                                <strong className="font-creatoMedium">
                                    {profileData?.results[0]?.averageRating ||
                                        0}
                                </strong>{" "}
                                ({" "}
                                {profileData?.results[0]?.depotCompany
                                    ?.completedShifts || 0}{" "}
                                shifts)
                            </p>
                        </div>
                    </div>
                    {activeTab === "Locations" && (
                        <Button
                            variant="primary"
                            className="py-3 font-semibold font-creatoMedium"
                            iconLeft={<FiPlus size={20} />}
                            onClick={() => {
                                setOpenAddUser(true)
                            }}
                            data-testid="depot_btn"
                        >
                            Add new location
                        </Button>
                    )}
                    {activeTab === "Wage" && (
                        <Button
                            variant="primary"
                            className="py-3 font-semibold font-creatoMedium"
                            iconLeft={<FiPlus size={20} />}
                            onClick={() => {
                                setOpenNewWageModal(true)
                            }}
                            data-testid="depot_btn"
                        >
                            Add new wage
                        </Button>
                    )}
                </div>

                <div className="mt-8">
                    <Tabs
                        value={activeTab}
                        onTabChange={setActiveTab}
                        color="yellow"
                        keepMounted={false}
                        data-testid="job_tabs"
                    >
                        <Tabs.List className="flex-row flex-nowrap flex overflow-auto lg:overflow-hidden">
                            <Tabs.Tab value="profile">
                                {" "}
                                <p
                                    className={
                                        activeTab === "profile"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Profile
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="post">
                                {" "}
                                <p
                                    className={
                                        activeTab === "post"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Posts
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "post"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {activeData?.data?.length || 0}{" "}
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="Operatives">
                                {" "}
                                <p
                                    className={
                                        activeTab === "Operatives"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Operatives
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "Operatives"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {operativeData?.results?.length || 0}{" "}
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="Managers">
                                {" "}
                                <p
                                    className={
                                        activeTab === "Managers"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Managers
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "Managers"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {managerData?.data?.length || 0}
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="Locations">
                                {" "}
                                <p
                                    className={
                                        activeTab === "Locations"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Locations
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "Locations"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {locationData?.data?.length || 0}{" "}
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="Wage">
                                {" "}
                                <p
                                    className={
                                        activeTab === "Wage"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Wage
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "Wage"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {wageData?.data?.length || 0}{" "}
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="Payments">
                                {" "}
                                <p
                                    className={
                                        activeTab === "Payments"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Payments
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "Payments"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {paymentData?.results?.length || 0}{" "}
                                    </span>
                                </p>
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="profile">
                            <Profile profileData={profileData?.results || []} />
                        </Tabs.Panel>
                        <Tabs.Panel value="post">
                            {activeData?.data.length === 0 ? (
                                <EmptyState
                                    description="Post data will show here, when you add one"
                                    buttonText="Add a depot"
                                    handleButtonClick={() => {
                                        navigate("/add-depots")
                                    }}
                                />
                            ) : (
                                <div>
                                    {" "}
                                    <DepotShiftTable
                                        elements={activeData?.data || []}
                                    />
                                    <Pagination
                                        page={activePostPage}
                                        total={
                                            activeData?.pagination.totalPages ||
                                            0
                                        }
                                        onChange={handleActivePostPage}
                                        boundaries={1}
                                        recordPerpage={
                                            activeData?.pagination
                                                .totalRecords || 0
                                        }
                                    />
                                </div>
                            )}
                        </Tabs.Panel>
                        <Tabs.Panel value="Operatives">
                            {operativeData?.results.length === 0 ? (
                                <EmptyState
                                    description="Operatives data will show here, when you add one"
                                    buttonText="Add a depot"
                                    handleButtonClick={() => {
                                        navigate("/add-depots")
                                    }}
                                />
                            ) : (
                                <div>
                                    <OperativeTable
                                        elements={operativeData?.results || []}
                                    />
                                    <Pagination
                                        page={activeOperativePage}
                                        total={operativeData?.totalPages || 0}
                                        onChange={handleActiveOperativePage}
                                        boundaries={1}
                                        recordPerpage={
                                            operativeData?.totalRecords || 0
                                        }
                                    />
                                </div>
                            )}
                        </Tabs.Panel>
                        <Tabs.Panel value="Managers">
                            {managerData?.data.length === 0 ? (
                                <EmptyState
                                    description="Manager data will show here, when you add one"
                                    buttonText="Add a depot"
                                    handleButtonClick={() => {
                                        navigate("/add-depots")
                                    }}
                                />
                            ) : (
                                <div>
                                    <ManagersTable
                                        elements={managerData?.data || []}
                                    />
                                    <Pagination
                                        page={activeManagerPage}
                                        total={
                                            managerData?.pagination?.total || 0
                                        }
                                        onChange={handleActiveManagerPage}
                                        boundaries={1}
                                        recordPerpage={
                                            managerData?.pagination?.total || 0
                                        }
                                    />
                                </div>
                            )}
                        </Tabs.Panel>
                        <Tabs.Panel value="Locations">
                            {!locationData?.data ? (
                                <EmptyState
                                    description="Location data will show here, when you add one"
                                    buttonText="Add a depot"
                                    handleButtonClick={() => {
                                        navigate("/add-depots")
                                    }}
                                />
                            ) : (
                                <div>
                                    <DepotLocationTable
                                        elements={locationData?.data || []}
                                        setOpenDeleteModal={setOpenDeleteModal}
                                        setRegionId={setRegionId}
                                    />
                                    <Pagination
                                        page={activeLocationPage}
                                        total={
                                            locationData?.pagination
                                                ?.totalPages || 0
                                        }
                                        onChange={handleActiveLocationPage}
                                        boundaries={1}
                                        recordPerpage={
                                            locationData?.pagination
                                                ?.totalRecords || 0
                                        }
                                    />
                                </div>
                            )}
                        </Tabs.Panel>
                        <Tabs.Panel value="Wage">
                            {wageData?.data?.length === 0 ? (
                                <EmptyState
                                    description="Wage data will show here, when you add one"
                                    buttonText="Add a depot"
                                    handleButtonClick={() => {
                                        navigate("/add-depots")
                                    }}
                                />
                            ) : (
                                <div>
                                    <DepotWagesTable
                                        elements={wageData?.data || []}
                                        setOpenEditWageModal={
                                            setOpenEditWageModal
                                        }
                                        setWageId={setWageId}
                                    />
                                    <Pagination
                                        page={activeWagePage}
                                        total={wageData?.pagination?.total || 0}
                                        onChange={handleActiveWagePage}
                                        boundaries={1}
                                        recordPerpage={wageData?.count || 0}
                                    />
                                </div>
                            )}
                        </Tabs.Panel>
                        <Tabs.Panel value="Payments">
                            {paymentData?.results?.length === 0 ? (
                                <EmptyState
                                    description="Payment data will show here, when you add one"
                                    buttonText="Add a depot"
                                    handleButtonClick={() => {
                                        navigate("/add-depots")
                                    }}
                                />
                            ) : (
                                <div>
                                    <DepotPaymentTable
                                        elements={paymentData?.results || []}
                                    />
                                    <Pagination
                                        page={activePaymentPage}
                                        total={paymentData?.totalPages || 0}
                                        onChange={handleActivePaymentPage}
                                        boundaries={1}
                                        recordPerpage={
                                            paymentData?.totalRecords || 0
                                        }
                                    />
                                </div>
                            )}
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </Layout>
    )
}

export default SingleDepot
