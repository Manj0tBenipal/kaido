import React from "react";
import { useInView } from "framer-motion";

export default function useAnimationOnce(ref) {
  const elementRef = ref;
  const isInView = useInView(ref);
  return isInView;
}
