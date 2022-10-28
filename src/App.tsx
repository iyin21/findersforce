import { useState } from "react"
import reactLogo from "./assets/react.svg"
import "./global.scss"
import { Route, Routes } from "react-router-dom"
import Applications from "./pages/Applications"
import ApplicationDetails from "./pages/Applications/sub-navigations/ApplicationDetails"
//import Applications from "./pages/Applications/application"
import ShiftDetails from "./pages/Applications/sub-navigations/ShiftDetails"

function App() {
    return (
         <div className="ml-44">
        <Routes>
            <Route path="/applications" element={<Applications />} />
            <Route
                path="applications/:applicationId"
                element={<ApplicationDetails />}
            />
            <Route
                path="applications/:applicationId/:shiftId"
                element={<ShiftDetails />}
            />
        </Routes>
        </div>
    )
}

export default App
