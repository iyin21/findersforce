import { Tabs } from "@mantine/core"
import { useState } from "react"
import { FiPlus } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { Button, EmptyState } from "../../../components"
import Layout from "../../../components/Layout"
import DepotTable from "./components/Tables/depot-table"

const AdminDepot = () => {
    const [activeTab, setActiveTab] = useState<string | null>("active")
    const navigate = useNavigate()
    return (
        <Layout>
            <div className="md:p-6 p-6 mt-4 md:mt-14">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1
                            className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold"
                            data-testid="job_title"
                        >
                            Depots
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            Depots can be registered here
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        className="py-3 font-semibold font-creatoMedium"
                        iconLeft={<FiPlus size={20} />}
                        onClick={() => {
                            navigate("/add-depots")
                        }}
                        data-testid="depot_btn"
                    >
                        Add a depot
                    </Button>
                </div>

                <div className="mt-8">
                    <Tabs
                        value={activeTab}
                        onTabChange={setActiveTab}
                        color="yellow"
                        keepMounted={false}
                        data-testid="job_tabs"
                    >
                        <Tabs.List>
                            <Tabs.Tab value="active">
                                {" "}
                                <p
                                    className={
                                        activeTab === "active"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Active
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "active"
                                                ? "bg-white-100  lg:text-white-100 text-black-100  md:bg-red-100 text-3sm "
                                                : "bg-red-40 text-white-100 text-3sm"
                                        }`}
                                    >
                                        {/* {activeData?.data?.length || 0} */}{" "}
                                        0
                                    </span>
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="pending">
                                {" "}
                                <p
                                    className={
                                        activeTab === "pending"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Pending
                                    <span
                                        className={`{" ml-2 py-1 px-2 rounded md:text-white-100 "} ${
                                            activeTab === "pending"
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
                        <Tabs.Panel value="active">
                            <DepotTable
                                status="active"
                                elements={new Array(15).fill({
                                    headquarter: "Iolaire Road, New Invention",
                                    location: 3,
                                    date: "Nov 15, 2022",
                                    name: "Ufonabasi Umo",
                                    shift: 20,
                                    operatives: "134",
                                    _id: "1",
                                    email: "ufonumo@gmail.com",
                                })}
                            />
                            <EmptyState
                                description="Active depot data will show here, when you add one"
                                buttonText="Add a depot"
                                handleButtonClick={() => {
                                    navigate("/add-depots")
                                }}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="pending">
                            <DepotTable
                                status="pending"
                                elements={new Array(15).fill({
                                    headquarter: "Iolaire Road, New Invention",
                                    location: 3,
                                    date: "Nov 15, 2022",
                                    name: "Ufonabasi Umo",
                                    shift: 20,
                                    operatives: "134",
                                    _id: "1",
                                    email: "ufonumo@gmail.com",
                                })}
                            />
                            <EmptyState
                                description="Pending depot data will show here, when you add one"
                                buttonText="Add a depot"
                                handleButtonClick={() => {
                                    navigate("/add-depots")
                                }}
                            />
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDepot
