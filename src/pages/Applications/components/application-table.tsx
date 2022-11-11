import { Table } from "@mantine/core"
import { Data } from "../interface"
import { HiChevronRight } from "react-icons/hi"
import Avatar from "../assets/avatar.svg"
import Star from "../assets/star.svg"
import dayjs from "dayjs"

interface Prop {
    // status?: "pending" | "accepted" | "rejected" ;
    elements: Data[]
    setPhase: (val: number) => void

    setActiveId: (val: string) => void
}
const ApplicationTable = ({ elements, setPhase, setActiveId }: Prop) => {
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
    )
}
export default ApplicationTable
