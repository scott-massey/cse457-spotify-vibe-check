import React, { useState } from "react"
import { CssBaseline, Card, CardMedia, CardContent, 
	Box, Typography, Stack, Item, Container } from "@mui/material"
import PlaylistSelector from "./PlaylistSelector"


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
		</React.Fragment>
	)
}

export { Dashboard }
