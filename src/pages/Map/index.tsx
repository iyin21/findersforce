import { Button } from "../../components"
import Layout from "../../components/Layout"
import viewMapIcon from "../../assets/svg/view_map.svg"
import locationIcon from "../../assets/LocationIcon.svg"
import { useState } from "react"
import { useGetDepotRegions } from "../../hooks/dashboard/useDashboard.hook"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import { Select } from "@mantine/core"
import MapTable from "./components/table/map-table"
import { useNavigate } from "react-router-dom"

const Maps = () => {
    const { state } = useAuthContext()

    const [selectValue, setSelectValue] = useState<string | null>(null)
    const companyId = state?.user?.company?._id
    const navigate = useNavigate()

    const { data: regionData } = useGetDepotRegions({
        id: companyId,
    })

    let regionAddress: any
    if (regionData) {
        regionAddress = regionData?.data?.map((item) => {
            return {
                label: item?.address,
                value: item?._id,
            }
        })
    } else {
        regionAddress = []
    }
    return (
        <Layout pageTitle="Maps">
            <div className="md:p-6 p-6 mt-4 md:mt-14">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                    <div className="flex flex-col">
                        <h1
                            className="text-2xl md:text-3xl font-creatoMedium text-black-100 font-bold"
                            data-testid="map_title"
                        >
                            Maps
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            Find local Operatives for shifts & track your
                            Organization’s assigned Operatives.
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        {" "}
                        <Button
                            className="py-3 font-semibold font-creatoMedium my-4 lg:my-0 bg-black-100 text-white-100"
                            iconLeft={<img src={viewMapIcon} alt="view maps" />}
                            onClick={() => {
                                navigate("/view-all-maps")
                            }}
                            data-testid="job_post_btn"
                        >
                            View Maps
                        </Button>
                        <Select
                            placeholder="All Locations"
                            data={regionAddress}
                            value={selectValue}
                            onChange={setSelectValue}
                            variant="filled"
                            icon={
                                <img src={locationIcon} alt="location icon" />
                            }
                            classNames={{
                                item: "py-3",
                            }}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <MapTable
                        elements={new Array(10).fill({
                            listingId: "2-WAY | LONDON | W1B 4JR",
                            location: "I187 Regent Street, Lon...",
                            schedule: "08:00 - 17:00",
                            wages: "£100",
                            jobMeetingPoint: "SITE",
                            ends_in: new Date(),
                        })}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Maps
