import { RegionalManagerRoute } from "./utils/routes"
import RlatterLogo from "../../../assets/RlatterLogo.svg"
import Profile from "../../../assets/Profile.svg"
import Setting from "../../../assets/Setting.svg"
import Logout from "../../../assets/Logout.svg"
import { NavLink, useNavigate } from "react-router-dom"
import styles from "./sidebar.module.scss";
import useAuthContext from "../../../hooks/auth-hooks/useAuth"
import { showNotification } from "@mantine/notifications"
import useAxiosPrivate from "../../../services/usePrivateAxios"


const Sidebar = () => {
  const { state, dispatch } = useAuthContext()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const handleLogOut = async () => {
    const data  = await axiosPrivate.post(
        "https://findersforce-api.workcube.com.ng/api/v1/auth/logout",
        {
            withCredentials: true,
            headers: {
                Authorization: `${state?.jwt?.token}`,
                "Content-Type": "application/json",
            },
        }
    )
    
    if (data.data.status === "success") {
        showNotification({
            title: "Success",
            message: data.data.message
        })
    }
    dispatch({
        type: "CLEAR_USER_DATA"
    })
    navigate("/login")
}
  return (
    <aside className="w-full text-base  pt-2 pb-8 bg-black-100 pt-14">
           <section className="flex p-3 rounded-lg ml-1 mb-4 mr-1 bg-ash-10">
                    <img className="inline rounded-full p-2" src={RlatterLogo} alt=""/>
                    <div className="p-1 text-white-100">
                      <p className="text-base">Revive Traffic</p>
                      <p className="text-sm">recruit@leftfieldlabs.com</p>
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
              <img src={Logout} alt="" className="cursor-pointer" onClick={() => handleLogOut()}/>
           </section>
           

    </aside>
  )
}

export default Sidebar