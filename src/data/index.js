import { useQuery } from "@tanstack/react-query"
import {
  getCurrentUserPlaylists,
  getUserId,
  getCurrentUserInfo,
  logout,
  getPlaylist,
  getTracksFeatures,
  getTrackFeatures,
} from "./api"

const useCurrentUserPlaylists = () => {
  return useQuery({
    queryKey: ["userPlaylists"],
    queryFn: getCurrentUserPlaylists,
  })
}

const useGetCurrentUserInfo = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserInfo,
  })
}

const useGetPlaylist = (playlistId) => {
  return useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylist(playlistId),
  })
}

const useGetTracksFeatures = (tracks) => {
  // if(!tracks) return
//   console.log(tracks)
  return useQuery({
    queryKey: ["tracksFeatures", tracks.map((track) => track.id).join(",")],
    queryFn: () => getTracksFeatures(tracks),
  })
}

const useGetTrackFeatures = (trackId) => {
  return useQuery({
    queryKey: ["trackFeatures", trackId],
    queryFn: () => getTrackFeatures(trackId),
  })
}

export {
  getUserId,
  useGetCurrentUserInfo,
  useCurrentUserPlaylists,
  logout,
  useGetPlaylist,
  useGetTracksFeatures,
  useGetTrackFeatures,
}
