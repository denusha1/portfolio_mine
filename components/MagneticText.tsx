"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function MagneticText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 18, mass: .25 });
  const springY = useSpring(y, { stiffness: 160, damping: 18, mass: .25 });
  return <motion.span className={`magnetic-text ${className}`} style={{ x: reduceMotion ? 0 : springX, y: reduceMotion ? 0 : springY }} onPointerMove={event => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - .5) * 8);
    y.set(((event.clientY - rect.top) / rect.height - .5) * 5);
  }} onPointerLeave={() => { x.set(0); y.set(0); }}>
    {children}
  </motion.span>;
}
