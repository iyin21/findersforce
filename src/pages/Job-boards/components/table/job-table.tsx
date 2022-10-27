// import { Checkbox } from "@components/index"
import { Table } from "@mantine/core"
import { Checkbox } from "../../../../components/index"
import { IoIosArrowForward } from "react-icons/io"
import { AiOutlineArrowUp } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import MobileJobTable from "./mobile-table"
import { JobBoardInterface } from "../../../../types/job-board.type"

const JobBoardTable = ({ elements, status }: JobBoardInterface) => {
    // this navigate function is used to navigate to the single job board page
    const navigate = useNavigate()
    const handleNavigate = (id: string) => {
        navigate(`/job-boards/${id}`)
    }

    const rows = elements.map((element, index) => (
        <tr key={index} onClick={() => handleNavigate(element?.id)}>
            <td>
                <div className="flex items-center">
                    <Checkbox
                        id={element?.id}
                        className="rounded-lg"
                        name={element?.type}
                        // onChange={handleCheckedProduct}
                        // checked={checkedProduct.includes(element?._id)}
                        value={element?.id}
                        data-testid="checkbox"
                    />
                    <label htmlFor={element?.type} className="capitalize">
                        {element?.type}
                    </label>
                </div>
            </td>
            <td>{element?.location}</td>
            <td>{element?.date}</td>
            <td>{element?.hourly_rate}</td>
            <td>{element?.duration}</td>
            {status === "active" && <td>{element?.applicants}</td>}
            <td>
                {element?.mode === "MEET ONSITE" ? (
                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        MEET ONSITE
                    </p>
                ) : (
                    <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold p-1 border-2 border-black-100 text-3sm w-fit px-3 py-1">
                        DEPOT FIRST
                    </p>
                )}
            </td>
            <td
                role="gridcell"
                className="cursor-pointer h-[60px] border-b border-neutral-5"
                // onClick={() => {
                //     setActiveId(element._id)
                // }}
                data-testid="job_board_table"
            >
                <IoIosArrowForward size={30} style={{ color: "#889088" }} />
            </td>
        </tr>
    ))

    const tableHead = [
        { list: "Location" },
        { list: "Date" },
        { list: "Hourly Rate" },
        { list: "Duration" },
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
                                <p className="text-black-30 ">Type</p>
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
                                <th
                                    style={{
                                        borderBottom: "none",
                                    }}
                                    className="flex items-center gap-2 "
                                >
                                    <p className="text-black-30 ">Applicants</p>{" "}
                                    <AiOutlineArrowUp color="rgba(15, 13, 0, 0.3)" />
                                </th>
                            )}
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                            >
                                <p className="text-black-30 ">Mode</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden">
                <MobileJobTable elements={elements} status={status} />
            </div>
        </>
    )
}

export default JobBoardTable
