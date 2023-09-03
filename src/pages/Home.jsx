import Hero from "../components/Hero/Hero";

import Trending from "../components/Trending/Trending";

import ReviewSection from "../components/ReviewSection/ReviewSection";
import Share from "../components/Share/Share";
import Featured from "../components/Featured/Featured";
import MainContainer from "../components/MainContainer/MainContainer";


export default function Home() {
 
  return (
    <>
      <Hero />
      <Trending />
      <Share />
      <ReviewSection />
      <Featured />
      <MainContainer />
    </>
  );
}
