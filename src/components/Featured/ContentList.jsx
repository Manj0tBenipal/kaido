import React from "react";
import "./content-list.css";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";
import LazyImage from "../../utils/LazyImage";
export default function CategorieContainer(props) {
  
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const list = props.data.data?.data.map((el, idx) => {
    return (
      <li key={el.mal_id} className="d-flex a-center">
        <LazyImage
          src={el.images.webp.large_image_url || el.images.webp.image_url}
          alt="poster"
          isAnimated={false}
        />
        <div className="anime-details d-flex-fd-column">
          <span className="title">
            <Link
              to={`/details/jikan/${el.mal_id}`}
              className="trans-03"
              onClick={() => window.scrollTo({ top: 0 })}
            >
              {el.title_english || el.title}
            </Link>
          </span>
          <div className="episode-info d-flex f-ubuntu">
            <span className="episode-count">CC:{el.episodes || "?"}</span>{" "}
            <span className="quality d-flex a-center j-center">
              <FaStar />
              {el.score || "?"}
            </span>
            <div className="dot"></div>
            <div className="show-type">{el.type}</div>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div ref={ref} className="category-container d-flex-fd-column">
      <h4>{props.heading}</h4>
      <ul>{list}</ul>
      <Link
        to={`/grid/filter?name=${props.filterName}&heading=${props.heading}`}
        className="view-more-link"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        View More
        <FaChevronRight size={14} />
      </Link>
    </div>
  );
}
