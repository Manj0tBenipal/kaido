import axios from "axios";
import { useQuery } from "react-query";
import topAnimeData from "../data/topAnime";
export function useRecentAnime() {
  const queryObj = useQuery("recent-anime", async () => {
    return await axios
      .get(
        "https://kitsu.io/api/edge/anime?filter[status]=current&sort=-averageRating"
      )
      .catch((error) => {
        return { data: topAnimeData, isLoading: false };
      });
  });
  const data = queryObj.isError ? topAnimeData.data : queryObj.data?.data.data;

  return { isLoading: queryObj.isLoading, data: data };
}
export function useTrendingAnime() {
  const queryObj = useQuery("trending-anime", async () => {
    return await axios
      .get("https://kitsu.io/api/edge/trending/anime")
      .catch((error) => {
        return { data: topAnimeData, isLoading: false };
      });
  });
  const data = queryObj.isError ? topAnimeData.data : queryObj.data?.data.data;

  return { isLoading: queryObj.isLoading, data: data };
}
export function useGetAnimeById(id) {
  const queryObj = useQuery(`anime-${id}`, async () => {
    return await axios
      .get(`https://kitsu.io/api/edge/anime/${id}`)
      .catch((error) => {
        return error;
      });
  });
  const data = queryObj.data?.data.data;
  return { isLoading: queryObj.isLoading, data: { ...data } };
}
