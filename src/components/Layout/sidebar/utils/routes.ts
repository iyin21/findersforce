import Dashboard from "../assets/Dashboard"
import Shifts from "../assets/Shifts"
import Pending from "../assets/Pending"
import Planner from "../assets/Planner"
import Messaging from "../assets/Messaging"
import RolesPermission from "../assets/RolesPermission"
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
    { icon: Subscriptions, title: "Subscriptions", route: "/subscription" },
    { icon: Support, title: "Support", route: "/support" },
]

export const adminRoute: SidebarRoutes[] = [
    { icon: Analytics, title: "Analytics", route: "/analytics" },
    { icon: Depots, title: "Depots", route: "/depots" },
    { icon: Approval, title: "Approvals", route: "/approvals" },
    { icon: Payments, title: "Payment", route: "/payments" },
    { icon: Subscription, title: "Subscription", route: "/subscription" },
    { icon: GeoTracking, title: "Geotracking", route: "/geotracking" },
    { icon: AdminSupport, title: "Support", route: "/admin-support" },
    { icon: AllUsers, title: "All users", route: "/all-users" },
    { icon: AdminRolesPermission, title: "Roles and Permission", route: "/roles-permission" },
]