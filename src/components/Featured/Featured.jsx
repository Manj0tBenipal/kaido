import React from "react";

import LoadingSpinner from "../LoadingSpinner";
import ContentList from "./ContentList";

import {
  getMostFavorite,
  getMostPopular,
  getTopAiring,
  getTopUpcoming,
} from "../../api/jikan";

export default function Featured() {
  const topAiring = getTopAiring();
  const mostPopular = getMostPopular();
  const mostFavorite = getMostFavorite();
  const upcoming = getTopUpcoming();
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
