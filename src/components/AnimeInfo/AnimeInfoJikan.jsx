import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import "./AnimeInfo.css";
import { Link, useParams } from "react-router-dom";
import { FaEye, FaHeart, FaMedal, FaPlayCircle, FaPlus } from "react-icons/fa";
import Share from "../Share/Share";
import { getAnimeByMalId } from "../../api/jikan";
import { easeOut, motion } from "framer-motion";
import LazyImage from "../../utils/LazyImage";
export default function Details() {
  const params = useParams();
  const { data, isLoading } = getAnimeByMalId(params.id);
  const animeObj = data?.data;
  const [descIsCollapsed, setDescIsCollapsed] = useState(true);
  const genre = animeObj?.genres.map((genre) => {
    return (
      <Link
        className="genre-button"
        key={genre.mal_id}
        onClick={() => window.scrollTo({ top: 0 })}
        to={`/grid/genre?id=${genre.mal_id}&name=${genre.name}`}
      >
        {genre.name}
      </Link>
    );
  });

  const licensors = animeObj?.licensors?.map((licensor) => {
    return (
      <Link
        key={licensor.name}
        to={`/grid/${licensor.mal_id}/${licensor.name}`}
      >
        {licensor.name + ", "}
      </Link>
    );
  });

  const producers = animeObj?.producers?.map((producer) => {
    return (
      <Link
        key={producer.name}
        to={`/grid/${producer.mal_id}/${producer.name}`}
      >
        {producer.name + ", "}
      </Link>
    );
  });

  const studios = animeObj?.studios?.map((studio) => {
    return (
      <Link key={studio.name} to={`/grid/${studio.mal_id}/${studio.name}`}>
        {studio.name + ", "}
      </Link>
    );
  });

  const synonyms = animeObj?.title_synonyms?.map((title) => (
    <span key={title}>{title},</span>
  ));

  return (
    /**
     * Each Property fetched from the API consists of a conditional check whether the property is available or not
     * If not a Fallback value is displayed
     * The Fallback value is "NA" which stands for Not Available
     */
    <motion.div
      className="details-container"
      initial={{ opacity: 0 }}
      animate={{ x: [window.innerWidth, 0], opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      {!isLoading ? (
        <div className="details-header">
          <div className="details-header-primary">
            <img
              className="details-container-background"
              src={
                animeObj.images.webp.image_url ||
                animeObj.images.webp.large_image_url ||
                animeObj.images.webp.large_small_url ||
                animeObj.images.jpg.large_image_url ||
                "NA"
              }
            />
            <div className="anime-details d-flex">
              <LazyImage
                className="anime-details-poster"
                src={
                  animeObj.images.webp.image_url ||
                  animeObj.images.webp.large_image_url ||
                  animeObj.images.webp.large_small_url ||
                  "NA"
                }
                isAnimated={false}
              />

              <div className="anime-details-content d-flex-fd-column">
                <h1 className="title-large">
                  {animeObj.title_english || animeObj.title || "NA"}
                </h1>
                <div className="anime-statistics-tiles-wrapper d-flex a-center">
                  <span className="anime-statistics-tile d-flex a-center j-center">
                    {animeObj?.rating
                      ? window.innerWidth < 450
                        ? animeObj.rating.slice(0, 6)
                        : animeObj.rating
                      : "NA"}
                  </span>
                  <span className="anime-statistics-tile d-flex a-center j-center">
                    <FaMedal /> - {animeObj.rank || "NA"}
                  </span>
                  <span className="anime-statistics-tile d-flex a-center j-center">
                    <FaHeart /> -{animeObj.favorites || "NA"}
                  </span>
                  <span className="anime-statistics-tile d-flex a-center j-center">
                    <FaEye /> -{animeObj.members || "NA"}
                  </span>
                  <span className="anime-statistics-tile d-flex a-center j-center">
                    HD
                  </span>
                </div>
                <div className="button-wrapper">
                  <Link
                    to={`/watch?name=${
                      animeObj.title_english || animeObj.title
                    }`}
                    className="btn-primary hero-button"
                    onClick={() => window.scrollTo({ top: 0 })}
                  >
                    <FaPlayCircle size={12} /> Watch Now
                  </Link>
                  <button className="btn-secondary  hero-button">
                    Add to List <FaPlus size={12} />
                  </button>
                </div>
                <p>
                  {animeObj?.synopsis
                    ? descIsCollapsed
                      ? animeObj.synopsis?.slice(0, 350) + "..."
                      : animeObj.synopsis
                    : "NA"}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setDescIsCollapsed((prev) => !prev)}
                  >
                    [ {descIsCollapsed ? "More" : "Less"} ]
                  </span>
                </p>
                <Share style={{ padding: 0, margin: 0 }} />
              </div>
            </div>
          </div>

          <div className="details-header-secondary">
            <div className="details-header-statistics">
              <p>
                <b>Japanese:</b> {animeObj.title_japanese}
              </p>
              <p>
                <b>Synonyms:</b> {synonyms.length > 0 ? synonyms : "N/A"}
              </p>
              <p>
                <b>Aired:</b>
                {animeObj.aired.string || "?"}
              </p>
              <p>
                <b>Duration:</b> {animeObj.duration || "NA"}
              </p>
              <p>
                <b>Score:</b> {animeObj.score}
              </p>
              <p>
                <b>Status:</b> {animeObj.status}
              </p>
              <p>
                <b>Premiered:</b> {animeObj.season || "Season: ?" + " "}
                {animeObj.year || "Year: ?"}
              </p>
            </div>
            <div className="details-header-genre">
              <p>
                <b>Genre: </b>
                {genre}
              </p>
            </div>
            <div className="details-header-studio">
              <p>
                <b>Producers: </b>
                {producers}
              </p>
              <p>
                <b>Licensors: </b>
                {licensors}
              </p>
              <p>
                <b>Studios: </b>
                {studios}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </motion.div>
  );
}
