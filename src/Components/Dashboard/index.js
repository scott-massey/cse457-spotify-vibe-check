import React, { useState } from "react"
import { CssBaseline, Box, Container } from "@mui/material"
import PlaylistSelector from "./PlaylistSelector"
import IQR from "./iqrVis"
import ArtistBubbles from "./ArtistBubbles"
import Radar from "./radarChart"
import SongSelector from "./SongSelector"

import "./index.css"

//test data for vis
const data = [{ mean: 0.2 }, { mean: -0.4 }, { mean: 0.6 }, { mean: -0.1 }]

const Dashboard = (props) => {
  const [activePlaylist, setActivePlaylist] = useState(null)
  const [loadingPlaylist, setLoadingPlaylist] = useState(false)
  const [featuresSummary, setFeaturesSummary] = useState(null)
  const [artistCounts, setArtistCounts] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="container">
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
              setArtistCounts={setArtistCounts}
              setSelectedTrack={setSelectedTrack}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                width: "100%",
                marginRight: "40px",
              }}
            >
              <Box sx={{ height: "100%", width: "65%" }}>
                <IQR
                  data={data}
                  featuresSummary={featuresSummary}
                  activePlaylist={activePlaylist}
                  loading={loadingPlaylist}
                  selectedTrack={selectedTrack}
                />
              </Box>
              <Box sx={{ height: "100%", width: "35%" }}>
                {selectedTrack && (
                  <Radar
                    data={data}
                    featuresSummary={featuresSummary}
                    activePlaylist={activePlaylist}
                    loading={loadingPlaylist}
                    selectedTrack={selectedTrack}
                  />
                )}
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
                loading={loadingPlaylist}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <ArtistBubbles data={artistCounts} loading={loadingPlaylist} />
            </Box>
          </Box>
        </Box>
      </div>
    </React.Fragment>
  )
}

export { Dashboard }
