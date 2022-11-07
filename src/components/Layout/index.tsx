import Sidebar from "../layout/sidebar/Sidebar"
import NavBar from "../layout/navbar/NavBar"
import { LayoutProps } from "../../types/layout/interfaces"

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="h-screen relative overflow-hidden">
            <div className="w-5/6 fixed right-0">
                <NavBar />
            </div>
            <div className="flex justify-between">
                <div className="w-1/6 h-screen">
                    <Sidebar />
                </div>
                <main className="w-5/6 mt-10">{children}</main>
            </div>
        </div>
    )
}

export default Layout
