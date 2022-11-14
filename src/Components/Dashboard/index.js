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

//test data for vis
const data = [{ mean: 0.2 }, { mean: -0.4 }, { mean: 0.6 }, { mean: -0.1 }]

const Dashboard = (props) => {
  const [activePlaylist, setActivePlaylist] = useState(null)
  const [loadingPlaylist, setLoadingPlaylist] = useState(false)
  const [featuresSummary, setFeaturesSummary] = useState(null)

//   console.error("rendering dashboard")

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ width: "250px", height: "64px" }} />
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            height: "100%",
            minHeight: "500px",
            width: "100%",
          }}
        >
          <PlaylistSelector
            activePlaylist={activePlaylist}
            setActivePlaylist={setActivePlaylist}
			setLoadingPlaylist={setLoadingPlaylist}
			setFeaturesSummary={setFeaturesSummary}
          />
        </Box>
      </Container>
      <IQR data={data} featuresSummary={featuresSummary} activePlaylist={activePlaylist} loading={loadingPlaylist}/>
    </React.Fragment>
  )
}

export { Dashboard }
