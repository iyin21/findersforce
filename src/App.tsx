import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RecoverPassword from "./components/auth/forgot-password";
import Login from "./components/auth/login"
import ResetPassword from "./components/auth/reset-password";
import VerifyEmailAddress from "./components/auth/verify-email";
import Profile from "./components/profile";
import { AuthProvider } from "./components/auth/context/authContext";
import Layout from "./components/Layout";
import RequireAuth from "./components/auth/RequireAuth";
import PersistLogin from "./components/auth/persist-login";
import "./global.scss"

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route  path="/" element={<Layout />}>
                        {/* public routes */}
                        <Route path="/" element={<Navigate replace to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/recover-password" element={<RecoverPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/verify-email" element={<VerifyEmailAddress />} />
                        {/* private routes */}
                        <Route element={<PersistLogin />}>
                            <Route element={<RequireAuth />}>
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
