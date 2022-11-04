import Logout from "../../../assets/LogoutNavBar.svg"
import Messaging from "../../../assets/Messaging.svg"
import SettingsCog from "../../../assets/SettingsCog.svg"
import User from "../../../assets/User.svg"
import Search from "../../../assets/Search.svg"
import { useState } from "react"
import { Modal } from "@mantine/core"
import avi from "../../../assets/userAvi.svg"
import addressLogo from "../../../assets/addressLogo.svg"
import FindersForceLogo from "../../../assets/FindersForceLogo.svg"

const NavBar = () => {
    const [opened, setOpened] = useState(false)
    const data = [
        "2 hours ago",
        "4:00am",
        "4:00am",
        "4:00am",
        "4:00am",
        "4:00am",
        "4:00am",
        "4:00am",
        "4:00am",
        "4:00am",
        "4:00am",
    ]
    const notifications = data.map((time, index) => {
        return (
            <>
                <div key={index} className="flex items-center">
                    <img src={addressLogo} alt="address logo" />
                    <span className="text-lg py-[19px]">
                        <strong>2-way shift </strong>at 12 Liverpool road is
                        starting soon.
                    </span>
                    <span className="text-black-neutral ml-auto text-2sm">
                        {time}
                    </span>
                </div>
                <hr className="border-black-20" />
            </>
        )
    })
    return (
        <>
            <nav className="w-full sticky top-0 h-12 pt-6 pb-6 flex items-center justify-between bg-white-100">
                <div className="w-64 bg-black-100">
                    <img 
                        src={FindersForceLogo} 
                        alt="" 
                        className="p-3 my-5 ml-5"
                    />
                </div>
                <div className=" flex items-center justify-between px-12 gap-12 ">
                    <img
                        src={Search}
                        alt="search icon "
                        className="cursor-pointer"
                    />
                    <img
                        src={Messaging}
                        alt="Messaging icon "
                        className="cursor-pointer"
                        onClick={() => setOpened((state) => !state)}
                    />
                    <img
                        src={SettingsCog}
                        alt="SettingsCog icon"
                        className="cursor-pointer"
                    />
                    <img src={User} alt="User icon" className="cursor-pointer" />
                    <img
                        src={Logout}
                        alt="Logout icon"
                        className="cursor-pointer"
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
                        width: "600px",
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
                <section className="w-full bg-yellow-10 h-fit">
                    <div className="flex pt-3.5 pl-10 pr-8 items-center">
                        <div className="rounded-[100%] w-[46px] h-[46px] bg-yellow-110">
                            <img src={avi} alt="user avi" className="m-auto" />
                        </div>
                        <span className="text-lg pl-2.5">
                            <strong>Pierre Yam-Fam</strong> applied for a shift
                        </span>
                        <span className="text-black-neutral ml-auto text-2sm">
                            Now
                        </span>
                    </div>
                    <div className="flex items-center pl-24 pb-2.5">
                        <div className="bg-black-100 rounded-tr-2xl rounded py-[13.5px] px-[35px] w-fit text-2sm text-white-100 font-bold mr-4">
                            Review
                        </div>
                        <div className="bg-yellow-100 rounded-tr-2xl rounded py-[13.5px] px-[35px] w-fit text-2sm text-black-100 font-bold">
                            Approve
                        </div>
                    </div>
                </section>
                <section className="px-[30px]">{notifications}</section>
            </Modal>
        </>
    )
}

export default NavBar
