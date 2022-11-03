import { Table } from "@mantine/core"
//import { Data } from "src/pages/Applications/interface"
import { Result } from "../../../interface"
import Star from "../../../assets/star.svg"
import dayjs from "dayjs"

interface Prop {
    elements: Result[]
    
}
const ShiftTable = ({ elements }: Prop) => {
    const tableData = [
        {
            date: "11 jan 2022",
            location: "Iolaire Road, New Invent...",
            timeIn: "11:01AM",
            timtout: "1:01AM",
            duration: "2 hrs 2 mins",
            amount: "$140/hr",
            rating: "4.9",
            status: "completed",
        },
    ]

    const rows = elements.map((item, index) => (
        <tr key={index}>
            <td>{dayjs(item?.createdAt).format("MMM D, YYYY")}</td>
            <td>{item?.jobListing.jobLocation.formattedAddress}</td>
            <td>{item.jobListing.shiftStartTime}</td>
            <td>{dayjs(item?.jobListing.shiftEndTime).format("h:mm A")}</td>
            <td>{item?.jobListing.shiftDurationInHours}</td>
            <td>${item.jobListing.jobRate.jobRatePerHourDisplayedToDepot * item.jobListing.shiftDurationInHours}/hr</td>
            <td>
                <p className="flex">
                    <img src={Star} alt="" />
                    <span className="pl-1">{item?.depotRating}</span>
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
            <tbody> {rows}</tbody>
        </Table>
    )
}
export default ShiftTable
