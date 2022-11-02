import React from "react"
import ReactDOM from "react-dom/client"
import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"
import App from "./App"
import "./global.scss"
import { BrowserRouter } from "react-router-dom"
import { MantineProvider } from "@mantine/core"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient();
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
            <QueryClientProvider client={queryClient}>
                <MantineProvider>
                    <App />
                </MantineProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
)
