import { useInView } from "framer-motion";
import React from "react";

export default function useAnimationOnce(ref) {
  const elementRef = ref;
  const isInView = useInView(ref);
  return isInView;
}
