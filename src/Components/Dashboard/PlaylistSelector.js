import React from "react"
import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types"
import testCover from "../../Resources/img/testCover1.jpg"

// Data
import { useCurrentUserPlaylists, useGetPlaylist } from "../../data"

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

function PlaylistSelector({ activePlaylist, setActivePlaylist }) {
  const { data: { items = [] } = {} } = useCurrentUserPlaylists()
  const { data: playlist } = useGetPlaylist(activePlaylist)

  const getPlaylistItem = (playlist, id) => {
    const active = activePlaylist === playlist.id
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
          setActivePlaylist(playlist.id)
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
      {(items || sampleData).map((item, id) => getPlaylistItem(item, id))}

      {/* </Box> */}
    </Box>
  )
}

PlaylistSelector.propTypes = {
  activePlaylist: PropTypes.string,
  setActivePlaylist: PropTypes.func,
}

export default PlaylistSelector
