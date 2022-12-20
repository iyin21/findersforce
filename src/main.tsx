import "./global.scss"
import React from "react"
import ReactDOM from "react-dom/client"
import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { MantineProvider } from "@mantine/core"
import { AuthProvider } from "./pages/auth/context/authContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NotificationsProvider } from "@mantine/notifications"
// eslint-disable-next-line no-unused-vars
import { Buffer } from "buffer/"

const queryClient = new QueryClient()

Sentry.init({
    dsn: "https://af392b294aa4443d93f43b5e19d0b128@o1317059.ingest.sentry.io/6652714",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                {" "}
                <QueryClientProvider client={queryClient}>
                    <MantineProvider>
                        <NotificationsProvider position="top-center">
                            <App />
                        </NotificationsProvider>
                    </MantineProvider>
                </QueryClientProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
