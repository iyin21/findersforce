import SendImg from "../assets/images/send.svg"
import { useGetSingleComplaint } from "../hooks/support.hook"
import { CgSpinner } from "react-icons/cg"
import { HiArrowLeft } from "react-icons/hi"
import useAuthContext from "../../../hooks/auth-hooks/useAuth"
import dayjs from "dayjs"
import { useUpdateComplaintComment } from "../hooks/support.hook"
import { useState, useEffect } from "react"
import { showNotification } from "@mantine/notifications"

interface SingleComplaintProp {
    setPhase: (val: number) => void
    activeId: string
}
const SingleComplaint = ({ setPhase, activeId }: SingleComplaintProp) => {
    const { data, isLoading, refetch } = useGetSingleComplaint({
        id: activeId || "",
    })

    const [message, setMessage] = useState("")
    const {
        data: updateComplaintResponse,
        mutate,
        isLoading: isUpdatingComplaintComment,
    } = useUpdateComplaintComment({ id: activeId })
    const { state } = useAuthContext()

    const handleClick = () => {
        mutate({
            message: message,
        })
    }

    useEffect(() => {
        if (updateComplaintResponse) {
            showNotification({
                title: "Success",
                message: updateComplaintResponse.message,
                color: "green",
            })
            refetch()
            setMessage("")
        }
    }, [updateComplaintResponse])
    const issues = data?.complaintIssues.map((item) => item)
    return (
        <>
            {isLoading ? (
                <div className="h-screen w-full flex mt-24 justify-center">
                    <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                </div>
            ) : (
                <div className="mt-2">
                    <span
                        onClick={() => setPhase(1)}
                        className="p-3 rounded inline-flex items-center justify-center bg-black-10 cursor-pointer"
                        aria-hidden="true"
                    >
                        <HiArrowLeft className="text-2lg" />
                    </span>
                    <p className="text-lg font-medium mt-2">COMPLAINT</p>
                    <h5 className="font-medium text-2xl pt-2">
                        {data?.complaintCategory}
                    </h5>
                    <p className="text-2md mt-2 font-medium">
                        {issues?.join(" ")}
                    </p>
                    <p className="text-black-60 body-regular mt-2 mb-1">
                        Ticket ID: {data?.complaintId}
                    </p>
                    <div className="grid grid-cols-2 ">
                        <div className="border border-black-5 border-l-0 ">
                            <div className="overflow-y-auto h-[400px] relative pr-2">
                                <div className="mt-4 bg-pink p-4 rounded">
                                    <p className="text-black-60 body-regular">
                                        Description
                                    </p>
                                    <p className="text-black-90 text-md mt-2 mb-10">
                                        {data?.description}
                                    </p>
                                </div>
                                <div className="mb-36">
                                {data?.messages.map((item, index) => (
                                    <div
                                        className="bg-black-5 mt-8 ml-6 rounded-[20px] p-4"
                                        key={index}
                                    >
                                        <div className="flex justify-between">
                                            <p
                                                className={`${
                                                    item.user._id ===
                                                    state.user?._id
                                                        ? "text-blue-90"
                                                        : "text-red-190"
                                                } body-small`}
                                            >
                                                {item.user._id ===
                                                state.user?._id
                                                    ? item.user.firstName +
                                                      " " +
                                                      item.user.lastName
                                                    : "Admin"}
                                            </p>
                                            {/* <p className="text-black-40 text-md">
                                                Reply
                                            </p> */}
                                        </div>
                                        <p className="mt-2 text-black-90 text-md">
                                            {item.message}
                                        </p>
                                        <p className="text-black-40 text-md flex justify-end mt-2">
                                            {dayjs(item.createdAt).format(
                                                "h:mm A"
                                            )}
                                        </p>
                                    </div>
                                ))}
                                </div>
                                
                            </div>

                            <div className="fixed bottom-0  w-[39.8%] border border-[#F5F5F5] shadow-lg shadow-inherit pl-2  h-14 items-center flex justify-between   bg-white-100">
                                <input
                                    type="text"
                                    placeholder="Write a message"
                                    className="focus:outline-none w-full mr-2"
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.currentTarget.value)
                                    }
                                />
                                <button
                                    className="mr-8 border-none"
                                    onClick={() => handleClick()}
                                    disabled={isLoading}
                                >
                                    {isUpdatingComplaintComment ? (
                                        <CgSpinner className="animate-spin text-primary-90 text-3xl" />
                                    ) : (
                                        <img src={SendImg} alt="" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="pl-20">
                            <div className="flex">
                                {data?.image && (
                                    <img
                                        src={data.image}
                                        alt=""
                                        className="rounded "
                                    />
                                )}

                                {/* <img src={FruitImg} alt="" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SingleComplaint
