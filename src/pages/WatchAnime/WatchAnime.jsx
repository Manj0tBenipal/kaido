import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import HlsVideoPlayer from "./HlsVideoPlayer";
import "../../main.css";
import "./watch-anime.css";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
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
  const subInfo = useAnimeInfo(searchResults?.sub?.id);
  const dubInfo = useAnimeInfo(searchResults?.dub?.id);
  const [subIsSelected, setSubIsSelected] = useState(true);
  let episodes;
  if (subInfo && dubInfo) {
    episodes = subIsSelected ? subInfo.episodes : dubInfo.episodes;
  }
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const servers = useServers(
    episodes?.length > 0 ? episodes[selectedEpisode].id : null
  );
  const [selectedServer, setSelectedServer] = useState(0);
  const episodeFiles = useEpisodeFiles(
    servers && episodes
      ? { server: servers[selectedServer], id: episodes[selectedEpisode].id }
      : { server: null, id: null }
  );

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

  const episodeButtons = episodes?.map((el, idx) => {
    return (
      <span
        className={`episode-tile ${idx === selectedEpisode ? "selected" : ""}`}
        key={el.id}
        style={
          episodes.length < 10 ? { minWidth: "100%", borderRadius: 0 } : null
        }
        onClick={() => setSelectedEpisode(idx)}
      >
        {episodes.length < 10 ? ` Episode: ` + el.number : el.number}
      </span>
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
      {episodeFiles?.isLoading ? (
        <LoadingSpinner />
      ) : (
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
                {episodeButtons}
              </div>
            </div>

            <div className="video-player">
              <HlsVideoPlayer url={episodeFiles.sources[3].url} />

              <div className="server-container d-flex-fd-column">
                <div className="server-tile-wrapper d-flex-fd-column">
                  <div>
                    Language Preference:{" "}
                    {episodes?.length > 0 && (
                      <span
                        className={`server-tile ${
                          !subIsSelected ? "selected" : ""
                        }`}
                        onClick={() => setSubIsSelected(false)}
                      >
                        Eng | Dub
                      </span>
                    )}
                    <span
                      className={`server-tile ${
                        subIsSelected ? "selected" : ""
                      }`}
                      onClick={() => setSubIsSelected(true)}
                    >
                      Jp | Sub
                    </span>
                  </div>
                  <div>Servers: {serverButtons}</div>
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
                  {descIsCollapsed
                    ? subInfo.description?.slice(0, 150) + "..."
                    : subInfo.description}
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
