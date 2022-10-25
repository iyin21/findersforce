import { Button } from "../../components/index"
import { FiPlus } from "react-icons/fi"
import { BiFilter } from "react-icons/bi"
import { useState } from "react"
import { Tabs } from "@mantine/core"
import JobBoardTable from "./components/table/job-table"
import styles from "./job.module.scss"
import PostJob from "../../components/Modals/PostJob"
import JobSuccessful from "../../components/Modals/PostJob/components/success"

const JobBoards = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [openJobPost, setOpenJobPost] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)

    return (
        <div className="md:p-6 p-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold">
                        Job Board
                    </h1>
                    <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                        This is a subtext describing what users can see here
                    </p>
                </div>
                <Button
                    variant="primary"
                    className="py-3 font-semibold font-creatoMedium"
                    iconLeft={<FiPlus size={20} />}
                    onClick={() => setOpenJobPost(true)}
                >
                    Post a job
                </Button>
            </div>

            <div className="px-3 pt-10 md:pt-4">
                {" "}
                <div className="relative lg:pb-4 bottom-0 lg:bottom-0">
                    <div className="absolute right-0 ">
                        {" "}
                        <Button
                            variant="clear"
                            iconLeft={<BiFilter size={30} />}
                        >
                            Filter
                        </Button>
                    </div>
                </div>
                <div>
                    <Tabs
                        variant="unstyled"
                        active={activeTab}
                        onTabChange={setActiveTab}
                    >
                        <Tabs.Tab
                            className={styles.first_tab}
                            label={
                                <p
                                    className={
                                        activeTab === 0
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : "font-creatoMedium text-black-40 text-lg inactive"
                                    }
                                >
                                    Active
                                </p>
                            }
                        >
                            <JobBoardTable
                                elements={new Array(15).fill({
                                    type: "2-Way",
                                    location: "Iolaire Road, New Invention",
                                    date: "Nov 15, 2022",
                                    hourly_rate: "£100/hour",
                                    duration: "20 hours",
                                    applicants: "134/200",
                                    mode: "MEET ONSITE",
                                    id: "1",
                                })}
                                status="active"
                            />
                        </Tabs.Tab>
                        <Tabs.Tab
                            className={styles.second_tab}
                            label={
                                <p
                                    className={
                                        activeTab === 1
                                            ? "text-black-100 text-lg font-creatoMedium active"
                                            : `font-creatoMedium text-black-40 text-lg inactive`
                                    }
                                >
                                    Drafts
                                </p>
                            }
                        >
                            <JobBoardTable
                                elements={new Array(15).fill({
                                    type: "2-Way",
                                    location: "Iolaire Road, New Invention",
                                    date: "Nov 15, 2022",
                                    hourly_rate: "£100/hour",
                                    duration: "20 hours",
                                    applicants: "134/200",
                                    mode: "MEET ONSITE",
                                    id: "1",
                                })}
                                status="draft"
                            />
                        </Tabs.Tab>
                    </Tabs>
                </div>{" "}
            </div>

            {openJobPost && (
                <PostJob
                    opened={openJobPost}
                    setOpened={setOpenJobPost}
                    setOpenSuccess={setOpenSuccess}
                />
            )}
            {openSuccess && (
                <JobSuccessful
                    opened={openSuccess}
                    setOpened={setOpenSuccess}
                />
            )}
        </div>
    )
}

export default JobBoards
