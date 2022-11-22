import Logout from "../../../assets/LogoutNavBar.svg"
import Messaging from "../../../assets/Messaging.svg"
import SettingsCog from "../../../assets/SettingsCog.svg"
import User from "../../../assets/User.svg"
import Search from "../../../assets/Search.svg"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Indicator, Modal } from "@mantine/core"
import addressLogo from "../../../assets/addressLogo.svg"
import useUserNotification from "../../../hooks/notification-hook"
import { showNotification } from "@mantine/notifications"
import { CgSpinner } from "react-icons/cg"
import useAuthContext from "../../../hooks/auth-hooks/useAuth"
import { useNavigate } from "react-router-dom"
import handleLogOut from "../../../hooks/auth-hooks/use-logout"
import { HiMenuAlt2 } from "react-icons/hi"

interface navInterface {
    setOpenSideBar: Dispatch<SetStateAction<boolean>>;
}
const NavBar = ({ setOpenSideBar }: navInterface) => {
    const [opened, setOpened] = useState(false)
    const { dispatch, state } = useAuthContext()
    const { data: userNotifications, error, isLoading } = useUserNotification()

    const data = userNotifications?.data.map((item) => {
        const time = item.createdAt
            .toLocaleString()
            .split("T")[1]
            .split(".")[0]
            .split(":")
        const amOrPm = Number(time[0]) < 12 ? "am" : "pm"
        const hour = Number(time[0]) % 12
        const minutes = Number(time[1]) < 10 ? "0" + time[1] : time[1]
        const notificationTime = hour.toString() + ":" + minutes + amOrPm
        return {
            ...item,
            createdAt: notificationTime,
        }
    })

    const unreadNotification = data?.map((notification) => {
        if (!notification.readStatus) return notification
    })

    const notifications = data?.map((item, index) => {
        return (
            <div
                key={index}
                className={
                    item.readStatus ? "bg-white-100" : "w-full bg-yellow-10"
                }
            >
                <div
                    className={
                        item.readStatus
                            ? "flex items-center px-[30px]"
                            : "flex items-center bg-yellow-10 px-[30px]"
                    }
                >
                    <img src={addressLogo} alt="address logo" />
                    <span className="text-lg py-[19px]">{item.title}</span>
                    <span className="text-black-neutral ml-auto text-2sm">
                        <>{item.createdAt}</>
                    </span>
                </div>
                <hr className="border-black-20" />
            </div>
        )
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            showNotification({
                title: "Error",
                message: error.message,
                color: "red",
            })
        }
    }, [error])
    return (
        <>
            <nav className="w-full  pt-6 ">
                
                <div className=" flex justify-end gap-8 lg:mr-12 mr-6 ">
                    <div className=" md:hidden cursor-pointer mr-auto ml-6">
                        <HiMenuAlt2 size={28} onClick={() => setOpenSideBar(true)} />
                    </div>
                    <img
                        src={Search}
                        alt="search icon "
                        className="cursor-pointer"
                    />
                    <Indicator label={unreadNotification?.length} size={16} color="#E94444">
                        <img
                            src={Messaging}
                            alt="Messaging icon "
                            className="cursor-pointer"
                            onClick={() => setOpened((state) => !state)}
                        />
                    </Indicator>
                    <img
                        src={SettingsCog}
                        alt="SettingsCog icon"
                        className="cursor-pointer"
                        onClick={() => navigate("/settings")}
                    />
                    <img
                        src={User}
                        alt="User icon"
                        className="cursor-pointer"
                    />
                    <img
                        src={Logout}
                        alt="Logout icon"
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
                </div>
            </nav>
            <Modal
                opened={opened}
                withCloseButton
                onClose={() => setOpened(false)}
                overlayOpacity={0.55}
                overlayBlur={3}
                centered={false}
                overflow="inside"
                title="Notifications"
                padding={0}
                styles={() => ({
                    root: {
                        top: "-45px",
                        right: "-10px",
                        bottom: "0px",
                    },
                    modal: {
                        marginLeft: "auto",
                        height: "100%",
                        width: "580px",
                    },
                    inner: {
                        overflow: "hidden",
                    },

                    body: {
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    },
                    close: {
                        border: "none",
                        fontWeight: 800,
                        color: "red",
                    },
                    title: {
                        fontWeight: 800,
                        fontSize: "32px",
                        lineHeight: "38px",
                    },
                    header: {
                        padding: "36px 40px 10px 40px",
                    },
                })}
            >
                <section>
                    {isLoading ? (
                        <div className="h-screen w-full flex mt-24 justify-center">
                            <CgSpinner className="animate-spin text-primary-90 text-4xl" />
                        </div>
                    ) : (
                        <>{notifications}</>
                    )}
                </section>
            </Modal>
        </>
    )
}

export default NavBar
