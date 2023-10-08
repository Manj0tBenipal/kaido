import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
export default function HlsVideoPlayer({ url, headers }) {
  const videoRef = useRef(null);
  useEffect(() => {
    // Check if HLS.js is supported in the current browser
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      console.log(
        `/m3u8-proxy?url=${encodeURIComponent(
          url
        )}&headers=${encodeURIComponent(JSON.stringify(headers))}`
      );
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
  return (
    <div>
      <video ref={videoRef} controls />
    </div>
  );
}
