import React from "react";

import { CgSpinnerTwoAlt } from "react-icons/cg";
import { MdDownloading } from "react-icons/md";

export default function LoadingSpinner({ style }) {
  return (
    <div className="loading-container" style={style ? style : null}>
      <MdDownloading size={30} className="progressing" color="white" />
      <h4 style={{ color: "white", fontFamily: "Poppins" }}>
        Hang in there...
      </h4>
    </div>
  );
}
