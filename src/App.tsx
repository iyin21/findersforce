import { Route, Routes, Navigate } from "react-router-dom"
import PersistLogin from "./pages/auth/persist-login"
import "./global.scss"
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
import Planner from "./pages/planner/Planner"

function App() {
    return (
        <Routes>
            {/* public routes */}
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmailAddress />} />
            <Route path="/planner" element={<Planner/>} />

            {/* private routes */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path={"/dashboard"} element={<Dashboard />} />
                    <Route path="/pending" element={<Applications />} />
                    <Route path="/job-boards" element={<JobBoards />} />
                    <Route
                        path="job-boards/:jobBoardId"
                        element={<SingleJobBoard />}
                    />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
