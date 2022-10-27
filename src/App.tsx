import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./pages/auth/context/authContext";
import PersistLogin from "./pages/auth/persist-login";
import "./global.scss"
import Login from "./pages/auth/login";
import RecoverPassword from "./pages/auth/forgot-password";
import VerifyEmailAddress from "./pages/auth/verify-email";
import ResetPassword from "./pages/auth/reset-password";
import Profile from "./pages/profile/profile";
import RequireAuth from "./pages/auth/RequireAuth";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
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
