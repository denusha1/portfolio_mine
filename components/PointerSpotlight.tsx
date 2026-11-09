"use client";

import { useEffect } from "react";

/** Lightweight desktop-only pointer treatment; touch and reduced-motion users keep the native pointer. */
export default function PointerSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    root.classList.add("has-pointer-spotlight");
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
      root.classList.add("pointer-visible");
      const target = event.target instanceof Element ? event.target : null;
      root.classList.toggle("pointer-over-control", Boolean(target?.closest("a, button, [role='button'], input, textarea, select, summary")));
    };
    const leave = (event: PointerEvent) => {
      if (event.relatedTarget === null) root.classList.remove("pointer-visible", "pointer-over-control");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      root.classList.remove("has-pointer-spotlight", "pointer-visible", "pointer-over-control");
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
    };
  }, []);

  return <>
    <div className="pointer-spotlight" aria-hidden="true" />
    <div className="custom-pointer" aria-hidden="true"><span /></div>
  </>;
}
