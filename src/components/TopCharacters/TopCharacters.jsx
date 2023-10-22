import React, { useRef } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { getTopCharacters } from "../../api/jikan";
import { easeOut, motion } from "framer-motion";

import { FaThumbsUp } from "react-icons/fa";
import useAnimationOnce from "../../hooks/useAnimationOnce";
import LazyImage from "../../utils/LazyImage";
export default function TopPosts() {
  const { isLoading, data } = getTopCharacters();
  const ref = useRef(null);

  const containerInView = useAnimationOnce(ref);

  const characterDpStyles = {
    height: "90px",
  };

  //Elements inherit css from TopTenAnime -- Same list Style
  const list = data?.data.map((el, idx) => {
    return (
      <motion.li
        key={el.mal_id}
        className="d-flex a-center"
        initial={{ opacity: 0 }}
        animate={containerInView && { opacity: 1, x: ["100%", "-3%", "0%"] }}
        transition={{ duration: 0.2 * idx }}
      >
        <span
          className={`rank ${0 < idx + 1 && idx + 1 <= 3 ? "top-three" : ""}`}
        >
          {idx + 1}
        </span>
        <div className="top-10-item d-flex a-center">
          <LazyImage
            style={characterDpStyles}
            className="character-dp"
            src={el.images.webp.image_url}
            alt="poster"
            isInView={containerInView}
          />
          <div className="anime-details d-flex-fd-column">
            <span className="title">
              <a href={el.url} className="trans-03">
                {el.name}
              </a>
            </span>
            <div className="episode-info d-flex ">
              <span className="quality d-flex a-center j-center">
                <FaThumbsUp />
                {el.favorites}
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--grey)" }}>
              <b>BIO: </b>
              {el.about.slice(0, 50)}...
            </p>
          </div>
        </div>
      </motion.li>
    );
  });
  return (
    <motion.div
      className="top-ten-wrapper"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={
        containerInView
          ? { opacity: 1, y: ["10%", "-3%", "0%"] }
          : { opacity: 0 }
      }
      transition={{ duration: 0.6, ease: easeOut }}
    >
      <div className="top-ten-header d-flex a-center">
        <h2>Top Characters</h2>
      </div>
      {isLoading ? <LoadingSpinner /> : <ul>{list}</ul>}
    </motion.div>
  );
}
