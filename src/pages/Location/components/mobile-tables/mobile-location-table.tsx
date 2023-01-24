import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import LocationIcon from "../../../../assets/location.svg"
import { RegionsResponse } from "../../../../types/dashboard/interfaces"

const MobileLocationTable = ({
    elements,
}: {
    elements: RegionsResponse["data"]
}) => {
    const navigate = useNavigate()
    return (
        <div className="mt-4">
            {elements.map((element, index) => (
                <div
                    className="rounded bg-black-5 mb-4 p-2 grid grid-cols-2"
                    key={index}
                    onClick={() => {
                        navigate(`/locations/${element._id}`, {
                            state: {
                                address: element.location.formattedAddress,
                                created: element.createdAt,
                            },
                        })
                    }}
                >
                    <span className="text-black-50 text-3sm pb-2">DEPOT</span>
                    <span className="justify-self-end pr-4 lg:pr-8 text-black-50 text-3sm">
                        DEPOT MANAGERS MANAGERS
                    </span>
                    <p className="flex">
                        <img src={LocationIcon} alt="location icon" width={22}/>
                        <span className="pl-2 text-2md">
                            {element.location.formattedAddress}
                        </span>
                    </p>

                    <span className="flex flex-col justify-self-end">
                        <p className="flex">
                            {element?.regionalManagers.length > 0 ? (
                                <>
                                    <div className="bg-black-20 rounded-[30px] px-1.5 pb-1">
                                        <span className="font-bold text-black-100 text-3sm">
                                            {element.regionalManagers[0]?.firstName[0].toUpperCase() +
                                                element.regionalManagers[0]?.lastName[0].toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="pl-2">
                                        {element.regionalManagers[0]
                                            ?.firstName +
                                            " " +
                                            element.regionalManagers[0]
                                                ?.lastName}
                                    </span>
                                </>
                            ) : (
                                "----"
                            )}
                        </p>
                        <p className="flex">
                            {element?.regionalManagers.length > 1 ? (
                                <>
                                    <div className="bg-black-20 rounded-[30px] px-1.5 pb-1">
                                        <span className="font-bold text-black-100 text-3sm">
                                            {element.regionalManagers[1]?.firstName[0].toUpperCase() +
                                                element.regionalManagers[1]?.lastName[0].toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="pl-2">
                                        {element.regionalManagers[1]
                                            ?.firstName +
                                            " " +
                                            element.regionalManagers[1]
                                                ?.lastName}
                                    </span>
                                </>
                            ) : (
                                "----"
                            )}
                        </p>
                    </span>
                    <span className="text-black-50 text-3sm pb-2 pt-2">
                        SHIFT MANAGERS
                    </span>
                    <span className="justify-self-end pr-[70px] pt-2 lg:pr-8 text-black-50 text-3sm">
                        ADDED
                    </span>
                    <span className="text-2md">
                        {element.shiftManagerCount}
                    </span>
                    <span className="text-2md justify-self-end">
                        {dayjs(element.createdAt).format("MMM D, YYYY")} |{" "}
                        {dayjs(element.createdAt).format("h:mm A")}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default MobileLocationTable
