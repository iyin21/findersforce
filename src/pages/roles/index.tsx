import { useState } from "react"
import { FiPlus } from "react-icons/fi"
import { Button } from "../../components"
import Layout from "../../components/Layout"

const Roles = () => {
    const [openAddUser, setOpenAddUser] = useState(false)

    return (
        <Layout pageTitle="Roles and permission">
            <div className="p-6 mt-14">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-creatoBold text-black-100 ">
                            Roles and permission
                        </h1>
                        <p className="text-black-60 text-2md md:text-lg font-normal font-creato">
                            Operatives who apply for shifts appear here
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        className="py-3 font-semibold font-creatoMedium"
                        iconLeft={<FiPlus size={20} />}
                        onClick={() => setOpenAddUser(!openAddUser)}
                    >
                        Add new role
                    </Button>
                </div>
            </div>
        </Layout>
    )
}

export default Roles
