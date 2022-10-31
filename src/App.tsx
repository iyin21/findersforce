import {  Route, Routes, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import { AuthProvider } from "./pages/auth/context/authContext"
import PersistLogin from "./pages/auth/persist-login"
import "./global.scss"
import Applications from "./pages/Applications"
import ApplicationDetails from "./pages/Applications/sub-navigations/ApplicationDetails"
//import Applications from "./pages/Applications/application"
import ShiftDetails from "./pages/Applications/sub-navigations/ShiftDetails"
import Login from "./pages/auth/login"
import RecoverPassword from "./pages/auth/forgot-password"
import VerifyEmailAddress from "./pages/auth/verify-email"
import ResetPassword from "./pages/auth/reset-password"
import Profile from "./pages/profile/profile"
import RequireAuth from "./pages/auth/RequireAuth"



function App() {
    return (
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* public routes */}
                        <Route
                            path="/"
                            element={<Navigate replace to="/login" />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/recover-password"
                            element={<RecoverPassword />}
                        />
                        <Route
                            path="/reset-password"
                            element={<ResetPassword />}
                        />
                        <Route
                            path="/verify-email"
                            element={<VerifyEmailAddress />}
                        />
                        {/* private routes */}
                        <Route element={<PersistLogin />}>
                            <Route element={<RequireAuth />}>
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                            <Route path="/applications" element={<Applications />} />
                            <Route
                                path="applications/:applicationId"
                                element={<ApplicationDetails />}
                            />
                            <Route
                                path="applications/:applicationId/:shiftId"
                                element={<ShiftDetails />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        
    )
}

export default App;
