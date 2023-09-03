import React from "react";
import { useSearchParams } from "react-router-dom";
import {  useGetAnimeByType } from "../hooks/useJikan";
import LoadingSpinner from "../components/LoadingSpinner";
import AnimeCollection from "../components/MainContainer/AnimeCollection";

export default function AnimeByType() {
  const [searchParams, setSearchParams] = useSearchParams();
  const collection = useGetAnimeByType(searchParams.get("typeName"));

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
