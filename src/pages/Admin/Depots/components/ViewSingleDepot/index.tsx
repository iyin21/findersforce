import { AddNewWageModal, Button, EditWage } from "../../../../../components"
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom"
import Layout from "../../.../../../../../components/Layout"
import { FiPlus } from "react-icons/fi"
import { MdOutlineStarPurple500 } from "react-icons/md"
import Avatar from "../../.././../../assets/ProfileImage.svg"
import { useState } from "react"
import { Tabs } from "@mantine/core"
import Profile from "./components/profile/profile"
import DepotShiftTable from "./components/shiftTable/shift-table"
import OperativeTable from "./components/operativesTable/operative-table"
import ManagersTable from "./components/managers/managers-tables"
import DepotLocationTable from "./components/location/depot-location"
import DepotPaymentTable from "./components/payment/depot-payments"
import DepotWagesTable from "./components/wages/wages-table"

const SingleDepot = () => {
    const [activeTab, setActiveTab] = useState<string | null>("profile")
    const [openEditWageModal, setOpenEditWageModal] = useState(false)
    const [openNewWageModal, setOpenNewWageModal] = useState(false)

    return (
        <Layout>
            {openEditWageModal && (
                <EditWage
                    setOpened={setOpenEditWageModal}
                    opened={openEditWageModal}
                    isLoading={false}
                    setOpenNewWage={setOpenNewWageModal}
                />
            )}
            {openNewWageModal && (
                <AddNewWageModal
                    opened={openNewWageModal}
                    setOpened={setOpenNewWageModal}
                    isLoading={false}
                />
            )}
            <div className="bg-black-10 p-2 w-fit mx-4 rounded-lg relative z-20 hidden md:block">
                <Link to={"/depots"}>
                    {" "}
                    <BiArrowBack size={30} />
                </Link>
            </div>
            <div className="md:p-6 p-6 mt-8 md:mt-14">
                <div className="flex flex-col lg:flex-row  gap-4 lg:justify-between lg:items-center">
                    <div className="flex flex-row">
                        <img
                            src={Avatar}
                            alt="avatar"
                            className="w-[60px] object-cover"
                        />
                        <div className="">
                            <h1
                                className="text-2mxl md:text-3xl font-Medium text-black-100 font-bold"
                                data-testid="job_title"
                            >
                                Revive Traffic
                            </h1>
                            <p className="text-black-60 text-sm md:text-lg font-normal font-creatoLight flex items-center gap-2">
                                <span> Joined 2 years ago</span> |{" "}
                                <MdOutlineStarPurple500
                                    color="#FED70A"
                                    size={30}
                                />{" "}
                                <strong className="font-creatoMedium">
                                    4.5{" "}
                                </strong>{" "}
                                (0 shifts)
                            </p>
                        </div>
                    </div>
                    {activeTab === "Locations" && (
                        <Button
                            variant="primary"
                            className="py-3 font-semibold font-creatoMedium"
                            iconLeft={<FiPlus size={20} />}
                            // onClick={() => {
                            //     navigate("/add-depots")
                            // }}
                            data-testid="depot_btn"
                        >
                            Add new location
                        </Button>
                    )}
                    {activeTab === "Wage" && (
                        <Button
                            variant="primary"
                            className="py-3 font-semibold font-creatoMedium"
                            iconLeft={<FiPlus size={20} />}
                            onClick={() => {
                                setOpenNewWageModal(true)
                            }}
                            data-testid="depot_btn"
                        >
                            Add new wage
                        </Button>
                    )}
                </div>

                <div className="mt-8">
                    <Tabs
                        value={activeTab}
                        onTabChange={setActiveTab}
                        color="yellow"
                        keepMounted={false}
                        data-testid="job_tabs"
                    >
                        <Tabs.List className="flex-row flex-nowrap flex overflow-auto lg:overflow-hidden">
                            <Tabs.Tab value="profile">
                                {" "}
                                <p
                                    className={
                                        activeTab === "profile"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Profile
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "profile"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {/* {activeData?.data?.length || 0} */}{" "}
                                        0
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="post">
                                {" "}
                                <p
                                    className={
                                        activeTab === "post"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Posts
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "post"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {/* {activeData?.data?.length || 0} */}{" "}
                                        0
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="Operatives">
                                {" "}
                                <p
                                    className={
                                        activeTab === "Operatives"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Operatives
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "Operatives"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {/* {activeData?.data?.length || 0} */}{" "}
                                        0
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="Managers">
                                {" "}
                                <p
                                    className={
                                        activeTab === "Managers"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Managers
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "Managers"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {/* {activeData?.data?.length || 0} */}{" "}
                                        0
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="Locations">
                                {" "}
                                <p
                                    className={
                                        activeTab === "Locations"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Locations
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "Locations"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {/* {activeData?.data?.length || 0} */}{" "}
                                        0
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="Wage">
                                {" "}
                                <p
                                    className={
                                        activeTab === "Wage"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Wage
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "Wage"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {/* {activeData?.data?.length || 0} */}{" "}
                                        0
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="Payments">
                                {" "}
                                <p
                                    className={
                                        activeTab === "Payments"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Payments
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "Payments"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {/* {activeData?.data?.length || 0} */}{" "}
                                        0
                                    </span>
                                </p>
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="profile">
                            <Profile />
                        </Tabs.Panel>
                        <Tabs.Panel value="post">
                            <DepotShiftTable
                                elements={new Array(15).fill({
                                    location: "Iolaire Road, New Invention",
                                    shift_id: "FF-TW|OXF|1345-9R",
                                    mode: "Meet OnSite",
                                    date: "Nov 15, 2022",
                                    name: "Ufonabasi Umo",
                                    hired: 20,
                                    applied: "134",
                                    completed: "20",
                                    cancelled: "0",
                                })}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="Operatives">
                            <OperativeTable
                                elements={new Array(15).fill({
                                    phone_number: "08012345678",
                                    location: 3,
                                    mode: "Meet OnSite",
                                    date: "Nov 15, 2022",
                                    name: "Ufonabasi Umo",
                                    shift_joined: 20,
                                    qualification: "T2",
                                    completed: "20",
                                    cancelled: "0",
                                    email: "ufonumo@gmail.com",
                                })}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="Managers">
                            <ManagersTable
                                elements={new Array(15).fill({
                                    location: "Iolaire Road, New Invention",
                                    date: "Nov 15, 2022",
                                    name: "Ufonabasi Umo",
                                    role: "HQ Manager",
                                    email: "ufonumo@gmail.com",
                                })}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="Locations">
                            <DepotLocationTable
                                elements={new Array(15).fill({
                                    location: "Iolaire Road, New Invention",
                                    date: "Nov 15, 2022",
                                    completed: "20",
                                    cancelled: "0",
                                    managers: "5",
                                    subscription: "Premium",
                                    rating: "4.5",
                                })}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="Wage">
                            <DepotWagesTable
                                elements={new Array(15).fill({
                                    location: "Iolaire Road, New Invention",
                                    date: "Nov 15, 2022",
                                    mos_depots_pays: "£100",
                                    mos_op_receives: "£80",
                                    dpf_depots_pays: "£100",
                                    dpf_op_receives: "£80",
                                    registered_by: "Lola Robert",
                                    qualification: "T2",
                                })}
                                setOpenEditWageModal={setOpenEditWageModal}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="Payments">
                            <DepotPaymentTable
                                elements={new Array(15).fill({
                                    location: "Iolaire Road, New Invention",
                                    date: "Nov 15, 2022",
                                    rating: "4.5",
                                    depot: " Revive Depot",
                                    month: "Nov 2021",
                                    email: "shaquanroberts@revivetraffic.com",
                                })}
                            />
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </Layout>
    )
}

export default SingleDepot
