import { Tabs } from "@mantine/core"
import {
    useDeleteUser,
    useGetRoles,
    useInviteShiftManger,
    useResendInvite,
    useRevokeInvite,
} from "../../../hooks/roles/use-roles"
import { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi"
import {
    Button,
    ConfirmDelete,
    EmptyState,
    HQAddUser,
    Pagination,
    SuccessModal,
} from "../../../components"
import HQRoleTable from "./components/hq-table"
import { showNotification } from "@mantine/notifications"

const HQRoles = () => {
    const [openAddUser, setOpenAddUser] = useState(false)
    const [activeTab, setActiveTab] = useState<string | null>("regional")
    const [RMPage, setRMPage] = useState(1)
    const [SMPage, setSMPage] = useState(1)
    const [pendingPage, setPendingPage] = useState(1)
    const [userId, setUserId] = useState("")
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const { data: rMData, refetch: refetchRMData } = useGetRoles({
        status: "accepted",
        depotRole: "REGIONAL-MANAGER",
        page: RMPage,
        limit: 10,
    })
    const { data: sMData, refetch: refetchSmData } = useGetRoles({
        status: "accepted",
        depotRole: "SHIFT-MANAGER",
        page: RMPage,
        limit: 10,
    })
    const { data: pendingData, refetch: refetchPendingData } = useGetRoles({
        status: "pending",
        page: RMPage,
        limit: 10,
    })

    const {
        mutate: MutateInvite,
        isLoading: isInviting,
        isSuccess: isSent,
        data: sentData,
    } = useInviteShiftManger()

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

    const handleRMPage = (pageNumber: number) => {
        setRMPage(pageNumber)
    }
    const handleSMPage = (pageNumber: number) => {
        setSMPage(pageNumber)
    }
    const handlePendingPage = (pageNumber: number) => {
        setPendingPage(pageNumber)
    }
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
            refetchSmData()
            refetchRMData()
            refetchPendingData()
        }
        if (isDeleted) {
            setOpenConfirmDelete(false)
            showNotification({
                message: "Shift manager has been deleted successfully",
                title: "Success",
                color: "green",
            })
            refetchSmData()
            refetchRMData()
            refetchPendingData()
        }
        if (isSuccessfullyRevoked) {
            showNotification({
                title: "success",
                color: "green",
                message: "Invitation revoked successfully",
            })
            refetchSmData()
            refetchRMData()
            refetchPendingData()
        }
        if (isSuccessfullyResent) {
            showNotification({
                title: "success",
                color: "green",
                message: "Invitation resent successfully",
            })
            refetchSmData()
            refetchRMData()
            refetchPendingData()
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
        refetchSmData()
        refetchRMData()
        refetchPendingData()
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
        <div>
            <div className="p-6 mt-8 md:mt-14">
                {openConfirmDelete && (
                    <ConfirmDelete
                        opened={openConfirmDelete}
                        setOpened={setOpenConfirmDelete}
                        handleDelete={() => {
                            handleDeleteUser()
                        }}
                        isDeleting={isDeleting}
                        userName={userEmail}
                        title="Remove"
                        description=" You are about to remove a user with administrative
                        access. They won`t be able to access FindersForce until
                        you invite them again. Do you wish to continue?"
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
                    />
                )}
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
                            <Tabs.Tab value="regional">
                                {" "}
                                <p
                                    className={
                                        activeTab === "regional"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Regional Managers
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "regional"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {rMData?.data?.length || 0}
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="shift_manager">
                                {" "}
                                <p
                                    className={
                                        activeTab === "shift_manager"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Shift Managers
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "shift_manager"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {sMData?.data?.length || 0}{" "}
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="pending">
                                {" "}
                                <p
                                    className={
                                        activeTab === "pending"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Pending Invites
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "pending"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {pendingData?.data?.length || 0}{" "}
                                    </span>
                                </p>
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="regional">
                            {!rMData?.data ? (
                                <EmptyState
                                    description="Active administrators will show here. Send a invite to a shift manager"
                                    buttonText="Add new role"
                                    handleButtonClick={handleOpenAddUser}
                                />
                            ) : (
                                <div>
                                    <HQRoleTable
                                        status="REGIONAL-MANAGER"
                                        elements={rMData?.data}
                                        setUserId={setUserId}
                                        handleRevokeInvite={handleRevokeInvite}
                                        handleResendInvite={handleResendInvite}
                                        setUserEmail={setUserEmail}
                                        setOpenConfirmDelete={
                                            setOpenConfirmDelete
                                        }
                                    />
                                    <Pagination
                                        page={RMPage}
                                        total={
                                            rMData?.pagination?.next?.page || 0
                                        }
                                        onChange={() => {
                                            handleRMPage(RMPage)
                                        }}
                                        boundaries={1}
                                        recordPerpage={rMData?.count || 0}
                                    />
                                </div>
                            )}
                        </Tabs.Panel>
                        <Tabs.Panel value="shift_manager">
                            {!sMData?.data ? (
                                <EmptyState
                                    description="Active administrators will show here. Send a invite to a shift manager"
                                    buttonText="Add new role"
                                    handleButtonClick={handleOpenAddUser}
                                />
                            ) : (
                                <div>
                                    <HQRoleTable
                                        status="SHIFT-MANAGER"
                                        elements={sMData?.data}
                                        setUserId={setUserId}
                                        handleRevokeInvite={handleRevokeInvite}
                                        handleResendInvite={handleResendInvite}
                                        setUserEmail={setUserEmail}
                                        setOpenConfirmDelete={
                                            setOpenConfirmDelete
                                        }
                                    />
                                    <Pagination
                                        page={SMPage}
                                        total={
                                            sMData?.pagination?.next?.page || 0
                                        }
                                        onChange={() => {
                                            handleSMPage(SMPage)
                                        }}
                                        boundaries={1}
                                        recordPerpage={sMData?.count || 0}
                                    />
                                </div>
                            )}
                        </Tabs.Panel>
                        <Tabs.Panel value="pending">
                            {!pendingData?.data ? (
                                <EmptyState
                                    description="Active administrators will show here. Send an invite"
                                    buttonText="Add new role"
                                    handleButtonClick={handleOpenAddUser}
                                />
                            ) : (
                                <div>
                                    <HQRoleTable
                                        status="pending"
                                        elements={pendingData?.data}
                                        setUserId={setUserId}
                                        handleRevokeInvite={handleRevokeInvite}
                                        handleResendInvite={handleResendInvite}
                                        setUserEmail={setUserEmail}
                                        setOpenConfirmDelete={
                                            setOpenConfirmDelete
                                        }
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
                                        recordPerpage={
                                            pendingData?.data.length || 0
                                        }
                                    />
                                </div>
                            )}
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default HQRoles
