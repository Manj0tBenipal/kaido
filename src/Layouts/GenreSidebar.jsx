import React from "react";
import Genre from "../components/Genre/Genre";
import TopTenAnime from "../components/TopTen/TopTenAnime";
import Share from "../components/Share/Share";
import { Outlet } from "react-router-dom";
export default function GenreSidebar() {
  return (
    <>
      <Share
        style={{
          paddingTop: 40,
          paddingBottom: 0,
          paddingInline: 20,
          marginTop: 80 + "px",
          marginBottom: 0,
        }}
      />
      <div
        className=" main-container d-flex  "
        style={
          window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
        }
      >
        <div className="sidebar-wrapper d-flex-fd-column">
          <Genre />
          <TopTenAnime />
        </div>
        <Outlet />
      </div>
    </>
  );
}
