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
import { easeOut, motion } from "framer-motion";

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
  /**
   * Since custom hook cannot be used inside of use Effect,
   * variables are initialized outside of useEffect
   * when the custom hooks returns the processed data from API it triggers the change in variable's value
   * Hence triggers the useEffect which then stores the value of the varibale in state.
   */
  const searchResults = useSearch(searchParams.get("name"));
  const subData = useAnimeInfo(searchResults?.sub?.id || null);
  const dubData = useAnimeInfo(searchResults?.dub?.id || null);

  /**
   * When the value of the variables changes, the useEffect is triggered a state is initialized
   * When the user changes the Server or Episode the component is re-rendered and the state is updated
   *
   * Without states the page would reload everything from the start the useEffect checks if the states already have a value
   * if yes then it does not re-render the component or does not change the state
   */

  const [subIsSelected, setSubIsSelected] = useState(true);
  const [subInfo, setSubInfo] = useState({});
  const [dubInfo, setDubInfo] = useState({});
  const [selectedServer, setSelectedServer] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [quality, setQuality] = useState("default");

  /**
   * fetches servers from the API based on the user's selection of SUB ior DUB
   */
  const servers = useServers(
    subIsSelected
      ? subInfo?.episodes?.length > 0
        ? subInfo.episodes[selectedEpisode].id
        : null
      : dubInfo?.episodes?.length > 0
      ? dubInfo.episodes[selectedEpisode].id
      : null
  );

  /**
   * Based on the inforamtion from useAnimeInfo hook, the episodes array is stored in a variable
   * with 'id' of each episode
   */
  let episodeList = subIsSelected
    ? subInfo?.episodes?.length > 0
      ? subInfo.episodes
      : null
    : dubInfo?.episodes?.length > 0
    ? dubInfo.episodes
    : null;

  /**
   * based on the values of selectedServer and selectedEpisode state the hook fetches the sources from the API
   * these sources are then used to play the video and include links to video files of different quality
   */
  const episodesData = useEpisodeFiles(
    servers && episodeList
      ? { server: servers[selectedServer], id: episodeList[selectedEpisode].id }
      : { server: null, id: null }
  );

  /**
   * Creates an array of qualities available for an episode
   */
  const episodeQuality = episodesData?.sources?.map((el) => {
    return { quality: el.quality, url: el.url };
  });

  /**
   * when the custom hook fetches search results from the API it changes the values of
   * subData and dubData variables
   *
   * when the value of these variables change the useEffect is triggered and the state is updated
   *
   * Checks if the state is empty and if the custom hook has returned the data from the API
   *
   * if the state already has the data it does not change the state(prevents re-rendering on change of episode or server)
   */
  useEffect(() => {
    if (subData && Object.keys(subInfo).length === 0) {
      setSubInfo(() => subData);
    }
    if (dubData && Object.keys(dubInfo).length === 0) {
      setDubInfo(() => dubData);
    }
  }, [subData, dubData]);

  /**
   * Checks if subAnime or dubAnime is available
   * In some cases only sub in available and in other only dub
   *
   * if subAnime is available then it sets the subIsSelected state to true
   * if dubAnime is available then it sets the subIsSelected state to false
   *
   */
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
        <div style={{ marginTop: "65px" }} className="watch-container d-flex">
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
                    {/**
                     * Checks if the anime has dub or sub and displays the respective button
                     * If the anime has both dub and sub then it displays both the buttons
                     * If the anime episode has only dub or sub then it displays only that button
                     */}
                    {dubInfo?.episodes?.length > 0 &&
                      selectedEpisode < dubInfo?.episodes?.length && (
                        <span
                          className={`server-tile ${
                            !subIsSelected ? "selected" : ""
                          }`}
                          onClick={() => setSubIsSelected(false)}
                        >
                          Dub
                        </span>
                      )}
                    {subInfo?.episodes?.length > 0 &&
                      selectedEpisode < subInfo?.episodes?.length && (
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
        </div>
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
