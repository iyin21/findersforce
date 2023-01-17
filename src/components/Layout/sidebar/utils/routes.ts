import Dashboard from "../assets/Dashboard"
import Shifts from "../assets/Shifts"
import Pending from "../assets/Pending"
import Planner from "../assets/Planner"
import Messaging from "../assets/Messaging"
// import RolesPermission from "../assets/RolesPermission"
import Locations from "../assets/Locations"
import Subscriptions from "../assets/Subscriptions"
import Support from "../assets/Support"
import Analytics from "../assets/Analytics"
import Depots from "../assets/Depots"
import Approval from "../assets/Approvals"
import Payments from "../assets/Payments"
import GeoTracking from "../assets/GeoTracking"
import AdminSupport from "../assets/AdminSupport"
import AllUsers from "../assets/All-Users"
import AdminRolesPermission from "../assets/AdminRolesPermission"
import Subscription from "../assets/Subscription"
import Maps from "../assets/Maps"
import Management from "../assets/Management"

export interface SidebarRoutes {
    icon: React.FunctionComponent
    title: string
    route: string
}

export const RegionalManagerRoute: SidebarRoutes[] = [
    { icon: Dashboard, title: "Dashboard", route: "/dashboard" },
    { icon: Shifts, title: "Shifts", route: "/job-boards" },
    { icon: Pending, title: "Applications", route: "/pending" },
    { icon: Planner, title: "Planner", route: "/planner" },
    { icon: Maps, title: "Maps", route: "/Maps" },
    { icon: Management, title: "Management", route: "/roles&permission" },
    { icon: Messaging, title: "Messaging", route: "/messaging" },
    // {
    //     icon: RolesPermission,
    //     title: "Roles & Permissions",
    //     route: "/roles&permission",
    // },
    { icon: Subscriptions, title: "Plans", route: "/subscription" },
    { icon: Support, title: "Support", route: "/support" },
]

export const shiftManagerRoute: SidebarRoutes[] = [
    { icon: Dashboard, title: "Dashboard", route: "/dashboard" },
    { icon: Shifts, title: "Shifts", route: "/job-boards" },
    { icon: Pending, title: "Applications", route: "/pending" },
    { icon: Planner, title: "Planner", route: "/planner" },
    { icon: Maps, title: "Maps", route: "/Maps" },
    { icon: Messaging, title: "Messaging", route: "/messaging" },
    { icon: Support, title: "Support", route: "/support" },
]

export const depotHqRoute: SidebarRoutes[] = [
    { icon: Dashboard, title: "Dashboard", route: "/dashboard" },
    { icon: Shifts, title: "Shifts", route: "/job-boards" },
    { icon: Pending, title: "Applications", route: "/pending" },
    { icon: Planner, title: "Planner", route: "/planner" },
    { icon: Maps, title: "Maps", route: "/Maps" },
    { icon: Management, title: "Management", route: "/roles&permission" },
    // {
    //     icon: RolesPermission,
    //     title: "Roles & Permissions",
    //     route: "/roles&permission",
    // },
    { icon: Messaging, title: "Messaging", route: "/messaging" },
    { icon: Locations, title: "Depot", route: "/locations" },
    { icon: Subscriptions, title: "Plans", route: "/subscription" },
    // { icon: Subscriptions, title: "Subscriptions", route: "/subscription" },
    { icon: Support, title: "Support", route: "/support" },
]

export const adminRoute: SidebarRoutes[] = [
    { icon: Analytics, title: "Analytics", route: "/analytics" },
    { icon: Depots, title: "Depots", route: "/depots" },
    { icon: Approval, title: "Approvals", route: "/approvals" },
    { icon: Payments, title: "Payment", route: "/payment" },
    { icon: Subscription, title: "Subscription", route: "/subscription" },
    { icon: GeoTracking, title: "Geotracking", route: "/geotracking" },
    { icon: Messaging, title: "Messaging", route: "/messaging" },
    { icon: AdminSupport, title: "Support", route: "/admin-support" },
    { icon: AllUsers, title: "All users", route: "/all-users" },
    {
        icon: AdminRolesPermission,
        title: "Management",
        route: "/roles-permission",
    },
]
