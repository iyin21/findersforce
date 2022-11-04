import Logout from "../../../assets/LogoutNavBar.svg" 
import Messaging from "../../../assets/Messaging.svg" 
import SettingsCog from "../../../assets/SettingsCog.svg" 
import User from "../../../assets/User.svg" 
import FindersForceLogo from "../../../assets/FindersForceLogo.svg"
import Search from "../../../assets/Search.svg" 

const NavBar = () => {
  return (
    <nav className="w-full sticky top-0 h-12 pt-6 pb-6 flex items-center justify-between bg-white-100">
      <div className="w-64 bg-black-100">
        <img src={FindersForceLogo} alt="" className="p-3 my-5 ml-5"/>
      </div>
      <div className=" flex items-center justify-between px-12 gap-12 ">
        <img src={Search} alt="search icon " className="cursor-pointer" />
        <img src={Messaging} alt="Messaging icon "  className="cursor-pointer"/>
        <img src={SettingsCog} alt="SettingsCog icon" className="cursor-pointer" />
        <img src={User} alt="User icon" className="cursor-pointer" />
        <img src={Logout} alt="Logout icon" className="cursor-pointer"/>
      </div>
        
    </nav>
  )
}

export default NavBar
