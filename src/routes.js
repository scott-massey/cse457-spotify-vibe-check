import { createBrowserRouter } from "react-router-dom"

import { Dashboard } from "./components/Dashboard"
import { ProcessBook } from "./components/ProcessBook"
import { VideoDemo } from "./components/VideoDemo"
import { SpotifyCallback } from "./components/SpotifyCallback"

export const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/process-book", element: <ProcessBook /> },
  { path: "/video-demo", element: <VideoDemo /> },
  { path: "/spotify-callback", element: <SpotifyCallback /> },
])
