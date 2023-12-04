import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
export default function HlsVideoPlayer({ url, headers }) {
  const videoRef = useRef(null);
  useEffect(() => {
    // Check if HLS.js is supported in the current browser
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);

      // Listen for HLS events (optional)

      // Clean up when the component unmounts
      return () => {
        hls.destroy();
      };
    } else {
      // Neither HLS.js nor native HLS support is available
      console.error("HLS is not supported in this browser.");
    }
  }, [url]);
  // full-screnn added
    const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "f" || event.key === "F") {
      toggleFullScreen();
    }
  };
  return (
    <div>
      <video ref={videoRef} controls />
    </div>
  );
}
