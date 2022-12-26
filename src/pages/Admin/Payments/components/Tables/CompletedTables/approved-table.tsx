import { Table } from "@mantine/core"
import { HiChevronRight } from "react-icons/hi"
import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"
import { Result } from "../../../../../../types/payment/interface"

interface Prop {
    elements: Result[]
    setApprovedPhase: (val: number) => void
}
const ApprovedTable = ({ elements, setApprovedPhase }: Prop) => {
    const numberOfOperatives = elements.length
    const rows = elements.map((item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                <p className="text-lg font-creato">
                    {dayjs(item.schedule.jobListing.createdAt).format("MMM D, YYYY")}
                </p>
            </td>

            <td>
                <p className="text-lg font-creato">{item.depot.companyName}</p>
            </td>
            <td>
                <p className="text-lg font-creato max-w-[210px]">
                    {item.depot.depotCompany.address}
                </p>
            </td>
            <td>
                <p className="text-lg font-creato max-w-[220px]">
                    {item.schedule.jobListing.jobType.name}
                </p>
            </td>
            <td>
                {item.schedule.jobListing.jobMeetingPoint === "SITE" ? (
                    <span className="bg-yellow-100 px-3 py-1 text-3sm rounded-full text-3sm font-bold">
                        {"MEET ONSITE"}
                    </span>
                ) : (
                    <span className="bg-white-10 px-3 py-1 text-3sm rounded-full text-3sm font-bold">
                        {"DEPOT FIRST"}
                    </span>
                )}
            </td>
            <td>
                <p className="text-lg font-creato">
                    {numberOfOperatives}
                </p>
            </td>
            <td>
                <p className="text-lg font-creato">
                    {dayjs(item.createdAt).format("MMM D, YYYY")}
                </p>
            </td>

            <td
                className="cursor-pointer"
                data-testid="view_application"
                onClick={() => {
                    setApprovedPhase(2)
                }}
            >
                <HiChevronRight size={30} style={{ color: "#889088" }} />
            </td>
        </tr>
    ))

    const tableHead = [
        "no",
        "shift date",
        "company",
        "location",
        "type",
        "mode",
        "operatives joined",
        "date joined",
        "",
    ]
    return (
        <>
            <div className="hidden lg:block ">
                <Table verticalSpacing="md" horizontalSpacing="sm">
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
                {elements.map((item, index) => (
                    <div
                        className="rounded bg-black-5 mb-4 pb-4 cursor-pointer"
                        key={index}
                        onClick={() => {
                            setApprovedPhase(2)
                        }}
                    >
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <p className="font-medium text-2lg">
                                {"item.firstName +  + item.lastName"}
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
export default ApprovedTable
