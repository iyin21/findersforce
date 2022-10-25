import { Tabs } from "@mantine/core"
import { useState } from "react"
import { HiPencil } from "react-icons/hi"
import { BsTrashFill } from "react-icons/bs"
import Button from "../../../../components/Core/Buttons/Button"
import JobInformation from "./components/job-information"
import { BiFilter } from "react-icons/bi"
import EmptyApplication from "../../../../components/EmptyApplication"
// import { useParams } from "react-router-dom"

const SingleJobBoard = () => {
    // const { id } = useParams<{ id: string }>()
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="md:p-6 p-6">
            <div className="relative md:pb-4 bottom-4 hidden md:block md:bottom-0">
                {activeTab === 0 ? (
                    <div className="flex justify-between absolute right-0 ">
                        {" "}
                        <Button
                            variant="clear"
                            iconLeft={<HiPencil size={25} />}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="clear"
                            iconLeft={<BsTrashFill size={20} color="#E94444" />}
                            className="text-red-100"
                        >
                            Delete
                        </Button>
                    </div>
                ) : (
                    <div className="absolute right-0 ">
                        {" "}
                        <Button
                            variant="clear"
                            iconLeft={<BiFilter size={30} />}
                        >
                            Filter
                        </Button>
                    </div>
                )}
            </div>
            <Tabs
                variant="unstyled"
                active={activeTab}
                onTabChange={setActiveTab}
            >
                <Tabs.Tab
                    label={
                        <p
                            className={
                                activeTab === 0
                                    ? "text-black-100 text-lg font-creatoMedium active"
                                    : "font-creatoMedium text-black-40 text-lg inactive"
                            }
                        >
                            Job Information
                        </p>
                    }
                >
                    <JobInformation
                        description="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. "
                        shiftType="2-WAY"
                        time="8:00 AM - 5:00 PM"
                        hourlyPay="$100/hour"
                        date="Wed, Dec 1 2022"
                        location="Iolaire Road, New Invention Road"
                        noOfOperativesRequired="2"
                        requiredQualification="T1"
                        others="T1, T2, APR 3"
                        shiftMode="Depot First"
                    />
                </Tabs.Tab>
                <Tabs.Tab
                    label={
                        <p
                            className={
                                activeTab === 1
                                    ? "text-black-100 text-lg font-creatoMedium active"
                                    : "font-creatoMedium text-black-40 text-lg inactive"
                            }
                        >
                            Applications
                            <span
                                className={`{" ml-2 py-1 px-2 rounded text-white-100 "} ${
                                    activeTab === 1
                                        ? "bg-white lg:text-white-100 text-dark-green-500  lg:bg-red-100 text-3sm "
                                        : "bg-red-100 text-white-100 text-3sm"
                                }`}
                            >
                                10
                            </span>
                        </p>
                    }
                >
                    <EmptyApplication />
                    {/* <ApplicationJobTable
                        elements={new Array(15).fill({
                            name: "Shaquan Roberts",
                            qualification: "T1/T2",
                            match: "90%",
                            rating: "4.3",
                            date_applied: "Nov 15, 2022 ",
                            time_applied: "22 : 12 PM",
                            status: "ACCEPTED",
                            id: "1",
                        })}
                    /> */}
                </Tabs.Tab>
            </Tabs>
        </div>
    )
}

export default SingleJobBoard
