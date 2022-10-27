
import { HashRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import Dashboard from "./dashboard/Dashboard"
import "./global.scss"


function App() {
    
    const queryClient = new QueryClient()

    return (
        <div className="App">
            
            <QueryClientProvider client={queryClient}>
                <HashRouter>
                    <Routes>
                        <Route path={"/dashboard"} element={<Dashboard/>}/>
                    </Routes>
                </HashRouter>
            </QueryClientProvider>
            
        </div>
    )
}

export default App
