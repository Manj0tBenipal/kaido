import React from "react";
import { getAnimeByMalId } from "../../hooks/jikan";
import { FaStar } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner";
import { Link } from "react-router-dom";
import { FaEye, FaHeart, FaMedal } from "react-icons/fa";
import "./mouse-over-card.css";
export default function MouseOverCard(props) {
  const { isLoading, data } = getAnimeByMalId(props.id);
  const anime = data?.data;
  const genre = anime?.genres?.map((genre) => {
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
  return (
    <div className="mouse-over-card-wrapper d-flex-fd-column">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h3 className="title">{anime.title}</h3>
          <div className="d-flex anime-st">
            <span className=" d-flex a-center j-center">
              <FaStar color="yellow" />
              {anime.score || "?"}
            </span>
            <div className="anime-statistics-tiles-wrapper d-flex a-center">
              <span className="anime-statistics-tile d-flex a-center j-center">
                {anime.rating.length > 6
                  ? anime.rating.slice(0, 6)
                  : anime.rating || "NA"}
              </span>
              <span className="anime-statistics-tile d-flex a-center j-center">
                <FaMedal /> - {anime.rank || "NA"}
              </span>
              <span className="anime-statistics-tile d-flex a-center j-center">
                <FaHeart /> -{anime.favorites || "NA"}
              </span>
              <span className="anime-statistics-tile d-flex a-center j-center">
                <FaEye /> -{anime.members | "NA"}
              </span>
              <span className="anime-statistics-tile d-flex a-center j-center">
                HD
              </span>
            </div>
            <span className="anime-type">{anime.type}</span>
          </div>
          <p style={{ marginBottom: 0 }} className="description">
            {anime.synopsis
              ? anime.synopsis.length > 90
                ? anime.synopsis.slice(0, 90) + "..."
                : anime.synopsis
              : "?"}
          </p>
          <div
            style={{ marginBottom: 0 }}
            className="details-header-statistics"
          >
            <p>
              <b>Japanese:</b>{" "}
              {anime.title_japanese.length > 20
                ? anime.title_japanese.slice(0, 20) + "..."
                : anime.title_japanese || "?"}
            </p>

            <p>
              <b>Aired:</b>
              {anime.aired.string || "?"}
            </p>

            <p>
              <b>Status:</b> {anime.status}
            </p>
          </div>
          <div className="anime-st-genre">
            <p>
              <b>Genre: </b>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
