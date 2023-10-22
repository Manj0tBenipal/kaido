import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./hero.css";
import {
  FaCalendar,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaPlayCircle,
} from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getRecentAnime } from "../../api/kitsu";
import LoadingSpinner from "../LoadingSpinner";
import { Link } from "react-router-dom";
import { easeOut, motion } from "framer-motion";
import LazyImage from "../../utils/LazyImage";

export default function Hero() {
  const { isLoading, data } = getRecentAnime();

  const heroSlide = data?.map((el, idx) => {
    const item = el.attributes;

    return (
      <SwiperSlide data-bs-interval="4 00" key={el.id}>
        <div className={`carousel-item`}>
          <div className="anime-info">
            <div className="anime-info-content">
              <span className="rank">#{idx + 1} Spotlight</span>
              <h1 className="anime-title">
                {item.titles.en || item.titles.en_jp}
              </h1>
              <div className="anime-statistics">
                <span className="anime-st-item">
                  <FaPlayCircle size={14} />
                  {item.subtype}
                </span>
                <span className="anime-st-item">
                  <FaClock size={14} />
                  {item.episodeLength + "m"}
                </span>

                <span className="anime-st-item">
                  <FaCalendar size={13} /> {item.startDate}
                </span>
                <span className="anime-st-item">
                  <span className="quality">HD</span>
                  <span className="episode-count">
                    CC:{item.episodeCount || "Unknown"}
                  </span>
                </span>
              </div>
              <p className="description">
                {(item.background && item.background.slice(0, 200) + "...") ||
                  (item.synopsis && item.synopsis.slice(0, 200) + "...")}
              </p>
              <div className="button-wrapper">
                <Link
                  onClick={() => window.scrollTo({ top: 0 })}
                  to={`/watch?name=${
                    item.canonicalTitle || item.titles.en || item.titles.en_jp
                  }`}
                  className="btn-primary hero-button"
                >
                  <FaPlayCircle size={12} /> Watch Now
                </Link>
                <Link
                  to={`/details/kitsu/${el.id}`}
                  onClick={() => window.scrollTo({ top: 0 })}
                  className="btn-secondary hero-button"
                >
                  Details <FaChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>
          <LazyImage
            className="carousel-img"
            src={
              item.posterImage?.original ||
              item.posterImage?.large ||
              item.posterImage?.small ||
              item.posterImage?.medium
            }
            alt={item.titles.en_jp || item.titles.en}
            isAnimated={false}
          />
        </div>
      </SwiperSlide>
    );
  });

  return (
    <motion.div
      className="carousel slide"
      style={{ position: "relative" }}
      animate={{ y: [-window.innerHeight / 3, 10, 0] }}
      transition={{ duration: 1.3, ease: easeOut }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            direction="horizontal"
            loop={true}
            autoplay={true}
            modules={[Pagination, Navigation, Autoplay]}
            navigation={{
              nextEl: ".carousel-control-next",
              prevEl: ".carousel-control-prev",
            }}
            className="carousel slide"
          >
            {heroSlide}
          </Swiper>
          <div className="carousel-controls-wrapper">
            <button
              className="carousel-controls carousel-control-next trans-03 "
              type="button"
            >
              <FaChevronRight size={15} />
            </button>
            <button
              className="carousel-controls carousel-control-prev trans-03  "
              type="button"
            >
              <FaChevronLeft size={15} />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
