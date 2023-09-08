import React, { useState } from "react";
import { FaEvernote } from "react-icons/fa";
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import rengokuPng from "../../media/muichiro.png";
import LoadingSpinner from "../LoadingSpinner";
import { Scrollbar } from "swiper/modules";
import { getAnimeReviews, getMangaReviews } from "../../hooks/jikan";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "./review-section.css";
export default function ReviewSection() {
  const [reviewsVisible, setReviewsVisible] = useState(true);
  const [animeReviewIsSelected, setAnimeReviewIsSelected] = useState(true);

  const animeReviews = getAnimeReviews();
  const mangaReviews = getMangaReviews();
  const animeList = animeReviews.data;
  const mangaList = mangaReviews.data;
  const isLoading = mangaReviews.isLoading && animeReviewIsSelected.isLoading;

  const reviewType = animeReviewIsSelected ? animeList : mangaList;
  const reviewCards = reviewType?.data
    .filter((el, idx) => idx < 11)
    .map((el, idx) => {
      return (
        <SwiperSlide className="review-card" key={el.mal_id}>
          <div className="review-card-header">
            <div className="user-profile d-flex a-center ">
              <img src={el.user.images.webp.image_url} alt="23" />
              <a rel="noreferrer" target="_blank" href={el.user.url}>
                {el.user.username}
              </a>
            </div>
          </div>
          <div className="review-text">{el.review.slice(0, 140) + "..."}</div>
          <div className="anime-title">
            <FaEvernote size={13} />
            {el.entry.title}
          </div>
        </SwiperSlide>
      );
    });

  return (
    <div className="review-section-wrapper d-flex a-center j-center">
      {!reviewsVisible ? (
        <div className="review-toggle d-flex a-center j-center">
          <span>Show reviews</span>
          <BiSolidToggleLeft
            onClick={() => setReviewsVisible(true)}
            size={35}
          />
        </div>
      ) : (
        <div className="review-section d-flex">
          <img src={rengokuPng} alt="coment" />

          <div className="review-list-container">
            <div className="review-section-toolbar d-flex a-center">
              <div className="review-type">
                <button
                  className={`${
                    animeReviewIsSelected ? "selected" : ""
                  } f-poppins`}
                  onClick={() => setAnimeReviewIsSelected(true)}
                >
                  {" "}
                  Anime
                </button>
                <button
                  className={`${
                    !animeReviewIsSelected ? "selected" : ""
                  } f-poppins`}
                  onClick={() => setAnimeReviewIsSelected(false)}
                >
                  Manga
                </button>
              </div>
              <div className="review-toggle d-flex a-center j-center">
                <span>Show reviews</span>
                <BiSolidToggleRight
                  onClick={() => setReviewsVisible(false)}
                  size={35}
                  style={{ color: "var(--theme)" }}
                />
              </div>
            </div>
            <Swiper
              modules={[Scrollbar]}
              slidesPerView={"auto"}
              scrollbar={{ draggable: true }}
              className="review-list"
              spaceBetween={30}
            >
              {isLoading ? <LoadingSpinner /> : reviewCards}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
