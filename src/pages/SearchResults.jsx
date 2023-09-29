import React from "react";
import { useSearchParams } from "react-router-dom";
import { getAnimeSearch } from "../api/jikan";
import AnimeCollection from "../components/MainContainer/AnimeCollection";
import Genre from "../components/Genre/Genre";
import TopTenAnime from "../components/TopTen/TopTenAnime";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/AnimeNotFound/Error";
import { motion } from "framer-motion";
export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const animeData = getAnimeSearch(
    searchParams.get("name"),
    searchParams.get("parameter")
  );

  return (
    <motion.div
      className=" main-container d-flex  "
      style={
        window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
      }
      initial={{ opacity: 0 }}
      animate={{ x: [window.innerWidth / 2, 0], opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="sidebar-wrapper d-flex-fd-column">
        <Genre />
        <TopTenAnime />
      </div>
      <div className="collections-wrapper">
        {animeData.isLoading ? (
          <LoadingSpinner />
        ) : animeData.data?.data.length < 1 ? (
          <Error />
        ) : (
          <AnimeCollection collectionName="Search Results" data={animeData} />
        )}
      </div>
    </motion.div>
  );
}
