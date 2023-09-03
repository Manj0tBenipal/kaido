import React from "react";
import Genre from "../Genre/Genre";
import TopTenAnime from "../TopTen/TopTenAnime";
import TopCharacters from "../TopCharacters/TopCharacters";
export default function MainSidebar() {
  return (
    <div className="d-flex-fd-column">
      <Genre isInNavbar={false} />
      <TopTenAnime />
      <TopCharacters />
    </div>
  );
}
