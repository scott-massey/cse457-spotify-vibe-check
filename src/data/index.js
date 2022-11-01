import { useQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylists, getUserId, getCurrentUserInfo } from "./api"

const useCurrentUserPlaylists = () => {
  return useQuery({
    queryKey: ["userPlaylists"],
    queryFn: getCurrentUserPlaylists,
  })
}

export { getUserId, getCurrentUserInfo, useCurrentUserPlaylists }
