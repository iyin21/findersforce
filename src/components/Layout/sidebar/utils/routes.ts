import Dashboard from "../assets/Dashboard"
import Shifts from "../assets/Shifts"
import Pending from "../assets/Pending"
import Planner from "../assets/Planner"
import Messaging from "../assets/Messaging"
import RolesPermission from "../assets/RolesPermission"
import Locations from "../assets/Locations"
import Subscriptions from "../assets/Subscriptions"
import Support from "../assets/Support"

export interface SidebarRoutes {
    icon: React.FunctionComponent
    title: string
    route: string
}

export const RegionalManagerRoute: SidebarRoutes[] = [
    { icon: Dashboard, title: "Dashboard", route: "/dashboard" },
    { icon: Shifts, title: "Shifts", route: "/job-boards" },
    { icon: Pending, title: "Pending", route: "/pending" },
    { icon: Planner, title: "Planner", route: "/planner" },
    { icon: Messaging, title: "Messaging", route: "/messaging" },
    {
        icon: RolesPermission,
        title: "Roles & Permissions",
        route: "/roles&permission",
    },
    { icon: Support, title: "Support", route: "/support" },
]

export const shiftManagerRoute: SidebarRoutes[] = [
    { icon: Dashboard, title: "Dashboard", route: "/dashboard" },
    { icon: Shifts, title: "Shifts", route: "/job-boards" },
    { icon: Pending, title: "Pending", route: "/pending" },
    { icon: Planner, title: "Planner", route: "/planner" },
    { icon: Messaging, title: "Messaging", route: "/messaging" },
    { icon: Support, title: "Support", route: "/support" },
]

export const depotHqRoute: SidebarRoutes[] = [
    { icon: Dashboard, title: "Dashboard", route: "/dashboard" },
    { icon: Shifts, title: "Shifts Board", route: "/job-boards" },
    { icon: Pending, title: "Applications", route: "/pending" },
    { icon: Planner, title: "Planner", route: "/planner" },
    {
        icon: RolesPermission,
        title: "Roles & Permissions",
        route: "/roles&permission",
    },
    { icon: Locations, title: "Locations", route: "/locations" },
    { icon: Subscriptions, title: "Subscriptions", route: "/subscriptions" },
    { icon: Support, title: "Support", route: "/support" },
]