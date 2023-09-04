import React from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ANIME } from "@consumet/extensions";
import "../../main.css";
import "./watch-anime.css";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import RecommendedTopTen from "../../Layouts/RecommendedTopTen";
export default function WatchAnime() {
  const [descIsCollapsed, setDescIsCollapsed] = useState(true);
  const [searchParams] = useSearchParams();
  const [adBlockEnabled, setAdBlockEnabled] = useState(false);
  const gogoAnime = new ANIME.Gogoanime({});
  const [searchResults, setSearchResults] = useState({});
  const [subIsSelected, setSubIsSelected] = useState(true);

  const [currentAnimeInfo, setCurrentAnimeInfo] = useState({});
  const [currentAnimeInfoDub, setCurrentAnimeInfoDub] = useState({});

  const [episodes, setEpisodes] = useState([]);
  const [episodesDub, setEpisodesDub] = useState([]);

  const [episodeServers, setEpisodeServers] = useState([]);
  const [episodeServersDub, setEpisodeServersDub] = useState([]);

  const [currentServerIdx, setCurrentServerIdx] = useState(0);
  const [currentEpisodeIdx, setCurrentEpisodeIdx] = useState(0);
  // const experiment = getAnimeIds(searchParams.get("name"));
  // console.log(experiment);

  const serverButtonsDub = episodeServersDub?.map((el, idx) => {
    return (
      <span
        className={`server-tile ${currentServerIdx === idx ? "selected" : ""}`}
        key={el.name}
        onClick={() => setCurrentServerIdx(idx)}
      >
        {el.name}
      </span>
    );
  });
  const serverButtons = episodeServers?.map((el, idx) => {
    return (
      <span
        className={`server-tile ${currentServerIdx === idx ? "selected" : ""}`}
        key={el.name}
        onClick={() => setCurrentServerIdx(idx)}
      >
        {el.name}
      </span>
    );
  });

  const episodeButtonsDub = episodesDub?.map((el, idx) => {
    return (
      <span
        className={`episode-tile ${
          idx === currentEpisodeIdx ? "selected" : ""
        }`}
        key={el.id}
        style={
          episodes.length < 10 ? { minWidth: "100%", borderRadius: 0 } : null
        }
        onClick={() => setCurrentEpisodeIdx(idx)}
      >
        {episodes.length < 10 ? ` Episode: ` + el.number : el.number}
      </span>
    );
  });
  const episodeButtons = episodes?.map((el, idx) => {
    return (
      <span
        className={`episode-tile ${
          idx === currentEpisodeIdx ? "selected" : ""
        }`}
        key={el.id}
        style={
          episodes.length < 10 ? { minWidth: "100%", borderRadius: 0 } : null
        }
        onClick={() => setCurrentEpisodeIdx(idx)}
      >
        {episodes.length < 10 ? ` Episode: ` + el.number : el.number}
      </span>
    );
  });

  useEffect(() => {
    gogoAnime
      .search(searchParams.get("name"))
      .then((data) => setSearchResults(data));
  }, []);
  useEffect(() => {
    if (searchResults?.results?.length > 0) {
      gogoAnime.fetchAnimeInfo(searchResults.results[0].id).then((data) => {
        setCurrentAnimeInfo(data);
      });
      gogoAnime.fetchAnimeInfo(searchResults.results[1].id).then((data) => {
        setCurrentAnimeInfoDub(data);
      });
    }
  }, [searchResults]);
  useEffect(() => {
    if (currentAnimeInfo?.episodes?.length > 0) {
      const episodes = currentAnimeInfo.episodes.map((el, idx) => {
        return el;
      });
      setEpisodes(episodes);
    }
    if (currentAnimeInfoDub?.episodes?.length > 0) {
      const episodes = currentAnimeInfoDub.episodes.map((el, idx) => {
        return el;
      });
      setEpisodesDub(episodes);
    }
  }, [currentAnimeInfo]);
  useEffect(() => {
    if (episodes.length > 0) {
      gogoAnime
        .fetchEpisodeServers(episodes[currentEpisodeIdx].id)
        .then((data) => {
          setEpisodeServers(data);
        });
    }
    if (episodesDub.length > 0) {
      gogoAnime
        .fetchEpisodeServers(episodesDub[currentEpisodeIdx].id)
        .then((data) => {
          setEpisodeServersDub(data);
        });
    }
  }, [episodes, currentEpisodeIdx]);
  return (
    <>
      <div style={{ paddingTop: "65px" }} className="watch-container d-flex">
        <img
          className="watch-container-background"
          src={currentAnimeInfo.image}
        />
        <div className="media-center d-flex">
          <div className="episode-container">
            <p>List Of Episodes:</p>
            <div className="episode-tiles-wrapper d-flex a-center">
              {subIsSelected ? episodeButtons : episodeButtonsDub}
            </div>
          </div>

          <div className="video-player">
            {adBlockEnabled ? (
              <iframe
                src={
                  subIsSelected
                    ? episodeServers[currentServerIdx]?.url
                    : episodeServersDub[currentServerIdx]?.url
                }
                allowFullScreen
                sandbox="allow-scripts allow-same-origin"
                border={0}
              ></iframe>
            ) : (
              <iframe
                src={
                  subIsSelected
                    ? episodeServers[currentServerIdx]?.url
                    : episodeServersDub[currentServerIdx]?.url
                }
                allowFullScreen
              ></iframe>
            )}
            <div className="server-container d-flex-fd-column">
              <div
                style={{
                  background: "yellow",
                  color: "black",
                  padding: "10px",
                }}
                className="warn"
              >
                To Block redirects, enable AdBlock. Change the servers to see
                the effect. Some servers might not work
                <p className="d-flex a-center j-center">
                  AdBlock
                  {adBlockEnabled ? (
                    <BiToggleRight
                      style={{ cursor: "pointer" }}
                      size={25}
                      onClick={() => setAdBlockEnabled((prev) => !prev)}
                    />
                  ) : (
                    <BiToggleLeft
                      style={{ cursor: "pointer" }}
                      size={25}
                      onClick={() => setAdBlockEnabled((prev) => !prev)}
                    />
                  )}
                </p>
              </div>
              <div className="server-tile-wrapper d-flex-fd-column">
                <div>
                  Language Preference:{" "}
                  <span
                    className={`server-tile ${
                      !subIsSelected ? "selected" : ""
                    }`}
                    onClick={() => setSubIsSelected(false)}
                  >
                    DUB
                  </span>
                  <span
                    className={`server-tile ${subIsSelected ? "selected" : ""}`}
                    onClick={() => setSubIsSelected(true)}
                  >
                    SUB
                  </span>
                </div>
                <div>
                  Servers: {subIsSelected ? serverButtons : serverButtonsDub}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="current-anime-details ">
          <img
            className="details-container-background"
            src={currentAnimeInfo.image || "NA"}
          />
          <div className="anime-details d-flex-fd-column">
            <img
              className="anime-details-poster"
              src={currentAnimeInfo.image || "NA"}
            />

            <div className="anime-details-content d-flex-fd-column">
              <h1 style={{ textAlign: "center" }} className="title-large">
                {currentAnimeInfo.title}
              </h1>

              <p>
                {descIsCollapsed
                  ? currentAnimeInfo.description?.slice(0, 150) + "..."
                  : currentAnimeInfo.description}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setDescIsCollapsed((prev) => !prev)}
                >
                  [ {descIsCollapsed ? "More" : "Less"} ]
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <RecommendedTopTen />
    </>
  );
}
