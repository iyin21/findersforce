import dayjs from "dayjs"
import { ManagersTableProps } from "./managers-tables"

const MobileManagerTable = ({ elements }: ManagersTableProps) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4 p-4" key={index}>
                    <div className=" border-b border-black-20 pb-2">
                        <div>
                            <h6 className="text-black-50 text-3sm">NAME</h6>
                            <p className="text-2md mt-1">
                                {element?.firstName} {element?.lastName}
                            </p>
                        </div>
                    </div>
                    <div className=" mt-3">
                        <div>
                            <h6 className="text-black-50 text-3sm">EMAIL</h6>
                            <p className="text-2md mt-1">{element?.email}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h6 className="text-black-50 text-3sm">ROLE</h6>
                        <p className="text-2md mt-1">{element?.depotRole}</p>
                    </div>
                    <div className="mt-4">
                        <h6 className="text-black-50 text-3sm">LOCATION</h6>
                        <p className="text-2md mt-1">
                            {element?.depotCompany?.address}
                        </p>
                    </div>
                    <div className="mt-4">
                        <h6 className="text-black-50 text-3sm">DATE ADDED</h6>
                        <p className="text-2md mt-1">
                            {dayjs(element.createdAt).format("MMM, D, YYYY")}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileManagerTable
