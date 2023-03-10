import { Route, Routes, Navigate } from "react-router-dom"
import PersistLogin from "./pages/auth/persist-login"
import Applications from "./pages/Applications"
import Login from "./pages/auth/login"
import RecoverPassword from "./pages/auth/forgot-password"
import VerifyEmailAddress from "./pages/auth/verify-email"
import ResetPassword from "./pages/auth/reset-password"
import Profile from "./pages/profile/profile"
import RequireAuth from "./pages/auth/require-auth"
import Dashboard from "./pages/dashboard/Dashboard"
import JobBoards from "./pages/Job-boards"
import SingleJobBoard from "./pages/Job-boards/components/viewSingleJob"
import Support from "./pages/Support"
import Planner from "./pages/planner/Planner"
import ShiftsDetailTable from "./pages/planner/components/table/ShiftsDetailsTable"
import Roles from "./pages/roles"
import Messaging from "./pages/Messaging"
import Settings from "./pages/Settings/index"
import Location from "./pages/Location"
import LocationBasedData from "./pages/Location/components/locationBasedData"
import AdminAnalytics from "./pages/Admin/Analytics/Analytics"
import SupportMedium from "./pages/Support/support-medium"
import Subscription from "./pages/subscriptions/Subscription"
import SubscriptionDetails from "./pages/subscriptions/components/SubscriptionDetails"
import Approvals from "./pages/Approvals"
import AdminDepot from "./pages/Admin/Depots"
import AddDepot from "./pages/Admin/Depots/components/AddDepot/add-depot"
import SingleDepot from "./pages/Admin/Depots/components/ViewSingleDepot"
import Invoice from "./pages/invoice/index"
import ShiftDetails from "./pages/Applications/sub-navigations/ShiftDetails"
import Layout from "./components/Layout"
import AdminPayment from "./pages/Admin/Payments"
import RateOperatives from "./pages/planner/components/rateOperatives/RateOperatives"
import TwoFactorAuthentication from "./pages/auth/two-2fa-verification"
import Maps from "./pages/Map"
import ViewSingleActiveMap from "./pages/Map/components/viewSingleActiveMap/viewSingleActiveMap"
import ViewAllMaps from "./pages/Map/components/viewAllMaps/viewAllMaps"

function App() {
    return (
        <Routes>
            {/* public routes */}
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/sign-up/depot" element={<Profile />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmailAddress />} />
            <Route
                path="/auth/verify-2fa"
                element={<TwoFactorAuthentication />}
            />

            {/* private routes */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route path={"/dashboard"} element={<Dashboard />} />
                    <Route path="/pending" element={<Applications />} />
                    <Route path="/job-boards" element={<JobBoards />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route
                        path="job-boards/:jobBoardId"
                        element={<SingleJobBoard />}
                    />
                    <Route path="/planner" element={<Planner />} />
                    <Route
                        path="/planner/:jobListingId"
                        element={<ShiftsDetailTable />}
                    />
                    <Route
                        path="/planner/rate-ops/:jobListingId"
                        element={<RateOperatives />}
                    />
                    <Route path="/roles&permission" element={<Roles />} />
                    <Route path="/support" element={<SupportMedium />} />
                    <Route path="/support/complaint" element={<Support />} />
                    <Route path="/messaging" element={<Messaging />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route
                        path="/subscription/:id"
                        element={<SubscriptionDetails />}
                    />
                    <Route path="/locations" element={<Location />} />
                    <Route
                        path="/locations/:locationId"
                        element={<LocationBasedData />}
                    />
                    <Route path="/analytics" element={<AdminAnalytics />} />
                    <Route path="/approvals" element={<Approvals />} />
                    <Route path="/depots" element={<AdminDepot />} />
                    <Route path="/add-depots" element={<AddDepot />} />
                    <Route path="/depots/:depotId" element={<SingleDepot />} />
                    <Route
                        path="/subscription/invoice/:subscriptionId"
                        element={<Invoice />}
                    />
                    <Route
                        path="/shifts/:shiftId"
                        element={
                            <Layout>
                                <ShiftDetails setPhase={() => {}} />
                            </Layout>
                        }
                    />
                    <Route path="/payment" element={<AdminPayment />} />
                    <Route path="/Maps" element={<Maps />} />
                    <Route
                        path="/maps/:listingId"
                        element={<ViewSingleActiveMap />}
                    />
                    <Route path="/view-all-maps" element={<ViewAllMaps />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
