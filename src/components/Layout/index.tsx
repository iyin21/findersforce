import Sidebar from "../layout/sidebar/Sidebar"
import NavBar from "../layout/navbar/NavBar"
import { LayoutProps } from "../../types/layout/interfaces"

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="h-screen relative">
            <div className="w-full fixed right-0 z-20">
                <NavBar />
            </div>
            <div className="relative md:pl-64 h-full">
                <div className="hidden md:block fixed left-0 w-64 mt-14 h-[95%] overflow-y-auto">
                    <Sidebar />
                </div>
                <main className="w-full h-full overflow-y-auto lg:px-10 p-5">{children}</main>
            </div>
        </div>
    )
}

export default Layout
