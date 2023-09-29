import React from "react";
import TopTenAnime from "../components/TopTen/TopTenAnime";
import AnimeCollection from "../components/MainContainer/AnimeCollection";
import Genre from "../components/Genre/Genre";
import { Outlet } from "react-router-dom";
import { getRecommendedAnime } from "../api/jikan";
import LoadingSpinner from "../components/LoadingSpinner";
import { easeOut, motion } from "framer-motion";
export default function RecommendedTopTen() {
  const collection = getRecommendedAnime();

  return (
    <>
      <Outlet />

      <motion.div
        className=" main-container d-flex"
        initial={{ opacity: 0 }}
        animate={{ x: [window.innerWidth, 0], opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        style={
          window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
        }
      >
        <div className="sidebar-wrapper d-flex-fd-column">
          <Genre />
          <TopTenAnime />
        </div>
        <div
          className=" collections-wrapper d-flex  "
          style={
            window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
          }
        >
          {collection.isLoading ? (
            <LoadingSpinner />
          ) : (
            <AnimeCollection
              collectionName="Recommended for you"
              data={collection}
            />
          )}
        </div>
      </motion.div>
    </>
  );
}
