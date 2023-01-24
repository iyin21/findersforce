import { DateRangePicker, DateRangePickerValue } from "@mantine/dates"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Layout from "../../../components/Layout"
import backIcon from "../../../assets/backIcon.svg"
import locationIcon from "../../../assets/location.svg"
import { Tabs } from "@mantine/core"
import Analytics from "./analytics"
import ShiftBoard from "./tables/shiftBoardTable"
import ActiveShift from "./tables/activeShiftTable"
import RolesTable from "./tables/rolesTable"
import CompletedShiftTable from "./tables/completedShiftTable"
import Button from "../../../components/Core/Buttons/Button"
import { FiPlus } from "react-icons/fi"
import { BsCalendar2Date } from "react-icons/bs"
import { useGetAllManagers } from "../../../hooks/location/depot-hook"
import { useGetShiftHistory } from "../../../hooks/planner/usePlanner.hooks"
import { CgSpinner } from "react-icons/cg"
import dayjs from "dayjs"
import EmptyState from "../../../components/EmptyStates/index"
import AddManagerModal from "../../../components/Modals/Location/add-manager"

const LocationBasedData = () => {
    const [activeTab, setActiveTab] = useState<string | null>("analytics")
    const currentDate = new Date()
    const navigate = useNavigate()
    const location = useLocation()
    const address = location.state?.address
    const createdAt = location.state?.created
    const [open, setOpen] = useState(false)
    const { locationId } = useParams()
    currentDate.setDate(currentDate.getDate() - 7)

    const [value, setValue] = useState<DateRangePickerValue>([
        currentDate,
        new Date(),
    ])
    const { data: allManagersData, isLoading: isLoadingManagersData } =
        useGetAllManagers()
    const { data: allShiftsData, isLoading: isLoadingShiftsData } =
        useGetShiftHistory({ regionId: locationId })
    const { data: allActiveShiftsData, isLoading: isLoadingActiveShiftsData } =
        useGetShiftHistory({
            regionId: locationId,
            ongoing: true,
        })
    const {
        data: allCompletedShiftsData,
        isLoading: isLoadingCompletedShiftsData,
    } = useGetShiftHistory({
        regionId: locationId,
        completed: true,
    })
    return (
        <Layout pageTitle="Location">
            <div className="absolute md:top-4 pl-6 z-30">
                <AddManagerModal openModal={open} setOpenModal={setOpen} />
                <div className="flex">
                    <div
                        className="hidden lg:block bg-black-10 w-fit h-fit rounded mb-8 cursor-pointer"
                        onClick={() => navigate("/locations")}
                    >
                        <img
                            src={backIcon}
                            alt="back button"
                            className="p-1.5"
                        />
                    </div>

                    {activeTab === "analytics" ? (
                        <div className="pl-4 hidden md:block">
                            <DateRangePicker
                                placeholder="Start date - End date"
                                value={value}
                                onChange={setValue}
                                radius="md"
                                amountOfMonths={2}
                                icon={<BsCalendar2Date />}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="md:p-6 p-6 mt-4 md:mt-10">
                <div className="flex justify-between items-center">
                    <div className="flex pt-2 md:pt-0">
                        <img src={locationIcon} alt="location" width={37} />

                        <div className="flex flex-col pl-2.5 pr-3">
                            <h1
                                className="text-xl md:text-3xl font-creato text-black-100 font-extrabold"
                                data-testid="location_title"
                            >
                                {address}
                            </h1>
                            <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                                Added {dayjs(createdAt).format("MMM D, YYYY")} |{" "}
                                {dayjs(createdAt).format("h:mm A")}
                            </p>
                        </div>
                    </div>
                    {activeTab !== "analytics" ? (
                        <Button
                            variant="primary"
                            className="py-3 font-semibold font-creatoMedium"
                            iconLeft={<FiPlus size={20} />}
                            onClick={
                                activeTab === "managers"
                                    ? () => {
                                          setOpen(true)
                                      }
                                    : () => {
                                          navigate("/job-boards")
                                      }
                            }
                            data-testid="add_location_btn"
                        >
                            {activeTab === "managers" ? (
                                <>Add Managers</>
                            ) : (
                                <>Post a new shift</>
                            )}
                        </Button>
                    ) : null}
                </div>
                {isLoadingActiveShiftsData ||
                isLoadingCompletedShiftsData ||
                isLoadingManagersData ||
                isLoadingShiftsData ? (
                    <div className="h-screen w-full flex mt-24 justify-center">
                        <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                    </div>
                ) : (
                    <>
                        <Tabs
                            color="yellow"
                            keepMounted={false}
                            className="pt-7"
                            value={activeTab}
                            onTabChange={setActiveTab}
                            data-testid="location_tabs"
                        >
                            <Tabs.List>
                                <Tabs.Tab value="analytics">
                                    <p
                                        className={
                                            activeTab === "analytics"
                                                ? "text-black-100 text-lg font-creatoMedium active"
                                                : "font-creatoMedium text-black-40 text-lg inactive"
                                        }
                                    >
                                        Analytics
                                    </p>
                                </Tabs.Tab>
                                <Tabs.Tab value="managers">
                                    <p
                                        id="managers"
                                        className={
                                            activeTab === "managers"
                                                ? "text-black-100 text-lg font-creatoMedium active"
                                                : `font-creatoMedium text-black-40 text-lg inactive`
                                        }
                                    >
                                        Managers
                                        <span
                                            className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                activeTab === "managers"
                                                    ? "bg-white lg:text-white-100 text-dark-green-500  md:bg-red-100 text-3sm "
                                                    : "bg-gray-100 text-white-100 text-3sm"
                                            }`}
                                        >
                                            {allManagersData?.length || "0"}
                                        </span>
                                    </p>
                                </Tabs.Tab>
                                <Tabs.Tab value="shifts">
                                    <p
                                        id="shifts"
                                        className={
                                            activeTab === "shifts"
                                                ? "text-black-100 text-lg font-creatoMedium active"
                                                : `font-creatoMedium text-black-40 text-lg inactive`
                                        }
                                    >
                                        Shifts
                                        <span
                                            className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                activeTab === "shifts"
                                                    ? "bg-white lg:text-white-100 text-dark-green-500  md:bg-red-100 text-3sm "
                                                    : "bg-gray-100 text-white-100 text-3sm"
                                            }`}
                                        >
                                            {allShiftsData?.results.length ||
                                                "0"}
                                        </span>
                                    </p>
                                </Tabs.Tab>
                                <Tabs.Tab value="active-shifts">
                                    <p
                                        id="active-shifts"
                                        className={
                                            activeTab === "active-shifts"
                                                ? "text-black-100 text-lg font-creatoMedium active"
                                                : `font-creatoMedium text-black-40 text-lg inactive`
                                        }
                                    >
                                        Active Shifts
                                        <span
                                            className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                activeTab === "active-shifts"
                                                    ? "bg-white lg:text-white-100 text-dark-green-500  md:bg-red-100 text-3sm "
                                                    : "bg-gray-100 text-white-100 text-3sm"
                                            }`}
                                        >
                                            {allActiveShiftsData?.results
                                                .length || "0"}
                                        </span>
                                    </p>
                                </Tabs.Tab>
                                <Tabs.Tab value="completed-shifts">
                                    <p
                                        id="completed-shifts"
                                        className={
                                            activeTab === "completed-shifts"
                                                ? "text-black-100 text-lg font-creatoMedium active"
                                                : `font-creatoMedium text-black-40 text-lg inactive`
                                        }
                                    >
                                        Completed Shifts
                                        <span
                                            className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                                activeTab === "completed-shifts"
                                                    ? "bg-white lg:text-white-100 text-dark-green-500  md:bg-red-100 text-3sm "
                                                    : "bg-gray-100 text-white-100 text-3sm"
                                            }`}
                                        >
                                            {allCompletedShiftsData?.results
                                                .length || "0"}
                                        </span>
                                    </p>
                                </Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="analytics" pt="xs">
                                <Analytics
                                    value={value}
                                    setValue={setValue}
                                    regionId={locationId || ""}
                                />
                            </Tabs.Panel>

                            <Tabs.Panel value="managers" pt="xs">
                                {allManagersData &&
                                allManagersData.length > 0 ? (
                                    <RolesTable elements={allManagersData} />
                                ) : (
                                    <EmptyState
                                        title="This Depot has no active Managers"
                                        description="This Depot has no active Managers"
                                        buttonText="Add managers"
                                        handleButtonClick={() => {setOpen(true)}}
                                    />
                                )}
                            </Tabs.Panel>

                            <Tabs.Panel value="shifts" pt="xs">
                                {allShiftsData?.results &&
                                allShiftsData.results.length > 0 ? (
                                    <ShiftBoard
                                        elements={allShiftsData.results}
                                    />
                                ) : (
                                    <EmptyState
                                        handleButtonClick={() => {}}
                                        title="This Depot has no posted shifts right now."
                                        description="When the Depot creates and posts a shift you will be able to manage it here."
                                    />
                                )}
                            </Tabs.Panel>

                            <Tabs.Panel value="active-shifts" pt="xs">
                                {allActiveShiftsData?.results &&
                                allActiveShiftsData.results.length > 0 ? (
                                    <ActiveShift
                                        elements={allActiveShiftsData?.results}
                                    />
                                ) : (
                                    <EmptyState
                                        handleButtonClick={() => {}}
                                        title="This Depot has no active shifts right now."
                                        description="When a shift starts, you can track it here."
                                    />
                                )}
                            </Tabs.Panel>

                            <Tabs.Panel value="completed-shifts" pt="xs">
                                {allCompletedShiftsData?.results &&
                                allCompletedShiftsData.results.length > 0 ? (
                                    <CompletedShiftTable
                                        elements={
                                            allCompletedShiftsData?.results
                                        }
                                    />
                                ) : (
                                    <EmptyState
                                        buttonText="Post Shift"
                                        handleButtonClick={() => {
                                            navigate("/job-boards")
                                        }}
                                        title="This Depot has no completed shifts right now."
                                        description="When a shift is complete, you can review it here and pay wages."
                                    />
                                )}
                            </Tabs.Panel>
                        </Tabs>
                    </>
                )}
            </div>
        </Layout>
    )
}

export default LocationBasedData
