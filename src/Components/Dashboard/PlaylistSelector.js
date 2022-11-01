import React, { useState } from "react"
import { CssBaseline, Card, CardMedia, CardContent, 
	Box, Typography, Stack, Paper, Container } from "@mui/material"
import PropTypes from 'prop-types';
import testCover from '../../Resources/img/testCover1.jpg'

const sampleData = [
	{
		title: "playlist 1",
	},
	{
		title: "playlist 2",
	},
	{
		title: "playlist 3",
	},
	{
		title: "playlist 4",
	},
	{
		title: "playlist 5",
	},
	{
		title: "playlist 6",
	},
	{
		title: "playlist 7",
	},
	{
		title: "playlist 8",
	},
	{
		title: "playlist 9",
	},
	{
		title: "playlist 10",
	},
	{
		title: "playlist 11",
	},
	{
		title: "playlist 12",
	},
	{
		title: "playlist 13",
	},
	{
		title: "playlist 14",
	},
	{
		title: "playlist 15",
	},
	{
		title: "playlist 16",
	},
	{
		title: "playlist 17",
	},
]

function PlaylistSelector(props) {

	console.log(props.activePlaylist)

	const getPlaylistItem = (playlist) => {
		const active = props.activePlaylist === playlist.title
		return (
			<Box sx={{display: "flex", flexDirection: "column", alignItems: "center", height: "100px", width: "120px", maxWidth: "120px", 
				marginLeft: "10px", marginRight: "10px", backgroundColor: (active ? "lightblue" : "none")}}
				onClick={() => props.setActivePlaylist(playlist.title)}
				>
				<Box 
					component='img' 
					sx={{ width: '80px', height: "80px",  }}
					src={testCover}
					alt="playlist" 
				/>
				<Typography sx={{textAlign: "center", overflowX: "none"}}>
					{playlist.title}
				</Typography>
			</Box>
		)
	}


	return (
		<Box sx={{display: "flex", flexDirection: "row", flexGrow: 1, 
			height: "200px", justifyContent: "flex-start", alignItems: "center", 
			paddingLeft: "10px", paddingRight: "10px", overflowX: "auto"}}>
			{/* <Box sx={{height: "100px", backgroundColor: "lightblue"}}> */}
				{sampleData.map((item) => getPlaylistItem(item))}

			{/* </Box> */}
		</Box>
	)

}

PlaylistSelector.propTypes = {
	activePlaylist: PropTypes.string,
	setActivePlaylist: PropTypes.func,
  }

export default PlaylistSelector;