import { ANIME } from "@consumet/extensions";
const gogoAnime = new ANIME.Gogoanime();
export function getAnimeIds(name) {
  let result = {
    data: {},
    isLoading: true,
  };
  try {
    gogoAnime.search(name).then((data) => {
      result.data = data;
      result.isLoading = false;
      console.log(data);
    });
  } catch (error) {
    result = {
      ...result,
      isError: true,
      error: error,
      isLoading: false,
    };
  } finally {
    return result;
  }
}
