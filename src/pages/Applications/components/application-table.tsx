import { Table } from "@mantine/core"
//import { Data } from "src/pages/Applications/interface"
import { HiChevronRight } from "react-icons/hi"
import Avatar from "../assets/avatar.svg"
import Star from "../assets/star.svg"
import { useNavigate } from "react-router-dom"

interface Prop {
    //status?: "pending" | "accepted" | "rejected" ;
    //elements: Data[]
    name: string
    jobType: string
    qualification: string
    match: string
    rating: string
    dateApplied: string
    timeApplied: string
}
const ApplicationTable = ({ elements }: { elements: Prop[] }) => {
    const navigate = useNavigate()
    //const ApplicationTable = ({ elements }: Prop) => {
    const tableData = [
        {
            name: "Shaquan Roberts",
            jobType: "2-Way",
            qualification: "T1/T2",
            match: "90%",
            rating: "4.9%",
            dateApplied: "Nov 15, 2022",
            timeApplied: "14:13PM",
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
            <td className="flex">
                <img src={Avatar} alt="" />
                <span className="pl-2">{item.name}</span>
            </td>
            <td>{item.jobType}</td>
            <td>{item.qualification}</td>
            <td className="text-green-100 font-medium">{item.match}</td>
            <td>
                <p className="flex">
                    <img src={Star} alt="" />
                    <span className="pl-1">{item.rating}</span>
                </p>
            </td>
            <td>{item.dateApplied}</td>
            <td>{item.timeApplied}</td>
            <td
                className="cursor-pointer"
                onClick={() => navigate("/applications/33")}
            >
                <HiChevronRight size={30} style={{ color: "#889088" }} />
            </td>
        </tr>
    ))

    const tableHead = [
        "NO",
        "name",
        "job Type",
        "match",
        "rating",
        "date Applied",
        "time Applied",
        "",
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
export default ApplicationTable
