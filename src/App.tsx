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
import ShiftsDetailTable from "./pages/planner/components/ShiftsDetailsTable"
import Roles from "./pages/roles"
import Messaging from "./pages/Messaging"

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

            {/* private routes */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route path={"/dashboard"} element={<Dashboard />} />
                    <Route path="/pending" element={<Applications />} />
                    <Route path="/job-boards" element={<JobBoards />} />
                    <Route
                        path="job-boards/:jobBoardId"
                        element={<SingleJobBoard />}
                    />
                    <Route path="/planner" element={<Planner />} />
                    <Route
                        path="/planner/:jobListingId"
                        element={<ShiftsDetailTable />}
                    />
                    <Route path="/roles&permission" element={<Roles />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/messaging" element={<Messaging />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
