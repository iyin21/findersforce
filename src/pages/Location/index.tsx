import Button from "../../components/Core/Buttons/Button"
import Layout from "../../components/Layout"
import { FiPlus } from "react-icons/fi"
import LocationTable from "./components/tables/location-table"
import { useState } from "react"
import AddLocationModal from "../../components/Modals/Location/add-location-modal"

const Location = () => {
    const [opened, setOpened] = useState(false)

    return (
        <Layout pageTitle={"Location"}>
            <div className="md:p-6 p-6 mt-4 md:mt-14">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1
                            className="text-2xl md:text-3xl font-creatoBold text-black-100 font-bold"
                            data-testid="location_title"
                        >
                            Location
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            All of your organization`s location in one glance
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        className="py-3 font-semibold font-creatoMedium ml-2 md:ml-0"
                        iconLeft={<FiPlus size={20} />}
                        onClick={() => setOpened(true)}
                        data-testid="add_location_btn"
                    >
                        Add new location
                    </Button>
                </div>
                <LocationTable />
            </div>
            <AddLocationModal opened={opened} setOpened={setOpened}/>
        </Layout>
    )
}

export default Location
