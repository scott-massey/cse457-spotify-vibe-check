import { createBrowserRouter } from "react-router-dom"

import { Dashboard } from "./Components/Dashboard"
import { ProcessBook } from "./Components/ProcessBook"
import { VideoDemo } from "./Components/VideoDemo"
import { SpotifyCallback } from "./Components/SpotifyCallback"

export const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/process-book", element: <ProcessBook /> },
  { path: "/video-demo", element: <VideoDemo /> },
  { path: "/spotify-callback", element: <SpotifyCallback /> },
])
