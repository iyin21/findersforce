import { Modal, Progress } from "@mantine/core"
import dayjs from "dayjs"
import { AiFillStar } from "react-icons/ai"
import { FaTimes } from "react-icons/fa"
import { TfiLocationPin } from "react-icons/tfi"
import Message from "../../../assets/Messaging.svg"
import { Dispatch, SetStateAction } from "react"
import { useGetSingleSchedule } from "../../../hooks/planner/usePlanner.hooks"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

interface Props {
    openProfile: boolean
    setOpenProfile: Dispatch<SetStateAction<boolean>>
    operativeData: any
    operativeId: string
    jobListingId: string | undefined
}

const OperativeProfile = ({
    openProfile,
    setOpenProfile,
    operativeData,
    operativeId,
    jobListingId,
}: Props) => {
    const { data: singleElement } = useGetSingleSchedule({
        operativeId: operativeId,
        jobListingId: jobListingId,
    })
    return (
        <Modal
            centered
            opened={openProfile}
            onClose={() => setOpenProfile(false)}
            withCloseButton={false}
            overlayOpacity={0.55}
            overlayBlur={3}
            padding={0}
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            // styles={() => ({
            //     modal: {
            //         width: "580px",
            //     },
            // })}
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
                        onClick={() => setOpenProfile(!openProfile)}
                    />
                </div>
            </header>
            <div className="flex justify-between bg-yellow-20 p-5 mt-8 w-[90%] mx-auto rounded-lg">
                <div className="flex gap-5">
                    <img
                        src={
                            singleElement?.results?.[0]?.operative
                                ?.profileImageUrl
                        }
                        alt="profile"
                        className="mt-3 w-10 h-10 rounded-[100%]"
                    />
                    <div>
                        <p className="text-sm">OPERATIVE</p>
                        <p className="font-extrabold font-creatoBold text-lg">
                            {singleElement?.results?.[0]?.operative?.firstName}{" "}
                            {singleElement?.results?.[0]?.operative?.lastName}
                        </p>
                        <p className="text-sm font-creato">
                            Joined{" "}
                            {dayjs(
                                singleElement?.results?.[0]?.operative
                                    ?.createdAt
                            ).fromNow()}
                            <span className="text-green-100">
                                {" "}
                                {
                                    singleElement?.results?.[0]?.jobListing
                                        ?.jobMatchPercentage
                                }
                                % Match
                            </span>
                        </p>
                    </div>
                </div>
                <div>
                    <img src={Message} alt="message icon" className="inline p-1" />
                    <p className="inline font-bold font-creatoBold text-md">
                        Message{" "}
                        {singleElement?.results?.[0]?.operative?.firstName}
                    </p>
                </div>
            </div>
            <div className="flex gap-4 bg-yellow-10 p-2 mt-8 w-[90%] mx-auto rounded-lg">
                <div className="w-[20%]">
                    <div>
                        <p className="text-2md font-creato w-fit">Rating</p>
                        <p>
                            {operativeData?.avgAverageScore}{" "}
                            <AiFillStar
                                size={20}
                                style={{ color: "#FED70A" }}
                            />
                        </p>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex justify-between place-items-center">
                        <p className="text-md font-medium font-creatoMedium">
                            Professionalism
                        </p>
                        {Number(operativeData?.avgProfessionalismScore) <= 2 ? (
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
                        <p className="text-md font-medium font-creatoMedium">
                            Punctuality
                        </p>
                        {Number(operativeData?.avgHelpfulnessScore) <= 2 ? (
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
                        <p className="text-md font-medium font-creatoMedium">
                            Helpfulness
                        </p>
                        {Number(operativeData?.avgOrganizationScore) <= 2 ? (
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
            <p className=" px-8 pt-6 text-2md text-black-60">LOCATION</p>
            <p className="text-2md px-8 font-medium">
                <TfiLocationPin
                    size={20}
                    style={{ color: "#E94444" }}
                    className="inline"
                />{" "}
                {
                    singleElement?.results?.[0]?.jobListing?.jobLocation
                        ?.formattedAddress
                }
            </p>
            <section className="grid grid-cols-2 pb-4">
                <div>
                    <p className=" px-8 pt-6 text-2md text-black-60">
                        TASK TYPE
                    </p>
                    <p className="text-2md px-8 font-creatoMedium font-medium">
                        {singleElement?.results?.[0]?.jobListing?.jobType?.name}
                    </p>
                </div>
                <div>
                    <p className=" px-8 pt-6 text-2md text-black-60">
                        TASK METHOD
                    </p>
                    <p className="text-2md ml-4 px-8 font-creatoMedium font-medium bg-yellow-100 rounded-3xl w-fit">
                        {
                            singleElement?.results?.[0]?.jobListing
                                ?.jobMeetingPoint
                        }
                    </p>
                </div>
                <div>
                    <p className=" px-8 pt-6 text-2md text-black-60">
                        CERTIFICATION
                    </p>
                    <p className="text-2md px-8 font-creatoMedium font-medium">
                        {
                            singleElement?.results?.[0]?.jobListing
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
                            singleElement?.results?.[0]?.jobListing?.jobDate
                        ).format("MMMM D, YYYY")}
                    </p>
                </div>
                <div>
                    <p className=" px-8 pt-6 text-2md text-black-60">
                        SHIFT DURATION
                    </p>
                    <p className="text-2md px-8 font-creatoMedium font-medium">
                        {
                            singleElement?.results?.[0]?.jobListing
                                ?.shiftDurationInHours
                        }{" "}
                        Hour(s) (
                        {dayjs(
                            singleElement?.results?.[0]?.jobListing
                                ?.shiftStartTime
                        ).format("h:mm A")}{" "}
                        -{" "}
                        {dayjs(
                            singleElement?.results?.[0]?.jobListing
                                ?.shiftEndTime
                        ).format("h:mm A")}{" "}
                        )
                    </p>
                </div>
            </section>
        </Modal>
    )
}

export default OperativeProfile
