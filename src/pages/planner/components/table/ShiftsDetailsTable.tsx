import { Alert, Table, Tabs } from "@mantine/core"
import { ChangeEvent, useEffect, useState } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { FaAngleRight } from "react-icons/fa"
import Layout from "../../../../components/Layout/index"
import {
    useGetScheduleByScheduleId,
    useGetShiftHistoryByJobListingId,
    useGetSingleSchedule,
    usePaymentEvidenceUpload,
} from "../../../../hooks/planner/usePlanner.hooks"
import dayjs from "dayjs"
import { AiOutlineArrowLeft } from "react-icons/ai"
import ProfileImage from "../../../../assets/ProfileImage.svg"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { CgSpinner } from "react-icons/cg"
import Pagination from "../../../../components/Pagination/pagination"
import MobileShiftsDetailsTable from "./MobileShiftsDetailsTable"
import { Button, Checkbox, SuccessModal } from "../../../../components"
import TimeEstimate from "../TimeEstimate"
import PaymentEvidenceUpload from "../../../../components/Modals/Planner/PaymentEvidenceUpload"
import OperativeProfile from "../../../../components/Modals/Planner/OperativeProfile"
import Menu from "../../../../components/Modals/Planner/Menu"
import Cancel from "../../../../components/Modals/Planner/Cancel"
import { IoAlertCircle } from "react-icons/io5"

