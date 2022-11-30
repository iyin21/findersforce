import { useMemo } from "react";
import { CgSpinner } from "react-icons/cg";
import useAuthContext from "../../hooks/auth-hooks/useAuth";
import RegionalManagerDashboard from "./dashboard-categories/DepotRm/Rm-Dashboard";
import ShiftManagerDashboard from "./dashboard-categories/DepotSm/Sm-dashboard";
import FindersForceLogo from "../../assets/FindersForceLogo.svg"
import { HQDepotType, RegionalManager, shiftManager } from "../../utils/user-types";
import DepotHqDashboard from "./dashboard-categories/DepotHq/Hq-Dashboard";



const Dashboard = () => {

    const { state } = useAuthContext();
    
    const userState = useMemo(() => {
        return state.user;
      }, [state.user]);
    
      switch (true) {
        case userState?.depotRole === RegionalManager:
            return <RegionalManagerDashboard/>;
        case userState?.depotRole === shiftManager:
            return <ShiftManagerDashboard/>;
        case userState?.depotRole === HQDepotType:
            return <DepotHqDashboard/>
        
        default:
            return (
                <>
                    <div className="h-screen w-full flex items-center justify-center">
                        <img src={FindersForceLogo} alt="" className="animate-pulse" />
                        <CgSpinner className="animate-spin text-primary-90 text-2xl ml-3" />
                    </div>
                </>
            )
      }
}

export default Dashboard
