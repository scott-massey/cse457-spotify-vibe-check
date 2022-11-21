import React from "react"
import classnames from "classnames"

import { CircularProgress } from "@mui/material"
import classNames from "classnames"

const SongSelector = ({
  activePlaylist = { tracks: { items: [] } },
  selectedTrack,
  setSelectedTrack,
}) => {
  if (!activePlaylist || !activePlaylist.id) {
    return <div />
  }

  if (activePlaylist.tracks.items.length === 0) {
    return (
      <div className="centered">
        <CircularProgress />
      </div>
    )
  }

  const onTrackSelect = (track) => {
    if (track.id === selectedTrack?.id) {
      return setSelectedTrack(null)
    }
    return setSelectedTrack(track)
  }

  const renderSongOption = (playlistItem) => {
    const { track } = playlistItem

    return (
      <div
        key={track.id}
        className={classNames("song-select-track", {
          "song-select-track-selected": selectedTrack?.id === track.id,
        })}
        onClick={() => onTrackSelect(track)}
      >
        <img
          className="song-select-img"
          src={track.album.images[0].url}
          alt={track.name}
        />
        <div className="song-select-text">
          <p className="song-select-title">{track.name}</p>
          <p className="song-select-artist">{track.artists[0].name}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="song-select-container">
      <p className="song-select-header">
        Click on a song to see more about that individual song.
      </p>
      <div className="song-select-list">
        {activePlaylist.tracks.items.map(renderSongOption)}
      </div>
    </div>
  )
}

export default SongSelector
