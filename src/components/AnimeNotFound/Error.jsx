import React from "react";
import "./error.css";
import error from "../../media/error.gif";
export default function Error() {
  return (
    <div
      style={{ marginTop: "65px" }}
      className="gogoanime-error d-flex-fd-column a-center j-center"
    >
      <img src={error} alt="error"></img>
      <h2>Sorry, we couldn't find the anime you requested.</h2>
    </div>
  );
}
