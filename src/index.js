import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import "./page-styles.css"
import { Box } from "@mui/material"

import { Dashboard } from "./Components/Dashboard"
import ProcessBook from "./Components/ProcessBook"
import { VideoDemo } from "./Components/VideoDemo"
import { SpotifyCallback } from "./Components/SpotifyCallback"
import HelpModal from "./Components/HelpModal"

// Imported components
import { NavigationWrapper } from "./Components/nav"

// MUI Components
import { createTheme, ThemeProvider } from "@mui/material/styles"

const queryClient = new QueryClient()

const App = () => {
  const mdTheme = createTheme()

  const [modalOpen, setModalOpen] = useState(true)

  const openHelpModal = () => {
    setModalOpen(true)
  }

  const closeHelpModal = () => {
    setModalOpen(false)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={mdTheme}>
        <BrowserRouter>
          <NavigationWrapper openHelpModal={openHelpModal} />
          <HelpModal modalOpen={modalOpen} closeHelpModal={closeHelpModal} />
          <Box sx={{ paddingLeft: "0px", marginTop: "-270px" }}>
            <Routes>
              <Route path="/process-book" element={<ProcessBook />} />
              <Route path="/video-demo" element={<VideoDemo />} />
              <Route path="/spotify-callback" element={<SpotifyCallback />} />
              <Route exact path="/" element={<Dashboard />} />
            </Routes>
          </Box>
        </BrowserRouter>
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
