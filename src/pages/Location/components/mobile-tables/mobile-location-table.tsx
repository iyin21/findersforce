import dayjs from "dayjs"
import { Key } from "react"
import { useNavigate } from "react-router-dom"
import LocationIcon from "../../../../assets/location.svg"

const MobileLocationTable = ({ elements }: { elements: any }) => {
    const navigate = useNavigate()
    return (
        <div className="mt-4">
            {elements.map((element: any, index: Key | null | undefined) => (
                <div
                    className="rounded bg-black-5 mb-4 p-2 grid grid-cols-2"
                    key={index}
                    onClick={() => {
                        navigate(`/locations/${element._id}`)
                    }}
                >
                    <span className="text-black-50 text-3sm pb-2">
                        LOCATION
                    </span>
                    <span className="justify-self-end pr-4 lg:pr-8 text-black-50 text-3sm">
                        REGIONAL MANAGERS
                    </span>
                    <p className="flex">
                        <img src={LocationIcon} alt="location icon" />
                        <span className="pl-2 text-2md">
                            {element.location}
                        </span>
                    </p>

                    <span className="justify-self-end">
                        <p className="flex items-center">
                            <div className="bg-black-20 rounded-[30px] px-1.5 pb-1">
                                <span className="font-bold text-black-100 text-3sm">
                                    {element.user.firstName[0].toUpperCase() +
                                        element.user.lastName[0].toUpperCase()}
                                </span>
                            </div>
                            <span className="pl-2 text-2md">
                                {element.user.firstName +
                                    " " +
                                    element.user.lastName}
                            </span>
                        </p>
                    </span>
                    <span className="text-black-50 text-3sm pb-2 pt-2">
                        SHIFT MANAGERS
                    </span>
                    <span className="justify-self-end pr-[70px] pt-2 lg:pr-8 text-black-50 text-3sm">
                        DATE ADDED
                    </span>
                    <span className="text-2md">{element.numberOfShiftManagers}</span>
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
