import React, { useRef } from "react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { getTrendingAnime } from "../../api/kitsu";
import "swiper/css";
import "swiper/css/navigation";
import "./trending.css";
import { Link } from "react-router-dom";
import { easeOut, motion, useInView } from "framer-motion";
import LazyImage from "../../utils/LazyImage";
export default function Trending() {
  const { data } = getTrendingAnime();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const animeCard = data?.map((el, idx) => {
    const item = el.attributes;
    const title = item.titles.en || item.titles.en_jp;

    return (
      <SwiperSlide key={item.titles.en_jp} className="trending-slide">
        <div
          initial={{ opacity: 0 }}
          animate={isInView ? { x: [100, 10, 0], opacity: 1 } : undefined}
          transition={{
            duration: 0.2,
            delay: idx * 0.1 + 1.2,
            ease: easeOut,
          }}
        >
          <motion.div
            className="trending-item-sidebar"
            initial={{ opacity: 0 }}
            animate={isInView && { x: [100, 10, 0], opacity: 1 }}
            transition={{
              duration: 0.2,
              delay: idx * 0.12 + 1.2,
              ease: easeOut,
            }}
          >
            <p className="f-poppins">
              {title.length > 15 ? title.slice(0, 15) + "..." : title}
            </p>
            <span>{idx > 8 ? idx + 1 : "0" + (idx + 1)}</span>
          </motion.div>
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            to={`/details/kitsu/${el.id}`}
          >
            <LazyImage
              initial={{ opacity: 0 }}
              animate={isInView && { x: [100, 10, 0], opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: idx * 0.15,
                ease: easeOut,
              }}
              src={item.posterImage.small}
              className="trending-slide-img"
              alt={item.title}
              isAnimated={true}
            />
          </Link>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <div className="trending-section-wrapper" ref={ref}>
      <h2 className="section-header">Trending</h2>
      <Swiper
        className="swiper"
        modules={[Navigation]}
        breakpoints={{
          1700: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
          1600: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
          1450: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 4,
          },
          200: {
            slidesPerView: 2,
          },
          300: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={5}
        slidesPerView={3}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".btn-nextTwo",
          prevEl: ".btn-prevTwo",
        }}
      >
        {animeCard}
        <div className="trending-swiper-navigation trans-c-03">
          <div className="btn-nextTwo swiper-controls d-flex a-center j-center ">
            <FaChevronRight size={20} />
          </div>
          <div className="btn-prevTwo swiper-controls d-flex a-center j-center ">
            <FaChevronLeft size={20} />
          </div>
        </div>
      </Swiper>
    </div>
  );
}
