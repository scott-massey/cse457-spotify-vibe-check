import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import "./page-styles.css"

// Routes
import { router } from "./routes"

// Imported components
import { NavigationWrapper } from "./Components/nav"

// MUI Components
import { createTheme, ThemeProvider } from "@mui/material/styles"

const queryClient = new QueryClient()

const App = () => {
  const mdTheme = createTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={mdTheme}>
        <NavigationWrapper>
          <RouterProvider router={router} />
        </NavigationWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
