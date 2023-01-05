import { Table } from "@mantine/core"
// import { Data } from "src/pages/Applications/interface"
import { Result } from "../../../interface"
import Star from "../../../assets/star.svg"
import dayjs from "dayjs"

interface Prop {
    elements: Result[]
}
const ShiftTable = ({ elements }: Prop) => {
    const rows = elements.map((item, index) => (
        <tr key={index} className="font-creato">
            <td>{dayjs(item?.createdAt).format("MMM D, YYYY")}</td>
            <td>{item?.jobListing?.jobLocation?.formattedAddress}</td>
            <td>{dayjs(item.jobListing?.shiftStartTime).format("h:mm A")}</td>
            <td>{dayjs(item?.jobListing?.shiftEndTime).format("h:mm A")}</td>
            <td>{item?.jobListing?.shiftDurationInHours}</td>
            <td>
                $
                {item?.jobListing?.jobRate.jobRatePerHourDisplayedToDepot *
                    item?.jobListing?.shiftDurationInHours}
                /hr
            </td>
            <td>
                <p className="flex">
                    <img src={Star} alt="" />
                    <span className="pl-1">
                        {item?.depotRating?.averageScore || 0}
                    </span>
                </p>
            </td>
            <td>
                <p className="text-white-100 bg-green-100 pl-1.5 py-1 rounded-full w-20">
                    completed
                </p>
            </td>
        </tr>
    ))

    const tableHead = [
        "Date",
        "Location",
        "Time in",
        "Time out",
        "Duration",
        "Amount",
        "Rating",
        "Status",
    ]
    return (
        <>
            <div className="hidden lg:block ">
                <Table
                    verticalSpacing="md"
                    style={{
                        backgroundColor: "#FFFFFF",
                        fontFamily: "CreatoDisplay",
                    }}
                >
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
                    <tbody> {rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden mt-4">
                {elements.map((item, index) => (
                    <div
                        className="rounded bg-black-5 mb-4 pb-4 cursor-pointer font-creato"
                        key={index}
                    >
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    LOCATION
                                </h6>
                                <p className="font-medium text-2lg">
                                    {
                                        item?.jobListing?.jobLocation
                                            ?.formattedAddress
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-2md bg-green-100 p-2 rounded-full">
                                    completed
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between w-full px-4">
                            <div>
                                <div className="mt-2">
                                    <h6 className="text-black-50 text-3sm">
                                        TIME IN
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {item?.jobListing?.shiftStartTime}
                                    </p>
                                </div>

                                <div className="mt-2">
                                    <h6 className="text-black-50 text-3sm">
                                        TIME OUT
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {dayjs(
                                            item?.jobListing?.shiftEndTime
                                        ).format("h:mm A")}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        DURATION
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {item?.jobListing?.shiftDurationInHours}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        AMOUNT
                                    </h6>
                                    <p className="text-2md mt-1">
                                        $
                                        {item?.jobListing?.jobRate
                                            .jobRatePerHourDisplayedToDepot *
                                            item?.jobListing
                                                ?.shiftDurationInHours}
                                        /hr
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        RATING
                                    </h6>

                                    <p className="flex text-2md mt-1">
                                        <img src={Star} alt="" />
                                        <span className="pl-1">
                                            {item?.depotRating?.averageScore ||
                                                0}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        DATE
                                    </h6>

                                    <p className="text-2md mt-1">
                                        {dayjs(item?.createdAt).format(
                                            "MMM D, YYYY"
                                        )}
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
export default ShiftTable
