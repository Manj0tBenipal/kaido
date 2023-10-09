import React from "react";
import { useInView } from "framer-motion";

export default function useAnimationOnce(ref) {
  const isInView = useInView(ref, { once: true });
  return isInView;
}
