import { Table } from "@mantine/core"
//import { Data } from "src/pages/Applications/interface"

import Star from "../../../assets/star.svg"

interface Prop {
    //status?: "pending" | "accepted" | "rejected" ;
    //elements: Data[]
    date: string
    location: string
    timeIn: string
    timeOut: string
    duration: string
    amount: string
    rating: string
    status: string
}
const ShiftTable = ({ elements }: { elements: Prop[] }) => {
    //const ApplicationTable = ({ elements }: Prop) => {
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
            {/* <td>{index}</td>
            <td>{item.user.firstName + " " + item.user.lastName}</td>
            <td>{item.jobListing.jobType.name}</td>
            <td>{item.jobListing.jobMatchPercentage}%</td>
            <td>4.9</td>
            <td>{item.createdAt}</td>
            <td>{item.createdAt}</td>
             */}

            <td>{item.date}</td>
            <td>{item.location}</td>
            <td>{item.timeIn}</td>
            <td>{item.timeOut}</td>
            <td>{item.duration}</td>
            <td>{item.amount}</td>
            <td>
                <p className="flex">
                    <img src={Star} alt="" />
                    <span className="pl-1">{item.rating}</span>
                </p>
            </td>
            <td>
                <p className="text-white-100 bg-green-100 pl-1.5 py-1 rounded-full w-20">
                    {item.status}
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
