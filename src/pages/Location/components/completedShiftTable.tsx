import { Checkbox, Table } from "@mantine/core"
import { IoIosArrowForward } from "react-icons/io"

const CompletedShiftTable = () => {
    const elements: any[] = [
        {
            _id: 1,
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
            mode: "onsite",
            paid: false,
        },
        {
            _id: 1,
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
            mode: "depot first",
            paid: true,
        },
        {
            _id: 1,
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
            mode: "onsite",
            paid: false,
        },
        {
            _id: 1,
            operative: {
                firstName: "Shaquan",
                lastName: "Roberts",
            },
            mode: "depot first",
            paid: true,
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
                    <label
                        htmlFor={element?.jobListing?.jobType?.name}
                        className="capitalize"
                    >
                        {element?.jobListing?.jobType?.name}
                    </label>
                </div>
            </td>
            <td>2-Way</td>
            <td>Iolaire Road, New Invent...</td>
            <td>Nov 15, 2022</td>
            <td>
                {element?.mode === "onsite" ? (
                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        MEET ONSITE
                    </p>
                ) : (
                    <p className="text-yellow-100 border-yellow-100 border-2 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        {element?.mode.toUpperCase()}
                    </p>
                )}
            </td>
            <td>$140/hr</td>
            <td>2 hour(s)</td>
            <td>
                {element?.paid ? (
                    <p className="text-green-100 bg-green-10 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        PAID
                    </p>
                ) : (
                    <p className="text-red-100 bg-red-10 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoBlack">
                        NOT PAID
                    </p>
                )}
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
        { list: "MODE" },
        { list: "HOURLY RATE" },
        { list: "DURATION" },
        { list: "PAYMENT STATUS" },
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

export default CompletedShiftTable
