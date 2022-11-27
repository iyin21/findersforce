
import NavBar from "./navbar/NavBar"
import { LayoutProps } from "../../types/layout/interfaces"
import { useState } from "react";
import { Drawer } from "@mantine/core";
import Sidebar from "./sidebar/Sidebar";
import { FaTimes } from "react-icons/fa";

const Layout = ({ children, noTopNav }: LayoutProps) => {
    const [openSideBar, setOpenSideBar] = useState(false)
    return (
        <div className="h-screen relative">
            <div className="fixed right-0 z-20 bg-white-100 lg:w-[84%] w-full">
                <NavBar noTopNav={noTopNav} setOpenSideBar={setOpenSideBar}  />
            </div>
            <div className="relative md:pl-64 h-full">
                <div className="hidden md:block fixed bg-black-100 left-0 w-[16%]  h-[100%] overflow-y-auto">
                    <Sidebar/>
                </div>
                <>
                    <Drawer
                        opened={openSideBar}
                        onClose={() => setOpenSideBar(false)}
                        size="75%"
                        withCloseButton={false}
                        overlayBlur={2}
                        overlayColor="#132013"
                        overlayOpacity={0.5}
                        padding={0}
                        styles={() => ({
                            drawer: {
                                padding: 0,
                                backgroundColor: "transparent",
                                overflow: "auto",
                            }
                        })}
                    >
                        <div className="relative">
                            <div className=" md:hidden  absolute right-10 top-10">
                                <FaTimes 
                                    size={20} 
                                    style={{color:"#FFFFFF"}} 
                                    onClick={() => setOpenSideBar(false)} 
                                    onKeyDown={() => setOpenSideBar(false)}/>
                            </div>
                            <div className="w-full h-3/4 md:h-[500px] overflow-y-scroll md:pt-[75px] bg-black-100">
                                <Sidebar/>
                            </div>
                        </div>
                    </Drawer>
                </>
                <main
                    className={`w-full h-full overflow-y-auto  ${
                        !noTopNav && "py-5 lg:px-2"
                    } `}
                >
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout
