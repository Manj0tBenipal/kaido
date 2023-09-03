import React from "react";

import LoadingSpinner from "../LoadingSpinner";
import ContentList from "./ContentList";

import {
  useMostFavorite,
  useMostPopular,
  useTopAiring,
  useTopMovies,
  useTopUpcoming,
} from "../../hooks/useJikan";

export default function Featured() {
  const topAiring = useTopAiring();
  const mostPopular = useMostPopular();
  const mostFavorite = useMostFavorite();
  const upcoming = useTopUpcoming();
  const isLoading =
    topAiring.isLoading &&
    mostPopular.isLoading &&
    mostFavorite.isLoading &&
    upcoming.isLoading;

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="featured-container d-flex">
      <ContentList heading="Top Airing" data={topAiring} filterName="airing" />
      <ContentList
        heading="Most Popular"
        data={mostPopular}
        filterName="bypopularity"
      />
      <ContentList
        heading="Most Favorite"
        data={mostFavorite}
        filterName="favorite"
      />
      <ContentList
        heading="Top Upcoming"
        data={upcoming}
        filterName="upcoming"
      />
    </div>
  );
}
