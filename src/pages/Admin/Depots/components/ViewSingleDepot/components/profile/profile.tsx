import { Tabs } from "@mantine/core"
import { useState } from "react"
import ProfileWages from "./profile-wages"

const Profile = () => {
    const [activeTab, setActiveTab] = useState<string | null>("business")

    return (
        <div className="mt-8">
            <div className="bg-yellow-5 p-6">
                <h4 className="text-black-60 text-2lg md:text-xl font-creatoMedium border-b border-black-5 pb-2">
                    PERSONAL INFORMATION
                </h4>

                <div className="grid lg:grid-cols-2 mt-5 mr-4 lg:mr-0 font-creato gap-4">
                    <div>
                        <h6 className="text-black-50 ">EMAIL</h6>
                        <p className="text-lg font-semibold">
                            robertshaquan@findersforce.com
                        </p>
                    </div>
                    <div>
                        <h6 className="text-black-50 ">PHONE NUMBER</h6>
                        <p className="text-lg font-semibold">+445480844</p>
                    </div>
                    <div>
                        <h6 className="text-black-50 ">ADDRESS</h6>
                        <p className="text-lg font-semibold">
                            11 Maryland road Liverpool United Kingdom
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <Tabs
                    value={activeTab}
                    onTabChange={setActiveTab}
                    color="yellow"
                    keepMounted={false}
                    data-testid="job_tabs"
                >
                    <Tabs.List>
                        <Tabs.Tab value="business">
                            <p
                                className={
                                    activeTab === "business"
                                        ? "text-black-100 text-lg font-creatoMedium active"
                                        : "font-creatoMedium text-black-40 text-lg inactive"
                                }
                            >
                                Business Information
                            </p>
                        </Tabs.Tab>
                        <Tabs.Tab value="wage">
                            <p
                                className={
                                    activeTab === "wage"
                                        ? "text-black-100 text-lg font-creatoMedium active"
                                        : "font-creatoMedium text-black-40 text-lg inactive"
                                }
                            >
                                Wage
                            </p>
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="business">
                        <div className="grid lg:grid-cols-2 mt-5 mr-4 lg:mr-0 font-creato gap-4">
                            <div>
                                <h6 className="text-black-50 ">
                                    BUSINESS NAME
                                </h6>
                                <p className="text-lg font-semibold">
                                    Robert shaquan
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 ">PHONE NUMBER</h6>
                                <p className="text-lg font-semibold">
                                    +445480844
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 ">LOCATION</h6>
                                <p className="text-lg font-semibold">4</p>
                            </div>
                            <div>
                                <h6 className="text-black-50 ">EMAIL</h6>
                                <p className="text-lg font-semibold">
                                    robertshaquan@findersforce.com
                                </p>
                            </div>
                            <div>
                                <h6 className="text-black-50 ">ADDRESS</h6>
                                <p className="text-lg font-semibold">
                                    11 Maryland road Liverpool United Kingdom
                                </p>
                            </div>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="wage">
                        <ProfileWages />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}

export default Profile
