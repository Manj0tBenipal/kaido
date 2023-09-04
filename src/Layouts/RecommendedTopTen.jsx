import React from "react";
import TopTenAnime from "../components/TopTen/TopTenAnime";
import AnimeCollection from "../components/MainContainer/AnimeCollection";
import Genre from "../components/Genre/Genre";
import Share from "../components/Share/Share";
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
      </div>
    </>
  );
}
