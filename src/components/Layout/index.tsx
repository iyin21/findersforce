import Sidebar from "./sidebar/Sidebar"
import NavBar from "./navbar/NavBar"
import { LayoutProps } from "../../types/layout/interfaces"

const Layout = ({ children, noTopNav }: LayoutProps) => {
    return (
        <div className="h-screen relative">
            <div className="w-full fixed right-0 z-20">
                <NavBar noTopNav={noTopNav} />
            </div>
            <div className="relative md:pl-64 h-full">
                <div className="hidden md:block fixed bg-black-100 left-0 w-64 mt-14 h-[95%] overflow-y-auto">
                    <Sidebar />
                </div>
                <main className={`w-full h-full overflow-y-auto  ${!noTopNav && "py-5 lg:px-2"} `}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout
