import React from "react";

import { useSearchParams } from "react-router-dom";
import { getAnimeByGenre } from "../api/jikan";

import AnimeCollection from "../components/MainContainer/AnimeCollection";
import LoadingSpinner from "../components/LoadingSpinner";
import { easeOut, motion } from "framer-motion";

export default function Grid() {
  const [params, setParams] = useSearchParams();
  const anime = getAnimeByGenre(params.get("id"));

  return (
    <motion.div
      className="collections-wrapper d-flex-fd-column a-center "
      initial={{ opacity: 0 }}
      animate={{ x: [window.innerWidth /2, 0], opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      {!anime.isLoading ? (
        <AnimeCollection collectionName={params.get("name")} data={anime} />
      ) : (
        <LoadingSpinner />
      )}
    </motion.div>
  );
}
