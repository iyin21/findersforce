import { DateRangePicker, DateRangePickerValue } from "@mantine/dates"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../../components/Layout"
import backIcon from "../../../assets/backIcon.svg"
import locationIcon from "../../../assets/location.svg"
import { Tabs } from "@mantine/core"
import Analytics from "./analytics"
import UpcomingShift from "./upcomingShiftTable"
import ShiftBoard from "./shiftBoardTable"
import ActiveShift from "./activeShiftTable"
import RolesTable from "./rolesTable"
import CompletedShiftTable from "./completedShiftTable"
import Button from "../../../components/Core/Buttons/Button"
import { FiPlus } from "react-icons/fi"
import { BsCalendar2Date } from "react-icons/bs"

const LocationBasedData = () => {
    const [activeTab, setActiveTab] = useState<string | null>("analytics")
    const currentDate = new Date()
    const navigate = useNavigate()
    currentDate.setDate(currentDate.getDate() - 7)

    const [value, setValue] = useState<DateRangePickerValue>([
        currentDate,
        new Date(),
    ])
    return (
        <Layout pageTitle="Location">
            <div className="absolute md:top-6 pl-6">
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
                                className="text-xl md:text-3xl font-creatoBold text-black-100 font-extrabold"
                                data-testid="location_title"
                            >
                                Birmingham, United Kingdom
                            </h1>
                            <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                                Added November 12, 2023 | 12:38 PM
                            </p>
                        </div>
                    </div>
                    {activeTab !== "analytics" ? (
                        <Button
                            variant="primary"
                            className="py-3 font-semibold font-creatoMedium"
                            iconLeft={<FiPlus size={20} />}
                            onClick={() => {}}
                            data-testid="add_location_btn"
                        >
                            {activeTab === "roles" ? (
                                <>Add new user</>
                            ) : (
                                <>Post a new shift</>
                            )}
                        </Button>
                    ) : null}
                </div>
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
                        <Tabs.Tab value="roles">
                            <p
                                id="roles"
                                className={
                                    activeTab === "roles"
                                        ? "text-black-100 text-lg font-creatoMedium active"
                                        : `font-creatoMedium text-black-40 text-lg inactive`
                                }
                            >
                                Roles
                                <span
                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                        activeTab === "roles"
                                            ? "bg-white lg:text-white-100 text-dark-green-500  md:bg-red-100 text-3sm "
                                            : "bg-gray-100 text-white-100 text-3sm"
                                    }`}
                                >
                                    12
                                </span>
                            </p>
                        </Tabs.Tab>
                        <Tabs.Tab value="shifts-board">
                            <p
                                id="shifts-board"
                                className={
                                    activeTab === "shifts-board"
                                        ? "text-black-100 text-lg font-creatoMedium active"
                                        : `font-creatoMedium text-black-40 text-lg inactive`
                                }
                            >
                                Shifts Board
                                <span
                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                        activeTab === "shifts-board"
                                            ? "bg-white lg:text-white-100 text-dark-green-500  md:bg-red-100 text-3sm "
                                            : "bg-gray-100 text-white-100 text-3sm"
                                    }`}
                                >
                                    12
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
                                    12
                                </span>
                            </p>
                        </Tabs.Tab>
                        <Tabs.Tab value="upcoming-shifts">
                            <p
                                id="upcoming-shifts"
                                className={
                                    activeTab === "upcoming-shifts"
                                        ? "text-black-100 text-lg font-creatoMedium active"
                                        : `font-creatoMedium text-black-40 text-lg inactive`
                                }
                            >
                                Upcoming Shifts
                                <span
                                    className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                        activeTab === "upcoming-shifts"
                                            ? "bg-white lg:text-white-100 text-dark-green-500  md:bg-red-100 text-3sm "
                                            : "bg-gray-100 text-white-100 text-3sm"
                                    }`}
                                >
                                    12
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
                                    12
                                </span>
                            </p>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="analytics" pt="xs">
                        <Analytics value={value} />
                    </Tabs.Panel>

                    <Tabs.Panel value="roles" pt="xs">
                        <RolesTable />
                    </Tabs.Panel>

                    <Tabs.Panel value="shifts-board" pt="xs">
                        <ShiftBoard />
                    </Tabs.Panel>

                    <Tabs.Panel value="active-shifts" pt="xs">
                        <ActiveShift />
                    </Tabs.Panel>

                    <Tabs.Panel value="upcoming-shifts" pt="xs">
                        <UpcomingShift />
                    </Tabs.Panel>

                    <Tabs.Panel value="completed-shifts" pt="xs">
                        <CompletedShiftTable />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </Layout>
    )
}

export default LocationBasedData
