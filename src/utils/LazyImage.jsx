import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
export default function LazyImage({
  src,
  alt,
  isAnimated,
  transition,
  animate,
  initial,
  className,
}) {
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState();
  useEffect(() => {
    const options = {
      threshold: 0,
      root: null,
      rootMargin: "0px",
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setImgSrc(src);
    }, options);
    if (imgRef.current) observer.observe(imgRef.current);
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [imgRef]);
  return (
    <motion.img
      className={className}
      src={imgSrc}
      alt={alt}
      ref={imgRef}
      animate={isAnimated ? animate : undefined}
      transition={isAnimated ? transition : undefined}
      initial={isAnimated ? initial : undefined}
    />
  );
}
