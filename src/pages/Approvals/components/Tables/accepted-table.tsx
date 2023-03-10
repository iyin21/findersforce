import { Table, Checkbox } from "@mantine/core"
import { Data } from "../../../../types/approval/approval-interface"
import { HiChevronRight } from "react-icons/hi"
import Avatar from "../../../Applications/assets/avatar.svg"
import dayjs from "dayjs"
import { IoIosArrowForward } from "react-icons/io"

interface Prop {
    // status?: "pending" | "accepted" | "rejected" ;
    elements: Data[]
    setPhase: (val: number) => void

    setActiveId: (val: string) => void
}
const AcceptedTable = ({ elements, setPhase, setActiveId }: Prop) => {
    const qualificationName = elements.map((item) => {
        return item.qualification.map((item) => item.name)
    })

    const rows = elements.map((item, index) => (
        <tr key={index}>
            <td>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={item?._id}
                        className="rounded-lg"
                        // name={item?.jobListing?.jobType?.name}
                        // onChange={handleCheckedProduct}
                        // checked={checkedProduct.includes(element?._id)}
                        value={item?._id}
                        data-testid="checkbox"
                    />
                </div>
            </td>
            <td>{index + 1}</td>
            <td>
                <p className="flex">
                    <img src={Avatar} alt="" />
                    <span className="pl-2">
                        {item.firstName + " " + item.lastName}
                    </span>
                </p>
            </td>

            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{qualificationName[index].join(", ")}</td>
            <td>
                {item.completedShifts}
                {/* use shift history to get each user's shift completed */}
            </td>
            <td>{dayjs(item.createdAt).format("MMM D, YYYY")}</td>
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
        "name",
        "email",
        "gender",
        "Qualification",
        "shifts completed",
        "date joined",
        "",
    ]
    return (
        <>
            <div className="hidden lg:block ">
                <Table verticalSpacing="md">
                    <thead>
                        <tr>
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                                className="flex items-center gap-2 "
                            >
                                <Checkbox />
                            </th>
                            <th
                                style={{
                                    color: "rgba(15, 13, 0, 0.3)",
                                    fontSize: "13px",
                                    borderBottom: "none",
                                }}
                                className="text-black-30"
                            >
                                {"NO"}
                            </th>

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
                            setActiveId(item._id)
                            setPhase(2)
                        }}
                    >
                        <div className="flex justify-between border-b border-black-20 p-4">
                            <p className="font-medium text-2lg">
                                {item.firstName + " " + item.lastName}
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
                                        {item.email}
                                    </p>
                                </div>

                                <div className="mt-2">
                                    <h6 className="text-black-50 text-3sm">
                                        GENDER
                                    </h6>
                                    <p className="text-2md mt-1">{item.gender}</p>
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
                                    <p className="text-2md mt-1">
                                        {qualificationName[index]
                                            .join(", ")
                                            .substring(0, 10) + "..."}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <h6 className="text-black-50 text-3sm">
                                        SHIFT COMPLETED
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {item.completedShifts}
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
export default AcceptedTable
