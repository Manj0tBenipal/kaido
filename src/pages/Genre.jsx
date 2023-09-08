import React from "react";


import { useSearchParams } from "react-router-dom";
import { getAnimeByGenre } from "../hooks/jikan";

import AnimeCollection from "../components/MainContainer/AnimeCollection";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Grid() {
  const [params, setParams] = useSearchParams();
  const anime = getAnimeByGenre(params.get("id"));

  return !anime.isLoading ? (
    <div className="collections-wrapper d-flex-fd-column a-center ">
      <AnimeCollection collectionName={params.get("name")} data={anime} />
    </div>
  ) : (
    <LoadingSpinner />
  );
}
