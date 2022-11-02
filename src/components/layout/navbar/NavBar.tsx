import Logout from "../../../assets/LogoutNavBar.svg" 
import Messaging from "../../../assets/Messaging.svg" 
import SettingsCog from "../../../assets/SettingsCog.svg" 
import User from "../../../assets/User.svg" 
import Search from "../../../assets/Search.svg" 

const NavBar = () => {
  return (
    <nav className="w-full sticky top-0 h-10 flex items-center justify-end gap-12 bg-white-100 px-14 ">
        <img src={Search} alt="search icon " className="cursor-pointer" />
        <img src={Messaging} alt="Messaging icon "  className="cursor-pointer"/>
        <img src={SettingsCog} alt="SettingsCog icon" className="cursor-pointer" />
        <img src={User} alt="User icon" className="cursor-pointer" />
        <img src={Logout} alt="Logout icon" className="cursor-pointer"/>
        
    </nav>
  )
}

export default NavBar
