import axios from "axios"
import cookie from "js-cookie"

let spotifyAxios = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${cookie.get("spotifyAuthToken")}`,
  },
})

const getTracksFeatures = async (tracks) => {
  const trackIds = tracks.map((item) => item.track.id).join(",")
  const { data } = await spotifyAxios.get(`/audio-features?ids=${trackIds}`)
  return data.audio_features
}

const getTrackFeatures = async (trackId) => {
  if (!trackId) return null

  const { data } = await spotifyAxios.get(`/audio-features/${trackId}`)
  return data
}

const getPlaylist = async (playlistId) => {
  if (!playlistId) return null
  try {
    const res = await spotifyAxios.get(`/playlists/${playlistId}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const getCurrentUserPlaylists = async () => {
  try {
    const userId = await getUserId()

    if (!userId) return []

    const res = await spotifyAxios.get(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        params: {
          limit: 50,
        },
      }
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}

const getUserId = async () => {
  const userCookie = cookie.get("user")

  if (!userCookie) {
    if (!cookie.get("spotifyAuthToken")) return null
    const user = await getCurrentUserInfo()
    return user?.id
  }

  const userInfo = JSON.parse(userCookie)

  return userInfo.id
}

const getCurrentUserInfo = async () => {
  const token = cookie.get("spotifyAuthToken")
  if (!token) return null
  if (!spotifyAxios.defaults.headers["Authorization"]) {
    spotifyAxios.defaults.headers["Authorization"] = `Bearer ${token}`
  }

  const data = await spotifyAxios.get("/me")
  cookie.set("user", JSON.stringify(data.data))
  return data.data
}

const logout = async () => {
  cookie.remove("spotifyAuthToken")
  cookie.remove("user")

  window.location.href = "/"
}

export {
  getCurrentUserPlaylists,
  getUserId,
  getCurrentUserInfo,
  logout,
  getPlaylist,
  getTracksFeatures,
  getTrackFeatures,
}
