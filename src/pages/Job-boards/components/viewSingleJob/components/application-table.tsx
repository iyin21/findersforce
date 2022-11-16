import { Table } from "@mantine/core"
import dayjs from "dayjs"
import { AiOutlineArrowUp } from "react-icons/ai"
import { BsFillStarFill } from "react-icons/bs"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { JobBoardResponseInterface } from "../../../../../types/job-board/interface"

interface ApplicationJobInterface {
    elements?: JobBoardResponseInterface[]
}

const ApplicationJobTable = ({ elements }: ApplicationJobInterface) => {
    const renderStatus = (status: string) => {
        switch (status) {
            case "PENDING":
                return (
                    <span className="bg-black-10 text-black-100 rounded-2xl px-3 py-1 font-semibold">
                        PENDING
                    </span>
                )
            case "REJECTED":
                return (
                    <span className="bg-red-100 rounded-2xl text-white-100 px-3 py-2 font-semibold">
                        REJECTED
                    </span>
                )
            case "ACCEPTED":
                return (
                    <span className="bg-green-100 rounded-2xl text-white-100 px-3 py-2 font-semibold">
                        ACCEPTED
                    </span>
                )
            default:
                break
        }
    }
    const navigate = useNavigate()
    const handleNavigate = (id: string) => {
        navigate(`/planner/${id}`)
    }

    const rows = elements?.map((element, index) => (
        <tr key={index} onClick={() => handleNavigate(element?._id)}>
            <td>{index}</td>
            <td>
                {element?.user?.firstName} {element?.user?.lastName}
            </td>
            <td>{element?.jobQualification?.name}</td>
            <td className="text-green-100">{element?.jobMatchPercentage}</td>
            <td>
                <p className="flex items-center gap-2">
                    {" "}
                    <BsFillStarFill color="#FED70A" />{" "}
                    {element?.user?.averageRating}
                </p>
            </td>
            <td>{dayjs(element?.jobDate).format("mmmm dddd yyyy")}</td>
            <td>{dayjs(element?.jobDate).format("hh:mm a")}</td>
            <td> {renderStatus(element?.status)}</td>
            <td
                role="gridcell"
                className="cursor-pointer h-[60px] border-b border-neutral-5"
                // onClick={() => {
                //     setActiveId(element._id)
                // }}
            >
                <IoIosArrowForward size={30} style={{ color: "#889088" }} />
            </td>
        </tr>
    ))

    const tableHead = [
        { list: "NO" },
        { list: "NAME" },
        { list: "QUALIFICATION" },
        { list: "MATCH" },
        { list: "RATING", icon: <AiOutlineArrowUp /> },
        { list: "DATE APPLIED", icon: <AiOutlineArrowUp /> },
        { list: "TIME APPLIED", icon: <AiOutlineArrowUp /> },
        { list: "STATUS" },
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
                            {tableHead.map((item, index) => (
                                <th
                                    key={index}
                                    style={{
                                        borderBottom: "none",
                                    }}
                                >
                                    <p className="text-black-30 flex items-center gap-2">
                                        {item?.list}
                                        {item?.icon}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
        </>
    )
}

export default ApplicationJobTable
