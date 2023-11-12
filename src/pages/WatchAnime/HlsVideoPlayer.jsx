import React, { useEffect, useState, useRef } from "react";
import Hls from "hls.js";
import "./hls.css";
import {
  MdFullscreen,
  MdVolumeUp,
  MdPlayArrow,
  MdPause,
  MdBrandingWatermark,
  MdFullscreenExit,
  MdVolumeOff,
  MdVolumeDown,
  MdSettings,
  MdHighQuality,
  MdSpeed,
  MdRotateLeft,
  MdRotateRight,
} from "react-icons/md/";
export default function HLSVideoPlayer({ episodeData }) {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(25);
  const [duration, setDuration] = useState({
    duration: 0,
    formattedDuration: "0:00",
  });
  const [currentTime, setCurrentTime] = useState({
    currentTime: 0,
    formattedDuration: "0:00",
  });

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [settings, setSettings] = useState({
    playbackIndex: 4,
    qualityIndex: 0,
  });
  const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);
  const settingsTabs = [<MdSpeed />, <MdHighQuality />].map((el, idx) => {
    return (
      <button
        key={idx}
        className={selectedSettingsTab === idx ? "selected" : ""}
        onClick={() => setSelectedSettingsTab(idx)}
      >
        {el}
      </button>
    );
  });

  const qualities = episodeData.map((el, idx) => {
    return (
      <button
        key={el + idx}
        className={settings.qualityIndex === idx ? "selected" : ""}
        onClick={() => {
          setSettings((prev) => ({ ...prev, qualityIndex: idx }));
        }}
      >
        {el.quality}
      </button>
    );
  });

  const playbackSpeeds = [
    "2x",
    "1.75x",
    "1.5x",
    "1.25x",
    "1x",
    "0.75x",
    "0.5x",
  ].map((el, idx) => {
    return (
      <button
        key={el + idx}
        className={settings.playbackIndex === idx ? "selected" : ""}
        onClick={() => {
          setSettings((prev) => ({ ...prev, playbackIndex: idx }));
          videoRef.current.playbackRate = parseFloat(el.slice(0, -1));
        }}
      >
        {el}
      </button>
    );
  });
  useEffect(() => {
    if (videoRef.current) {
      setIsPlaying(false);
    }
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(episodeData[settings.qualityIndex].url);
      hls.attachMedia(videoRef.current);
      return () => {
        hls.destroy();
      };
    } else {
      console.error("HLS is not supported in this browser.");
    }
  }, [settings.qualityIndex]);

  useEffect(() => {
    //handles the keydoen events such as f-> Fullscreen and m->Mute etc..
    function handleKeyDown(e) {
      if (e.target.tagName === "INPUT") return;
      let key = e.key.toLowerCase();

      switch (key) {
        case "m":
          toggleMute();
          break;
        case " ":
          e.preventDefault();
          togglePlay();

          break;
        case "k":
          togglePlay();
          break;
        case "i":
          togglePIP();
          break;
        case "f":
          toggleFullScreen();
          break;
      }
    }

    document.addEventListener("keydown", (e) => handleKeyDown(e));

    //This useEffect updates the state of fullScreen as the user uses keyboard or mouse click event to change the fullScreen mode
    //Helps keep the button icons in sync irrespective of the trigger of fullScreen Mode
    if (videoContainerRef.current) {
      videoContainerRef.current.addEventListener(
        "fullscreenchange",
        handleFullScreenChange
      );

      /**
       * The function below handle the display of controls inside the video player
       * controls appear when user moves mouse inside the video player
       * Controls disappear on inactivity
       * controls appear when mouse moves into the video container
       */

      videoContainerRef.current.addEventListener("mousemove", () => {
        if (controlsRef.current) {
          controlsRef.current.classList.add("awake");
        }
      });
      videoContainerRef.current.addEventListener("mouseover", () => {
        if (controlsRef.current) {
          controlsRef.current.classList.add("awake");
        }
      });

      //
      videoContainerRef.current.addEventListener("mouseout", () => {
        if (controlsRef.current) {
          controlsRef.current.classList.remove("awake");
          controlsRef.current.classList.toggle("fade");
        }
      });
    }

    //Manages the duration of the video and the progress as the video
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        const durationInSec = videoRef.current.duration;

        setDuration(() => {
          return {
            duration: durationInSec,
            formattedDuration: formatTime(durationInSec),
          };
        });
      });

      videoRef.current.addEventListener("timeupdate", () => {
        const currentTimeInSec = videoRef.current.currentTime;
        setCurrentTime(() => {
          return {
            currentTime: currentTimeInSec,
            formattedDuration: formatTime(currentTimeInSec),
          };
        });
      });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (videoContainerRef.current) {
        videoContainerRef.current.removeEventListener(
          "fullscreenchange",
          handleFullScreenChange
        );
        videoContainerRef.current.removeEventListener("mousemove", () => {
          if (controlsRef.current) {
            controlsRef.current.classList.toggle("fade");
          }
        });
      }
    };
  }, []);

  console.log(videoRef?.current?.classList);
  useEffect(() => {
    if (parseInt(volume) === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    if (videoRef.current) {
      videoRef.current.volume = volume / 25;
    }
  }, [volume]);

  function formatTime(sec) {
    const timeInSec = sec;

    const durationInMin =
      Math.floor(timeInSec / 60) >= 60
        ? Math.floor(timeInSec / 60) - 60
        : Math.floor(timeInSec / 60);
    const durationInSecRemainder = Math.floor(timeInSec % 60);
    const durationInHours =
      Math.floor(timeInSec / 60) >= 60
        ? Math.floor(Math.floor(timeInSec / 60) / 60)
        : 0;

    const currentTime =
      durationInHours > 0
        ? `${
            durationInHours.toString().length === 1
              ? "0" + durationInHours
              : durationInHours
          }:${
            durationInMin.toString().length === 1
              ? "0" + durationInMin
              : durationInMin
          }:${
            durationInSecRemainder.toString().length === 1
              ? "0" + durationInSecRemainder
              : durationInSecRemainder
          }`
        : `${
            durationInMin.toString().length === 1
              ? "0" + durationInMin
              : durationInMin
          }:${
            durationInSecRemainder.toString().length === 1
              ? "0" + durationInSecRemainder
              : durationInSecRemainder
          }`;
    return currentTime;
  }

  function skip(seconds) {
    videoRef.current.currentTime += seconds;
    console.log("I think I got executed twice");
  }
  function handleFullScreenChange() {
    if (document.fullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  }
  function togglePlay() {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      if (controlsRef.current) controlsRef.current.classList.remove("paused");

      setIsPlaying(true);
    } else {
      videoRef.current && videoRef.current.pause();
      if (controlsRef.current) controlsRef.current.classList.add("paused");
      setIsPlaying(false);
    }
  }
  function toggleFullScreen() {
    try {
      if (
        !document.fullscreenElement &&
        videoContainerRef.current.requestFullscreen
      ) {
        videoContainerRef.current.requestFullscreen();
        setIsFullScreen(true);
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    } catch (err) {
      console.log("Browser doesn't support full screen mode.");
    }
  }
  function togglePIP() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (!document.pictureInPictureElement && videoRef.current) {
      videoRef.current.requestPictureInPicture();
    }
  }
  function toggleMute() {
    if (videoRef.current && videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMuted(videoRef.current.muted);
    } else if (videoRef.current && !videoRef.current.muted) {
      videoRef.current.muted = true;
      setIsMuted(videoRef.current.muted);
    }
  }

  return (
    <div ref={videoContainerRef} className="video-container">
      <div ref={controlsRef} className="video-controls-container">
        <div className="timeline-container">
          <input
            style={{ width: "100%" }}
            type="range"
            className="timeline-slider"
            value={currentTime.currentTime}
            min={0}
            max={duration.duration}
            onChange={(e) => {
              setCurrentTime(() => {
                return {
                  currentTime: parseInt(e.target.value),
                  formattedDuration: formatTime(parseInt(e.target.value)),
                };
              });
              videoRef.current.currentTime = parseInt(e.target.value);
            }}
          />
        </div>
        <div className="controls">
          <button className="play-pause-button" onClick={() => togglePlay()}>
            {!isPlaying ? <MdPlayArrow /> : <MdPause />}
          </button>
          <div className="duration-container">
            <div className="current-time">{currentTime.formattedDuration}</div>/
            <div className="total-time">{duration.formattedDuration}</div>
          </div>
          <button className="skip-button" onClick={() => skip(-5)}>
            <MdRotateLeft />
          </button>
          <button className="skip-button" onClick={() => skip(5)}>
            <MdRotateRight />
          </button>
          <div className="volume-container">
            <button className="volume-btn" onClick={() => toggleMute()}>
              {isMuted ? (
                <MdVolumeOff />
              ) : volume > 12.5 ? (
                <MdVolumeUp />
              ) : (
                <MdVolumeDown />
              )}
            </button>

            <input
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              type="range"
              className="volume-slider"
              min={0}
              max={25}
              step={1}
            />
          </div>
          <button
            className="settings-btn"
            onClick={() => setSettingsVisible((prev) => !prev)}
          >
            <MdSettings />
          </button>
          <button className="mini-player-btn" onClick={() => togglePIP()}>
            <MdBrandingWatermark />
          </button>

          <button
            className="full-screen-btn"
            onClick={() => toggleFullScreen()}
          >
            {isFullScreen ? <MdFullscreenExit /> : <MdFullscreen />}
          </button>
        </div>
      </div>
      {settingsVisible && (
        <div className="settings-container">
          <div className="settings-tabs">{settingsTabs}</div>
          <div className="settings-content">
            {selectedSettingsTab === 0 ? playbackSpeeds : qualities}
          </div>
        </div>
      )}
      <video onClick={() => togglePlay()} ref={videoRef} />
    </div>
  );
}
