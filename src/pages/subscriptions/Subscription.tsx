import useAuthContext from "../../hooks/auth-hooks/useAuth"
import { useMemo } from "react"
import { admin, HQDepotType } from "../../utils/user-types"
import AdminSubscription from "./subscription-categories/Ad-Subscription"
import HqSubscription from "./subscription-categories/Hq-Subscription"
import FindersForceLogo from "../../assets/FindersForceLogo.svg"
import { CgSpinner } from "react-icons/cg"

const Subscription = () => {
    const { state } = useAuthContext()

    const userState = useMemo(() => {
        return state.user
    }, [state.user])

    switch (true) {
        case userState?.accountType === admin:
            return <AdminSubscription />
        case userState?.depotRole === HQDepotType:
            return <HqSubscription />

        default:
            return (
                <>
                    <div className="h-screen w-full flex items-center justify-center">
                        <img
                            src={FindersForceLogo}
                            alt=""
                            className="animate-pulse"
                        />
                        <CgSpinner className="animate-spin text-primary-90 text-2xl ml-3" />
                    </div>
                </>
            )
    }
}

export default Subscription
