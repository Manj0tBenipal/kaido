import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
export default function Card(props) {
  const anime = props.data;

  return (
    <Link
      to={`/details/jikan/${anime.mal_id}`}
      key={anime.mal_id}
      className="anime-card d-flex"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <div className="anime-card-img-wrapper">
        <div className="tick-item">
          <span className="rating">{anime.rating?.slice(0, 5) || "PG-13"}</span>
          <span className="episode-count">CC:{anime.episodes || "Full"}</span>
        </div>

        <img src={anime.images.webp.image_url} alt="anime-card" />
      </div>
      <div className="card-details">
        <span className="card-title">
          {anime.title_english?.length > 15
            ? anime.title_english?.slice(0, 15) + "..."
            : anime.title_english || anime.title}
        </span>
        <div className="card-statistics">
          <span>
            {anime.duration === "Unknown"
              ? `${anime.season || "S:NA"}   ${anime.year || "Y:NA"}`
              : anime.duration.length > 7
              ? anime.duration.slice(0, 7)
              : anime.duration || "23m"}
          </span>
          <div className="dot"></div>
          <span>{anime.type || "TV"}</span>
        </div>
      </div>
    </Link>
  );
}
