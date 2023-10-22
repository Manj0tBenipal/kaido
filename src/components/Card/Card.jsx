import React, { useEffect, useRef, useState } from "react";
import "./card.css";
import { Link } from "react-router-dom";
import MouseOverCard from "./MouseOverCard";
import { FaPlayCircle } from "react-icons/fa";
import { easeOut, motion, useInView } from "framer-motion";
import LazyImage from "../../utils/LazyImage";
export default function Card(props) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef);
  const anime = props.data;
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const setWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    const listener = window.addEventListener("resize", setWidth);
    return () => window.removeEventListener(listener, setWidth);
  });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={isInView && { opacity: 1 }}
      transition={{ duration: 0.5, delay: props.delay, ease: easeOut }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className="anime-card-wrapper"
    >
      <Link
        to={`/details/jikan/${anime.mal_id}`}
        key={anime.mal_id}
        className="anime-card d-flex"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <div className={`anime-card-img-wrapper  `}>
          {screenWidth > 1150 && (
            <div
              style={isHovered ? { opacity: 1 } : { opacity: 0 }}
              className="img-blur d-flex a-center j-center trans-03"
            >
              <FaPlayCircle color="white" size={70} />{" "}
            </div>
          )}
          <div className="tick-item">
            <span className="rating">
              {anime.rating?.slice(0, 5) || "PG-13"}
            </span>
            <span className="episode-count">CC:{anime.episodes || "Full"}</span>
          </div>

          <LazyImage
            src={anime.images.webp.large_image_url}
            alt="anime-card"
            isAnimated={false}
          />
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
      {screenWidth > 1150 && isHovered && anime && (
        <MouseOverCard id={anime.mal_id} />
      )}
    </motion.div>
  );
}
