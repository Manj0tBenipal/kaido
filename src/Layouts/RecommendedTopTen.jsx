import React from "react";
import Genre from "../components/Genre/Genre";
import TopTenAnime from "../components/TopTen/TopTenAnime";
import AnimeCollection from "../components/MainContainer/AnimeCollection";
import { Outlet } from "react-router-dom";
import { useGetRecommendedAnime } from "../hooks/useJikan";
import LoadingSpinner from "../components/LoadingSpinner";
export default function RecommendedTopTen() {
  const collection = useGetRecommendedAnime();

  return (
    <>
      <Outlet />
      <div
        className=" main-container d-flex  "
        style={
          window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
        }
      >
        <AnimeCollection
          collectionName="Recommended for you"
          data={collection}
        />
      </div>
    </>
  );
}
