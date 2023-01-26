import dayjs from "dayjs"
import ProfileImage from "../../../assets/ProfileImage.svg"
import {
    useGetScheduleByScheduleId,
    useGetShiftHistoryByJobListingId,
} from "../../../hooks/planner/usePlanner.hooks"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { CgSpinner } from "react-icons/cg"
import { HiArrowLeft } from "react-icons/hi"
import TimeEstimate from "../../../pages/planner/components/TimeEstimate"
import { Table } from "@mantine/core"
import Menu from "../../../components/Modals/Planner/Menu"
import { useState } from "react"
import OperativeProfile from "../../../components/Modals/Planner/OperativeProfile"

const ActiveShiftDetail = ({
    jobListingId,
    scheduleId,
    setPhase,
}: {
    jobListingId: string
    scheduleId: string
    setPhase: (val: number) => void
}) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const { data: shiftsData, isLoading: isLoadingShiftsData } =
        useGetShiftHistoryByJobListingId({
            jobListingId,
            queryStatus: "ongoing",
        })
    const { data: singleElement } = useGetScheduleByScheduleId({
        scheduleId: scheduleId,
    })

    const handleOpenMenu = (id: string) => {
        setOpenMenu(!openMenu)
    }

    const element = shiftsData?.results?.find(
        (item) => item?.jobListing?._id === jobListingId
    )

    const rows = shiftsData?.results?.map((element, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center gap-2">
                    <img
                        src={element.operative.profileImageUrl || ProfileImage}
                        alt="profile_image"
                    />
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
                    {element?.jobListing?.amountPaidByDepot}
                </td>
            ) : (
                <td>
                    {element?.jobListing?.jobRate?.currency}
                    {element?.jobListing?.amountPaidByDepot}
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

    const tableHeadActive = [
        { list: "NO" },
        { list: "OPERATIVE" },
        { list: "LOCATION" },
        { list: "SCHEDULE" },
        { list: "RATE" },
        { list: "MODE" },
        { list: "CLOCK-IN" },
    ]

    return (
        <div>
            {openProfile && (
                <OperativeProfile
                    openProfile={openProfile}
                    setOpenProfile={setOpenProfile}
                    scheduleId={scheduleId}
                    queryStatus={"ongoing"}
                    singleElement={singleElement}
                />
            )}
            {openMenu && (
                <Menu
                    openProfile={openProfile}
                    setOpenProfile={setOpenProfile}
                    queryStatus={"ongoing"}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    openCancel={false}
                    setOpenCancel={() => {}}
                />
            )}
            {isLoadingShiftsData ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <div className="pt-12 px-5 lg:pt-8 lg:px-6">
                    <span
                        onClick={() => setPhase(1)}
                        className="p-3 rounded inline-flex items-center justify-center bg-black-10 cursor-pointer"
                        aria-hidden="true"
                    >
                        <HiArrowLeft className="text-2lg" />
                    </span>
                    <div className="lg:flex justify-between">
                        <div>
                            <h1 className="text-xl md:text-3xl font-creatoBold text-black-100 font-bold">
                                {element?.jobListing?.listingId}
                            </h1>
                            <p className="text-black-60 text-2md font-normal font-creato">
                                {dayjs(element?.jobListing?.jobDate).format(
                                    "MMMM DD, YYYY"
                                )}{" "}
                                |{" "}
                                {dayjs(
                                    element?.jobListing?.shiftStartTime
                                ).format("HH:mm")}{" "}
                                -{" "}
                                {dayjs(element?.jobListing.shiftEndTime).format(
                                    "HH:mm"
                                )}
                            </p>
                        </div>

                        <div className="">
                            <p className="bg-yellow-100 rounded-full text-3sm font-bold font-creato mb-4 py-2 px-3 text-center">
                                ACTIVE SHIFT ENDS IN
                            </p>
                            <TimeEstimate
                                initialDate={
                                    new Date(element?.jobListing?.shiftEndTime)
                                }
                            />
                        </div>
                    </div>
                    <div className="hidden lg:block">
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
                                    {tableHeadActive.map((item, index) => (
                                        <th key={index}>{item?.list}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </div>
                    <div className="block lg:hidden">
                        {shiftsData?.results.map((element, index) => (
                            <div
                                className="rounded bg-black-5 mb-4"
                                key={index}
                            >
                                <div className="flex justify-between border-b border-black-20 p-4">
                                    <div className="flex items-center gap-2">
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
                                                        element?.operative?._id
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
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
                                    <div className="flex justify-between mt-3">
                                        <div>
                                            <h6 className="text-black-50 text-3sm">
                                                NAME
                                            </h6>
                                            <div className="flex items-center">
                                                <img
                                                    src={
                                                        element?.operative
                                                            ?.profileImageUrl ||
                                                        ProfileImage
                                                    }
                                                    alt="profile_image"
                                                    className="inline rounded-full p-2 w-[50px] h-[50px]"
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
                                                    element?.jobListing?.jobType
                                                        ?.name
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-3">
                                        <div>
                                            <h6 className="text-black-50 text-3sm">
                                                CLOCK-IN TIME
                                            </h6>
                                            <div className="flex items-center gap-1">
                                                <p className="text-2md mt-1">
                                                    {dayjs(
                                                        element?.clockInTime
                                                    ).format("HH:mm")}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="text-black-50 text-3sm">
                                                SCHEDULE
                                            </h6>
                                            <p>
                                                {dayjs(
                                                    element?.jobListing
                                                        ?.shiftStartTime
                                                ).format("HH:mm")}{" "}
                                                -{" "}
                                                {dayjs(
                                                    element?.jobListing
                                                        .shiftEndTime
                                                ).format("HH:mm")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-3">
                                        <div>
                                            <h6 className="text-black-50 text-3sm">
                                                RATE
                                            </h6>
                                            {element?.jobListing
                                                .jobMeetingPoint === "DEPOT" ? (
                                                <p className="text-2md mt-1">
                                                    {
                                                        element?.jobListing
                                                            .jobRate.currency
                                                    }
                                                    {
                                                        element?.jobListing
                                                            ?.amountPaidByDepot
                                                    }
                                                </p>
                                            ) : (
                                                <p className="text-2md mt-1">
                                                    {
                                                        element?.jobListing
                                                            .jobRate.currency
                                                    }
                                                    {
                                                        element?.jobListing
                                                            ?.amountPaidByDepot
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ActiveShiftDetail
