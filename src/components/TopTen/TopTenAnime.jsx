import React, { useState } from "react";
import "./top-ten.css";
import { getTrendingAnime } from "../../hooks/kitsu";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function TopTenAnime() {
  const { data } = getTrendingAnime();
  const [period, setPeriod] = useState(2);
  const animeList = data && [...data];
  const sortedList = animeList?.sort(
    (a, b) =>
      b.attributes.ratingFrequencies[`${period}`] -
      a.attributes.ratingFrequencies[`${period}`]
  );
  const list = sortedList?.map((el, idx) => {
    const title = el.attributes.titles.en || el.attributes.titles.en_jp;
    return (
      <li key={title} className="d-flex a-center">
        <span
          className={`rank ${0 < idx + 1 && idx + 1 <= 3 ? "top-three" : ""}`}
        >
          {idx + 1 > 9 ? idx + 1 : "0" + (idx + 1)}
        </span>
        <div className="top-10-item d-flex a-center">
          <img src={el.attributes.posterImage.tiny} alt="poster" />
          <div className="anime-details d-flex-fd-column">
            <span className="title">
              <Link
                onClick={() => window.scrollTo({ top: 0 })}
                to={`/details/kitsu/${el.id}`}
                className="trans-03"
              >
                {title}
              </Link>
            </span>
            <div className="episode-info d-flex ">
              <span className="episode-count">
                EP:
                {el.attributes.episodeCount || "NA"}
              </span>
              <span className="quality d-flex a-center j-center">
                <FaStar />
                {(parseFloat(el.attributes.averageRating) / 10).toFixed(2)}
              </span>
              <div className="show-type">{el.attributes.subtype}</div>
            </div>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="top-ten-wrapper">
      <div className="top-ten-header d-flex a-center">
        <h2>Top 10</h2>
        <div className="top-ten-tabs">
          <button
            onClick={() => setPeriod(2)}
            className={`${
              period === 2 ? "selected" : ""
            } period-selector f-poppins`}
          >
            Today
          </button>
          <button
            onClick={() => setPeriod(8)}
            className={`${
              period === 8 ? "selected" : ""
            } period-selector f-poppins`}
          >
            Week
          </button>
          <button
            onClick={() => setPeriod(20)}
            className={`${
              period === 20 ? "selected" : ""
            } period-selector f-poppins`}
          >
            Month
          </button>
        </div>
      </div>
      <ul>{list}</ul>
    </div>
  );
}
