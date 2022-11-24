import Layout from "../../components/Layout"
import useAuthContext from "../../hooks/auth-hooks/useAuth"
import { HQDepotType, RegionalManager } from "../../utils/user-types"
import HQRoles from "./HQ/hq-roles"
import { CgSpinner } from "react-icons/cg"
import RMRoles from "./RM"

const Roles = () => {
    const { state } = useAuthContext()

    switch (true) {
        case state?.user?.depotRole === HQDepotType:
            return (
                <Layout pageTitle="Trade">
                    <HQRoles />
                </Layout>
            )
        case state?.user?.depotRole === RegionalManager:
            return <RMRoles />

        default:
            return (
                <>
                    <div className="h-screen w-full flex items-center justify-center">
                        <img
                            src="/logo/voriancorelli-logo.png"
                            alt=""
                            className="animate-pulse"
                        />
                        <CgSpinner className="animate-spin text-primary-90 text-2xl ml-3" />
                    </div>
                </>
            )
    }
}

export default Roles
