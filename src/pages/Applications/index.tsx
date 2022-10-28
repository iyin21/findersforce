import { Tabs } from "@mantine/core"
import ApplicationTable from "./components/application-table"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Applications = () => {
    const [activeTab, setActiveTab] = useState( 0);
    return (
        <div className="p-4">
            <h5 className="font-bold">Applications</h5>
            <p className="text-black-60 mb-2">Operatives who apply for shifts appear here</p>
           
        
            <Tabs variant="unstyled" active={activeTab} onTabChange={setActiveTab} >
            <Tabs.Tab label="Pending" className={`body-regular mr-6 ${activeTab===0 ? "text-yellow-100":"text-black-60" }`}>
                <ApplicationTable
                elements={new Array(5).fill({
                    name: "Shaquan Roberts",
                    jobType: "2-WAY",
                    qualification: "T1/T2",
                    match: "90%",
                    rating: "4.9%",
                    dateApplied: "Nov 15, 2022",
                    timeApplied: "14:13PM",
                })}
            />
            </Tabs.Tab>
            <Tabs.Tab label="Accepted " className={`body-regular mr-6 ${activeTab===1 ? "text-yellow-100":"text-black-60" }`}>

            </Tabs.Tab>
            <Tabs.Tab label="Rejected" className={`body-regular ${activeTab===2 ? "text-yellow-100":"text-black-60" }`}>

            </Tabs.Tab>
            </Tabs>
            {/* <Tabs defaultValue="pending">
                <Tabs.List>
                    <Tabs.Tab value="pending">Pending</Tabs.Tab>
                    <Tabs.Tab value="accepted">Accepted</Tabs.Tab>
                    <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="pending" pt="xs">
                    <ApplicationTable
                        elements={new Array(5).fill({
                            name: "Shaquan Roberts",
                            jobType: "2-Way",
                            qualification: "T1/T2",
                            match: "90%",
                            rating: "4.9%",
                            dateApplied: "Nov 15, 2022",
                            timeApplied: "14:13PM",
                        })}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="accepted" pt="xs">
                    <ApplicationTable
                        elements={new Array(5).fill({
                            name: "Shaquan Roberts",
                            jobType: "2-Way",
                            qualification: "T1/T2",
                            match: "90%",
                            rating: "4.9%",
                            dateApplied: "Nov 15, 2022",
                            timeApplied: "14:13PM",
                        })}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="rejected" pt="xs">
                    <ApplicationTable
                        elements={new Array(5).fill({
                            name: "Shaquan Roberts",
                            jobType: "2-Way",
                            qualification: "T1/T2",
                            match: "90%",
                            rating: "4.9%",
                            dateApplied: "Nov 15, 2022",
                            timeApplied: "14:13PM",
                        })}
                    />
                </Tabs.Panel>
            </Tabs> */}
        </div>
    )
}

export default Applications
