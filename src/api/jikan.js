import { useQuery } from "react-query";
import { queueRequest } from "./apiQueue";

const queryConfig = {
  staleTime: 2.1 * 60 * 1000,
};

function executeQuery(queryKey, endpoint) {
  return useQuery(
    queryKey,
    async () => {
      return await queueRequest(endpoint);
    },
    queryConfig
  );
}

export function handleJikanResponse(queryKey, endpoint) {
  const res = executeQuery(queryKey, endpoint);
  const data = res.data?.data;
  return { data: data, isLoading: res.isLoading, isError: res.isError };
}

export function getMangaReviews() {
  return handleJikanResponse("top-manga-reviews", "reviews/manga");
}
export function getAnimeReviews() {
  return handleJikanResponse("top-anime-reviews", "reviews/anime");
}

export function getTopAiring() {
  return handleJikanResponse("top-airing", "top/anime?filter=airing&limit=4");
}
export function getMostPopular() {
  return handleJikanResponse(
    "most-popular",
    "top/anime?filter=bypopularity&limit=4"
  );
}
export function getMostFavorite() {
  return handleJikanResponse(
    "most-favorite",
    "top/anime?filter=favorite&limit=4"
  );
}
export function getTopMovies() {
  return handleJikanResponse(
    "top-movies",
    "top/anime?type=movie&filter=bypopularity&limit=12"
  );
}
export function getTopOVAs() {
  return handleJikanResponse(
    "top-OVAs",
    "top/anime?type=ova&filter=bypopularity&limit=12"
  );
}
export function getTopONAs() {
  return handleJikanResponse(
    "top-ONAs",
    "top/anime?type=ona&filter=bypopularity&limit=12"
  );
}
export function getTopSpecials() {
  return handleJikanResponse(
    "top-specials",
    "top/anime?type=special&filter=bypopularity&limit=12"
  );
}
export function getTopUpcoming() {
  return handleJikanResponse(
    "top-upcoming",
    "top/anime?filter=upcoming&limit=4"
  );
}
export function getGenre() {
  return handleJikanResponse("genre", "genres/anime");
}
export function getTopCharacters() {
  return handleJikanResponse("top-characters", "top/characters?limit=5");
}
export function getAnimeByMalId(id) {
  return handleJikanResponse(`anime-${id}`, `anime/${id}`);
}
export function getAnimeByGenre(mal_id) {
  return handleJikanResponse(
    `anime-by-genre-${mal_id}`,
    `anime?genres=${mal_id}&limit=24`
  );
}
export function getAnimeByFilter(filterName) {
  return handleJikanResponse(
    `anime-by-filter-${filterName}`,
    `top/anime?filter=${filterName}&limit=24`
  );
}
export function getAnimeByType(type) {
  return handleJikanResponse(
    `anime-by-type-${type}`,
    `top/anime?type=${type}&limit=24`
  );
}
export function getRecommendedAnime(type) {
  return handleJikanResponse(
    `recommended-anime`,
    `anime?limit=24&status=airing&filter=bypopularity&type=tv&order_by=popularity`
  );
}
export function getRandomAnime() {
  return handleJikanResponse(`random-anime`, "random/anime");
}
export function getAnimeSearch(name, parameter) {
  let queryString = "";
  if (parameter === "title") {
    queryString = `q=${name}`;
  } else {
    queryString = `letter=${name}`;
  }

  return handleJikanResponse(
    `anime-search${name}`,
    `anime?${queryString}&sfw=true&order_by=rank&limit=24`
  );
}
