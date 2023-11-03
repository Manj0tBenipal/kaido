import React from "react";
import "./card.css";
import "./skeleton-card.css";
export default function SkeletonCard() {
  return (
    <div className="anime-card-wrapper skeleton-blink">
      <div className="anime-card d-flex">
        <div className={`anime-card-img-wrapper  `}>
          <div className="img-blur d-flex a-center j-center trans-03"></div>

          <div className="tick-item">
            <span className="rating"></span>
            <span className="episode-count"></span>
          </div>

          <div className="skeleton-card-img"></div>
        </div>
        <div className="card-details">
          <span className="card-title"></span>
          <div className="card-statistics">
            <span></span>

            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
