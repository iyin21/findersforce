import { Modal, Progress, Table, Tabs } from "@mantine/core"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { FaAngleRight, FaTimes } from "react-icons/fa"
import Layout from "../../../components/Layout/index"
import {
    useGetOperativeRatingSummary,
    useGetShiftHistoryByJobListingId,
    useGetSingleSchedule,
    usePaymentEvidenceUpload,
} from "../../../hooks/planner/usePlanner.hooks"
import dayjs from "dayjs"
import { AiFillStar, AiOutlineArrowLeft } from "react-icons/ai"
import { TfiLocationPin } from "react-icons/tfi"
import ProfileImage from "../../../assets/ProfileImage.svg"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { CgSpinner } from "react-icons/cg"
import Pagination from "../../../components/Pagination/pagination"
// import Filter from "../../../components/Filter/index"
// import { FilterRequest } from "../../../types/filter/filter"
import MobileShiftsDetailsTable from "./MobileShiftsDetailsTable"
import Message from "../../../assets/Messaging.svg"
import { Button, Checkbox } from "../../../components"
import { FiPlus } from "react-icons/fi"
import UploadIcon from "../../../assets/image.svg"
import TimeEstimate from "./TimeEstimate"

const ShiftsDetailTable = () => {
    const { jobListingId } = useParams<string>()
    

    const location = useLocation()

    const queryStatus = location?.state?.status;
    const scheduleId = location?.state?.scheduleId;

    const { data: shiftsData, isLoading: isLoadingShiftsData } =
        useGetShiftHistoryByJobListingId({
            jobListingId,
            queryStatus,
        })

    const { data: singleShift } = useGetSingleSchedule({
        jobListingId: jobListingId,
    })

    const { data, isError, mutate, } = usePaymentEvidenceUpload({
        scheduleId: scheduleId
    })

    const [activeTab, setActiveTab] = useState<string | null>("unpaid")
    const [checkedShift, setCheckedShift] = useState<string[]>([])
    const [buttonState, setButtonState] = useState(false)

    function handleFinishPayment () {
        setPayment(!payment);
        setButtonState(!buttonState);
    }
    const navigate = useNavigate()
    const [activePage, setActivePage] = useState(1)

    // const applyFilter = (filter: FilterRequest) => {}

    const handleActivePage = (pageNumber: number) => {
        setActivePage(pageNumber)
    }
    useEffect(() => {
        if (data && data.status === "success") {
            // setShowModal((prev) => ({ ...prev, status: false }));
            // setShowSuccessDocUploadModal(true);
            // console.log("successfully uploaded doc")
            setButtonState(true)
        }

        if (isError) {
            // console.log("error")
        }
    }, [data, isError]);

    const handleCheckedShift = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedShift([...checkedShift, value])
        } else {
            // setDeleteBtn(false)
            setCheckedShift(checkedShift.filter((item) => item !== value))
        }
    }

    // console.log(checkedShift)

    const totalAmount = checkedShift?.map((item) => {
        const arr = []
        arr.push(Number(item))
        // console.log(arr, "bitch")
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i]
        }
        // console.log(sum);
        return sum
    })

    // console.log(totalAmount, "bitch")

    const [opened, setOpened] = useState(false)
    const [menu, setMenu] = useState(false)
    const [payment, setPayment] = useState(false)
    const ref = useRef<HTMLInputElement | null>(null)
    const [, setError] = useState("");
    const [, setFileName] = useState("");
    // const [file, setFile] = useState<string[]>([])

   const handleDocumentUpload = (e: ChangeEvent<HTMLInputElement>) => {
        // setError("");
        const uploadedFile = e.target.files?.[0];

        if (uploadedFile) {
            setError("");
            if (
                !(
                    uploadedFile.name.toLowerCase().endsWith(".pdf") ||
                    uploadedFile.name.toLowerCase().endsWith(".jpg") ||
                    uploadedFile.name.toLowerCase().endsWith(".jpeg") ||
                    uploadedFile.name.toLowerCase().endsWith(".png")
                )
            ) {
                return setError("Invalid format. Accepted format is JPG, PNG or PDF");
            }

            setFileName(uploadedFile.name);
            // setShowButton(false);

            // call upload doc api
            mutate({ file: uploadedFile });
             
        }
    };

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
            <td>{element?.jobListing?.jobType?.name}</td>
            <td>{element?.jobListing?.jobLocation?.formattedAddress}</td>
            <td>
                {dayjs(element?.jobListing?.shiftStartTime).format("h")} -{" "}
                {dayjs(element?.jobListing.shiftEndTime).format("h A")}
            </td>
            <td>
                {element?.jobListing?.jobRate?.currency}
                {element?.jobListing?.jobRate?.jobRatePerHourDisplayedToDepot}
                /hr
            </td>
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
            <td>{dayjs(element?.clockInTime).format("h:mm A")}</td>
            <td>
                <BiDotsVerticalRounded
                    size={20}
                    onClick={() => setMenu(!menu)}
                />
            </td>
        </tr>
    ))

    const paidShifts = shiftsData?.results?.filter(
        (shift) => shift?.jobListing?.fullyPaidByDepot === true
    )
    const unPaidShifts = shiftsData?.results?.filter(
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
                        id={element?.jobListing?._id}
                        className="rounded-lg"
                        onChange={handleCheckedShift}
                        checked={checkedShift.includes(
                            element?.jobListing?._id
                        )}
                        value={element?.jobListing?._id}
                        data-testid="checkbox"
                    />
                    <label htmlFor={"NO"}>{index + 1}</label>
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
            <td>{element?.jobListing?.jobType?.name}</td>
            <td>{element?.jobListing?.jobLocation?.formattedAddress}</td>
            <td>
                {dayjs(element?.jobListing?.shiftStartTime).format("h")} -{" "}
                {dayjs(element?.jobListing.shiftEndTime).format("h A")}
            </td>
            <td>
                {element?.jobListing?.jobRate?.currency}
                {element?.jobListing?.jobRate?.jobRatePerHourDisplayedToDepot}
                /hr
            </td>
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
            <td>{dayjs(element?.clockInTime).format("h:mm A")}</td>
            <td>
                <BiDotsVerticalRounded
                    size={20}
                    onClick={() => setMenu(!menu)}
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
                        id={element?.jobListing?._id}
                        className="rounded-lg"
                        onChange={handleCheckedShift}
                        checked={checkedShift.includes(
                            (
                                element?.jobListing?.jobRate
                                    ?.jobRatePerHourDisplayedToDepot *
                                element?.jobListing?.shiftDurationInHours
                            ).toString()
                        )}
                        value={(
                            element?.jobListing?.jobRate
                                ?.jobRatePerHourDisplayedToDepot *
                            element?.jobListing?.shiftDurationInHours
                        ).toString()}
                        data-testid="checkbox"
                    />
                    <label htmlFor={"NO"}>{index + 1}</label>
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
            <td>{element?.jobListing?.jobType?.name}</td>
            <td>{element?.jobListing?.jobLocation?.formattedAddress}</td>
            <td>
                {dayjs(element?.jobListing?.shiftStartTime).format("h")} -{" "}
                {dayjs(element?.jobListing.shiftEndTime).format("h A")}
            </td>
            <td>
                {element?.jobListing?.jobRate?.currency}
                {element?.jobListing?.jobRate?.jobRatePerHourDisplayedToDepot}
                /hr
            </td>
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
            <td>{dayjs(element?.clockInTime).format("h:mm A")}</td>
            <td>
                <BiDotsVerticalRounded
                    size={20}
                    onClick={() => setMenu(!menu)}
                />
            </td>
        </tr>
    ))

    const tableHeadActive = [
        { list: "NO" },
        { list: "NAME" },
        { list: "JOB TYPE" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "RATE" },
        { list: "MODE" },
        { list: "CLOCK-IN TIME" },
    ]

    const tableHeadCancelled = [
        { list: "NO" },
        { list: "NAME" },
        { list: "JOB TYPE" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "RATE" },
        { list: "MODE" },
        { list: "CANCELLED TIME" },
    ]
    const element = shiftsData?.results?.find(
        (item) => item?.jobListing?._id === jobListingId
    )
    const singleElement = singleShift?.results?.find(
        (item) => item?.jobListing?._id === jobListingId
    )

    const { data: operativeData } = useGetOperativeRatingSummary({
        id: singleElement?.operative?._id,
    })
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
                                        ).format("h:mm A")}{" "}
                                        -{" "}
                                        {dayjs(
                                            element?.jobListing.shiftEndTime
                                        ).format("h:mm A")}
                                    </p>
                                </div>
                                {queryStatus === "completed" && (
                                    <div>
                                        <Button
                                            variant="green"
                                            className="py-3 font-semibold font-creatoMedium"
                                            style={{ backgroundColor: "black" }}
                                            iconLeft={<FiPlus size={20} />}
                                            data-testid="make_payment_btn"
                                            iconRight={
                                                <FaAngleRight size={20} />
                                            }
                                            onClick={() => setPayment(!payment)}
                                        >
                                            Make Payments
                                        </Button>
                                    </div>
                                )}
                                {queryStatus === "ongoing" && (
                                    <div className="px-4">
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
                                      <p className="bg-red-100 rounded-xl px-3 text-white-100 font-creato">SHIFTS CANCELLED</p>
                                    </div>
                                )}
                            </div>
                            {/* {queryStatus === "completed" && (
                                <div className="relative lg:pb-4 bottom-0 lg:bottom-0">
                                    <div className="absolute right-0 ">
                                        {" "}
                                        <Filter applyFilter={applyFilter} />
                                    </div>
                                </div>
                            )} */}
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
                                                            ? "text-black-100 text-lg font-creatoMedium active"
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
                                                            ? "text-black-100 text-lg font-creatoMedium active"
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
                        <div className="block lg:hidden">
                            <MobileShiftsDetailsTable />
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

                {menu && (
                    <Modal
                        opened={menu}
                        onClose={() => setMenu(false)}
                        withCloseButton={false}
                        overlayOpacity={0.55}
                        padding={0}
                        transition="fade"
                        transitionDuration={600}
                        transitionTimingFunction="ease"
                        styles={() => ({
                            modal: {
                                marginLeft: "auto",
                                marginTop: "10%",
                                width: "200px",
                            },
                        })}
                    >
                        <div className="font-creato grid grid-cols-1 gap-4 p-3 cursor-pointer">
                            <h6>Track Operative</h6>
                            <hr className="text-gray-80" />
                            <h6 onClick={() => setOpened(!opened)}>
                                View Profile
                            </h6>
                            {queryStatus === "cancelled" && (
                                <>
                                    <hr className="text-gray-80" />
                                    <h6>View Reason</h6>
                                </>
                            )}
                        </div>
                    </Modal>
                )}

                {payment && (
                    <Modal
                        centered
                        opened={payment}
                        onClose={() => setPayment(false)}
                        withCloseButton={false}
                        overlayOpacity={0.55}
                        overlayBlur={3}
                        padding={0}
                        closeOnClickOutside={false}
                        transition="fade"
                        transitionDuration={600}
                        transitionTimingFunction="ease"
                        styles={() => ({
                            modal: {
                                width: "40%",
                            },
                        })}
                    >
                        <div className="p-4">
                            <p className="font-extrabold font-creatoBold text-2xl">
                                Pay £{totalAmount?.[0]}
                            </p>
                            <p className="font-creato text-2md text-black-50 ">
                                Proceed to your bank app to complete this
                                transfer and upload an evidence of payment to
                                verify this payment.
                            </p>
                            <section className="py-4 my-3 bg-gray-100 rounded-lg">
                                <p className="px-2">Account Details</p>
                            </section>
                            <div className="mt-8 mb-2">
                                <p className="font-bold font-creatoBold text-3md text-black-100 ">
                                    Upload Evidence of Payment
                                </p>
                                <p className="font-creato text-2md text-black-50 ">
                                    Once bank transfer is complete, upload
                                    evidence of payment for verification
                                </p>
                            </div>
                            <div className="border-dashed border-2 border-yellow-60 rounded-lg p-2 mt-4">
                                <div
                                    className="bg-yellow-5 text-black-100 p-6 rounded gap-5 text-center"
                                    onClick={() => {
                                        ref.current?.click()
                                    }}
                                >
                                    <img
                                        src={UploadIcon}
                                        alt="upload"
                                        className="w-auto mx-auto mb-2"
                                    />
                                    <div className="text-center">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={ handleDocumentUpload }
                                            multiple
                                            accept="image/png,image/jpeg"
                                            ref={ref}
                                        />

                                        <p className="">Tap to Upload</p>
                                        <span className="text-black-60 text-md">
                                            (JPEG, PNG, PDF accepted | max file
                                            size: 10MB)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between  py-5 mx-auto mb-8">
                                {!buttonState && 
                                (
                                <Button onClick={() => setPayment(!payment)}>
                                    Cancel
                                </Button>
                                )}
                                {!buttonState ? 
                                (<Button
                                    variant="primary"
                                    className="text-white-100 "
                                    size="small"
                                    style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" ,cursor: "default",}}
                                >
                                    Proceed
                                </Button>) : 
                                (<Button
                                    variant="primary"
                                    className="text-white-100 ml-auto"
                                    size="small"
                                    onClick={() => handleFinishPayment()}
                                >
                                    Proceed
                                </Button>)}
                            </div>
                        </div>
                    </Modal>
                )}

                {opened && (
                    <Modal
                        centered
                        opened={opened}
                        onClose={() => setOpened(false)}
                        withCloseButton={false}
                        overlayOpacity={0.55}
                        overlayBlur={3}
                        padding={0}
                        transition="fade"
                        transitionDuration={600}
                        transitionTimingFunction="ease"
                        styles={() => ({
                            modal: {
                                width: "580px",
                            },
                        })}
                    >
                        <header className="bg-black-100 text-white-100 flex justify-between p-4">
                            <div className="flex gap-4 place-items-center">
                                <div>
                                    <p className="font-bold font-creatoBold text-2xl">
                                        Shift Details
                                    </p>
                                </div>
                            </div>
                            <div className="p-3 ">
                                <FaTimes
                                    size={20}
                                    onClick={() => setOpened(!opened)}
                                />
                            </div>
                        </header>
                        <div className="flex justify-between bg-yellow-20 p-5 mt-8 w-[90%] mx-auto rounded-lg">
                            <div className="flex gap-5">
                                <img
                                    src={
                                        singleElement?.operative
                                            ?.profileImageUrl
                                    }
                                    alt="profile"
                                    className="mt-3 w-10 h-10 rounded-[100%]"
                                />
                                <div>
                                    <p className="text-sm">OPERATIVE</p>
                                    <p className="font-extrabold font-creatoBold text-xl">
                                        {singleElement?.operative?.firstName}{" "}
                                        {singleElement?.operative?.lastName}
                                    </p>
                                    <p className="text-sm font-creato">
                                        Joined{" "}
                                        {dayjs(
                                            singleElement?.operative?.createdAt
                                        ).format("YYYY")}{" "}
                                        years ago |
                                        <span className="text-green-100">
                                            {" "}
                                            {
                                                singleElement?.jobListing
                                                    ?.jobMatchPercentage
                                            }
                                            % Match
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <img
                                    src={Message}
                                    alt="message icon"
                                    className="inline"
                                />
                                <p className="inline p-2 font-bold font-creatoBold">
                                    Message{" "}
                                    {singleElement?.operative?.firstName}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between bg-yellow-10 p-5 mt-8 w-[90%] mx-auto rounded-lg">
                            <div className="flex gap-5 w-[40%]">
                                <div>
                                    <p className="text-2md font-creato">
                                        Rating
                                    </p>
                                    <p>
                                        {operativeData?.avgAverageScore}{" "}
                                        <AiFillStar
                                            size={20}
                                            style={{ color: "#FED70A" }}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="flex justify-between place-items-center">
                                    <p className=" text-[md] font-creatoMedium font-medium">
                                        Professionalism
                                    </p>
                                    {Number(
                                        operativeData?.avgProfessionalismScore
                                    ) <= 2 ? (
                                        <Progress
                                            value={
                                                (Number(
                                                    operativeData?.avgProfessionalismScore
                                                ) /
                                                    5) *
                                                100
                                            }
                                            color="#F44336"
                                            className="w-[50%]"
                                        />
                                    ) : (
                                        <Progress
                                            value={
                                                (Number(
                                                    operativeData?.avgProfessionalismScore
                                                ) /
                                                    5) *
                                                100
                                            }
                                            color="#4DB25D"
                                            className="w-[50%]"
                                        />
                                    )}
                                </div>
                                <div className="flex justify-between place-items-center">
                                    <p className=" text-[md] font-creatoMedium font-medium">
                                        Punctuality
                                    </p>
                                    {Number(
                                        operativeData?.avgHelpfulnessScore
                                    ) <= 2 ? (
                                        <Progress
                                            value={
                                                (Number(
                                                    operativeData?.avgHelpfulnessScore
                                                ) /
                                                    5) *
                                                100
                                            }
                                            color="#F44336"
                                            className="w-[50%]"
                                        />
                                    ) : (
                                        <Progress
                                            value={
                                                (Number(
                                                    operativeData?.avgHelpfulnessScore
                                                ) /
                                                    5) *
                                                100
                                            }
                                            color="#4DB25D"
                                            className="w-[50%]"
                                        />
                                    )}
                                </div>
                                <div className="flex justify-between place-items-center">
                                    <p className=" text-[md] font-creatoMedium font-medium">
                                        Helpfulness
                                    </p>
                                    {Number(
                                        operativeData?.avgOrganizationScore
                                    ) <= 2 ? (
                                        <Progress
                                            value={
                                                (Number(
                                                    operativeData?.avgOrganizationScore
                                                ) /
                                                    5) *
                                                100
                                            }
                                            color="#F44336"
                                            className="w-[50%]"
                                        />
                                    ) : (
                                        <Progress
                                            value={
                                                (Number(
                                                    operativeData?.avgOrganizationScore
                                                ) /
                                                    5) *
                                                100
                                            }
                                            color="#4DB25D"
                                            className="w-[50%]"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className=" px-8 pt-6 text-2md text-black-60">
                            LOCATION
                        </p>
                        <p className="text-2md px-8 font-medium">
                            <TfiLocationPin
                                size={20}
                                style={{ color: "#E94444" }}
                                className="inline"
                            />{" "}
                            {
                                singleElement?.jobListing?.jobLocation
                                    ?.formattedAddress
                            }
                        </p>
                        <section className="grid grid-cols-2 pb-4">
                            <div>
                                <p className=" px-8 pt-6 text-2md text-black-60">
                                    SHIFT TYPE
                                </p>
                                <p className="text-2md px-8 font-creatoMedium font-medium">
                                    {singleElement?.jobListing?.jobType?.name}
                                </p>
                            </div>
                            <div>
                                <p className=" px-8 pt-6 text-2md text-black-60">
                                    SHIFT METHOD
                                </p>
                                <p className="text-2md ml-4 px-8 font-creatoMedium font-medium bg-yellow-100 rounded-3xl w-fit">
                                    {singleElement?.jobListing?.jobMeetingPoint}
                                </p>
                            </div>
                            <div>
                                <p className=" px-8 pt-6 text-2md text-black-60">
                                    CERTIFICATION
                                </p>
                                <p className="text-2md px-8 font-creatoMedium font-medium">
                                    {
                                        singleElement?.jobListing
                                            ?.jobQualification?.name
                                    }
                                </p>
                            </div>
                            <div>
                                <p className=" px-8 pt-6 text-2md text-black-60">
                                    SHIFT DATE
                                </p>
                                <p className="text-2md px-8 font-creatoMedium font-medium">
                                    {dayjs(
                                        singleElement?.jobListing?.jobDate
                                    ).format("MMMM D, YYYY")}
                                </p>
                            </div>
                            <div>
                                <p className=" px-8 pt-6 text-2md text-black-60">
                                    SHIFT DURATION
                                </p>
                                <p className="text-2md px-8 font-creatoMedium font-medium">
                                    {
                                        singleElement?.jobListing
                                            ?.shiftDurationInHours
                                    }{" "}
                                    Hour(s) (
                                    {dayjs(
                                        singleElement?.jobListing
                                            ?.shiftStartTime
                                    ).format("h:mm A")}{" "}
                                    -{" "}
                                    {dayjs(
                                        singleElement?.jobListing?.shiftEndTime
                                    ).format("h:mm A")}{" "}
                                    )
                                </p>
                            </div>
                        </section>
                    </Modal>
                )}
            </Layout>
        </>
    )
}

export default ShiftsDetailTable
