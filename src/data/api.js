import axios from "axios"
import cookie from "js-cookie"

const getCurrentUserPlaylists = async () => {
  try {
    const userId = getUserId()

    const res = await axios.get(
      `https://api.spotify.com/v1/users/${userId}/playlists`
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}

const setAuthToken = (token) => {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`
  getCurrentUserInfo()
}

const getUserId = () => {
  const userInfo = JSON.parse(cookie.get("user"))

  return userInfo.id
}

const getCurrentUserInfo = async () => {
  const data = await axios.get("https://api.spotify.com/v1/me")
  cookie.set("user", JSON.stringify(data))
}

export { getCurrentUserPlaylists, setAuthToken, getUserId, getCurrentUserInfo }
