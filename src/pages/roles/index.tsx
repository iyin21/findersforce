import { Tabs } from "@mantine/core"
import { useState } from "react"
import { FiPlus } from "react-icons/fi"
import { FilterRequest } from "../../types/filter/filter"
import { AddUser, Button, Filter, Pagination } from "../../components"
import Layout from "../../components/Layout"
import RoleTable from "./components/role-table"

const Roles = () => {
    const [openAddUser, setOpenAddUser] = useState(false)
    const [activeTab, setActiveTab] = useState<string | null>("active")
    const applyFilter = (filter: FilterRequest) => {}

    return (
        <Layout pageTitle="Roles and permission">
            <div className="p-6 mt-4 md:mt-14">
                <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-creatoBold text-black-100 ">
                            Roles and permission
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            Operatives who apply for shifts appear here
                        </p>
                    </div>
                    <div className="flex justify-end mb-3">
                        <Button
                            variant="primary"
                            className="py-3 font-semibold font-creatoMedium text-3sm "
                            iconLeft={<FiPlus size={20} />}
                            onClick={() => setOpenAddUser(!openAddUser)}
                        >
                            Add new role
                        </Button>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="relative lg:pb-4 bottom-0 lg:bottom-0">
                        <div className="absolute right-0 ">
                            {" "}
                            <div className="flex justify-between gap-3">
                                <Filter applyFilter={applyFilter} />
                            </div>
                        </div>
                    </div>
                    <Tabs
                        value={activeTab}
                        onTabChange={setActiveTab}
                        color="yellow"
                        keepMounted={false}
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
                                </p>
                            </Tabs.Tab>
                            <Tabs.Tab value="pending">
                                <p
                                    className={
                                        activeTab === "pending"
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : `font-creatoMedium text-black-40 text-lg inactive`
                                    }
                                >
                                    Pending
                                </p>
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="active">
                            <RoleTable
                                elements={new Array(15).fill({
                                    name: "Shaquan Roberts",
                                    location: "Iolaire Road, New Invention",
                                    email: "ufonumo@gmail.com",
                                    date: "Nov 15, 2022",
                                    role: "Admin",
                                    status: "active",
                                })}
                                status="active"
                            />
                            <Pagination
                                page={1}
                                total={1}
                                onChange={() => {}}
                                boundaries={1}
                                recordPerpage={1}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="pending">
                            {" "}
                            <RoleTable
                                elements={new Array(15).fill({
                                    name: "Shaquan Roberts",
                                    location: "Iolaire Road, New Invention",
                                    email: "ufonumo@gmail.com",
                                    date: "Nov 15, 2022",
                                    role: "Admin",
                                    status: "Inactive",
                                })}
                                status="pending"
                            />
                            <Pagination
                                page={1}
                                total={1}
                                onChange={() => {}}
                                boundaries={1}
                                recordPerpage={1}
                            />
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
            <AddUser opened={openAddUser} setOpened={setOpenAddUser} />
        </Layout>
    )
}

export default Roles
