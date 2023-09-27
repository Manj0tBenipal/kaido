import Hero from "../components/Hero/Hero";

import Trending from "../components/Trending/Trending";

import ReviewSection from "../components/ReviewSection/ReviewSection";
import Share from "../components/Share/Share";
import Featured from "../components/Featured/Featured";
import MainContainer from "../components/MainContainer/MainContainer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: [-window.innerWidth, 0], opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Hero />
      <Trending />
      <Share />
      <ReviewSection />
      <Featured />
      <MainContainer />
    </motion.div>
  );
}
