import Card from "../Card/Card";
import SkeletonCard from "../Card/SkeletonCard";
import "./main-container.css";
export default function AnimeCollection(props) {
  const skeletonCards = getSkeletonCards();
  function getSkeletonCards() {
    const cards = [];
    for (let i = 0; i < 12; i++) {
      cards.push(<SkeletonCard key={i} />);
    }
    return cards;
  }
  const cards = props.data.data?.data.map((data, idx) => {
    return <Card key={data.mal_id} data={data} delay={idx * 0.02} />;
  });
  return (
    <div className="anime-collection-wrapper">
      <h2>{props.collectionName}</h2>
      <div className="card-wrapper d-flex a-center j-center">
        {!props.isLoading ? cards : skeletonCards}
      </div>
    </div>
  );
}
