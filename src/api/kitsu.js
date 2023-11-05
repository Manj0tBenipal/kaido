import axios from "axios";
import { useQuery } from "react-query";
export function getRecentAnime() {
  const queryObj = useQuery("recent-anime", async () => {
    return await axios
      .get(
        "https://kitsu.io/api/edge/anime?page[limit]=10&sort=-averageRating"
      )
      .catch((error) => {
        return { data: topAnimeData, isLoading: false };
      });
  });
  const data = queryObj.data?.data.data;

  return { isLoading: queryObj.isLoading, data: data };
}
export function getTrendingAnime() {
  const queryObj = useQuery("trending-anime", async () => {
    return await axios
      .get("https://kitsu.io/api/edge/trending/anime")
      .catch((error) => {
        return { data: topAnimeData, isLoading: false };
      });
  });
  const data = queryObj.data?.data.data;

  return { isLoading: queryObj.isLoading, data: data };
}
export function getAnimeById(id) {
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
