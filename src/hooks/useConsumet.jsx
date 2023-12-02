import axios from "axios";
import { useQuery } from "react-query";
import { servers } from "../api/gogoanime_servers";
function handleConsumetResponse(endpoint, parameter) {
  const BASE_URL = "https://kaido-api.vercel.app/anime/gogoanime";
  const results = useQuery(`${endpoint}${parameter}`, async () => {
    if (parameter) {
      return await axios
        .get(`${BASE_URL}${endpoint}${parameter}`)
        .catch((err) => console.log(err));
    }
  });
  if (!parameter) {
    return { isLoading: true };
  }
  return {
    isLoading: results.isLoading,
    isError: results.isError,
    data: results.data?.data,
  };
}

/**
 *
 * @param  name
 * @returns an object containing loading and error states from the query and data retrieved
 */

export function useSearch(name) {
  const searchResults = handleConsumetResponse("/", name.toLowerCase());
  console.log(name.toLowerCase());
  const results = searchResults.data?.results;

  let subAnime, dubAnime;
  if (results?.length === 0) {
    return { noAnime: true };
  }
  /**
   * if results only contain one item determine wheter its sub or dub
   */
  if (results?.length === 1) {
    if (
      results[0].id.slice(results[0].id.length - 3, results[0].id.length) ===
      "dub"
    ) {
      dubAnime = results[0];
    } else {
      subAnime = results[0];
    }
  }
  console.log(results);
  if (results?.length > 1) {
    const suffix_0 = results[0].id.slice(
      results[0].id.length - 3,
      results[0].id.length
    );
    /**
     * if results.length is more than one
     * if the first item is not dub->
     * then set the subAnime=results[0]
     *
     * check if the second item is dub->
     * if true set the dubAnime=results[1]
     * else set dubAnime=null
     *
     * else check if first item dub->
     *  if yes set dubAnime=results[0]
     *  and subAnime=null
     */
    if (suffix_0 !== "dub") {
      subAnime = results[0];

      dubAnime =
        results.find((el) => el.id === subAnime.id + "-dub") || results[1];
    } else if (suffix_0 === "dub") {
      dubAnime = results[0];
      subAnime = results.find(
        (el) => (el.id = dubAnime.id.slice(0, dubAnime.id.length - 4))
      );
    }
  }
  if (!searchResults.isLoading) {
    return {
      dub: dubAnime,
      sub: subAnime,
      isLoading: searchResults.isLoading,
      isError: searchResults.isError,
    };
  }
}

export function useAnimeInfo(id) {
  const results = handleConsumetResponse(`/info/`, id);
  if (!results.isLoading && results.data) {
    return results.data;
  }
}
export function useServers(episodeId) {
  const results = handleConsumetResponse(`/servers/`, episodeId);

  if (!results.isLoading && results.data) {
    const usableServers = [];

    for (let i = 0; i < servers.length; i++) {
      for (let j = 0; j < results.data.length; j++) {
        if (servers[i].name === results.data[j].name) {
          usableServers.push({ ...results.data[j], id: servers[i].id });
        }
      }
    }

    return usableServers;
  }
}

export function useEpisodeFiles({ server, id }) {
  const results = handleConsumetResponse(
    "/watch/",
    server && id ? `${id}?server=${server.id}` : null
  );
  if (!results.isLoading && results.data) {
    return {
      sources: results.data.sources,
      isLoading: results.isLoading,
    };
  } else {
    return { isLoading: results.isLoading };
  }
}
