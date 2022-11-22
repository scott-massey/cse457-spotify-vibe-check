import React, { useState } from "react"
import { CssBaseline, Box, Container } from "@mui/material"
import PlaylistSelector from "./PlaylistSelector"
import IQR from "./iqrVis"
import Radar from "./radarChart"
import SongSelector from "./SongSelector"

import "./index.css"

//test data for vis
const data = [{ mean: 0.2 }, { mean: -0.4 }, { mean: 0.6 }, { mean: -0.1 }]

const Dashboard = (props) => {
  const [activePlaylist, setActivePlaylist] = useState(null)
  const [loadingPlaylist, setLoadingPlaylist] = useState(false)
  const [featuresSummary, setFeaturesSummary] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ width: "250px", height: "64px" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "100%",
            // minHeight: "500px",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <PlaylistSelector
              activePlaylist={activePlaylist}
              setActivePlaylist={setActivePlaylist}
              setLoadingPlaylist={setLoadingPlaylist}
              setFeaturesSummary={setFeaturesSummary}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              <Box sx={{ height: "100%" }}>
                <IQR
                  data={data}
                  featuresSummary={featuresSummary}
                  activePlaylist={activePlaylist}
                  loading={loadingPlaylist}
                />
              </Box>
              <Box sx={{ height: "100%" }}>
                <Radar
                  data={data}
                  featuresSummary={featuresSummary}
                  activePlaylist={activePlaylist}
                  loading={loadingPlaylist}
                  selectedTrack={selectedTrack}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <SongSelector
                activePlaylist={activePlaylist}
                selectedTrack={selectedTrack}
                setSelectedTrack={setSelectedTrack}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <p>genre bubble chart</p>
            </Box>
            <Box sx={{ width: "100%" }}>
              <p>artist bubble chart</p>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export { Dashboard }
