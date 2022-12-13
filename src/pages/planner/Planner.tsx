import { useMemo } from "react";
import { CgSpinner } from "react-icons/cg";
import useAuthContext from "../../hooks/auth-hooks/useAuth";
import FindersForceLogo from "../../assets/FindersForceLogo.svg"
import { HQDepotType, RegionalManager, shiftManager } from "../../utils/user-types";
import HqPlanner from "./planner-categories/Hq-Planner";
import RmPlanner from "./planner-categories/Rm-Planner";
import SmPlanner from "./planner-categories/Sm-Planner";




const Planner = () => {

    const { state } = useAuthContext();
    console.log(state.jwt?.token)
    
    const userState = useMemo(() => {
        return state.user;
      }, [state.user]);
    
      switch (true) {
        case userState?.depotRole === RegionalManager:
            return <RmPlanner/>;
        case userState?.depotRole === shiftManager:
            return <SmPlanner/>;
        case userState?.depotRole === HQDepotType:
            return <HqPlanner/>
        
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

export default Planner
