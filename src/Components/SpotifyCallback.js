import { SpotifyAuthListener } from "react-spotify-auth"

const SpotifyCallback = () => {
  const accessTokenHandler = () => {
    window.location = "/"
  }

  return <SpotifyAuthListener onAccessToken={accessTokenHandler} />
}

export { SpotifyCallback }
