import React from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ANIME } from "@consumet/extensions";
import "../../main.css";
import "./watch-anime.css";
export default function WatchAnime() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [adBlockEnabled, setAdBlockEnabled] = useState(false);
  const gogoAnime = new ANIME.Gogoanime({});
  const [searchResults, setSearchResults] = useState({});
  const [currentAnimeInfo, setCurrentAnimeInfo] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisodeIdx, setCurrentEpisodeIdx] = useState(0);
  const [episodeServers, setEpisodeServers] = useState([]);
  const [currentServerIdx, setCurrentServerIdx] = useState(0);
  const serverButtons = episodeServers?.map((el, idx) => {
    return (
      <span
        style={{ margin: 10, padding: 5, border: "1px solid white" }}
        key={el.name}
        onClick={() => setCurrentServerIdx(idx)}
      >
        {el.name}
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
        style={episodes.length < 10 ? {minWidth: "100%", borderRadius: 0} : null}
        onClick={() => setCurrentEpisodeIdx(idx)}
      >
        {episodes.length < 10 ?  ` Episode: ` + el.number : el.number}
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
    }
  }, [searchResults]);
  useEffect(() => {
    if (currentAnimeInfo?.episodes?.length > 0) {
      const episodes = currentAnimeInfo.episodes.map((el, idx) => {
        return el;
      });
      setEpisodes(episodes);
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
  }, [episodes, currentEpisodeIdx]);
  console.log(currentAnimeInfo);
  return (
    <>
      {/* <div
        style={{ marginTop: 60, background: "yellow", color: "black" }}
        className="warn"
      >
        If you want to block redirects blease turn on the adBlock here. Change
        the servers and look for the working one.
        <label htmlFor="adblock">Adblock</label>
        <input
          checked={adBlockEnabled}
          onChange={(e) => setAdBlockEnabled(e.target.checked)}
          type="checkbox"
          id="adblock"
        />
      </div> */}
      <div style={{ marginTop: 60 }} className="watch-container d-flex">
        <img
          className="watch-container-background"
          src={currentAnimeInfo.image}
        />
        <div className="media-center d-flex">
          <div className="episode-container">
            <p>List Of Episodes:</p>
            <div className="episode-tiles-wrapper d-flex a-center">
              {episodeButtons}
            </div>
          </div>

          <div className="video-player">
            {adBlockEnabled ? (
              <iframe
                src={episodeServers[currentServerIdx]?.url}
                allowFullScreen
                sandbox="allow-scripts"
                border={0}
              ></iframe>
            ) : (
              <iframe
                src={episodeServers[currentServerIdx]?.url}
                allowFullScreen
              ></iframe>
            )}
            <div className="d-flex a-center j-center">Sub: {serverButtons}</div>
          </div>
        </div>
        <div className="current-anime-details"></div>
      </div>
    </>
  );
}
