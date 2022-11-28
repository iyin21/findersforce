import { Table } from "@mantine/core"
import { IoIosArrowForward } from "react-icons/io"
import ProfileImage from "../../../assets/ProfileImage.svg"

const UpcomingShift = () => {
    const elements: any[] = [
        {
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
        },
        {
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
        },
        {
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
        },
        {
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
        },
    ]
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            {
                <td>
                    <div className="flex items-center gap-2">
                        <img src={ProfileImage} alt="profile_image" />
                        <p>
                            {element?.operative?.firstName}{" "}
                            {element?.operative?.lastName}
                        </p>
                    </div>
                </td>
            }
            <td>2-Way</td>
            <td>Iolaire Road, New Invent...</td>
            <td>Nov 15, 2022 | 9-11AM</td>
            <td>$140/hr</td>
            <td>2 hour(s)</td>
            <td>
                <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                    MEET ONSITE
                </p>
            </td>
            <td
                role="gridcell"
                className="cursor-pointer h-[60px] border-b border-neutral-5"
                data-testid="shifts_table"
            >
                <IoIosArrowForward
                    size={30}
                    style={{ color: "#889088" }}
                    onClick={() => {}}
                />
            </td>
        </tr>
    ))

    const tableHeadUpcoming = [
        { list: "NAME" },
        { list: "JOB TYPE" },
        { list: "LOCATION" },
        { list: "DATE" },
        { list: "RATE" },
        { list: "DURATION" },
        { list: "MODE" },
    ]

    return (
        <>
            <div
                className="hidden lg:block overflow-x-hidden "
                data-testid="planner"
            >
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
                            {tableHeadUpcoming.map((item, index) => (
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
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
        </>
    )
}

export default UpcomingShift
