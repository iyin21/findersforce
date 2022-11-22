import Logout from "../../../assets/LogoutNavBar.svg"
import SettingsCog from "../../../assets/SettingsCog.svg"
import User from "../../../assets/User.svg"
import Search from "../../../assets/Search.svg"
import { useEffect, useState } from "react"
import { Indicator, Modal } from "@mantine/core"
import addressLogo from "../../../assets/addressLogo.svg"
import FindersForceLogo from "../../../assets/FindersForceLogo.svg"
import useUserNotification from "../../../hooks/notification-hook"
import { showNotification } from "@mantine/notifications"
import { CgSpinner } from "react-icons/cg"
import useAuthContext from "../../../hooks/auth-hooks/useAuth"
import { useNavigate } from "react-router-dom"
import handleLogOut from "../../../hooks/auth-hooks/use-logout"
import dayjs from "dayjs"
import { IoIosNotifications } from "react-icons/io"

const NavBar = ({ noTopNav }: { noTopNav?: boolean }) => {
    const [opened, setOpened] = useState(false)
    const { dispatch, state } = useAuthContext()
    const { data: userNotifications, error, isLoading } = useUserNotification()

    const unreadNotification = userNotifications?.data?.map((notification) => {
        if (!notification.readStatus) return notification
    })

    const notifications = userNotifications?.data?.map((item, index) => {
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
                            ? "flex items-center px-[30px] cursor-pointer"
                            : "flex items-center bg-yellow-10 px-[30px] cursor-pointer"
                    }
                    onClick={() => {
                        setOpened(false)
                        item.event === "Application"
                            ? navigate("/pending")
                            : item.event === "Schedule" &&
                              item.title === "Cancelled Shift"
                            ? navigate("/job-boards")
                            : item.event === "Schedule"
                            ? navigate("/planner")
                            : ""
                    }}
                >
                    <img src={addressLogo} alt="address logo" />
                    <div className="ml-2 md:ml-4 my-2">
                        <span className="text-lg py-[19px]">{item.title}</span>
                        <p className="text-sm md:text-3sm opacity-60">
                            {item.description.substring(0, 95).concat("...")}
                        </p>
                    </div>

                    <span className="text-black-neutral ml-auto text-2sm">
                        <>{dayjs(item.createdAt).fromNow()}</>
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
            <nav
                className={`w-full sticky top-0 h-12 pt-6 pb-6   flex items-center justify-between ${
                    !noTopNav && "bg-white-100"
                } `}
            >
                <div className="w-64 bg-black-100 pt-12">
                    <img
                        src={FindersForceLogo}
                        alt=""
                        className="p-3 my-5 ml-5"
                    />
                </div>
                {!noTopNav && (
                    <div className=" flex items-center justify-between px-12 gap-12 ">
                        <img
                            src={Search}
                            alt="search icon "
                            className="cursor-pointer"
                        />
                        <Indicator
                            label={unreadNotification?.length}
                            size={16}
                            color="#E94444"
                        >
                            <IoIosNotifications
                                className="cursor-pointer"
                                data-testid="notification"
                                onClick={() => setOpened((state) => !state)}
                                size={22}
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
                )}
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
