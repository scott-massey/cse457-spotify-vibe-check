import { useQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylists, setAuthToken, getUserId } from "./api"

const useCurrentUserPlaylists = () => {
  return useQuery({
    queryKey: ["userPlaylists"],
    queryFn: getCurrentUserPlaylists,
  })
}

export { setAuthToken, getUserId, useCurrentUserPlaylists }
