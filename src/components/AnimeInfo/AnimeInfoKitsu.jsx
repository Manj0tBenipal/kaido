import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import "./AnimeInfo.css";
import { easeOut, motion } from "framer-motion";
import { FaEye, FaHeart, FaMedal, FaPlayCircle, FaPlus } from "react-icons/fa";
import Share from "../Share/Share";
import { getAnimeById } from "../../api/kitsu";
import { Link, useParams } from "react-router-dom";
import LazyImage from "../../utils/LazyImage";

export default function Details() {
  const params = useParams();
  const { data, isLoading } = getAnimeById(params.id);
  const [descIsCollapsed, setDescIsCollapsed] = useState(true);
  return (
    <motion.div
      className="details-container"
      initial={{ opacity: 0 }}
      animate={{ x: [window.innerWidth, 100, 0], opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="details-header">
          <div className="details-header-primary">
            <LazyImage
              className="details-container-background"
              src={
                data.attributes.coverImage?.small ||
                data.attributes.coverImage?.original ||
                data.attributes.coverImage?.large ||
                data.attributes.posterImage?.small ||
                data.attributes.posterImage?.original ||
                data.attributes.posterImage?.large
              }
            />
            <div className="anime-details d-flex">
              <img
                className="anime-details-poster"
                src={
                  data.attributes.posterImage?.small ||
                  data.attributes.posterImage?.original ||
                  data.attributes.posterImage?.large ||
                  data.attributes.coverImage?.small ||
                  data.attributes.coverImage?.original ||
                  data.attributes.coverImage?.large
                }
              />

              <div className="anime-details-content d-flex-fd-column">
                <h1 className="title-large">
                  {data.attributes.titles.en || data.attributes.titles.en_jp}
                </h1>
                <div className="anime-statistics-tiles-wrapper d-flex a-center">
                  <span className="anime-statistics-tile d-flex a-center j-center">
                    {data.attributes.ageRating || "NA"}
                  </span>
                  <span className="anime-statistics-tile d-flex a-center j-center">
                    <FaMedal /> - {data.attributes.popularityRank}
                  </span>
                  <span className="anime-statistics-tile d-flex a-center j-center">
                    <FaHeart /> -{data.attributes.favoritesCount || "NA"}
                  </span>
                  <span className="anime-statistics-tile d-flex a-center j-center">
                    <FaEye /> -{data.attributes.userCount || "NA"}
                  </span>
                  <span className="anime-statistics-tile d-flex a-center j-center">
                    HD
                  </span>
                </div>
                <div className="button-wrapper">
                  <Link
                    to={`/watch?name=${
                      data.attributes.titles.en ||
                      data.attributes.canonicalTitle ||
                      data.attributes.titles.en_jp
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
                  {descIsCollapsed
                    ? data.attributes.description?.slice(0, 350) + "..."
                    : data.attributes.description}
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
        </div>
      )}
    </motion.div>
  );
}
