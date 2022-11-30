import { useMemo } from "react";
import useAuthContext from "../../../hooks/auth-hooks/useAuth"
import RegionalManagerSidebar from "./sidebar-categories/Rm-Sidebar";
import { RegionalManager, shiftManager, HQDepotType } from "../../../utils/user-types"
import ShiftManagerSidebar from "./sidebar-categories/Sm-Sidebar";
import DepotHqSidebar from "./sidebar-categories/Hq-Sidebar";


const Sidebar = () => {

  
  const { state } = useAuthContext();

  const userState = useMemo(() => {
    return state.user;
  }, [state.user]);

  if (userState?.depotRole === RegionalManager ) {
    return <RegionalManagerSidebar />
  }

  if (userState?.depotRole === shiftManager ) {
    return <ShiftManagerSidebar />
  }

  if (userState?.depotRole === HQDepotType ) {
    return <DepotHqSidebar />
  }
  
  if(!userState) {
    return null;
  }

  return null;

}

export default Sidebar