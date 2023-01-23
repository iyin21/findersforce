import TimeEstimate from "../../../../pages/planner/components/TimeEstimate"
import { useNavigate } from "react-router-dom"
import { BackButton, SearchBar } from "../../../../components"
import Layout from "../../../../components/Layout"
import { HiInformationCircle } from "react-icons/hi"
import { IoIosArrowForward } from "react-icons/io"
import { useEffect, useRef, useState } from "react"
import OperativeProfile from "../../../../components/Modals/Planner/OperativeProfile"
import handleGoogleMaps from "../googleMap/GoogleMap"

const ViewSingleActiveMap = () => {
    const [activeDepot, setActiveDepot] = useState(0)
    const [openShiftDetails, setOpenShiftDetails] = useState(false)
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/maps`)
    }

    const mapRef = useRef<HTMLDivElement>(null)
    const lat = 51.5144
    const lng = -0.1419
    useEffect(() => {
        if (mapRef.current && lat) {
            handleGoogleMaps(mapRef, { lng, lat })
        }
    }, [lng, lat])

    return (
        <Layout>
            {openShiftDetails && (
                <OperativeProfile
                    setOpenProfile={setOpenShiftDetails}
                    openProfile={openShiftDetails}
                    scheduleId=""
                    queryStatus=""
                    singleElement={""}
                />
            )}
            <BackButton handleBackButton={() => handleNavigate()} />
            <div className="md:p-6 p-6 mt-4 md:mt-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center ">
                    <div className="flex flex-col">
                        <h1
                            className="text-2xl md:text-3xl font-creatoMedium text-black-100 font-bold"
                            data-testid="map_title"
                        >
                            2-WAY | LONDON | W1B 4JR
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            November 12, 2022 | 08:00 - 17:00
                        </p>
                    </div>
                    <div className="flex flex-col mt-2 lg:mt-2">
                        <p className="bg-yellow-100 rounded-full text-3sm font-bold font-creato mb-4 py-2 px-3 text-center">
                            ACTIVE SHIFT ENDS IN
                        </p>
                        <TimeEstimate initialDate={new Date()} />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-6 relative">
                    <div className="flex flex-col lg:w-[35%]">
                        <p className="bg-yellow-10 rounded-full text-3sm font-bold font-creatoMedium mb-4 py-2 px-3 text-center flex items-center gap-3">
                            <HiInformationCircle size={25} color="#FED70A" /> 13
                            Assigned Operatives
                        </p>
                        <SearchBar
                            text="Search name..."
                            handleSearch={() => {}}
                        />

                        <div className="overflow-auto h-[550px] mt-4 ">
                            {new Array(13).fill(0).map((_, index) => (
                                <div
                                    className={`${
                                        activeDepot === index
                                            ? "bg-black-100"
                                            : "bg-black-5"
                                    } py-3 px-4 mb-4 rounded-md flex items-center gap-3`}
                                    key={index}
                                    onClick={() => setActiveDepot(index)}
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${
                                            "Kate" + " " + "Smith"
                                        }&background=${
                                            activeDepot === index
                                                ? "ffffff"
                                                : "000000"
                                        }&color=${
                                            activeDepot === index
                                                ? "000"
                                                : "fff"
                                        }`}
                                        alt=""
                                        width={26}
                                        height={26}
                                        className="rounded-full bg-white-50 text-xl"
                                    />
                                    <div>
                                        {" "}
                                        <h6
                                            className={`${
                                                activeDepot === index
                                                    ? "text-white-100 "
                                                    : "text-black-100 "
                                            } text-lg md:text-xl font-creatoMedium `}
                                        >
                                            Adediwura Wuraola
                                        </h6>
                                        <p
                                            className={`${
                                                activeDepot === index
                                                    ? "text-yellow-100 "
                                                    : "text-black-40 "
                                            }  mt-1 text-2md md:text-md font-normal font-creatoMedium flex items-center gap-1`}
                                            onClick={() =>
                                                setOpenShiftDetails(true)
                                            }
                                        >
                                            Shift Details{" "}
                                            <IoIosArrowForward
                                                size={15}
                                                color={`${
                                                    activeDepot === index
                                                        ? "#FED70A"
                                                        : "#889088"
                                                } `}
                                            />
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-[562px]  lg:mx-8  relative">
                        <div className="bg-black-100 w-fit mx-auto rounded-full px-3 py-2 absolute top-4 left-0 right-0 z-10 flex items-center gap-3 justify-center">
                            <HiInformationCircle size={25} color="#FED70A" />{" "}
                            <p className="text-white-100 text-md font-creatoMedium ">
                                Kai Eyo is{" "}
                                <span className="text-yellow-100">
                                    {" "}
                                    1000km{" "}
                                </span>
                                from the Shift Location
                            </p>
                        </div>
                        <div
                            id="map"
                            className="w-full h-[562px] bg-black-1  lg:block lg:mx-8 rounded-lg  "
                            ref={mapRef}
                        ></div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ViewSingleActiveMap
