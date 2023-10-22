import React, { useRef, useState } from "react";
import { getGenre } from "../../api/jikan";
import LoadingSpinner from "../LoadingSpinner";
import "./genre.css";
import { Link } from "react-router-dom";
import { easeOut, motion } from "framer-motion";
import useAnimationOnce from "../../hooks/useAnimationOnce";
export default function Genre() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const containerRef = useRef(null);
  const containerInView = useAnimationOnce(containerRef);
  const genre = getGenre();
  const list = isCollapsed ? genre.data?.data.slice(0, 18) : genre.data?.data;

  const genreList = list?.map((el, idx) => {
    return (
      <Link
        key={el.mal_id}
        to={`/grid/genre?id=${el.mal_id}&name=${el.name}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={containerInView && { opacity: 1, x: ["100%", "-10%", "0%"] }}
          transition={{ duration: 0.5 }}
        >
          {el.name}
        </motion.div>
      </Link>
    );
  });

  return (
    <motion.div
      ref={containerRef}
      className="genre-wrapper "
      initial={{ opacity: 0 }}
      animate={containerInView && { x: ["50%", "-10%", "0%"], opacity: 1 }}
      transition={{ ease: easeOut, duration: 0.4 }}
    >
      <h2>Genre</h2>
      {genre.isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="genre-list d-flex a-center j-center" style={{}}>
          {genreList}

          <button
            className="f-poppins trans-03"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? "Show More" : "Show Less"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
