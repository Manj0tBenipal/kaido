import React from "react";
import { useSearchParams } from "react-router-dom";
import { getAnimeByType } from "../api/jikan";
import LoadingSpinner from "../components/LoadingSpinner";
import AnimeCollection from "../components/MainContainer/AnimeCollection";
import { easeOut, motion } from "framer-motion";

export default function AnimeByType() {
  const [searchParams] = useSearchParams();
  const collection = getAnimeByType(searchParams.get("typeName"));

  return (
    <motion.div
      className="collections-wrapper d-flex-fd-column a-center "
      initial={{ opacity: 0 }}
      animate={{ x: [window.innerWidth /2, 0], opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      {collection.isLoading ? (
        <LoadingSpinner />
      ) : (
        <AnimeCollection
          collectionName={searchParams.get("heading")}
          data={collection}
        />
      )}
    </motion.div>
  );
}
