import { SpotifyAuthListener } from "react-spotify-auth"
import { setAuthToken } from "../data"

const SpotifyCallback = () => {
  const accessTokenHandler = async (token) => {
    await setAuthToken(token)
    //window.location = "/"
  }

  return <SpotifyAuthListener onAccessToken={accessTokenHandler} />
}

export { SpotifyCallback }
