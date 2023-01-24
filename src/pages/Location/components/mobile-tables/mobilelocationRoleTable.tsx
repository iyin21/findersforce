import AllManagersResponse from "../../../../types/location/interface"
import { RiDeleteBin5Line } from "react-icons/ri"
import dayjs from "dayjs"

const MobileLocationRoleTable = ({
    elements,
}: {
    elements: AllManagersResponse["data"]
}) => {
    return (
        <div className="mt-4">
            {elements?.map((element, index) => (
                <div className="rounded bg-black-5 mb-4" key={index}>
                    <div className="flex justify-between border-b border-black-20 p-4">
                        <p className="flex">
                            <div className="bg-black-20 rounded-[30px] px-1.5 pb-1">
                                <span className="font-bold text-black-100 text-3sm">
                                    {element.firstName[0].toUpperCase() +
                                        element.lastName[0].toUpperCase()}
                                </span>
                            </div>
                            <span className="pl-2">
                                {element.firstName + " " + element.lastName}
                            </span>
                        </p>

                        <div className="flex items-center gap-2">
                            <div className="cursor-pointer">
                                <RiDeleteBin5Line color="#E94444" size={16} />
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between mt-3">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    EMAIL ADDRESS
                                </h6>
                                <p className="text-2md mt-1 pr-5">
                                    {element.email}
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 text-3sm pr-14">
                                    ROLE TYPE
                                </h6>
                                <p className="text-2md mt-1">
                                    {element.depotRole}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-3 pr-14">
                            <div>
                                <h6 className="text-black-50 text-3sm">
                                    DATE ADDED
                                </h6>
                                <p className="text-2md mt-1">
                                    {dayjs(element.createdAt).format(
                                        "MMM D, YYYY"
                                    )}{" "}
                                    |{" "}
                                    {dayjs(element.createdAt).format("h:mm A")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileLocationRoleTable
