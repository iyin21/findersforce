import { adminRoute } from "../utils/routes"
import ProfileImage from "../../../../assets/ProfileImage.svg"
import Setting from "../../../../assets/Setting.svg"
import Logout from "../../../../assets/Logout.svg"
import { NavLink, useNavigate } from "react-router-dom"
import styles from "../sidebar.module.scss"
import useAuthContext from "../../../../hooks/auth-hooks/useAuth"
import handleLogOut from "../../../../hooks/auth-hooks/use-logout"
import { showNotification } from "@mantine/notifications"
import FindersForceLogo from "../../../../assets/FindersForceLogo.svg"
import { useProfile } from "../../../../hooks/profile/use-profile"

const AdminSidebar = () => {
    const { state, dispatch } = useAuthContext()
    const { data } = useProfile()
    const navigate = useNavigate()

    return (
        <aside className="w-full text-base pb-8 pt-8">
            <div className="mb-8 pl-6 flex gap-8">
                <img src={FindersForceLogo} alt="" />
            </div>

            <section className="flex items-center p-3 rounded-lg ml-1 mb-4 mr-1 bg-ash-10">
                {data?.profileImageUrl === null ? (
                    <img
                        className="inline rounded-full p-2 w-[50px] h-[50px]"
                        src={ProfileImage}
                        alt="profileImage"
                    />
                ) : (
                    <img
                        className="inline rounded-full p-2 w-[50px] h-[50px]"
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
                {adminRoute.map((item, index) => {
                    return (
                        <NavLink
                            to={item.route}
                            key={index}
                            className={({ isActive }) =>
                                isActive
                                    ? `flex p-4    ${styles.active}`
                                    : "flex p-4 text-white-50"
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
                <img
                    src={Setting}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => navigate("/settings")}
                />
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

export default AdminSidebar
