import React from "react"
import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types"
import testCover from "../../Resources/img/testCover1.jpg"
import * as d3 from "d3"

// Data
import { useCurrentUserPlaylists, useGetCurrentUserInfo } from "../../data"
import { getPlaylist, getTracksFeatures } from "../../data/api"
import { obamaAlbums } from "../../data/obama/albums"
import { obamaTracks } from "../../data/obama/tracks"
import { obamaTrackFeatures } from "../../data/obama/trackFeatures"

const featuresKeys = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "loudness",
  "tempo",
  "valence",
]
function PlaylistSelector({
  activePlaylist,
  setActivePlaylist,
  setLoadingPlaylist,
  setFeaturesSummary,
  setArtistCounts,
  setSelectedTrack,
}) {
  const { data: { items = [] } = {} } = useCurrentUserPlaylists()
  const { data: user } = useGetCurrentUserInfo()

  // from https://stackoverflow.com/questions/59516720/return-summary-statistics-from-multiple-arrays
  function calculateValues(d, key) {
    var q1 = d3.quantile(d.map((g) => g[key]).sort(d3.ascending), 0.25)
    var median = d3.quantile(d.map((g) => g[key]).sort(d3.ascending), 0.5)
    var q3 = d3.quantile(d.map((g) => g[key]).sort(d3.ascending), 0.75)
    var iqr = q3 - q1
    var min = d3.min(d.map((g) => g[key]))
    var max = d3.max(d.map((g) => g[key]))
    var mean = d3.mean(d.map((g) => g[key]))
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
      mean: mean,
    }

    return returnObj

    // return {key: key, values: [q1,median,q3,iqr,min,max]};
  }

  async function HandleClick(playlistId) {
    setLoadingPlaylist(true)

    const playlist = await getPlaylist(playlistId)
    const tracks = playlist.tracks.items
    const trackFeatures = await getTracksFeatures(playlist.tracks.items)
    // console.log(playlist)
    // console.log(trackFeatures)

    // get artist counts
    // don't need to pass through what songs they are on
    const artistCounts = {}
    tracks.map((key) => {
      const trackArtists = key.track.artists

      trackArtists.forEach((artistObj) => {
        if (artistCounts[artistObj.name] !== undefined) {
          artistCounts[artistObj.name] += 1
        } else {
          artistCounts[artistObj.name] = 1
        }
      })
      return null
    })
    // console.log(artistCounts)

    const featuresSummary = featuresKeys.map((key) =>
      calculateValues(trackFeatures, key)
    )
    // console.log(featuresSummary)

    setActivePlaylist(playlist)
    setFeaturesSummary(featuresSummary)
    setArtistCounts(artistCounts)
    setSelectedTrack(null)
    setLoadingPlaylist(false)
  }

  async function HandleClickObama(playlist) {
    setLoadingPlaylist(true)
    // console.log(playlist)
    // console.log(playlist.tracks.items)

    const tracks = obamaTracks[playlist.id]
    const trackFeatures = obamaTrackFeatures[playlist.id]
    // console.log(trackFeatures)

    const artistCounts = {}
    tracks.map((key) => {
      const trackArtists = key.track.artists

      trackArtists.forEach((artistObj) => {
        if (artistCounts[artistObj.name] !== undefined) {
          artistCounts[artistObj.name] += 1
        } else {
          artistCounts[artistObj.name] = 1
        }
      })
      return null
    })
    console.log(artistCounts)
    const featuresSummary = featuresKeys.map((key) =>
      calculateValues(trackFeatures, key)
    )

    setActivePlaylist(playlist)
    setFeaturesSummary(featuresSummary)
    setArtistCounts(artistCounts)
    setSelectedTrack(null)
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
          height: "150px",
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
        minHeight: "250px",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "10px",
        paddingRight: "10px",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      {/* <Box sx={{height: "100px", backgroundColor: "lightblue"}}> */}

      {(user ? items : obamaAlbums).map((item, id) =>
        getPlaylistItem(item, id)
      )}

      {/* </Box> */}
    </Box>
  )
}

PlaylistSelector.propTypes = {
  activePlaylist: PropTypes.object,
  setActivePlaylist: PropTypes.func,
}

export default PlaylistSelector
