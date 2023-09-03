import React from "react";
import "./share.css";
import share from "../../media/share.gif"
export default function Share(props) {
  return (
    <div className="share-app d-flex a-center f-poppins" style ={props?.style}>
      <img src={share} alt="share"/>
      <div>
        <p className="primary">Share Warding</p>
        <p>to your friends</p>
      </div>
    </div>
  );
}
