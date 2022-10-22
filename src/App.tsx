import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RecoverPassword from "./components/auth/forgot-password";
import Login from "./components/auth/login"
import ResetPassword from "./components/auth/reset-password";
import VerifyEmailAddress from "./components/auth/verify-email";
import "./global.scss"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recover-password" element={<RecoverPassword />} />
                <Route path="/verify-email" element={<VerifyEmailAddress />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
