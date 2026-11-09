"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Small scroll-linked depth shift around each case study, neutralised for reduced motion. */
export default function ProjectScrollFrame({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, .32, .72, 1], [3, 0, 0, -2]);
  const scale = useTransform(scrollYProgress, [0, .28, .72, 1], [.97, 1, 1, .98]);
  const y = useTransform(scrollYProgress, [0, .3, .75, 1], [18, 0, 0, -10]);
  const lightOpacity = useTransform(scrollYProgress, [0, .28, .7, 1], [0, .55, .55, 0]);

  return <motion.div ref={ref} className="project-scroll-frame" style={{ transformPerspective: 1500, rotateX: reduceMotion ? 0 : rotateX, scale: reduceMotion ? 1 : scale, y: reduceMotion ? 0 : y }}>
    <motion.div className="project-scroll-light" style={{ opacity: reduceMotion ? 0 : lightOpacity }} aria-hidden="true" />{children}
  </motion.div>;
}
