import User from "../../../assets/User.svg"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Indicator, Modal } from "@mantine/core"
import useUserNotification from "../../../hooks/notification-hook"
import { showNotification } from "@mantine/notifications"
import { CgSpinner } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import { HiMenuAlt2 } from "react-icons/hi"
import dayjs from "dayjs"
import { IoIosNotifications } from "react-icons/io"
import Message from "../../../assets/NavbarMessage.svg"
import { CgProfile } from "react-icons/cg"

interface navInterface {
    setOpenSideBar: Dispatch<SetStateAction<boolean>>
    noTopNav?: boolean
}

const NavBar = ({ setOpenSideBar, noTopNav }: navInterface) => {
    const [opened, setOpened] = useState(false)
    const { data: userNotifications, error, isLoading } = useUserNotification()
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
                    {item?.eventId.user.profileImageUrl !== null ? (
                        <img
                            src={item?.eventId.user.profileImageUrl}
                            alt="ops profile"
                            className="rounded-full w-[45px] h-[45px]"
                        />
                    ) : (
                        <CgProfile size={48} />
                    )}

                    <div className="ml-2 md:ml-4 my-2">
                        <span className="text-lg py-[19px]">{item.title}</span>
                        <p className="text-sm md:text-3sm opacity-60 pr-1">
                            {item?.description?.substring(0, 95).concat("...")}
                        </p>
                    </div>

                    <span className="text-black-neutral ml-auto text-2sm">
                        <>{dayjs(item?.createdAt).fromNow()}</>
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
            <nav className={`w-full  pt-6  ${!noTopNav && ""} `}>
                {!noTopNav && (
                    <div className=" flex items-center justify-end gap-6 mr-4 lg:mr-12 ">
                        <div className=" md:hidden cursor-pointer mr-auto ml-6">
                            <HiMenuAlt2
                                size={28}
                                onClick={() => setOpenSideBar(true)}
                            />
                        </div>

                        <img
                            src={User}
                            alt="User icon"
                            className="cursor-pointer"
                        />
                        <Indicator
                            label={userNotifications?.data?.length}
                            size={16}
                            color="#E94444"
                        >
                            <IoIosNotifications
                                className="cursor-pointer"
                                data-testid="notification"
                                onClick={() => setOpened((state) => !state)}
                                size={22}
                                color={
                                    userNotifications?.data.length === 0
                                        ? "rgba(15, 13, 0, 0.6)"
                                        : "#FED70A"
                                }
                            />
                        </Indicator>

                        <img
                            src={Message}
                            className="cursor-pointer"
                            alt="messaging"
                            onClick={() => navigate("/messaging")}
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
