import { Route, Routes } from "react-router-dom"
import "./global.scss"
import JobBoards from "./pages/Job-boards"
import SingleJobBoard from "./pages/Job-boards/components/viewSingleJob"

function App() {
    return (
        <div>
            <Routes>
                <Route path="job-boards" element={<JobBoards />} />
                <Route
                    path="job-boards/:jobBoardId"
                    element={<SingleJobBoard />}
                />
            </Routes>
        </div>
    )
}

export default App
