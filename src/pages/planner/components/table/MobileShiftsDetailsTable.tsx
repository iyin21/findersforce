import dayjs from "dayjs"
import ProfileImage from "../../../../assets/ProfileImage.svg"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { Checkbox, Tabs } from "@mantine/core"
import { Result } from "../../../../types/planner/interfaces"

interface Props {
    queryStatus: string
    shiftsData: Result[] | undefined
    handleOpenMenu: any
    activeTab: string | null
    setActiveTab:  (val: string) => void
    unPaidShifts: Result[] | undefined
    paidShifts: Result[] | undefined
    checkedShift: any
    handleCheckedShift: any
    
    
}
const MobileShiftsDetailsTable = ({
    queryStatus,
    shiftsData,
    handleOpenMenu,
    activeTab,
    setActiveTab,
    unPaidShifts,
    paidShifts,
    checkedShift,
    handleCheckedShift,
}: Props) => {
    // const { jobListingId } = useParams<string>()

    // const location = useLocation()

    // const queryStatus = location?.state?.status
    // const scheduleId = location?.state?.scheduleId

    // const [openProfile, setOpenProfile] = useState(false)
    // const [operativeId, setOperativeId] = useState("")
    // const [openMenu, setOpenMenu] = useState(false)
    // const [activeTab, setActiveTab] = useState<string | null>("unpaid")
    // const [checkedShift, setCheckedShift] = useState<string[]>([])

    // const [openCancel, setOpenCancel] = useState(false)

    // const { data: shiftsData } = useGetShiftHistoryByJobListingId({
    //     jobListingId,
    //     queryStatus,
    // })

    // const { data: singleShift } = useGetSingleSchedule({
    //     jobListingId: jobListingId,
    // })

    // const { data: singleElement } = useGetScheduleByScheduleId({
    //     scheduleId: scheduleId,
    // })
    // const handleOpenMenu = (id: string) => {
    //     setOperativeId(id)
    //     setOpenMenu(!openMenu)
    // }
    // const handleCheckedShift = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value } = e.target
    //     const isChecked = e.target.checked
    //     if (isChecked) {
    //         setCheckedShift([...checkedShift, value])
    //     } else {
    //         setCheckedShift(checkedShift.filter((item) => item !== value))
    //     }
    // }

    // const paidShifts = singleShift?.results?.filter(
    //     (shift) => shift?.jobListing?.fullyPaidByDepot === true
    // )
    // const unPaidShifts = singleShift?.results?.filter(
    //     (shift) => shift?.jobListing?.fullyPaidByDepot === false
    // )

    return (
        <>
            {queryStatus !== "completed" ? (
                <div className="mt-4">
                    {shiftsData?.map((element, index) => (
                        <div className="rounded bg-black-5 mb-4" key={index}>
                            <div className="flex justify-between border-b border-black-20 p-4">
                                <div className="flex items-center gap-2">
                                    <p className="text-2md mt-1 font-creato">
                                        {element?.jobListing?.listingId}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                        {element?.jobListing?.jobMeetingPoint}
                                    </p>
                                    <div className="cursor-pointer">
                                        <BiDotsVerticalRounded
                                            size={20}
                                            onClick={() =>
                                                handleOpenMenu(
                                                    element?.operative?._id
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between mt-3">
                                    <div>
                                        <h6 className="text-black-50 text-3sm">
                                            NAME
                                        </h6>
                                        <div className="flex items-center">
                                            <img
                                                src={ProfileImage}
                                                alt="profile_image"
                                            />
                                            <p className="text-2md mt-1">
                                                {element?.operative?.firstName}{" "}
                                                {element?.operative?.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="text-black-50 text-3sm">
                                            TASK TYPE
                                        </h6>
                                        <p className="text-2md mt-1">
                                            {element?.jobListing?.jobType?.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-3">
                                    <div>
                                        <h6 className="text-black-50 text-3sm">
                                            LOCATION
                                        </h6>
                                        <p>
                                            {
                                                element?.jobListing?.jobLocation
                                                    ?.formattedAddress
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <h6 className="text-black-50 text-3sm">
                                            SCHEDULE
                                        </h6>
                                        <p>
                                            {dayjs(
                                                element?.jobListing
                                                    ?.shiftStartTime
                                            ).format("h")}{" "}
                                            -{" "}
                                            {dayjs(
                                                element?.jobListing.shiftEndTime
                                            ).format("h A")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-3">
                                    <div>
                                        <h6 className="text-black-50 text-3sm">
                                            RATE
                                        </h6>
                                        {element?.jobListing.jobMeetingPoint ===
                                        "DEPOT" ? (
                                            <p className="text-2md mt-1">
                                                {
                                                    element?.jobListing.jobRate
                                                        .currency
                                                }
                                                {element?.jobListing?.jobRate
                                                    .jobRateDepotFirstDisplayedToDepot *
                                                    element?.jobListing
                                                        ?.shiftDurationInHours}
                                            </p>
                                        ) : (
                                            <p className="text-2md mt-1">
                                                {
                                                    element?.jobListing.jobRate
                                                        .currency
                                                }
                                                {element?.jobListing?.jobRate
                                                    .jobRateMeetOnsiteDisplayedToDepot *
                                                    element?.jobListing
                                                        ?.shiftDurationInHours}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <h6 className="text-black-50 text-3sm">
                                            CLOCK-IN TIME
                                        </h6>
                                        <div className="flex items-center gap-1">
                                            <p className="text-2md mt-1">
                                                {dayjs(
                                                    element?.clockInTime
                                                ).format("h:mm A")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
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
                                        activeTab === "unpaid"
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
                        <div className="mt-4">
                            {unPaidShifts?.map((element, index) => (
                                <div
                                    className="rounded bg-black-5 mb-4"
                                    key={index}
                                >
                                    <div className="flex justify-between border-b border-black-20 p-4">
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={element?.operative?._id}
                                                className="rounded-lg"
                                                onChange={handleCheckedShift}
                                                name={element?.operative?._id}
                                                checked={checkedShift?.includes(
                                                    element?.operative?._id
                                                )}
                                                value={element?.operative?._id}
                                                data-testid="checkbox"
                                            />
                                            <p className="text-2md mt-1 font-creato">
                                                {element?.jobListing?.listingId}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                                {
                                                    element?.jobListing
                                                        ?.jobMeetingPoint
                                                }
                                            </p>
                                            <div className="cursor-pointer">
                                                <BiDotsVerticalRounded
                                                    size={20}
                                                    onClick={() =>
                                                        handleOpenMenu(
                                                            element?.operative
                                                                ?._id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between mt-3">
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    NAME
                                                </h6>
                                                <div className="flex items-center">
                                                    <img
                                                        src={ProfileImage}
                                                        alt="profile_image"
                                                    />
                                                    <p className="text-2md mt-1">
                                                        {
                                                            element?.operative
                                                                ?.firstName
                                                        }{" "}
                                                        {
                                                            element?.operative
                                                                ?.lastName
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    TASK TYPE
                                                </h6>
                                                <p className="text-2md mt-1">
                                                    {
                                                        element?.jobListing
                                                            ?.jobType?.name
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-3">
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    LOCATION
                                                </h6>
                                                <p>
                                                    {
                                                        element?.jobListing
                                                            ?.jobLocation
                                                            ?.formattedAddress
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    SCHEDULE
                                                </h6>
                                                <p>
                                                    {dayjs(
                                                        element?.jobListing
                                                            ?.shiftStartTime
                                                    ).format("h")}{" "}
                                                    -{" "}
                                                    {dayjs(
                                                        element?.jobListing
                                                            .shiftEndTime
                                                    ).format("h A")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-3">
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    RATE
                                                </h6>
                                                {element?.jobListing
                                                    .jobMeetingPoint ===
                                                "DEPOT" ? (
                                                    <p className="text-2md mt-1">
                                                        {
                                                            element?.jobListing
                                                                .jobRate
                                                                .currency
                                                        }
                                                        {element?.jobListing
                                                            ?.jobRate
                                                            .jobRateDepotFirstDisplayedToDepot *
                                                            element?.jobListing
                                                                ?.shiftDurationInHours}
                                                    </p>
                                                ) : (
                                                    <p className="text-2md mt-1">
                                                        {
                                                            element?.jobListing
                                                                .jobRate
                                                                .currency
                                                        }
                                                        {element?.jobListing
                                                            ?.jobRate
                                                            .jobRateMeetOnsiteDisplayedToDepot *
                                                            element?.jobListing
                                                                ?.shiftDurationInHours}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    CLOCK-IN TIME
                                                </h6>
                                                <div className="flex items-center gap-1">
                                                    <p className="text-2md mt-1">
                                                        {dayjs(
                                                            element?.clockInTime
                                                        ).format("h:mm A")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value={"paid"}>
                        <div className="mt-4">
                            {paidShifts?.map((element, index) => (
                                <div
                                    className="rounded bg-black-5 mb-4"
                                    key={index}
                                >
                                    <div className="flex justify-between border-b border-black-20 p-4">
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={element?.operative?._id}
                                                className="rounded-lg"
                                                onChange={handleCheckedShift}
                                                name={element?.operative?._id}
                                                checked={checkedShift?.includes(
                                                    element?.operative?._id
                                                )}
                                                value={element?.operative?._id}
                                                data-testid="checkbox"
                                            />
                                            <p className="text-2md mt-1 font-creato">
                                                {element?.jobListing?.listingId}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                                                {
                                                    element?.jobListing
                                                        ?.jobMeetingPoint
                                                }
                                            </p>
                                            <div className="cursor-pointer">
                                                <BiDotsVerticalRounded
                                                    size={20}
                                                    onClick={() =>
                                                        handleOpenMenu(
                                                            element?.operative
                                                                ?._id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between mt-3">
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    NAME
                                                </h6>
                                                <div className="flex items-center">
                                                    <img
                                                        src={ProfileImage}
                                                        alt="profile_image"
                                                    />
                                                    <p className="text-2md mt-1">
                                                        {
                                                            element?.operative
                                                                ?.firstName
                                                        }{" "}
                                                        {
                                                            element?.operative
                                                                ?.lastName
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    TASK TYPE
                                                </h6>
                                                <p className="text-2md mt-1">
                                                    {
                                                        element?.jobListing
                                                            ?.jobType?.name
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-3">
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    LOCATION
                                                </h6>
                                                <p>
                                                    {
                                                        element?.jobListing
                                                            ?.jobLocation
                                                            ?.formattedAddress
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    SCHEDULE
                                                </h6>
                                                <p>
                                                    {dayjs(
                                                        element?.jobListing
                                                            ?.shiftStartTime
                                                    ).format("h")}{" "}
                                                    -{" "}
                                                    {dayjs(
                                                        element?.jobListing
                                                            .shiftEndTime
                                                    ).format("h A")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-3">
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    RATE
                                                </h6>
                                                {element?.jobListing
                                                    .jobMeetingPoint ===
                                                "DEPOT" ? (
                                                    <p className="text-2md mt-1">
                                                        {
                                                            element?.jobListing
                                                                .jobRate
                                                                .currency
                                                        }
                                                        {element?.jobListing
                                                            ?.jobRate
                                                            .jobRateDepotFirstDisplayedToDepot *
                                                            element?.jobListing
                                                                ?.shiftDurationInHours}
                                                    </p>
                                                ) : (
                                                    <p className="text-2md mt-1">
                                                        {
                                                            element?.jobListing
                                                                .jobRate
                                                                .currency
                                                        }
                                                        {element?.jobListing
                                                            ?.jobRate
                                                            .jobRateMeetOnsiteDisplayedToDepot *
                                                            element?.jobListing
                                                                ?.shiftDurationInHours}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <h6 className="text-black-50 text-3sm">
                                                    CLOCK-IN TIME
                                                </h6>
                                                <div className="flex items-center gap-1">
                                                    <p className="text-2md mt-1">
                                                        {dayjs(
                                                            element?.clockInTime
                                                        ).format("h:mm A")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tabs.Panel>
                </Tabs>
            )}

            {/* {openProfile && (
                <OperativeProfile
                    openProfile={openProfile}
                    setOpenProfile={setOpenProfile}
                    scheduleId={scheduleId}
                    queryStatus={queryStatus}
                    singleElement={singleElement}
                />
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
            {openCancel && (
                <Cancel
                    openCancel={openCancel}
                    setOpenCancel={setOpenCancel}
                    operativeId={operativeId}
                    jobListingId={jobListingId}
                />
            )} */}
        </>
    )
}

export default MobileShiftsDetailsTable
