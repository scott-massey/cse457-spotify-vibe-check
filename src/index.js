import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import Cookie from "js-cookie"
import "./page-styles.css"

// Routes
import { router } from "./routes"

// Imported components
import { NavigationWrapper } from "./Components/nav"

// MUI Components
import { createTheme, ThemeProvider } from "@mui/material/styles"

const App = () => {
  const mdTheme = createTheme()

  const [token, setToken] = React.useState(Cookie.get("spotifyAuthToken"))

  return (
    <ThemeProvider theme={mdTheme}>
      <NavigationWrapper>
        <RouterProvider router={router} />
      </NavigationWrapper>
    </ThemeProvider>
  )
}

export default App

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
