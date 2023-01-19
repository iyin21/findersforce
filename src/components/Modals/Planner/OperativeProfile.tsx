import { Modal, Progress } from "@mantine/core"
import dayjs from "dayjs"
import { AiFillStar } from "react-icons/ai"
import { FaTimes } from "react-icons/fa"
import Message from "../../../assets/Messaging.svg"
import { Dispatch, SetStateAction } from "react"
import { useGetScheduleByScheduleId } from "../../../hooks/planner/usePlanner.hooks"
import relativeTime from "dayjs/plugin/relativeTime"
import { IoLocationSharp } from "react-icons/io5"
dayjs.extend(relativeTime)

interface Props {
    openProfile: boolean
    setOpenProfile: Dispatch<SetStateAction<boolean>>
    scheduleId: string
}

const OperativeProfile = ({
    openProfile,
    setOpenProfile,
    scheduleId,
}: Props) => {
    const { data: singleElement } = useGetScheduleByScheduleId({
        scheduleId: scheduleId,
    })
    // console.log(singleElement?.cancelReason)

    return (
        <Modal
            centered
            opened={openProfile}
            onClose={() => setOpenProfile(false)}
            withCloseButton={false}
            closeOnClickOutside={false}
            overlayOpacity={0.55}
            overlayBlur={3}
            padding={0}
            size="lg"
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            // styles={() => ({
            //     modal: {
            //         width: "550px",
            //     },
            // })}
        >
            <header className="bg-black-100 text-white-100 flex justify-between py-5 px-8 font-creato">
                <div className="flex gap-4 place-items-center">
                    <div>
                        <p className="font-bold font-creato text-2xl">
                            Shift Summary
                        </p>
                    </div>
                </div>
                <div className="p-3 ">
                    <FaTimes
                        size={20}
                        onClick={() => setOpenProfile(!openProfile)}
                    />
                </div>
            </header>
            <div className="flex justify-between bg-yellow-10 mx-8 p-5 mt-8 mb-5  mx-auto rounded-lg font-creato">
                <div className="flex gap-4">
                    <img
                        src={singleElement?.operative?.profileImageUrl}
                        alt="profile"
                        className="rounded-full  h-14 w-14 object-cover"
                    />
                    <div>
                        <p className="text-3sm text-black-50">OPERATIVE</p>
                        <p className="font-extrabold font-creatoMedium text-xl">
                            {singleElement?.operative?.firstName}{" "}
                            {singleElement?.operative?.lastName}
                        </p>
                        <p className="text-md font-creato mt-1">
                            Joined{" "}
                            {dayjs(
                                singleElement?.operative?.createdAt
                            ).fromNow()}
                            <span className="text-black-50"> |</span>
                            <span className="text-green-100">
                                {" "}
                                {singleElement?.jobListing?.jobMatchPercentage}%
                                Match
                            </span>
                        </p>
                    </div>
                </div>
                <div>
                    <img
                        src={Message}
                        alt="message icon"
                        className="inline p-1"
                    />
                    <p className="inline font-bold font-creatoMedium text-md">
                        Message {singleElement?.operative?.firstName}
                    </p>
                </div>
            </div>
            <div className="flex justify-between p-5 bg-green-10 mx-8 rounded-lg">
                {singleElement?.jobListing?.jobMeetingPoint === "DEPOT" ? (
                    <div>
                        {" "}
                        <p className="text-black-50 text-2md mb-3">RATE</p>{" "}
                        <p className="font-medium font-creatoMedium text-3md">
                            {singleElement?.jobListing?.jobRate.currency}{" "}
                            {
                                singleElement?.jobListing?.jobRate
                                    ?.jobRateDepotFirstDisplayedToDepot
                            }
                        </p>{" "}
                    </div>
                ) : (
                    <div>
                        {" "}
                        <p className="text-black-50 text-2md mb-3">RATE</p>{" "}
                        <p className="font-medium font-creatoMedium text-3md">
                            {singleElement?.jobListing?.jobRate?.currency}{" "}
                            {
                                singleElement?.jobListing?.jobRate
                                    ?.jobRateMeetOnsiteDisplayedToDepot
                            }
                        </p>{" "}
                    </div>
                )}
                <div>
                    {" "}
                    <p className="text-black-50 text-2md mb-3">
                        HOURS WORKED
                    </p>{" "}
                    <p className="font-medium font-creatoMedium text-3md">
                        {singleElement?.jobListing?.shiftDurationInHours} HRS (
                        {dayjs(
                            singleElement?.jobListing?.shiftStartTime
                        ).format("HH:mm a")}{" "}
                        -{" "}
                        {dayjs(singleElement?.jobListing?.shiftEndTime).format(
                            "HH:mm a"
                        )}
                        )
                    </p>{" "}
                </div>
                <div>
                    {" "}
                    <p className="text-black-50 text-2md mb-3">
                        PAYMENT STATUS
                    </p>{" "}
                    {singleElement?.jobListing?.fullyPaidByDepot === true ? (
                        <p className="font-medium font-creatoMedium text-3md bg-green-10 text-green-100  text-center rounded-full py-1">
                            Paid
                        </p>
                    ) : (
                        <p className="font-medium font-creatoMedium text-3md bg-red-10 text-red-100  text-center rounded-full py-1">
                            Unpaid
                        </p>
                    )}
                </div>
            </div>

            <p className=" px-8 pt-6 text-2md text-black-60 mb-1">LOCATION</p>
            <p className="text-2md px-8 font-medium">
                <IoLocationSharp
                    size={20}
                    style={{ color: "#E94444" }}
                    className="inline"
                />{" "}
                {singleElement?.jobListing?.jobLocation?.formattedAddress}
            </p>
            <section className="grid grid-cols-2 pb-4">
                <div>
                    <p className=" px-8 pt-6 text-2md text-black-60">
                        TASK TYPE
                    </p>
                    <p className="text-2md px-8 font-creatoMedium font-medium">
                        {singleElement?.jobListing?.jobType?.name}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className=" px-8 pt-6 text-2md text-black-60">
                        SHIFT METHOD
                    </p>
                    {singleElement?.jobListing?.jobMeetingPoint === "DEPOT" ? (
                        <p className="text-2md ml-4 px-3 font-creatoMedium font-medium bg-yellow-100 rounded-full w-fit py-1">
                            DEPOT FIRST
                        </p>
                    ) : (
                        <p className="text-2md ml-4 px-3 font-creatoMedium font-medium bg-yellow-100 rounded-full py-1 mt-1 w-fit">
                            MEET ONSITE
                        </p>
                    )}
                </div>
                <div>
                    <p className=" px-8 pt-6 text-2md text-black-60">
                        CERTIFICATION
                    </p>
                    <p className="text-2md px-8 font-creatoMedium font-medium">
                        {singleElement?.jobListing?.jobQualification?.name}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className=" px-8 pt-6 text-2md text-black-60">
                        SHIFT DATE
                    </p>
                    <p className="text-2md px-8 font-creatoMedium font-medium">
                        {dayjs(singleElement?.jobListing?.jobDate).format(
                            "MMMM D, YYYY"
                        )}
                    </p>
                </div>
                {/* <div>
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
                            singleElement?.jobListing
                                ?.shiftEndTime
                        ).format("h:mm A")}{" "}
                        )
                    </p>
                </div> */}
            </section>
            <div className="flex gap-4 bg-black-100 text-white-100 p-4 mt-3 mb-8 mx-8 rounded-lg">
                <div className="w-1/2">
                    <div>
                        <h6 className="text-2lg font-creato w-fit">
                            Punctuality
                        </h6>
                        <p>
                            <AiFillStar
                                size={30}
                                style={{ color: "#FED70A" }}
                                className="inline"
                            />
                            <span className="text-2xl font-extrabold font-creatoBold">
                                {singleElement?.operative?.averageRating}
                            </span>
                            <span className="text-3sm">
                                {" "}
                                ({
                                    singleElement?.operative?.completedShifts
                                }{" "}
                                shifts)
                            </span>
                        </p>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex justify-between place-items-center mb-2">
                        <p className="text-md font-medium font-creatoMedium">
                            Professionalism
                        </p>
                        {Number(
                            singleElement?.operativeRatingSummary
                                ?.avgProfessionalismScore
                        ) <= 2 ? (
                            <Progress
                                value={
                                    (Number(
                                        singleElement?.operativeRatingSummary
                                            ?.avgProfessionalismScore
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
                                        singleElement?.operativeRatingSummary
                                            ?.avgProfessionalismScore
                                    ) /
                                        5) *
                                    100
                                }
                                color="#4DB25D"
                                className="w-[50%]"
                            />
                        )}
                    </div>
                    <div className="flex justify-between place-items-center mb-2">
                        <p className="text-md font-medium font-creatoMedium">
                            Punctuality
                        </p>
                        {Number(
                            singleElement?.operativeRatingSummary
                                ?.avgPunctualityScore
                        ) <= 2 ? (
                            <Progress
                                value={
                                    (Number(
                                        singleElement?.operativeRatingSummary
                                            ?.avgPunctualityScore
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
                                        singleElement?.operativeRatingSummary
                                            ?.avgPunctualityScore
                                    ) /
                                        5) *
                                    100
                                }
                                color="#4DB25D"
                                className="w-[50%]"
                            />
                        )}
                    </div>
                    <div className="flex justify-between place-items-center mb-2">
                        <p className="text-md font-medium font-creatoMedium">
                            Helpfulness
                        </p>
                        {Number(
                            singleElement?.operativeRatingSummary
                                ?.avgHelpfulnessScore
                        ) <= 2 ? (
                            <Progress
                                value={
                                    (Number(
                                        singleElement?.operativeRatingSummary
                                            ?.avgHelpfulnessScore
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
                                        singleElement?.operativeRatingSummary
                                            ?.avgHelpfulnessScore
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
        </Modal>
    )
}

export default OperativeProfile
