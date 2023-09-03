import React from "react";

import { CgSpinnerTwoAlt } from "react-icons/cg";

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <CgSpinnerTwoAlt size={30} className="spinner" color="white" />
      <h4 style={{ color: "white", fontFamily: "Poppins" }}>
        Hang in there...
      </h4>
    </div>
  );
}
