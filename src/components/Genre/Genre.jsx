import React, { useState } from "react";
import { getGenre } from "../../hooks/jikan";
import LoadingSpinner from "../LoadingSpinner";
import "./genre.css";
import { Link } from "react-router-dom";
export default function Genre() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const genre = getGenre();
  const list = isCollapsed ? genre.data?.data.slice(0, 18) : genre.data?.data;
  const genreList = list?.map((el) => {
    return (
      <Link
        key={el.mal_id}
        to={`/grid/genre?id=${el.mal_id}&name=${el.name}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        {el.name}
      </Link>
    );
  });

  return genre.isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="genre-wrapper ">
      <h2>Genre</h2>
      <div className="genre-list d-flex a-center j-center" style={{}}>
        {genreList}

        <button
          className="f-poppins trans-03"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          {isCollapsed ? "Show More" : "Show Less"}
        </button>
      </div>
    </div>
  );
}