const ShiftsDetailTable = () => {
    const { jobListingId } = useParams<string>()
    const navigate = useNavigate()
    const location = useLocation()

    const queryStatus = location?.state?.status

    const scheduleId = location?.state?.scheduleId

    const { data: shiftsData, isLoading: isLoadingShiftsData } =
        useGetShiftHistoryByJobListingId({
            jobListingId,
            queryStatus,
        })

    const { data: singleShift } = useGetSingleSchedule({
        jobListingId: jobListingId,
    })

    const { data, isError, mutate, isLoading } = usePaymentEvidenceUpload()
    const { data: singleElement } = useGetScheduleByScheduleId({
        scheduleId: scheduleId,
    })

    const [activeTab, setActiveTab] = useState<string | null>("unpaid")
    const [checkedShift, setCheckedShift] = useState<string[]>([])
    const [activePage, setActivePage] = useState(1)
    const [openProfile, setOpenProfile] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    const [operativeId, setOperativeId] = useState("")
    const [, setError] = useState("")
    const [, setFileName] = useState("")
    const [checkedOperative, setCheckedOperative] = useState("")
    const [openCancel, setOpenCancel] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const handleActivePage = (pageNumber: number) => {
        setActivePage(pageNumber)
    }
    useEffect(() => {
        if (data && data.status === "success") {
            setOpenSuccessModal(true)
            setOpenPayment(false)
            setTimeout(() => {
                setOpenSuccessModal(false)
                navigate("/planner")
            }, 5000)
        }

        if (isError) {
        }
    }, [data, isError])

    const handleCheckedShift = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedShift([...checkedShift, value])
            setCheckedOperative(value)
        } else {
            setCheckedShift(checkedShift.filter((item) => item !== value))
            setCheckedOperative("")
        }
    }

    const { data: checkedData } = useGetSingleSchedule({
        jobListingId: jobListingId,
        operativeId: checkedOperative || undefined,
    })

    const amount: any = checkedData?.results?.map((item) => {
        if (item?.jobListing.jobMeetingPoint === "DEPOT") {
            return Number(
                item?.jobListing?.jobRate?.jobRateDepotFirstDisplayedToDepot *
                    item?.jobListing?.shiftDurationInHours *
                    checkedShift?.length
            )
        } else {
            return Number(
                item?.jobListing?.jobRate?.jobRateMeetOnsiteDisplayedToDepot *
                    item?.jobListing?.shiftDurationInHours *
                    checkedShift?.length
            )
        }
    })
    const totalAmount: any = shiftsData?.results?.map((item) => {
        if (item?.jobListing.jobMeetingPoint === "DEPOT") {
            return Number(
                item?.jobListing?.jobRate?.jobRateDepotFirstDisplayedToDepot *
                    item?.jobListing?.shiftDurationInHours *
                    shiftsData?.results.length
            )
        } else {
            return Number(
                item?.jobListing?.jobRate?.jobRateMeetOnsiteDisplayedToDepot *
                    item?.jobListing?.shiftDurationInHours *
                    shiftsData?.results.length
            )
        }
    })

    const duration: any = checkedData?.results?.map((item) => {
        return Number(item?.jobListing?.shiftDurationInHours)
    })
    const totalDuration: any = shiftsData?.results?.map((item) => {
        return Number(item?.jobListing?.shiftDurationInHours)
    })

    const handleDocumentUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0]
        if (uploadedFile) {
            setError("")
            if (
                !(
                    uploadedFile.name.toLowerCase().endsWith(".pdf") ||
                    uploadedFile.name.toLowerCase().endsWith(".jpg") ||
                    uploadedFile.name.toLowerCase().endsWith(".jpeg") ||
                    uploadedFile.name.toLowerCase().endsWith(".png")
                )
            ) {
                return setError(
                    "Invalid format. Accepted format is JPG, PNG or PDF"
                )
            }

            setFileName(uploadedFile.name)
            mutate({ file: uploadedFile, scheduleId: scheduleId })
        }
    }

    const handleOpenMenu = (id: string) => {
        setOperativeId(id)
        setOpenMenu(!openMenu)
    }

    const rows = shiftsData?.results?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center gap-2">
                    <img src={ProfileImage} alt="profile_image" />
                    <p>
                        {element?.operative?.firstName}{" "}
                        {element?.operative?.lastName}
                    </p>
                </div>
            </td>
            <td>{element?.jobListing?.jobLocation?.formattedAddress}</td>
            <td>
                {dayjs(element?.jobListing?.shiftStartTime).format("HH:mm")} -{" "}
                {dayjs(element?.jobListing.shiftEndTime).format("HH:mm")}
            </td>
            {element?.jobListing.jobMeetingPoint === "DEPOT" ? (
                <td>
                    {element?.jobListing?.jobRate?.currency}
                    {
                        element?.jobListing?.jobRate
                            ?.jobRateDepotFirstDisplayedToDepot
                    }
                </td>
            ) : (
                <td>
                    {element?.jobListing?.jobRate?.currency}
                    {
                        element?.jobListing?.jobRate
                            ?.jobRateMeetOnsiteDisplayedToDepot
                    }
                </td>
            )}
            <td>
                {element?.jobListing?.jobMeetingPoint === "SITE" ? (
                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        MEET ONSITE
                    </p>
                ) : (
                    <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                        DEPOT FIRST
                    </p>
                )}
            </td>
            {queryStatus === "ongoing" && (
                <td>{dayjs(element?.clockInTime).format("HH:mm")}</td>
            )}
            {queryStatus === "cancelled" && (
                <td>{dayjs(element?.cancelTime).format("HH:mm")}</td>
            )}
            <td>
                <BiDotsVerticalRounded
                    size={20}
                    onClick={() => handleOpenMenu(element?.operative?._id)}
                />
            </td>
        </tr>
    ))

    const paidShifts = singleShift?.results?.filter(
        (shift) => shift?.jobListing?.fullyPaidByDepot === true
    )
    const unPaidShifts = singleShift?.results?.filter(
        (shift) => shift?.jobListing?.fullyPaidByDepot === false
    )

    const paidRows = paidShifts?.map((element, index) => (
        <tr key={index}>
            <td>
                <div
                    className="flex items-center"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <Checkbox
                        id={element?.operative?._id}
                        className="rounded-lg"
                        onChange={handleCheckedShift}
                        name={element?.operative?._id}
                        checked={checkedShift.includes(element?.operative?._id)}
                        value={element?.operative?._id}
                        data-testid="checkbox"
                    />
                    <label htmlFor={element?.operative?._id}>{index + 1}</label>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <img src={ProfileImage} alt="profile_image" />
                    <p>
                        {element?.operative?.firstName}{" "}
                        {element?.operative?.lastName}
                    </p>
                </div>
            </td>
            <td>{element?.jobListing?.jobLocation?.formattedAddress}</td>
            <td>
                {dayjs(element?.jobListing?.shiftStartTime).format("HH:mm")} -{" "}
                {dayjs(element?.jobListing.shiftEndTime).format("HH:mm")}
            </td>
            {element?.jobListing.jobMeetingPoint === "DEPOT" ? (
                <td>
                    {element?.jobListing?.jobRate?.currency}
                    {
                        element?.jobListing?.jobRate
                            ?.jobRateDepotFirstDisplayedToDepot
                    }
                </td>
            ) : (
                <td>
                    {element?.jobListing?.jobRate?.currency}
                    {
                        element?.jobListing?.jobRate
                            ?.jobRateMeetOnsiteDisplayedToDepot
                    }
                </td>
            )}
            <td>
                {element?.jobListing?.jobMeetingPoint === "SITE" ? (
                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        MEET ONSITE
                    </p>
                ) : (
                    <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                        DEPOT FIRST
                    </p>
                )}
            </td>
            <td>{dayjs(element?.clockInTime).format("HH:mm")}</td>
            <td>
                <BiDotsVerticalRounded
                    size={20}
                    onClick={() => handleOpenMenu(element?.operative?._id)}
                />
            </td>
        </tr>
    ))

    const unPaidRows = unPaidShifts?.map((element, index) => (
        <tr key={index}>
            <td>
                <div
                    className="flex items-center"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <Checkbox
                        id={element?.operative?._id}
                        className="rounded-lg"
                        onChange={handleCheckedShift}
                        name={element?.operative?._id}
                        checked={checkedShift.includes(element?.operative?._id)}
                        value={element?.operative?._id}
                        data-testid="checkbox"
                    />
                    <label htmlFor={element?.operative?._id}>{index + 1}</label>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <img src={ProfileImage} alt="profile_image" />
                    <p>
                        {element?.operative?.firstName}{" "}
                        {element?.operative?.lastName}
                    </p>
                </div>
            </td>
            <td>{element?.jobListing?.jobLocation?.formattedAddress}</td>
            <td>
                {dayjs(element?.jobListing?.shiftStartTime).format("HH:mm")} -{" "}
                {dayjs(element?.jobListing.shiftEndTime).format("HH:mm")}
            </td>
            {element?.jobListing.jobMeetingPoint === "DEPOT" ? (
                <td>
                    {element?.jobListing?.jobRate?.currency}
                    {
                        element?.jobListing?.jobRate
                            ?.jobRateDepotFirstDisplayedToDepot
                    }
                </td>
            ) : (
                <td>
                    {element?.jobListing?.jobRate?.currency}
                    {
                        element?.jobListing?.jobRate
                            ?.jobRateMeetOnsiteDisplayedToDepot
                    }
                </td>
            )}
            <td>
                {element?.jobListing?.jobMeetingPoint === "SITE" ? (
                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        MEET ONSITE
                    </p>
                ) : (
                    <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                        DEPOT FIRST
                    </p>
                )}
            </td>
            <td>{dayjs(element?.clockInTime).format("HH:mm ")}</td>
            <td>
                <BiDotsVerticalRounded
                    size={20}
                    onClick={() => handleOpenMenu(element?.operative?._id)}
                />
            </td>
        </tr>
    ))

    const tableHeadActive = [
        { list: "NO" },
        { list: "OPERATIVE" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "RATE" },
        { list: "MODE" },
        { list: "CLOCK-IN" },
    ]

    const tableHeadCancelled = [
        { list: "NO" },
        { list: "OPERATIVE" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "RATE" },
        { list: "MODE" },
        { list: "CANCELLED" },
    ]
    const element = shiftsData?.results?.find(
        (item) => item?.jobListing?._id === jobListingId
    )

    return (
        <>
            <Layout>
                {isLoadingShiftsData ? (
                    <div className="h-screen w-full flex mt-24 justify-center">
                        <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                    </div>
                ) : (
                    <>
                        <div className="md:p-6 p-6 mt-4 md:mt-14">
                            <div className="bg-gray-80 w-fit p-3 rounded-lg cursor-pointer">
                                <AiOutlineArrowLeft
                                    size={20}
                                    onClick={() => navigate("/planner")}
                                />
                            </div>
                            <div className="lg:flex justify-between">
                                <div>
                                    <h1 className="text-xl md:text-3xl font-creatoBold text-black-100 font-bold">
                                        {element?.jobListing?.listingId}
                                    </h1>
                                    <p className="text-black-60 text-2md font-normal font-creato">
                                        {dayjs(
                                            element?.jobListing?.jobDate
                                        ).format("MMMM DD, YYYY")}{" "}
                                        |{" "}
                                        {dayjs(
                                            element?.jobListing?.shiftStartTime
                                        ).format("HH:mm")}{" "}
                                        -{" "}
                                        {dayjs(
                                            element?.jobListing.shiftEndTime
                                        ).format("HH:mm")}
                                    </p>
                                </div>

                                {queryStatus === "ongoing" && (
                                    <div className="">
                                        <p className="bg-yellow-100 rounded-full text-3sm font-bold font-creato mb-4 py-2 px-3 text-center">
                                            ACTIVE SHIFT ENDS IN
                                        </p>
                                        <TimeEstimate
                                            initialDate={
                                                new Date(
                                                    element?.jobListing?.shiftEndTime
                                                )
                                            }
                                        />
                                    </div>
                                )}
                                {queryStatus === "cancelled" && (
                                    <div className="flex items-center">
                                        <p className="bg-red-100 rounded-xl px-3 text-white-100 font-creato text-3sm py-1">
                                            SHIFTS CANCELLED
                                        </p>
                                    </div>
                                )}
                            </div>
                            {queryStatus === "completed" && (
                                <div className="relative mt-4">
                                    <Alert
                                        icon={
                                            <IoAlertCircle
                                                size={26}
                                                className="mt-8"
                                            />
                                        }
                                        color="blue"
                                        radius="md"
                                    >
                                        <div className="flex justifiy-between">
                                            <p className="place-self-center">
                                                Your depot has completed a total
                                                of{" "}
                                                <strong>
                                                    {checkedData?.results
                                                        ?.length ||
                                                        shiftsData?.results
                                                            .length}{" "}
                                                    shifts (
                                                    {duration || totalDuration}{" "}
                                                    hours){" "}
                                                </strong>
                                                ,generating a running invoivce
                                                of{" "}
                                                <strong>
                                                    £{amount || totalAmount}
                                                </strong>
                                            </p>
                                            {checkedData?.results.length !==
                                            undefined ? (
                                                <div className="mr-2 ml-auto">
                                                    {" "}
                                                    <Button
                                                        variant="green"
                                                        className="py-3 font-semibold font-creatoMedium"
                                                        style={{
                                                            backgroundColor:
                                                                "black",
                                                        }}
                                                        data-testid="make_payment_btn"
                                                        iconRight={
                                                            <FaAngleRight
                                                                size={20}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            setOpenPayment(
                                                                !openPayment
                                                            )
                                                        }
                                                    >
                                                        Make Payments
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="mr-2 ml-auto">
                                                    {" "}
                                                    <Button
                                                        variant="green"
                                                        className="py-3 font-semibold font-creatoMedium"
                                                        style={{
                                                            backgroundColor:
                                                                "gray",
                                                        }}
                                                        data-testid="make_payment_btn"
                                                        iconRight={
                                                            <FaAngleRight
                                                                size={20}
                                                            />
                                                        }
                                                    >
                                                        Make Payments
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </Alert>
                                </div>
                            )}
                        </div>
                        <div className="hidden lg:block " data-testid="planner">
                            {queryStatus !== "completed" ? (
                                <Table
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        fontFamily: "CreatoDisplay",
                                        cursor: "pointer",
                                    }}
                                    className={"table"}
                                    verticalSpacing="md"
                                    data-testid="table-data"
                                    role="grid"
                                >
                                    <thead>
                                        {queryStatus === "ongoing" && (
                                            <tr>
                                                {tableHeadActive.map(
                                                    (item, index) => (
                                                        <th key={index}>
                                                            {item?.list}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        )}
                                        {queryStatus === "cancelled" && (
                                            <tr>
                                                {tableHeadCancelled.map(
                                                    (item, index) => (
                                                        <th key={index}>
                                                            {item?.list}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        )}
                                    </thead>
                                    <tbody>{rows}</tbody>
                                </Table>
                            ) : (
                                <div>
                                    <Tabs
                                        value={activeTab}
                                        onTabChange={setActiveTab}
                                        color="yellow"
                                        keepMounted={false}
                                        data-testid="planner_completed_tabs"
                                    >
                                        <Tabs.List>
                                            <Tabs.Tab value="unpaid">
                                                <p
                                                    className={
                                                        activeTab === "unpaid"
                                                            ? "text-red-100 text-lg font-creatoMedium active"
                                                            : `font-creatoMedium text-black-40 text-lg inactive`
                                                    }
                                                >
                                                    Unpaid Operatives
                                                    <span
                                                        className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                            activeTab ===
                                                            "unpaid"
                                                                ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                                : "bg-gray-100 text-white-100 text-3sm"
                                                        }`}
                                                    >
                                                        {unPaidShifts?.length}
                                                    </span>
                                                </p>
                                            </Tabs.Tab>
                                            <Tabs.Tab value="paid">
                                                <p
                                                    className={
                                                        activeTab === "paid"
                                                            ? "text-green-100 text-lg font-creatoMedium active"
                                                            : `font-creatoMedium text-black-40 text-lg inactive`
                                                    }
                                                >
                                                    Paid Shifts
                                                    <span
                                                        className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                            activeTab === "paid"
                                                                ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                                                : "bg-gray-100 text-white-100 text-3sm"
                                                        }`}
                                                    >
                                                        {paidShifts?.length}
                                                    </span>
                                                </p>
                                            </Tabs.Tab>
                                        </Tabs.List>
                                        <Tabs.Panel value={"unpaid"}>
                                            <Table
                                                style={{
                                                    backgroundColor: "#FFFFFF",
                                                    fontFamily: "CreatoDisplay",
                                                    cursor: "pointer",
                                                }}
                                                className={"table"}
                                                verticalSpacing="md"
                                                data-testid="table-data"
                                                role="grid"
                                            >
                                                <thead>
                                                    <tr>
                                                        {tableHeadActive.map(
                                                            (item, index) => (
                                                                <th key={index}>
                                                                    {item?.list}
                                                                </th>
                                                            )
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>{unPaidRows}</tbody>
                                            </Table>
                                        </Tabs.Panel>
                                        <Tabs.Panel value={"paid"}>
                                            <Table
                                                style={{
                                                    backgroundColor: "#FFFFFF",
                                                    fontFamily: "CreatoDisplay",
                                                    cursor: "pointer",
                                                }}
                                                className={"table"}
                                                verticalSpacing="md"
                                                data-testid="table-data"
                                                role="grid"
                                            >
                                                <thead>
                                                    <tr>
                                                        {tableHeadActive.map(
                                                            (item, index) => (
                                                                <th key={index}>
                                                                    {item?.list}
                                                                </th>
                                                            )
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>{paidRows}</tbody>
                                            </Table>
                                        </Tabs.Panel>
                                    </Tabs>
                                </div>
                            )}
                        </div>
                        <div className="block lg:hidden p-6 mt-4">
                            <MobileShiftsDetailsTable
                                queryStatus={queryStatus}
                                shiftsData={shiftsData?.results}
                                handleOpenMenu={handleOpenMenu}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                unPaidShifts={unPaidShifts}
                                paidShifts={paidShifts}
                                checkedShift={checkedShift}
                                handleCheckedShift={handleCheckedShift}
                            />
                        </div>
                        <Pagination
                            page={activePage}
                            total={activePage}
                            onChange={handleActivePage}
                            boundaries={1}
                            recordPerpage={
                                shiftsData?.results
                                    ? shiftsData?.results.length
                                    : 1
                            }
                        />
                    </>
                )}

                {openMenu && (
                    <Menu
                        openProfile={openProfile}
                        setOpenProfile={setOpenProfile}
                        queryStatus={queryStatus}
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                        openCancel={openCancel}
                        setOpenCancel={setOpenCancel}
                    />
                )}

                {openPayment && (
                    <PaymentEvidenceUpload
                        openPayment={openPayment}
                        setOpenPayment={setOpenPayment}
                        totalAmount={amount}
                        handleDocumentUpload={handleDocumentUpload}
                        data={data}
                        isLoading={isLoading}
                    />
                )}

                {openProfile && (
                    <OperativeProfile
                        openProfile={openProfile}
                        setOpenProfile={setOpenProfile}
                        scheduleId={scheduleId}
                        queryStatus={queryStatus}
                        singleElement={singleElement}
                    />
                )}

                {openCancel && (
                    <Cancel
                        openCancel={openCancel}
                        setOpenCancel={setOpenCancel}
                        operativeId={operativeId}
                        jobListingId={jobListingId}
                    />
                )}
                {openSuccessModal && (
                    <SuccessModal
                        opened={openSuccessModal}
                        setOpened={setOpenSuccessModal}
                        handleBack={() => {
                            setOpenSuccessModal(false)
                        }}
                        title="Payment evidence uploaded successfully "
                        description="You have successfully uploaded proof of payment. We will review and confirm this payment shortly. Thanks
                        "
                        buttonText="Thanks!"
                    />
                )}
            </Layout>
        </>
    )
}

export default ShiftsDetailTable
