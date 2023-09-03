import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAnimeByFilter } from "../hooks/useJikan";
import LoadingSpinner from "../components/LoadingSpinner";
import AnimeCollection from "../components/MainContainer/AnimeCollection";

export default function AnimeByFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const collection = useGetAnimeByFilter(searchParams.get("name"));

  return !collection.isLoading ? (
    <div className="collections-wrapper d-flex-fd-column a-center ">
      <AnimeCollection
        collectionName={searchParams.get("heading")}
        data={collection}
      />
    </div>
  ) : (
    <LoadingSpinner />
  );
}
