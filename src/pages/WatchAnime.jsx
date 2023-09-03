import React from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ANIME } from "@consumet/extensions";
export default function WatchAnime() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [adBlockEnabled, setAdBlockEnabled] = useState(true);
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
        style={{ margin: 10, padding: 5, border: "1px solid white" }}
        key={el.id}
        onClick={() => setCurrentEpisodeIdx(idx)}
      >
        {el.number}
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
  console.log(adBlockEnabled);

  return (
    <div style={{ marginTop: 100 }}>
      <div>
        If None of the servers work please disable Adblocking Here And change
        the server <label htmlFor="adblock">Adblock</label>
        <input
          checked={adBlockEnabled}
          onChange={(e) => setAdBlockEnabled(e.target.checked)}
          type="checkbox"
          id="adblock"
        />
      </div>
      {episodeButtons}
      <div>
        {adBlockEnabled ? (
          <iframe
            height="300"
            width="500"
            src={episodeServers[currentServerIdx]?.url}
            allowFullScreen
            sandbox="allow-scripts"
          ></iframe>
        ) : (
          <iframe
            height="300"
            width="500"
            src={episodeServers[currentServerIdx]?.url}
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div>{serverButtons}</div>
    </div>
  );
}
