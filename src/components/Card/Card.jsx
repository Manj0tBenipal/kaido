import React, { useEffect, useState } from "react";
import "./card.css";
import { Link } from "react-router-dom";
import MouseOverCard from "./MouseOverCard";
export default function Card(props) {
  const anime = props.data;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className="anime-card-wrapper"
    >
      <Link
        to={`/details/jikan/${anime.mal_id}`}
        key={anime.mal_id}
        className="anime-card d-flex"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="anime-card-img-wrapper">
          <div className="tick-item">
            <span className="rating">
              {anime.rating?.slice(0, 5) || "PG-13"}
            </span>
            <span className="episode-count">CC:{anime.episodes || "Full"}</span>
          </div>

          <img src={anime.images.webp.large_image_url} alt="anime-card" />
        </div>
        <div className="card-details">
          <span className="card-title">
            {anime.title_english?.length > 18
              ? anime.title_english?.slice(0, 18) + "..."
              : anime.title_english || anime.title.length > 18
              ? anime.title?.slice(0, 18)
              : anime.title}
          </span>
          <div className="card-statistics">
            <span>
              {anime.duration === "Unknown"
                ? `?`
                : anime.duration.length > 7
                ? anime.duration.slice(0, 7)
                : anime.duration || "23m"}
            </span>
            <div className="dot"></div>
            <span>{anime.type || "TV"}</span>
          </div>
        </div>
      </Link>
      {isHovered && <MouseOverCard id={anime.mal_id} />}
    </div>
  );
}
