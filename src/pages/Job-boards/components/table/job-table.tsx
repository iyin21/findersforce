import { Table } from "@mantine/core"
import { Checkbox } from "../../../../components/index"
import { IoIosArrowForward } from "react-icons/io"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import MobileJobTable from "./mobile-table"
import { JobBoardResponseInterface } from "../../../../types/job-board/interface"
import dayjs from "dayjs"
import { Dispatch, SetStateAction, useState } from "react"

export interface JobBoardInterface {
    status: "active" | "draft"
    handleCheckedJob: (e: React.ChangeEvent<HTMLInputElement>) => void
    checkedJob: string[]
    elements: JobBoardResponseInterface[] | undefined
    setDeleteId: (id: string) => void
    setOpenJobPost: Dispatch<SetStateAction<boolean>>
    setDraftStatus: Dispatch<SetStateAction<string>>
    setdraftElement: Dispatch<SetStateAction<JobBoardResponseInterface | null>>
}

const JobBoardTable = ({
    elements,
    status,
    handleCheckedJob,
    checkedJob,
    setDeleteId,
    setOpenJobPost,
    setDraftStatus,
    setdraftElement,
}: JobBoardInterface) => {
    // this navigate function is used to navigate to the single job board page
    const navigate = useNavigate()
    const handleNavigate = (id: string, element: JobBoardResponseInterface) => {
        if (status === "active") {
            navigate(`/job-boards/${id}`)
        } else {
            setOpenJobPost(true)
            setDraftStatus("draft")
            setdraftElement(element)
        }
    }

    const [orderState, setOrderState] = useState(false)
    const [wagesOrderState, setWagesOrderState] = useState(false)

    const descending = () => {
        setOrderState((state) => !state)
        elements?.sort((a, b) => {
            return a.applicationsCount > b.applicationsCount
                ? -1
                : a.applicationsCount < b.applicationsCount
                ? 1
                : 0
        })
    }
    const ascending = () => {
        setOrderState((state) => !state)
        elements?.sort((a, b) => {
            return a.applicationsCount > b.applicationsCount
                ? 1
                : a.applicationsCount < b.applicationsCount
                ? -1
                : 0
        })
    }

    const ascendingWages = () => {
        setWagesOrderState((state) => !state)
        elements?.sort((a, b) => {
            return a.jobRate?.jobRateMeetOnsiteDisplayedToDepot >
                b.jobRate?.jobRateMeetOnsiteDisplayedToDepot
                ? 1
                : a.jobRate?.jobRateMeetOnsiteDisplayedToDepot <
                  b.jobRate?.jobRateMeetOnsiteDisplayedToDepot
                ? -1
                : 0
        })
    }

    const descendingWages = () => {
        setWagesOrderState((state) => !state)
        elements?.sort((a, b) => {
            return a.jobRate?.jobRateMeetOnsiteDisplayedToDepot >
                b.jobRate?.jobRateMeetOnsiteDisplayedToDepot
                ? -1
                : a.jobRate?.jobRateMeetOnsiteDisplayedToDepot <
                  b.jobRate?.jobRateMeetOnsiteDisplayedToDepot
                ? 1
                : 0
        })
    }

    const rows = elements?.map((element, index) => (
        <tr key={index} onClick={() => handleNavigate(element?._id, element)}>
            <td>
                <div
                    className="flex items-center"
                    onClick={(e) => {
                        e.stopPropagation()
                        setDeleteId(element?._id)
                    }}
                >
                    <p className="pr-2">{index + 1}</p>
                    <Checkbox
                        id={element?.listingId}
                        className="rounded-lg"
                        name={element?.listingId}
                        onChange={handleCheckedJob}
                        checked={checkedJob.includes(element?._id)}
                        value={element?._id}
                        data-testid="checkbox"
                    />{" "}
                    {!element?.listingId ? (
                        <span className=" rounded-full bg-black-10 p-2 w-full h-full"></span>
                    ) : (
                        <label
                            htmlFor={element?.listingId}
                            className="capitalize"
                        >
                            {element?.listingId}
                        </label>
                    )}
                </div>
            </td>
            <td>{element?.jobLocation?.formattedAddress}</td>
            <td>
                {dayjs(element?.jobDate).format("DD/MM/YYYY")} |{" "}
                {dayjs(element?.jobDate).format("hh:mm ")}
            </td>
            <td>
                {element?.jobRate?.currency}

                {element?.jobMeetingPoint === "SITE" ? (
                    <span>
                        {element?.jobRate?.jobRateMeetOnsiteDisplayedToDepot}
                    </span>
                ) : (
                    <span>
                        {element?.jobRate?.jobRateDepotFirstDisplayedToDepot}
                    </span>
                )}

                {element?.jobRate?.jobRatePerHourDisplayedToDepot}
            </td>
            {/* <td>{element?.shiftDurationInHours} hours</td> */}
            {status === "active" && <td>{element?.applicationsCount}</td>}
            <td>
                {element?.jobMeetingPoint === "SITE" ? (
                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoMedium">
                        MEET ONSITE
                    </p>
                ) : (
                    <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                        DEPOT FIRST
                    </p>
                )}
            </td>
            <td>
                <IoIosArrowForward size={30} style={{ color: "#889088" }} />
            </td>
        </tr>
    ))

    const tableHead = [
        { list: "LOCATION" },
        { list: "DATE" },
        // { list: "WAGES" },
        // { list: "DURATION" },
    ]

    return (
        <>
            <div className="hidden lg:block " data-testid="job_board">
                <Table
                    style={{
                        backgroundColor: "#FFFFFF",
                        fontFamily: "CreatoDisplay",
                    }}
                    className={"table"}
                    verticalSpacing="md"
                    data-testid="table-data"
                    role="grid"
                >
                    <thead>
                        <tr>
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                                className="flex items-center gap-2 "
                            >
                                <Checkbox />
                                <p className="text-black-30 "> SHIFT </p>
                            </th>

                            {tableHead.map((item, index) => (
                                <th
                                    key={index}
                                    style={{
                                        borderBottom: "none",
                                    }}
                                >
                                    <p className="text-black-30 ">
                                        {item?.list}
                                    </p>
                                </th>
                            ))}
                            {status === "active" && (
                                <>
                                    <th
                                        style={{
                                            borderBottom: "none",
                                        }}
                                        onClick={() => {
                                            wagesOrderState
                                                ? ascendingWages()
                                                : descendingWages()
                                        }}
                                    >
                                        <div className="flex items-center gap-2 ">
                                            <p className="text-black-30 ">
                                                WAGES
                                            </p>{" "}
                                            {wagesOrderState ? (
                                                <AiOutlineArrowDown color="rgba(15, 13, 0, 0.3)" />
                                            ) : (
                                                <AiOutlineArrowUp color="rgba(15, 13, 0, 0.3)" />
                                            )}
                                        </div>
                                    </th>

                                    <th
                                        style={{
                                            borderBottom: "none",
                                        }}
                                        onClick={() => {
                                            orderState
                                                ? ascending()
                                                : descending()
                                        }}
                                    >
                                        <div className="flex items-center gap-2 ">
                                            <p className="text-black-30 ">
                                                APPLICANTS
                                            </p>{" "}
                                            {orderState ? (
                                                <AiOutlineArrowDown color="rgba(15, 13, 0, 0.3)" />
                                            ) : (
                                                <AiOutlineArrowUp color="rgba(15, 13, 0, 0.3)" />
                                            )}
                                        </div>
                                    </th>
                                </>
                            )}
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                            >
                                <p className="text-black-30 ">MODE</p>
                            </th>
                        </tr>
                    </thead>

                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden">
                <MobileJobTable
                    handleCheckedJob={handleCheckedJob}
                    elements={elements}
                    status={status}
                    checkedJob={checkedJob}
                    setDeleteId={setDeleteId}
                    setOpenJobPost={setOpenJobPost}
                    setDraftStatus={setDraftStatus}
                    setdraftElement={setdraftElement}
                />
            </div>
        </>
    )
}

export default JobBoardTable
