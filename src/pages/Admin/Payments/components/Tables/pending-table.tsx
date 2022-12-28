import { Table } from "@mantine/core"
import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"
import Star from "../../../../Applications/assets/star.svg"
import { Result } from "../../../../../types/planner/interfaces"

interface Prop {
    elements: Result[]
    setPhase: (val: number) => void
}
const PendingTable = ({ elements, setPhase }: Prop) => {
    const rows = elements.map((item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                <span className="pl-2 font-creato text-lg">
                    {item.operative.firstName + " " + item.operative.lastName}
                </span>
            </td>
            <td>
                <p className="text-lg font-creato font-bold">
                    {item.jobListing.jobQualification.name}
                </p>
            </td>

            <td>
                <p className="text-lg font-creato">
                    {dayjs(item.createdAt).format("MMM D, YYYY") +
                        " | " +
                        dayjs(item.createdAt).format("h:mm A")}
                </p>
            </td>
            <td>
                <span className="text-lg font-creato">
                    {item.jobListing.jobRate.currency +
                        item.jobListing.jobRate.jobRatePerHourDisplayedToOp}
                </span>
                <span className="text-lg font-creato text-black-60">/hour</span>
            </td>
            <td>
                <p className="text-lg font-creato">
                    {dayjs(item.createdAt).format("h:mm A")}
                </p>
            </td>
            <td>
                <p className="flex">
                    <img src={Star} alt="" />
                    <span className="pl-1">
                        {item?.depotRating?.averageScore || 0}
                    </span>
                </p>
            </td>
        </tr>
    ))

    const tableHead = [
        "no",
        "operative",
        "qualification",
        "schedule",
        "amount",
        "clock-in",
        "ratings",
    ]
    return (
        <>
            <div className="hidden lg:block ">
                <Table verticalSpacing="md">
                    <thead>
                        <tr>
                            {tableHead.map((item, index) => (
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
                            ))}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden mt-4">
                {elements.map((item: Result, index) => (
                    <div
                        className="rounded bg-black-5 mb-4 pb-4 cursor-pointer"
                        key={index}
                        onClick={() => {
                            setPhase(2)
                        }}
                    >
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <p className="font-medium text-2lg">
                                {item.operative.firstName +
                                    " " +
                                    item.operative.lastName}
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
                                        EMAIL
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {"item.email"}
                                    </p>
                                </div>

                                <div className="mt-2">
                                    <h6 className="text-black-50 text-3sm">
                                        GENDER
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {"item.gender"}
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
                                        QUALIFICATION
                                    </h6>
                                    <p className="text-2md mt-1">{}</p>
                                </div>

                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        SHIFT COMPLETED
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {"item.completedShifts"}
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
export default PendingTable
