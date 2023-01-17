import Button from "../../components/Core/Buttons/Button"
import Layout from "../../components/Layout"
import { FiPlus } from "react-icons/fi"
import LocationTable from "./components/tables/location-table"
import { useState } from "react"
import AddLocationModal from "../../components/Modals/Location/add-location-modal"
import { useGetAllDepotRegions } from "../../hooks/location/depot-hook"
import { CgSpinner } from "react-icons/cg"
import EmptyState from "../../pages/Approvals/components/EmptyState"

const Location = () => {
    const [opened, setOpened] = useState(false)
    const { data, isLoading } = useGetAllDepotRegions()
    
    return (
        <Layout pageTitle={"Location"}>
            <div className="md:p-6 p-6 mt-4 md:mt-14 font-creato">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1
                            className="text-2xl md:text-3xl font-creato text-black-100 font-bold"
                            data-testid="location_title"
                        >
                            Depot
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            Access the activity across your entire Organisation
                            with just one glance.
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        className="py-3 font-semibold font-creato ml-2 md:ml-0"
                        iconLeft={<FiPlus size={20} />}
                        onClick={() => setOpened(true)}
                        data-testid="add_location_btn"
                    >
                        Add Depot
                    </Button>
                </div>
                {isLoading ? (
                    <div className="h-screen w-full flex mt-24 justify-center">
                        <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                    </div>
                ) : data?.data && data.data.length > 0 ? (
                    <LocationTable elements={data.data} />
                ) : (
                    <EmptyState description="You are the only active depot in your Organisation." />
                )}
            </div>
            <AddLocationModal opened={opened} setOpened={setOpened} />
        </Layout>
    )
}

export default Location
