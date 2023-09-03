import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useTopCharacters, useHandleJikanResponse } from "../../hooks/useJikan";

import { FaThumbsUp } from "react-icons/fa";
export default function TopPosts() {
  const { isLoading, data } =useTopCharacters()
  
  const characterDpStyles = {
    height: "90px",
  };

  //Elements inherit css from TopTenAnime -- Same list Style
  const list = data?.data.map((el, idx) => {
    return (
      <li key={el.mal_id} className="d-flex a-center">
        <span
          className={`rank ${0 < idx + 1 && idx + 1 <= 3 ? "top-three" : ""}`}
        >
          {idx + 1}
        </span>
        <div className="top-10-item d-flex a-center">
          <img
            style={characterDpStyles}
            className="character-dp"
            src={el.images.webp.image_url}
            alt="poster"
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
      </li>
    );
  });
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="top-ten-wrapper">
      <div className="top-ten-header d-flex a-center">
        <h2>Top Characters</h2>
      </div>

      <ul>{list}</ul>
    </div>
  );
}
