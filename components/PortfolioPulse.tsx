"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Profile, SkillGroup } from "@/lib/content";
import type { Project } from "@/lib/data";

export default function PortfolioPulse({ profile, projects, skills }: { profile: Profile; projects: Project[]; skills: SkillGroup[] }) {
  const featured = projects.find(project => project.featured);
  const toolkitCount = skills.reduce((count, group) => count + group.items.length, 0);
  const status = profile.facts.find(fact => fact.label.toLowerCase() === "status")?.value ?? "Open to internship opportunities";
  const signals = [
    { label: "AVAILABILITY", value: status },
    ...(featured ? [{ label: "FEATURED WORK", value: featured.title }] : []),
    ...(profile.interests[0] ? [{ label: "FOCUS AREA", value: profile.interests[0] }] : []),
    { label: "TOOLKIT", value: `${skills.length} areas · ${toolkitCount} technologies` },
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setCurrent(index => (index + 1) % signals.length), 4600);
    return () => window.clearInterval(timer);
  }, [signals.length]);

  return <div className="living-portfolio-signal" aria-label="Portfolio status">
    <span className="living-signal-dot" aria-hidden="true" />
    <AnimatePresence mode="wait" initial={false}><motion.p key={current} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .24 }}><span>{signals[current].label}</span>{signals[current].value}</motion.p></AnimatePresence>
  </div>;
}
