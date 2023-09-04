import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAnimeSearch } from "../hooks/useJikan";
import AnimeCollection from "../components/MainContainer/AnimeCollection";
import Genre from "../components/Genre/Genre";
import TopTenAnime from "../components/TopTen/TopTenAnime";
import LoadingSpinner from "../components/LoadingSpinner";
export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const animeData = useGetAnimeSearch(searchParams.get("name"));
  console.log(animeData);
  return (
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
      <div className="collections-wrapper">
        {animeData.isLoading ? (
          <LoadingSpinner />
        ) : (
          <AnimeCollection collectionName="Search Results" data={animeData} />
        )}
      </div>
    </div>
  );
}
