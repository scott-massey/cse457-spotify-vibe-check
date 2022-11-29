import React, { useState } from "react"
import {
  CssBaseline,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Stack,
  Item,
  Container,
} from "@mui/material"
import PlaylistSelector from "./PlaylistSelector"
import IQR from "./iqrVis"
import ArtistBubbles from "./ArtistBubbles"

//test data for vis
const data = [{ mean: 0.2 }, { mean: -0.4 }, { mean: 0.6 }, { mean: -0.1 }]

const Dashboard = (props) => {
  const [activePlaylist, setActivePlaylist] = useState(null)
  const [loadingPlaylist, setLoadingPlaylist] = useState(false)
  const [featuresSummary, setFeaturesSummary] = useState(null)
  const [artistCounts, setArtistCounts] = useState(null)

  //   console.error("rendering dashboard")

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
			  setArtistCounts={setArtistCounts}
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
                <p>radial chart goes here</p>
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
              <p>song selector goes here</p>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Box sx={{width: "100%"}}>
              <ArtistBubbles data={artistCounts} />
            </Box>
            <Box sx={{width: "100%"}}>
              <p>genre bubble chart</p>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export { Dashboard }
