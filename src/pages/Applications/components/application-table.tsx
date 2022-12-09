import { Table } from "@mantine/core"
import { Data } from "../interface"
import { HiChevronRight } from "react-icons/hi"
import Avatar from "../assets/avatar.svg"
import Star from "../assets/star.svg"
import dayjs from "dayjs"
import { BiUpArrowAlt } from "react-icons/bi"
import { BsArrowDownShort } from "react-icons/bs"
import { IoIosArrowForward } from "react-icons/io"
import { useEffect, useState } from "react"

interface Prop {
    // status?: "pending" | "accepted" | "rejected" ;
    elements: Data[]
    setPhase: (val: number) => void

    setActiveId: (val: string) => void
}
const ApplicationTable = ({ elements, setPhase, setActiveId }: Prop) => {
    const [orderState, setOrderState] = useState(false)
    useEffect(() => {
        elements.sort((a, b) => {
            return a.jobMatchPercentage > b.jobMatchPercentage
                ? -1
                : a.jobMatchPercentage < b.jobMatchPercentage
                ? 1
                : 0
        })
    }, [])

    const descending = () => {
        setOrderState((state) => !state)
        elements.sort((a, b) => {
            return a.jobMatchPercentage > b.jobMatchPercentage
                ? -1
                : a.jobMatchPercentage < b.jobMatchPercentage
                ? 1
                : 0
        })
    }
    const ascending = () => {
        setOrderState((state) => !state)
        elements.sort((a, b) => {
            return a.jobMatchPercentage > b.jobMatchPercentage
                ? 1
                : a.jobMatchPercentage < b.jobMatchPercentage
                ? -1
                : 0
        })
    }
    const rows = elements.map((item, index) => (
        <tr key={index}>
            <td className="flex">{index}</td>
            <td>
                <p className="flex">
                    <img src={Avatar} alt="" />
                    <span className="pl-2">
                        {item.user.firstName + " " + item.user.lastName}
                    </span>
                </p>
            </td>

            <td>{item.jobListing.jobType.name}</td>
            <td>{item.jobListing.jobQualification.name}</td>
            <td className="text-green-100 font-medium">
                {item.jobMatchPercentage}%
            </td>
            <td>
                <p className="flex">
                    <img src={Star} alt="" />
                    <span className="pl-1">{item.user.averageRating}</span>
                </p>
            </td>
            <td>{dayjs(item.createdAt).format("MMM D, YYYY")}</td>
            <td>{dayjs(item.createdAt).format("h:mm A")}</td>
            <td
                className="cursor-pointer"
                data-testid="view_application"
                onClick={
                    () => {
                        setActiveId(item._id)
                        setPhase(2)
                    }
                    // navigate(`/applications/${item._id}`)
                }
            >
                <HiChevronRight size={30} style={{ color: "#889088" }} />
            </td>
        </tr>
    ))

    const tableHead = [
        "NO",
        "name",
        "job Type",
        "Qualification",
        "match",
        "rating",
        "date Applied",
        "time Applied",
        "",
    ]
    return (
        <>
            <div className="hidden lg:block ">
                <Table verticalSpacing="md">
                    <thead>
                        <tr>
                            {tableHead.map((item, index) =>
                                item === "match" ? (
                                    <>
                                        <th
                                            key={index}
                                            style={{
                                                color: "rgba(15, 13, 0, 0.3)",
                                                fontSize: "13px",
                                                borderBottom: "none",
                                            }}
                                            className="text-black-30"
                                        >
                                            <div className="flex">
                                                <span>
                                                    {item.toUpperCase()}
                                                </span>
                                                <BiUpArrowAlt
                                                    size={20}
                                                    onClick={
                                                        !orderState
                                                            ? ascending
                                                            : () => {}
                                                    }
                                                    color={
                                                        orderState
                                                            ? "rgba(15, 13, 0, 0.9)"
                                                            : "rgba(15, 13, 0, 0.3)"
                                                    }
                                                    className={`${
                                                        orderState
                                                            ? "bg-yellow-100"
                                                            : ""
                                                    } rounded-[50px] ml-2 ${
                                                        !orderState
                                                            ? "cursor-pointer"
                                                            : "cursor-disable"
                                                    }`}
                                                />
                                                <BsArrowDownShort
                                                    size={20}
                                                    onClick={
                                                        orderState
                                                            ? descending
                                                            : () => {}
                                                    }
                                                    color={
                                                        !orderState
                                                            ? "rgba(15, 13, 0, 0.9)"
                                                            : "rgba(15, 13, 0, 0.3)"
                                                    }
                                                    className={`${
                                                        !orderState
                                                            ? "bg-yellow-100"
                                                            : ""
                                                    } rounded-[50px] ml-2 ${
                                                        orderState
                                                            ? "cursor-pointer"
                                                            : "cursor-disable"
                                                    }`}
                                                />
                                            </div>
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th
                                            key={index}
                                            style={{
                                                color: "rgba(15, 13, 0, 0.3)",
                                                fontSize: "13px",
                                                borderBottom: "none",
                                            }}
                                            className="text-black-30"
                                        >
                                            {item.toUpperCase()}
                                        </th>
                                    </>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden mt-4">
                {elements.map((item, index) => (
                    <div
                        className="rounded bg-black-5 mb-4 pb-4 cursor-pointer"
                        key={index}
                        onClick={() => {
                            setActiveId(item._id)
                            setPhase(2)
                        }}
                    >
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <p className="font-medium text-2lg">
                                {item.user.firstName + " " + item.user.lastName}
                            </p>
                            <IoIosArrowForward
                                size={20}
                                style={{ color: "#889088" }}
                            />
                        </div>
                        <div className="flex justify-between w-full px-4">
                            <div>
                                <div className="mt-2">
                                    <h6 className="text-black-50 text-3sm">
                                        JOB TYPE
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {item.jobListing.jobType.name}
                                    </p>
                                </div>

                                <div className="mt-2">
                                    <h6 className="text-black-50 text-3sm">
                                        QUALIFICATION
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {item.jobListing.jobQualification.name}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        DATE APPLIED
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {dayjs(item.createdAt).format(
                                            "MMM D, YYYY"
                                        ) +
                                            ", " +
                                            dayjs(item.createdAt).format(
                                                "h:mm A"
                                            )}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        MATCH
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {item.jobMatchPercentage}%
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        RATING
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {item.user.averageRating}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ApplicationTable
