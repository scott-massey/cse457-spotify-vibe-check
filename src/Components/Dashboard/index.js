import React, { useState } from "react"
import { CssBaseline, Card, CardMedia, CardContent, 
	Box, Typography, Stack, Item, Container } from "@mui/material"
import PlaylistSelector from "./PlaylistSelector"
import IQR from "./iqrVis"

//test data for vis
const data = [
	{avg: 0.2 },
	{avg: -0.4 },
	{avg: 0.6 },
	{avg: -0.1 },
]

const Dashboard = (props) => {
	const [activePlaylist, setActivePlaylist] = useState(null)


	return (
		<React.Fragment>
		<CssBaseline />
		<Container>
			<Box sx={{width: "250px", height: "64px"}} />
			<Box sx={{display: "flex", flexGrow: 1, height: "100%", minHeight: "500px", width: "100%"}}>
				<PlaylistSelector activePlaylist={activePlaylist} setActivePlaylist={setActivePlaylist} />
			</Box>
		</Container>
		<IQR data={data} />
		</React.Fragment>
	)
}

export { Dashboard }
