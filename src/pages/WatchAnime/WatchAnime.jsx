import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import HlsVideoPlayer from "./HlsVideoPlayer";
import "../../main.css";
import "./watch-anime.css";
import loadingImage from "../../media/placeholder.gif";
import RecommendedTopTen from "../../Layouts/RecommendedTopTen";
import Share from "../../components/Share/Share";
import LoadingSpinner from "../../components/LoadingSpinner";
import { easeInOut, easeOut, motion } from "framer-motion";

import Error from "../../components/AnimeNotFound/Error";
import {
  useAnimeInfo,
  useEpisodeFiles,
  useSearch,
  useServers,
} from "../../hooks/useConsumet";
export default function WatchAnime() {
  const [descIsCollapsed, setDescIsCollapsed] = useState(true);
  const [searchParams] = useSearchParams();
  const searchResults = useSearch(searchParams.get("name"));
  const subData = useAnimeInfo(searchResults?.sub?.id);
  const dubData = useAnimeInfo(searchResults?.dub?.id);

  //States initialized to avoid the relaod of the component once episode or server is changed by user

  const [subIsSelected, setSubIsSelected] = useState(true);
  const [subInfo, setSubInfo] = useState({});
  const [dubInfo, setDubInfo] = useState({});
  const [selectedServer, setSelectedServer] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [quality, setQuality] = useState("default");
  const servers = useServers(
    subIsSelected
      ? subInfo?.episodes?.length > 0
        ? subInfo.episodes[selectedEpisode].id
        : null
      : dubInfo?.episodes?.length > 0
      ? dubInfo.episodes[selectedEpisode].id
      : null
  );
  let episodeList = subIsSelected
    ? subInfo?.episodes?.length > 0
      ? subInfo.episodes
      : null
    : dubInfo?.episodes?.length > 0
    ? dubInfo.episodes
    : null;

  const episodesData = useEpisodeFiles(
    servers && episodeList
      ? { server: servers[selectedServer], id: episodeList[selectedEpisode].id }
      : { server: null, id: null }
  );
  const episodeQuality = episodesData?.sources?.map((el) => {
    return { quality: el.quality, url: el.url };
  });

  useEffect(() => {
    if (subData && Object.keys(subInfo).length === 0) {
      setSubInfo(() => subData);
    }
    if (dubData && Object.keys(dubInfo).length === 0) {
      setDubInfo(() => dubData);
    }
  }, [subData, dubData]);
  useEffect(() => {
    if (Object.keys(subInfo).length) {
      setSubIsSelected(true);
    }
    if (Object.keys(dubInfo).length) {
      setSubIsSelected(false);
    }
  }, [subInfo, dubInfo]);
  // Server and episode buttons to change the respective item
  const serverButtons = servers?.map((el, idx) => {
    return (
      <span
        className={`server-tile ${selectedServer === idx ? "selected" : ""}`}
        key={el.name}
        onClick={() => setSelectedServer(idx)}
      >
        {el.name}
      </span>
    );
  });

  const episodeButtons = episodeList?.map((el, idx) => {
    return (
      <span
        className={`episode-tile ${idx === selectedEpisode ? "selected" : ""}`}
        key={el.id}
        style={
          episodeList.length < 10 ? { minWidth: "100%", borderRadius: 0 } : null
        }
        onClick={() => setSelectedEpisode(idx)}
      >
        {episodeList.length < 10 ? ` Episode: ` + el.number : el.number}
      </span>
    );
  });
  const qualityButtons = episodeQuality?.map((el) => {
    return (
      <option
        key={el.quality}
        style={{ color: "white" }}
        className={`episode-tile ${el.quality === quality ? "selected" : ""}`}
        value={el.quality}
      >
        {el.quality.toUpperCase()}
      </option>
    );
  });
  if (searchResults?.noAnime) {
    return <Error />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: [window.innerWidth / 2, 0], opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      {Object.keys(subInfo).length > 0 || Object.keys(dubInfo).length > 0 ? (
        <motion.div
          style={{ marginTop: "65px" }}
          className="watch-container d-flex"
          animate={{ y: [-window.innerHeight / 2, 10, 0] }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <img
            className="watch-container-background"
            src={subIsSelected ? subInfo?.image : dubInfo?.image}
          />
          <div className="media-center d-flex">
            <div className="episode-container">
              <p>List of Episodes:</p>
              <div className="episode-tiles-wrapper d-flex a-center">
                {episodeList?.length > 0 ? episodeButtons : <LoadingSpinner />}
              </div>
            </div>

            <div className="video-player">
              <div className="hls-container">
                {episodeQuality?.length > 0 ? (
                  <HlsVideoPlayer
                    url={
                      episodeQuality?.find((el) => el.quality === quality)?.url
                    }
                  />
                ) : (
                  <div
                    className="d-flex a-center j-center"
                    style={{ height: "100%" }}
                  >
                    <img
                      src={loadingImage}
                      style={{
                        display: "block",
                        height: 100,
                        width: 100,
                        margin: "auto",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="server-container d-flex-fd-column">
                <div className="server-tile-wrapper d-flex-fd-column">
                  <div>
                    Language Preference:{" "}
                    {dubInfo?.episodes?.length > 0 && (
                      <span
                        className={`server-tile ${
                          !subIsSelected ? "selected" : ""
                        }`}
                        onClick={() => setSubIsSelected(false)}
                      >
                        Dub
                      </span>
                    )}
                    {subInfo?.episodes?.length > 0 && (
                      <span
                        className={`server-tile ${
                          subIsSelected ? "selected" : ""
                        }`}
                        onClick={() => setSubIsSelected(true)}
                      >
                        Sub
                      </span>
                    )}
                  </div>
                  <div>
                    Servers:{" "}
                    {servers?.length > 0 ? (
                      serverButtons
                    ) : (
                      <img
                        src={loadingImage}
                        style={{ height: 100, width: 100 }}
                      />
                    )}
                  </div>
                  <div>
                    Quality:
                    <select
                      style={{
                        width: "100px",
                        marginLeft: 10,
                        background: "var(--theme)",
                      }}
                      className={`episode-tile`}
                      onChange={(e) => setQuality(e.target.value)}
                      value={quality}
                    >
                      {qualityButtons}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="current-anime-details ">
            <img
              className="details-container-background"
              src={subIsSelected ? subInfo.image : dubInfo.image || "NA"}
            />
            <div className="anime-details d-flex-fd-column">
              <img
                className="anime-details-poster"
                src={subIsSelected ? subInfo.image : dubInfo.image || "NA"}
              />

              <div className="anime-details-content d-flex-fd-column">
                <h1 style={{ textAlign: "center" }} className="title-large">
                  {subIsSelected ? subInfo.title : dubInfo.title}
                </h1>

                <p>
                  {subIsSelected
                    ? descIsCollapsed
                      ? subInfo.description?.slice(0, 150) + "..."
                      : subInfo.description
                    : descIsCollapsed
                    ? dubInfo.description?.slice(0, 150) + "..."
                    : dubInfo.description}
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
        </motion.div>
      ) : !(subInfo && dubInfo) ? (
        <Error />
      ) : (
        <LoadingSpinner />
      )}

      <Share
        style={{
          paddingInline: 20,
        }}
      />

      <RecommendedTopTen />
    </motion.div>
  );
}
