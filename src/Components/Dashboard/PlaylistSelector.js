import React from "react"
import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types"
import testCover from "../../Resources/img/testCover1.jpg"
import * as d3 from "d3"


// Data
import { useCurrentUserPlaylists, useGetPlaylist, useGetTracksFeatures, useGetCurrentUserInfo } from "../../data"
import { getPlaylist, getTracksFeatures } from '../../data/api'
import { CompareSharp } from "@mui/icons-material"
import { obamaAlbums } from "../../data/obama/albums"
import { obamaTracks } from "../../data/obama/tracks"
import { obamaTrackFeatures } from "../../data/obama/trackFeatures"

const featuresKeys = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'loudness', 'tempo', 'valence']

const sampleData = [
  {
    name: "playlist 1",
  },
  {
    name: "playlist 2",
  },
  {
    name: "playlist 3",
  },
  {
    name: "playlist 4",
  },
  {
    name: "playlist 5",
  },
  {
    name: "playlist 6",
  },
  {
    name: "playlist 7",
  },
  {
    name: "playlist 8",
  },
  {
    name: "playlist 9",
  },
  {
    name: "playlist 10",
  },
  {
    name: "playlist 11",
  },
  {
    name: "playlist 12",
  },
  {
    name: "playlist 13",
  },
  {
    name: "playlist 14",
  },
  {
    name: "playlist 15",
  },
  {
    name: "playlist 16",
  },
  {
    name: "playlist 17",
  },
]

function PlaylistSelector({ activePlaylist, setActivePlaylist, setLoadingPlaylist, setFeaturesSummary }) {
  const { data: { items = [] } = {} } = useCurrentUserPlaylists()
  const { data: user } = useGetCurrentUserInfo()

	// from https://stackoverflow.com/questions/59516720/return-summary-statistics-from-multiple-arrays
	function calculateValues(d, key){
		var q1 = d3.quantile(d.map(g => g[key]).sort(d3.ascending),.25)
		var median = d3.quantile(d.map(g => g[key]).sort(d3.ascending),.5)
		var q3 = d3.quantile(d.map(g => g[key]).sort(d3.ascending),.75)
		var iqr = q3 - q1
		var min = d3.min(d.map(g => g[key]))
		var max = d3.max(d.map(g => g[key]))
		var mean = d3.mean(d.map(g => g[key]))
		// var min = q1 - 1.5 * iqr
		// var max = q3 + 1.5 * iqr
		const returnObj = {
			key: key,
			q1: q1,
			median: median,
			q3: q3,
			iqr: iqr,
			min: min,
			max: max,
			mean: mean
		}

		return returnObj

		// return {key: key, values: [q1,median,q3,iqr,min,max]};
	  }


	async function HandleClick(playlistId) {
		// var playlist = pl
		// if (user) {
		// 	playlist = await getPlaylist(pl.id)
		// } 
		setLoadingPlaylist(true)


		const playlist = await getPlaylist(playlistId)
		const trackFeatures = await getTracksFeatures(playlist.tracks.items)
		
		const featuresSummary = featuresKeys.map(key => calculateValues(trackFeatures, key))
		// console.log(featuresSummary)

		setActivePlaylist(playlist)
		setFeaturesSummary(featuresSummary)
		setLoadingPlaylist(false)

	}

	async function HandleClickObama(playlist) {
		setLoadingPlaylist(true)
		// console.log(playlist)
		// console.log(playlist.tracks.items)

		const tracks = obamaTracks[playlist.id]
		const trackFeatures = obamaTrackFeatures[playlist.id]
		console.log(trackFeatures)
		const featuresSummary = featuresKeys.map(key => calculateValues(trackFeatures, key))

		setActivePlaylist(playlist)
		setFeaturesSummary(featuresSummary)
		setLoadingPlaylist(false)


	}

  const getPlaylistItem = (playlist, id) => {
    const active = activePlaylist ? activePlaylist.id === playlist.id : false
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100px",
          width: "120px",
          maxWidth: "120px",
          marginLeft: "10px",
          marginRight: "10px",
          backgroundColor: active ? "lightblue" : "none",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
			if (user) HandleClick(playlist.id)
			else HandleClickObama(playlist)
        }}
        key={id}
      >
        <Box
          component="img"
          sx={{ width: "80px", height: "80px" }}
          src={
            (playlist?.images?.length && playlist?.images[0]?.url) || testCover
          }
          alt="playlist"
        />
        <Typography sx={{ textAlign: "center", overflowX: "none" }}>
          {playlist.name}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        height: "200px",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "10px",
        paddingRight: "10px",
        overflowX: "auto",
      }}
    >
      {/* <Box sx={{height: "100px", backgroundColor: "lightblue"}}> */}
	  
      {((user) ? items : obamaAlbums).map((item, id) => getPlaylistItem(item, id))}

      {/* </Box> */}
    </Box>
  )
}

PlaylistSelector.propTypes = {
  activePlaylist: PropTypes.object,
  setActivePlaylist: PropTypes.func,
}

export default PlaylistSelector
