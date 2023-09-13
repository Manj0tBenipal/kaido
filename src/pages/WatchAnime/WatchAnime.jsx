import React from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ANIME } from "@consumet/extensions";
import "../../main.css";
import "./watch-anime.css";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import RecommendedTopTen from "../../Layouts/RecommendedTopTen";
import Share from "../../components/Share/Share";
import LoadingSpinner from "../../components/LoadingSpinner";
import error from "../../media/error.gif";
export default function WatchAnime() {
  const [descIsCollapsed, setDescIsCollapsed] = useState(true);
  const [searchParams] = useSearchParams();
  const [adBlockEnabled, setAdBlockEnabled] = useState(false);
  const gogoAnime = new ANIME.Gogoanime({});
  const [subIsSelected, setSubIsSelected] = useState(true);

  const [searchResults, setSearchResults] = useState({});
  const [rawResultsDub, setRawResultsDub] = useState({});
  const [searchResultsDub, setSearchResultsDub] = useState({});

  const [currentAnimeInfo, setCurrentAnimeInfo] = useState({});
  const [currentAnimeInfoDub, setCurrentAnimeInfoDub] = useState({});

  const [episodes, setEpisodes] = useState([]);
  const [episodesDub, setEpisodesDub] = useState([]);

  const [episodeServers, setEpisodeServers] = useState([]);
  const [episodeServersDub, setEpisodeServersDub] = useState([]);

  const [currentServerIdx, setCurrentServerIdx] = useState(0);
  const [currentEpisodeIdx, setCurrentEpisodeIdx] = useState(0);

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

  function handlLanguageChange(preference) {
    if (preference) {
      if (episodes.length < currentEpisodeIdx + 1) {
        setCurrentEpisodeIdx(0);
      }
      setSubIsSelected(true);
    } else {
      if (episodesDub.length < currentEpisodeIdx + 1) {
        setCurrentEpisodeIdx(0);
      }
      setSubIsSelected(false);
    }
  }
  //UseEffects For Sub
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
        .fetchEpisodeServers(episodes[currentEpisodeIdx]?.id)
        .then((data) => {
          setEpisodeServers(data);
        });
    }
    if (searchResults?.results?.length > 0) {
      gogoAnime.search(searchResults.results[1]?.id).then((data) => {
        setRawResultsDub({ fromSubArr: data });
      });
      gogoAnime.search(`${searchResults.results[0].id}-dub`).then((data) => {
        setRawResultsDub((prev) => ({ ...prev, fromSubId: data }));
      });
    }
  }, [episodes, currentEpisodeIdx]);

  //UseEffects For Dub

  useEffect(() => {
    if (
      rawResultsDub?.fromSubArr?.results &&
      rawResultsDub?.fromSubId?.results
    ) {
      if (rawResultsDub.fromSubId?.results?.length > 0) {
        setSearchResultsDub(rawResultsDub.fromSubId);
      } else {
        setSearchResultsDub(rawResultsDub.fromSubArr);
      }
    }
  }, [rawResultsDub]);

  useEffect(() => {
    if (searchResultsDub?.results?.length > 0) {
      gogoAnime.fetchAnimeInfo(searchResultsDub?.results[0].id).then((data) => {
        setCurrentAnimeInfoDub({ ...data });
      });
    }
  }, [searchResultsDub]);
  useEffect(() => {
    if (currentAnimeInfoDub?.episodes?.length > 0) {
      const episodes = currentAnimeInfoDub.episodes.map((el) => {
        return el;
      });
      setEpisodesDub(episodes);
    }
  }, [currentAnimeInfoDub]);
  useEffect(() => {
    if (episodesDub.length > 0) {
      gogoAnime
        .fetchEpisodeServers(episodesDub[currentEpisodeIdx]?.id)
        .then((data) => {
          setEpisodeServersDub(data);
        });
    }
  }, [episodesDub, currentEpisodeIdx]);
  return (
    <>
      {Object.keys(searchResults).length === 0 ? (
        <LoadingSpinner />
      ) : searchResults.results.length === 0 ? (
        <div
          style={{ marginTop: "65px" }}
          className="gogoanime-error d-flex-fd-column a-center j-center"
        >
          <img src={error} alt="error"></img>
          <h2>Sorry, we couldn't find the anime you requested.</h2>
        </div>
      ) : (
        <div style={{ marginTop: "65px" }} className="watch-container d-flex">
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
                    {episodesDub?.length > 0 && (
                      <span
                        className={`server-tile ${
                          !subIsSelected ? "selected" : ""
                        }`}
                        onClick={() => handlLanguageChange(false)}
                      >
                        Eng | Dub
                      </span>
                    )}
                    <span
                      className={`server-tile ${
                        subIsSelected ? "selected" : ""
                      }`}
                      onClick={() => handlLanguageChange(true)}
                    >
                      Jp | Sub
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
                  {subIsSelected
                    ? currentAnimeInfo.title
                    : currentAnimeInfoDub.title}
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
      )}

      <Share
        style={{
          paddingInline: 20,
        }}
      />

      <RecommendedTopTen />
    </>
  );
}
