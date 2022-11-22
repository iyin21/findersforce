import { RegionalManagerRoute } from "./utils/routes"
import ProfileImage from "../../../assets/ProfileImage.svg"
import Setting from "../../../assets/Setting.svg"
import Logout from "../../../assets/Logout.svg"
import { NavLink, useNavigate } from "react-router-dom"
import styles from "./sidebar.module.scss"
import useAuthContext from "../../../hooks/auth-hooks/useAuth"
import handleLogOut from "../../../hooks/auth-hooks/use-logout"
import { showNotification } from "@mantine/notifications"
import { useProfile } from "../../../hooks/profile/use-profile"
import FindersForceLogo from "../../../assets/FindersForceLogo.svg"
import { FaTimes } from "react-icons/fa"
import { Dispatch, SetStateAction } from "react"

interface navInterface {
    setOpenSideBar: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setOpenSideBar }: navInterface) => {
    const { state, dispatch } = useAuthContext()
    const { data } = useProfile()
    const navigate = useNavigate()
    

    return (
        <aside className="w-full text-base pb-8 pt-8 ">
            <div className="mb-8 pl-6 flex gap-8">
                <img 
                    src={FindersForceLogo} 
                    alt="" 
                />
                <div className="flex items-center justify-end mb-6 md:hidden">
                    <FaTimes 
                        size={20} 
                        style={{color:"#FFFFFF"}} 
                        onClick={() => setOpenSideBar(false)} 
                        onKeyDown={() => setOpenSideBar(false)}/>
                </div>
            </div>
            <section className="flex p-3 rounded-lg ml-1 mb-4 mr-1 bg-ash-10">
                {data?.profileImageUrl === null ? (
                    <img
                        className="inline rounded-full p-2"
                        src={ProfileImage}
                        alt="profileImage"
                    />
                ) : (
                    <img
                        className="inline rounded-full p-2"
                        src={data?.profileImageUrl}
                        alt="profileImage"
                    />
                )}
                <div className="p-1 text-white-100">
                    <p className="text-base">{data?.companyName}</p>
                    <p className="text-sm">{data?.email}</p>
                </div>
            </section>
            <p className="text-white-30 my-2 font-bold text-base px-4 py-2">
                FINDERS HUB
            </p>
            <ul className="pb-16">
                {RegionalManagerRoute.map((item, index) => {
                    return (
                        <NavLink
                            to={item.route}
                            key={index}
                            className={({ isActive }) =>
                                isActive
                                    ? `flex p-4    ${styles.active}`
                                    : "flex p-4 text-white-10"
                            }
                        >
                            <item.icon />
                            <span className="pl-4 cursor-pointer">
                                {item.title}
                            </span>
                        </NavLink>
                    )
                })}
            </ul>
            <hr className="bg-white-10 border-2 w-10/12 m-auto" />
            <section className="flex gap-10 p-3">
                <img src={Setting} alt="" className="cursor-pointer" onClick={() => navigate("/settings")}/>
                <img
                    src={Logout}
                    alt=""
                    className="cursor-pointer"
                    onClick={() =>
                        handleLogOut(
                            state.jwt?.token,
                            showNotification,
                            dispatch,
                            navigate
                        )
                    }
                />
            </section>
        </aside>
    )
}

export default Sidebar
