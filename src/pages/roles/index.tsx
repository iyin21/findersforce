import { Tabs } from "@mantine/core"
import { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi"
import {
    AddUser,
    Button,
    ConfirmDelete,
    EmptyState,
    Pagination,
    SuccessModal,
} from "../../components"
import Layout from "../../components/Layout"
import RoleTable from "./components/role-table"
import {
    useDeleteUser,
    useGetRoles,
    useInviteShiftManger,
    useResendInvite,
    useRevokeInvite,
} from "../../hooks/roles/use-roles"
import { showNotification } from "@mantine/notifications"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import { HQDepotType, RegionalManager } from "../../utils/user-types"
import HQRoles from "./hq-roles"
import { CgSpinner } from "react-icons/cg"

const Roles = () => {
    const { state } = useAuthContext()

    switch (true) {
        case state?.user?.depotRole === HQDepotType:
            return (
                <Layout pageTitle="Trade">
                    <HQRoles />
                </Layout>
            )
        case state?.user?.depotRole === RegionalManager:
            return <RMRoles />

        default:
            return (
                <>
                    <div className="h-screen w-full flex items-center justify-center">
                        <img
                            src="/logo/voriancorelli-logo.png"
                            alt=""
                            className="animate-pulse"
                        />
                        <CgSpinner className="animate-spin text-primary-90 text-2xl ml-3" />
                    </div>
                </>
            )
    }
}

const RMRoles = () => {
    const [openAddUser, setOpenAddUser] = useState(false)
    const [activeTab, setActiveTab] = useState<string | null>("active")
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const [acceptedPage, setAcceptedPage] = useState(1)
    const [pendingPage, setPendingPage] = useState(1)

    const { data: acceptedData, refetch: refetchAcceptedData } = useGetRoles({
        status: "accepted",
        page: acceptedPage,
        limit: 10,
    })
    const { data: pendingData, refetch: refetchPendingData } = useGetRoles({
        status: "pending",
        page: pendingPage,
        limit: 10,
    })

    const {
        mutate: MutateInvite,
        isLoading: isInviting,
        isSuccess: isSent,
        data: sentData,
    } = useInviteShiftManger()

    const handleAcceptedPage = (pageNumber: number) => {
        setAcceptedPage(pageNumber)
    }
    const handlePendingPage = (pageNumber: number) => {
        setPendingPage(pageNumber)
    }

    const {
        data: deletedUserData,
        isLoading: isDeleting,
        mutate: deleteUser,
        isSuccess: isDeleted,
        error: DeleteError,
    } = useDeleteUser({
        userId,
    })

    const {
        data: revokedData,
        mutate: mutateRevoke,
        isSuccess: isSuccessfullyRevoked,
        error: revokeError,
    } = useRevokeInvite({
        userId,
    })

    const {
        data: resendData,
        mutate: mutateResend,
        error: resendError,
        isSuccess: isSuccessfullyResent,
    } = useResendInvite({
        userId,
    })

    const handleOpenAddUser = () => {
        setOpenAddUser(true)
    }

    const handleDeleteUser = () => {
        deleteUser()
    }

    const handleRevokeInvite = () => {
        if (userId) {
            mutateRevoke()
        }
    }

    const handleResendInvite = () => {
        if (userId) {
            mutateResend()
        }
    }

    useEffect(() => {
        if (isSent) {
            setOpenSuccessModal(true)
            setOpenAddUser(false)
            setTimeout(() => {
                setOpenSuccessModal(false)
            }, 2000)
            refetchPendingData()
            refetchAcceptedData()
        }
        if (isDeleted) {
            setOpenConfirmDelete(false)
            showNotification({
                message: "Shift manager has been deleted successfully",
                title: "Success",
                color: "green",
            })
            refetchPendingData()
            refetchAcceptedData()
        }
        if (isSuccessfullyRevoked) {
            showNotification({
                title: "success",
                color: "green",
                message: "Invitation revoked successfully",
            })
            refetchPendingData()
            refetchAcceptedData()
        }
        if (isSuccessfullyResent) {
            showNotification({
                title: "success",
                color: "green",
                message: "Invitation resent successfully",
            })
            refetchPendingData()
            refetchAcceptedData()
        }
        if (resendError) {
            showNotification({
                title: "error",
                color: "red",
                message: resendError.message,
            })
        }
        if (revokeError) {
            showNotification({
                title: "error",
                color: "red",
                message: revokeError.message,
            })
        }
        if (DeleteError) {
            showNotification({
                title: "Error",
                color: "red",
                message:
                    // @ts-ignore
                    DeleteError.error || DeleteError?.response?.data?.error,
            })
        }
        refetchPendingData()
        refetchAcceptedData()
    }, [
        deletedUserData,
        DeleteError,
        sentData,
        isDeleted,
        revokedData,
        resendData,
        userId,
    ])

    return (
        <Layout pageTitle="Roles and permission">
            {openAddUser && (
                <AddUser
                    opened={openAddUser}
                    setOpened={setOpenAddUser}
                    isInviting={isInviting}
                    mutateInvite={MutateInvite}
                />
            )}

            {openConfirmDelete && (
                <ConfirmDelete
                    opened={openConfirmDelete}
                    setOpened={setOpenConfirmDelete}
                    handleDelete={() => {
                        handleDeleteUser()
                    }}
                    isDeleting={isDeleting}
                    userName={userName}
                />
            )}

            {openSuccessModal && (
                <SuccessModal
                    opened={openSuccessModal}
                    setOpened={setOpenSuccessModal}
                    handleBack={() => {
                        setOpenSuccessModal(false)
                    }}
                />
            )}
            <div className="p-6 mt-4 md:mt-14">
                <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-creatoBold text-black-100 ">
                            Roles and permission
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            Operatives who apply for shifts appear here
                        </p>
                    </div>
                    <div className="flex justify-end mb-3">
                        <Button
                            variant="primary"
                            className="py-3 font-semibold font-creatoMedium text-3sm "
                            iconLeft={<FiPlus size={20} />}
                            onClick={() => setOpenAddUser(!openAddUser)}
                            data-testid="add_user"
                        >
                            Add new role
                        </Button>
                    </div>
                </div>

                <div className="mt-6">
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
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "active"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {acceptedData?.data?.length || 0}
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="pending">
                                <p
                                    className={
                                        activeTab === "pending"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : `font-creatoMedium text-black-40 text-lg inactive`
                                    }
                                >
                                    Pending{" "}
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                            activeTab === "pending"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {pendingData?.data?.length || 0}
                                    </span>
                                </p>
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="active">
                            {!acceptedData?.data ? (
                                <EmptyState
                                    description="Active administrators will show here. Send a invite to a shift manager"
                                    buttonText="Add new role"
                                    handleButtonClick={handleOpenAddUser}
                                />
                            ) : (
                                <div>
                                    {" "}
                                    <RoleTable
                                        elements={acceptedData?.data}
                                        status="accepted"
                                        setOpenConfirmDelete={
                                            setOpenConfirmDelete
                                        }
                                        setUserId={setUserId}
                                        setUserName={setUserName}
                                        handleRevokeInvite={handleRevokeInvite}
                                        handleResendInvite={handleResendInvite}
                                    />
                                    <Pagination
                                        page={acceptedPage}
                                        total={
                                            acceptedData?.pagination?.next
                                                ?.page || 0
                                        }
                                        onChange={() => {
                                            handleAcceptedPage(acceptedPage)
                                        }}
                                        boundaries={1}
                                        recordPerpage={acceptedData.count || 0}
                                    />
                                </div>
                            )}
                        </Tabs.Panel>
                        <Tabs.Panel value="pending">
                            {!pendingData?.data ? (
                                <EmptyState
                                    description="Administrators who are yet to accept your invite will show here"
                                    buttonText="Add new role"
                                    handleButtonClick={handleOpenAddUser}
                                />
                            ) : (
                                <div>
                                    <RoleTable
                                        elements={pendingData?.data}
                                        status="pending"
                                        setOpenConfirmDelete={
                                            setOpenConfirmDelete
                                        }
                                        setUserId={setUserId}
                                        setUserName={setUserName}
                                        handleRevokeInvite={handleRevokeInvite}
                                        handleResendInvite={handleResendInvite}
                                    />
                                    <Pagination
                                        page={pendingPage}
                                        total={
                                            pendingData?.pagination?.next
                                                ?.page || 0
                                        }
                                        onChange={() => {
                                            handlePendingPage(pendingPage)
                                        }}
                                        boundaries={1}
                                        recordPerpage={pendingData?.count || 0}
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

export default Roles
