import axios from "axios"
import cookie from "js-cookie"

let spotifyAxios = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${cookie.get("spotifyAuthToken")}`,
  },
})

const getCurrentUserPlaylists = async () => {
  try {
    const userId = await getUserId()

    const res = await spotifyAxios.get(
      `https://api.spotify.com/v1/users/${userId}/playlists`
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}

const getUserId = async () => {
  const userCookie = cookie.get("user")

  if (!userCookie) {
    await getCurrentUserInfo()
    return getUserId()
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

  const data = await spotifyAxios.get("https://api.spotify.com/v1/me")
  console.log("data:", data)
  cookie.set("user", JSON.stringify(data.data))
}

export { getCurrentUserPlaylists, getUserId, getCurrentUserInfo }
