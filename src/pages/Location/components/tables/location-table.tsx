import { Table } from "@mantine/core"
// import { Data } from "../interface"
import { HiChevronRight } from "react-icons/hi"
import dayjs from "dayjs"
// import { IoIosArrowForward } from "react-icons/io"
import LocationIcon from "../../../../assets/location.svg"
import { useNavigate } from "react-router-dom"
import { RegionsResponse } from "../../../../types/dashboard/interfaces"
import MobileLocationTable from "../mobile-tables/mobile-location-table"

// interface Prop {
// status?: "pending" | "accepted" | "rejected" ;
//    elements: Data[]
//    setPhase: (val: number) => void

//    setActiveId: (val: string) => void
// }
const elementss = [
    {
        _id: "123456789",
        location: "Birmingham, United Kingdom",
        user: {
            username: "Shaquan Roberts",
            firstName: "Shaquan",
            lastName: "Roberts",
        },
        numberOfShiftManagers: 12,
        createdAt: "2022-08-25T08:53:12.211Z",
    },
    {
        _id: "123456789",
        location: "Birmingham, United Kingdom",
        user: {
            username: "Shaquan Roberts",
            firstName: "Shaquan",
            lastName: "Roberts",
        },
        numberOfShiftManagers: 12,
        createdAt: "2022-08-25T08:53:12.211Z",
    },
    {
        _id: "123456789",
        location: "Birmingham, United Kingdom",
        user: {
            username: "Shaquan Roberts",
            firstName: "Shaquan",
            lastName: "Roberts",
        },
        numberOfShiftManagers: 12,
        createdAt: "2022-08-25T08:53:12.211Z",
    },
]
const LocationTable = ({ elements }: { elements: RegionsResponse["data"] }) => {
    const navigate = useNavigate()
    const rows = elements.map((item, index) => (
        <tr key={index} className={"text-black-100 font-medium font-creato"}>
            <td>
                <p className="flex">
                    <img src={LocationIcon} alt="location icon" />
                    <span className="pl-2">
                        {item.location.formattedAddress}
                    </span>
                </p>
            </td>
            <td>
                <p className="flex">
                    {item.regionalManagers.length > 0 ? (
                        <>
                            <div className="bg-black-20 rounded-[30px] px-1.5 pb-1">
                                <span className="font-bold text-black-100 text-3sm">
                                    {item.regionalManagers[0]?.firstName[0].toUpperCase() +
                                        item.regionalManagers[0]?.lastName[0].toUpperCase()}
                                </span>
                            </div>
                            <span className="pl-2">
                                {item.regionalManagers[0]?.firstName +
                                    " " +
                                    item.regionalManagers[0]?.lastName}
                            </span>
                        </>
                    ) : (
                        "----"
                    )}
                </p>
            </td>
            <td>
                <p className="flex">
                    {item.regionalManagers.length > 1 ? (
                        <>
                            <div className="bg-black-20 rounded-[30px] px-1.5 pb-1">
                                <span className="font-bold text-black-100 text-3sm">
                                    {item.regionalManagers[1]?.firstName[0].toUpperCase() +
                                        item.regionalManagers[1]?.lastName[0].toUpperCase()}
                                </span>
                            </div>
                            <span className="pl-2">
                                {item.regionalManagers[1]?.firstName +
                                    " " +
                                    item.regionalManagers[1]?.lastName}
                            </span>
                        </>
                    ) : (
                        "----"
                    )}
                </p>
            </td>
            <td>{item.shiftManagerCount}</td>
            <td>
                {dayjs(item.createdAt).format("MMM D, YYYY")} |{" "}
                {dayjs(item.createdAt).format("h:mm A")}
            </td>
            <td
                className="cursor-pointer"
                data-testid="view_location"
                onClick={() => {
                    navigate(`/locations/${item._id}`, {
                        state: {
                            address: item.location.formattedAddress,
                            created: item.createdAt,
                        },
                    })
                }}
            >
                <HiChevronRight size={30} style={{ color: "#889088" }} />
            </td>
        </tr>
    ))

    const tableHead = [
        "Depot",
        "Depot managers",
        "",
        "shift managers",
        "added",
        "",
    ]
    return (
        <>
            <div className="hidden lg:block pt-6">
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
            </div>
            <div className="block lg:hidden">
                <MobileLocationTable elements={elementss} />
            </div>
        </>
    )
}
export default LocationTable
