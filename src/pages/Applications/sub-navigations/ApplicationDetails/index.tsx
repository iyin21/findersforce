import { HiArrowLeft } from "react-icons/hi"
import { HiChevronRight } from "react-icons/hi"
import Avatar from "../../assets/avatar.png"
import Resume from "../../assets/resume.svg"
// import Google from "../../assets/google.svg"
import { BsCheck, BsX } from "react-icons/bs"
// import Download from "../../assets/downloadIcon.svg"
import View from "../../assets/view.svg"
import Message from "../../assets/message.svg"
import CheckedIcon from "../../assets/check.svg"
import UnverifiedIcon from "../../assets/unverified.svg"

import {
    useGetApplicationDetails,
    useUpdateApplication,
} from "../../hooks/application.hook"
import dayjs from "dayjs"
import { CgSpinner } from "react-icons/cg"
import { useEffect } from "react"
import { showNotification } from "@mantine/notifications"

interface Prop {
    // status?: "pending" | "accepted" | "rejected" ;

    setPhase: (val: number) => void

    activeId: string
    setShiftId: (val: string) => void
}
const ApplicationDetails = ({ setPhase, activeId, setShiftId }: Prop) => {
    // const { applicationId } = useParams<{ applicationId: string }>()

    const { data, isLoading } = useGetApplicationDetails({
        id: activeId || "",
    })
    const {
        data: acceptedData,
        isLoading: isLoadingAcceptedData,
        mutate: acceptMutate,
    } = useUpdateApplication({ id: activeId || "" })
    const {
        data: rejectedData,
        isLoading: isLoadingRejectedData,
        mutate: rejectMutate,
    } = useUpdateApplication({ id: activeId || "" })
    const handleAccept = () => {
        acceptMutate({ status: "WON" })
    }
    const handleReject = () => {
        rejectMutate({ status: "LOST" })
    }
    useEffect(() => {
        if (rejectedData || acceptedData) {
            showNotification({
                title: "Success",
                message: `Application has been ${
                    rejectedData ? "rejected" : "accepted"
                } successfully`,
                color: "green",
            })
            setPhase(1)
        }
    }, [rejectedData, acceptedData])

    return (
        <>
            {isLoading ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <div className="pt-4 px-6">
                    <span
                        onClick={() => setPhase(1)}
                        className="p-3 rounded inline-flex items-center justify-center bg-black-10 cursor-pointer"
                        aria-hidden="true"
                    >
                        <HiArrowLeft className="text-2lg" />
                    </span>
                    <div className="pt-4 lg:flex justify-between px-4 lg:px-0">
                        <div className="lg:flex">
                            <div className="flex justify-between">
                                <img
                                    src={data?.user.profileImageUrl || Avatar}
                                    className="rounded-full  h-14 w-14"
                                    alt="profile"
                                />
                                <button className="bg-green-10 p-2 lg:mr-4 flex text-green-100 font-bold items-center  rounded rounded-tr-2xl lg:hidden block">
                                    <img
                                        src={Message}
                                        alt=""
                                        className="mr-2"
                                    />
                                    Message
                                </button>
                            </div>

                            <div className="lg:pl-4 ">
                                <div className="flex justify-between mt-2 lg:mt-0">
                                    <h5 className="font-bold">
                                        {" "}
                                        {data?.user.firstName +
                                            " " +
                                            data?.user.lastName}
                                    </h5>
                                    {/* <p
                                // href={`/applications/${applicationId}/${data?.user._id}`}
                                className="flex ml-4  items-center font-bold cursor-pointer"
                                onClick={
                                    () => {
                                        setShiftId(data?.user._id || "")
                                        setPhase(3)
                                    }
                                    //navigate(`/applications/${item._id}`)
                                }
                            >
                                View shift history
                                <HiChevronRight size="25px" />{" "}
                            </p> */}
                                </div>

                                <p className="text-black-70">
                                    Joined{" "}
                                    {dayjs(data?.user.createdAt).fromNow()}
                                    <span className="text-black-10 pl-1">
                                        |
                                    </span>
                                    <span className="text-green-100 pl-1 font-bold">
                                        {data?.jobMatchPercentage}% Match
                                    </span>
                                </p>
                            </div>
                        </div>
                        {data?.status === "PENDING" && (
                            <div className="flex justify-between lg:hidden block mt-2 ">
                                <button
                                    className="bg-red-10 lg:py-4 py-2 rounded rounded-tr-2xl flex items-center font-bold body-medium px-10"
                                    onClick={() => handleReject()}
                                    disabled={
                                        isLoadingAcceptedData ||
                                        isLoadingRejectedData
                                    }
                                >
                                    <BsX size="30px" color="red" />
                                    {isLoadingRejectedData
                                        ? "Loading.."
                                        : "Reject"}
                                </button>
                                <button
                                    className="bg-green-100 lg:py-4 py-2  flex text-white-100 items-center rounded rounded-tr-2xl font-bold body-medium px-6"
                                    onClick={() => handleAccept()}
                                    disabled={
                                        isLoadingAcceptedData ||
                                        isLoadingRejectedData
                                    }
                                >
                                    <BsCheck size="30px" color="white" />
                                    {isLoadingAcceptedData
                                        ? "Loading.."
                                        : "Approve"}
                                </button>
                            </div>
                        )}
                        {data?.status === "PENDING" ? (
                            <div className=" hidden lg:flex">
                                <button
                                    className="bg-red-10 p-4 rounded rounded-tr-2xl flex items-center font-bold body-medium px-6"
                                    onClick={() => handleReject()}
                                    disabled={
                                        isLoadingAcceptedData ||
                                        isLoadingRejectedData
                                    }
                                >
                                    <BsX size="30px" color="red" />
                                    {isLoadingRejectedData
                                        ? "Loading.."
                                        : "Reject"}
                                </button>
                                <button
                                    className="bg-green-100 p-4 ml-4 flex text-white-100 items-center rounded rounded-tr-2xl font-bold body-medium px-6"
                                    onClick={() => handleAccept()}
                                    disabled={
                                        isLoadingAcceptedData ||
                                        isLoadingRejectedData
                                    }
                                >
                                    <BsCheck size="30px" color="white" />
                                    {isLoadingAcceptedData
                                        ? "Loading.."
                                        : "Approve"}
                                </button>
                            </div>
                        ) : (
                            <div className=" items-center  hidden lg:flex">
                                <button className="bg-green-10 p-6 mr-4 flex text-green-100 font-bold items-center px-10 rounded rounded-tr-2xl">
                                    <img
                                        src={Message}
                                        alt=""
                                        className="mr-2"
                                    />
                                    Message {data?.user.firstName}
                                </button>
                                <p
                                    // href={`/applications/${applicationId}/${data?.user._id}`}
                                    className="flex ml-4 items-center font-bold cursor-pointer"
                                    onClick={
                                        () => {
                                            setShiftId(data?.user._id || "")
                                            setPhase(3)
                                        }
                                        // navigate(`/applications/${item._id}`)
                                    }
                                >
                                    View shift history
                                    <HiChevronRight size="25px" />{" "}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="lg:grid grid-cols-2 mt-4">
                        <div className="">
                            {data?.status === "PENDING" && (
                                <div className="items-center  hidden lg:flex">
                                    <button className="bg-green-10 p-6 mr-4 flex text-green-100 font-bold items-center px-10 rounded rounded-tr-2xl">
                                        <img
                                            src={Message}
                                            alt=""
                                            className="mr-2"
                                        />
                                        Message {data?.user.firstName}
                                    </button>
                                    <p
                                        // href={`/applications/${applicationId}/${data?.user._id}`}
                                        className="flex ml-4 items-center font-bold cursor-pointer"
                                        onClick={
                                            () => {
                                                setShiftId(data?.user._id || "")
                                                setPhase(3)
                                            }
                                            // navigate(`/applications/${item._id}`)
                                        }
                                    >
                                        View shift history
                                        <HiChevronRight size="25px" />{" "}
                                    </p>
                                </div>
                            )}

                            <div className="bg-pink mt-4 p-6 pb-12 rounded-[10px] hidden lg:block">
                                <div className="flex ">
                                    <div>
                                        <p className="body-medium text-black-50 pb-2 font-medium">
                                            QUALIFICATION
                                        </p>
                                        <p className="font-medium body-regular">
                                            {
                                                data?.jobListing
                                                    .jobQualification.name
                                            }
                                        </p>
                                    </div>
                                    <div className="ml-24">
                                        <p className="body-medium text-black-50 pb-2 font-medium">
                                            RATING
                                        </p>
                                        <p className="font-bold body-regular">
                                            {data?.user.averageRating}
                                            <span className="font-medium text-black-50 ">
                                                ({data?.completedShfts} shifts)
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-6 text-black-50 font-medium body-mediumn mb-2">
                                    PROFESSIONAL SUMMARY
                                </p>
                                <p>{data?.user.bio}</p>
                            </div>
                        </div>
                        <div className="pl-4 mt-4">
                            <div className="flex">
                                <div>
                                    <p className="body-medium text-black-50 pb-2 font-medium">
                                        DATE APPLIED
                                    </p>
                                    <p className="font-bold body-regular">
                                        {dayjs(data?.createdAt).format(
                                            "MMMM D YYYY"
                                        )}
                                        <span>|</span>{" "}
                                        {dayjs(data?.createdAt).format(
                                            "h:mm A"
                                        )}
                                    </p>
                                </div>
                                {/* <div>
                        <p>DATE ACCEPTED</p>
                        <h5>
                            December 09, 2022 <span>|</span> 09:33AM{" "}
                        </h5>
                    </div> */}
                            </div>
                            <div className="flex bg-black-100 p-6 rounded-[10px] justify-between  mt-4">
                                <div className="flex">
                                    <img src={Resume} alt="Resume" />
                                    <div className="pl-4">
                                        <p className="text-white-50 body-small pb-1">
                                            RESUME
                                        </p>
                                        <p className="text-white-100 font-bold :text-[14px] lg:text-[17px] pb-1">
                                            {data?.user.firstName +
                                                "-" +
                                                data?.user.lastName +
                                                "-Resume.pdf"}
                                        </p>
                                        <p className="text-white-50 body-extra-small">
                                            5.93 MB
                                        </p>
                                    </div>
                                </div>

                                <button className="rounded-md lg:p-4 lg:border border-white-100 flex items-center">
                                    <img src={View} alt="" />
                                    <a
                                        className="text-white-100 pl-2"
                                        href={data?.user.resumeUrl}
                                        target="_blank"
                                        // rel="noreferrer"
                                        // target="_blank"
                                        // rel="noopener noreferrer"

                                        download={`${
                                            data?.user.firstName +
                                            "-" +
                                            data?.user.lastName
                                        }.pdf`}
                                        rel="noreferrer"
                                    >
                                        View
                                    </a>
                                </button>
                            </div>
                            <div className="bg-pink mt-4 p-6 pb-12 rounded-[10px] lg:hidden block">
                                <div className="flex ">
                                    <div>
                                        <p className="body-medium text-black-50 pb-2 font-medium">
                                            QUALIFICATION
                                        </p>
                                        <p className="font-medium body-regular">
                                            {
                                                data?.jobListing
                                                    .jobQualification.name
                                            }
                                        </p>
                                    </div>
                                    <div className="ml-24">
                                        <p className="body-medium text-black-50 pb-2 font-medium">
                                            RATING
                                        </p>
                                        <p className="font-bold body-regular">
                                            {data?.user.averageRating}
                                            <span className="font-medium text-black-50 ">
                                                ({data?.completedShfts} shifts)
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-6 text-black-50 font-medium body-medium mb-2">
                                    PROFESSIONAL SUMMARY
                                </p>
                                <p>{data?.user.bio}</p>
                            </div>
                            <div className="my-4 p-4 border border-black-10 rounded-[10px]">
                                <p className="body-medium text-black-50 pb-2 font-medium">
                                    CERTIFICATIONS
                                </p>
                                {data?.certificates.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start mb-4 justify-between"
                                    >
                                        {/* <img src={Google} alt="" /> */}

                                        <div className="">
                                            <p className="font-bold body-normal">
                                                {item.name}
                                            </p>
                                            <p className="text-black-90 body-medium pb-1">
                                                {item.issuingOrganisation}
                                            </p>
                                            <p className="body-small text-black-70">
                                                Issued{" "}
                                                {dayjs(item.dateIssued).format(
                                                    "MM YYYY"
                                                )}
                                            </p>
                                            <p className="body-small text-black-70">
                                                Credential {item.credentialId}
                                            </p>
                                        </div>
                                        {item.status === "accepted" ? (
                                            <div className="flex bg-green-10 rounded-full p-2">
                                                <img src={CheckedIcon} alt="" />
                                                <p className="pl-2">Verified</p>
                                            </div>
                                        ) : (
                                            <div className="flex bg-red-10 rounded-full p-2">
                                                <img
                                                    src={UnverifiedIcon}
                                                    alt=""
                                                />
                                                <p className="pl-2">
                                                    Unverified
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ApplicationDetails
