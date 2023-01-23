import { Table } from "@mantine/core"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import TimeEstimate from "../../../planner/components/TimeEstimate"
import MobileMapTable from "./mobile-map-table"

export interface MapTableInterface {
    elements: {
        listingId: string
        location: string
        schedule: string
        wages: string
        jobMeetingPoint: string
        ends_in: Date
    }[]
}

const MapTable = ({ elements }: MapTableInterface) => {
    const navigate = useNavigate()
    const handleNavigate = (listingId: string) => {
        navigate(`/maps/${listingId}`)
    }
    const rows = elements?.map((element, index) => (
        <tr key={index} onClick={() => handleNavigate(element?.listingId)}>
            <td>{element.listingId}</td>
            <td> {element?.location}</td>
            <td>{element?.schedule}</td>
            <td>{element?.wages}</td>
            <td>
                {element?.jobMeetingPoint === "SITE" ? (
                    <p className="text-black-100 bg-yellow-100 rounded-3xl text-center font-bold p-1 w-fit px-3 py-1 text-3sm font-creatoMedium">
                        MEET ONSITE
                    </p>
                ) : (
                    <p className="text-black-100 bg-white-10 rounded-3xl text-center font-bold  border-2 border-black-100 text-3sm w-fit px-3 py-1">
                        DEPOT FIRST
                    </p>
                )}
            </td>
            <td>
                <TimeEstimate initialDate={element?.ends_in} />
            </td>
            <td>
                <IoIosArrowForward size={30} style={{ color: "#889088" }} />
            </td>
        </tr>
    ))

    const tableHead = [
        "SHIFT",
        "LOCATION",
        "SCHEDULE",
        "WAGES",
        "MODE",
        "ENDS IN",
    ]
    return (
        <div>
            <div className="hidden lg:block " data-testid="map_table">
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
                                    <p className="text-black-30 ">{item}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>

            <div className="block lg:hidden">
                <MobileMapTable elements={elements} />
            </div>
        </div>
    )
}

export default MapTable
