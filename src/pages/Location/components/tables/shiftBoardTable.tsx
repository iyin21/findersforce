import { Checkbox, Table } from "@mantine/core"
import { IoIosArrowForward } from "react-icons/io"
import { BiUpArrowAlt } from "react-icons/bi"
import MobileLocationShiftTable from "../mobile-tables/mobileLocationShiftTable"

const ShiftBoard = () => {
    const elements: any[] = [
        {
            _id: 1,
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
        },
        {
            _id: 1,
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
        },
        {
            _id: 1,
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
        },
        {
            _id: 1,
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
        },
    ]
    const rows = elements?.map((element, index) => (
        <tr key={index}>
            <td>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={element?._id}
                        className="rounded-lg"
                        name={element?.jobListing?.jobType?.name}
                        // onChange={handleCheckedProduct}
                        // checked={checkedProduct.includes(element?._id)}
                        value={element?.id}
                        data-testid="checkbox"
                    />
                </div>
            </td>
            <td>2-Way</td>
            <td>Iolaire Road, New Invent...</td>
            <td>Nov 15, 2022 | 9-11AM</td>
            <td>$140/hr</td>
            <td>2 hour(s)</td>
            <td>
                <span>134/</span>
                <span className="text-black-30">200</span>
            </td>
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
        { list: "TYPE" },
        { list: "LOCATION" },
        { list: "DATE" },
        { list: "HOURLY RATE" },
        { list: "DURATION" },
        { list: "APPLICANTS" },
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
                            <th
                                style={{
                                    borderBottom: "none",
                                }}
                                className="flex items-center gap-2 "
                            >
                                <Checkbox />
                            </th>
                            {tableHeadUpcoming.map((item, index) =>
                                item?.list === "HOURLY RATE" ? (
                                    <>
                                        <th
                                            key={index}
                                            style={{
                                                borderBottom: "none",
                                            }}
                                        >
                                            <div className="flex">
                                                <p className="text-black-30 pr-2">
                                                    {item?.list}
                                                </p>
                                                <BiUpArrowAlt
                                                    size={22}
                                                    color="rgba(15, 13, 0, 0.3)"
                                                />
                                            </div>
                                        </th>
                                    </>
                                ) : item.list === "APPLICANTS" ? (
                                    <>
                                        <th
                                            key={index}
                                            style={{
                                                borderBottom: "none",
                                            }}
                                        >
                                            <div className="flex">
                                                <p className="text-black-30 pr-2">
                                                    {item?.list}
                                                </p>
                                                <BiUpArrowAlt
                                                    size={22}
                                                    color="rgba(15, 13, 0, 0.3)"
                                                />
                                            </div>
                                        </th>
                                    </>
                                ) : (
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
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="block lg:hidden">
                <MobileLocationShiftTable elements={elements} />
            </div>
        </>
    )
}

export default ShiftBoard
