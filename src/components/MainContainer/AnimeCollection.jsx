import React from "react";
import Card from "../Card/Card";
import "./main-container.css";
export default function AnimeCollection(props) {
  const cards = props.data.data?.data.map((data, idx) => {
    return <Card key={data.mal_id} data={data} delay={idx * 0.05} />;
  });
  return (
    <div className="anime-collection-wrapper">
      <h2>{props.collectionName}</h2>
      <div className="card-wrapper d-flex a-center j-center">{cards}</div>
    </div>
  );
}
