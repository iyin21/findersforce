import { FiChevronRight } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { DepotTableInterface } from "./depot-table"

const MobileDepotTable = ({ status, elements }: DepotTableInterface) => {
    const navigate = useNavigate()
    const handleNavigate = (id: string) => {
        if (status === "active") {
            navigate(`/depots/${id}`)
        }
    }
    return (
        <div className="mt-4 font-creato">
            {elements?.map((element, index) => (
                <div
                    className="rounded bg-black-5 mb-4 p-4"
                    key={index}
                    onClick={() => {
                        handleNavigate(element._id)
                    }}
                >
                    <div className="flex justify-between items-center border-b border-black-20 pb-2">
                        <div>
                            <h6 className="text-black-50 text-3sm">NAME</h6>
                            <p className="text-2md mt-1">{element?.name}</p>
                        </div>
                        <FiChevronRight color="#0F0D0099" size={30} />
                    </div>

                    <div className="mt-4">
                        <h6 className="text-black-50 text-3sm">EMAIL</h6>
                        <p className="text-2md mt-1">{element?.email}</p>
                    </div>
                    <div className="mt-4">
                        <h6 className="text-black-50 text-3sm">HEADQUARTER</h6>
                        <p className="text-2md mt-1">{element?.headquarter}</p>
                    </div>

                    {status === "active" && (
                        <>
                            <div className="flex justify-between items-center  my-4">
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        SHIFTS
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {element?.shift}
                                    </p>
                                </div>
                                <div>
                                    <h6 className="text-black-50 text-3sm">
                                        OPERATIVES
                                    </h6>
                                    <p className="text-2md mt-1">
                                        {element?.operatives}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h6 className="text-black-50 text-3sm">
                                    LOCATIONS
                                </h6>
                                <p className="text-2md mt-1">
                                    {element?.location}
                                </p>
                            </div>
                        </>
                    )}

                    {status === "pending" && (
                        <div className="flex justify-between items-center  my-4">
                            <div className="mt-4">
                                <h6 className="text-black-50 text-3sm">
                                    DATE ADDED
                                </h6>
                                <p className="text-2md mt-1">{element?.date}</p>
                            </div>
                            <div className="mt-4">
                                <h6 className="text-black-50 text-3sm">
                                    ACTION
                                </h6>
                                <p className="text-red-100"> Revoke Invite</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default MobileDepotTable
