import { RegionalManagerRoute } from "./utils/routes"
import Profile from "../../../assets/Profile.svg"
import ProfileImage from "../../../assets/ProfileImage.svg"
import Setting from "../../../assets/Setting.svg"
import Logout from "../../../assets/Logout.svg"
import { NavLink } from "react-router-dom"
import styles from "./sidebar.module.scss";
import useAuthContext from "../../../hooks/auth-hooks/useAuth"


const Sidebar = () => {
  const { state } = useAuthContext()
  const user = state?.user;
  return (
    <aside className="w-full text-base  pt-2 pb-8 pt-14">
           <section className="flex p-3 rounded-lg ml-1 mb-4 mr-1 bg-ash-10">
                    {user?.profileImageUrl === null ? (<img className="inline rounded-full p-2" src={ProfileImage} alt="profileImage"/>) 
                    : 
                    (<img className="inline rounded-full p-2" src={user?.profileImageUrl} alt="profileImage"/>)
                    }
                    <div className="p-1 text-white-100">
                      <p className="text-base">{user?.companyName}</p>
                      <p className="text-sm">{user?.email}</p>
                    </div>
           </section>
           <p className="text-white-30 my-2 font-bold text-base px-4 py-2">FINDERS HUB</p>
           <ul className="pb-16">
                { RegionalManagerRoute.map((item, index) => {
                  return (
                          <NavLink 
                            to={item.route} 
                            key={index} 
                            className={({ isActive }) => isActive ? `flex p-4    ${styles.active}` : "flex p-4 text-white-10"
                          } >
                            <item.icon/>
                            <span className="pl-4 cursor-pointer">{item.title}</span>
                          </NavLink>
                        )}) }
           </ul>
           <hr className="bg-white-10 border-2 w-10/12 m-auto"/>
           <section className="flex gap-10 p-3">
              <img src={Profile} alt="" className="cursor-pointer"/>
              <img src={Setting} alt="" className="cursor-pointer"/>
              <img src={Logout} alt="" className="cursor-pointer"/>
           </section>
           

    </aside>
  )
}

export default Sidebar