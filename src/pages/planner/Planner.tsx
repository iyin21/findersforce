import { Tabs } from "@mantine/core"
import { useState } from "react"
import { BiFilter } from "react-icons/bi"
import Layout from "../../components/layout/Layout"
import { Button } from "../../components/index"
import ShiftsTable from "./components/ShiftsTable"
import styles from "./shifts.module.scss"
import ShiftsDetailTable from "./components/ShiftsDetailsTable"



const Planner = () => {
                const [activeTab, setActiveTab] = useState(0)
                return (
                  <Layout pageTitle={"Planner"} >
                    <main className="md:p-6 p-6">
              
              
                      <ShiftsDetailTable
                        elements={new Array(15).fill({
                          name: "Shaquan Roberts",
                          time_in: "11:01 AM",
                          time_out: "1:01 AM",
                          duration: "2hrs 2mins",
                          amount: "$140",
                          rating: "4.9",
                          status: "COMPLETED",
                          more: "",
                          id: "1",
                        })}
                      />
              
                      {/* <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                              <h1 className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold">
                                  Shifts
                              </h1>
                              <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                              Operatives who apply for shifts appear here
                              </p>
                          </div>
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
                                              Upcoming
                                          </p>
                                      }
                                  >
                                      <ShiftsTable
                                          elements={new Array(15).fill({
                                              name: "Shaquan Roberts",
                                              job_type: "2-Way",
                                              location: "Iolaire Road, New Invention",
                                              date: "Nov 15, 2022 | 9-11AM",
                                              hourly_rate: "$140/hr",
                                              duration: "2 hours",
                                              mode: "MEET ONSITE",
                                              id: "1",
                                          })}
                                          status="upcoming"
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
                                              Active
                                          </p>
                                      }
                                  >
                                      <ShiftsTable
                                          elements={new Array(15).fill({
                                              name: "Shaquan Roberts",
                                              job_type: "2-Way",
                                              location: "Iolaire Road, New Invention",
                                              schedule: "9-11AM",
                                              hourly_rate: "$140/hr",
                                              mode: "MEET ONSITE",
                                              ends_in: "00 : 00 : 00",
                                              id: "1",
                                          })}
                                          status="active"
                                      />
                                  </Tabs.Tab>
                                  <Tabs.Tab
                                      className={styles.third_tab}
                                      label={
                                          <p
                                              className={
                                                  activeTab === 2
                                                      ? "text-black-100 text-lg font-creatoMedium active"
                                                      : `font-creatoMedium text-black-40 text-lg inactive`
                                              }
                                          >
                                              Completed
                                          </p>
                                      }
                                  >
                                      <ShiftsTable
                                          elements={new Array(15).fill({
                                              job_type: "2-Way",
                                              location: "Iolaire Road, New Invention",
                                              date: "Nov 15, 2022",
                                              hourly_rate: "£100/hour",
                                              duration: "4 hours",
                                              active: "134",
                                              rating: "4.9",
                                              mode: "MEET ONSITE",
                                              id: "1",
                                          })}
                                          status="completed"
                                      />
                                  </Tabs.Tab>
                              </Tabs>
                          </div>{" "}
                      </div> */}
                    </main>
                  </Layout>
                )
              }
              
              export default Planner