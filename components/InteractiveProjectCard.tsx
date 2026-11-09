"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "./ProjectVisual";
import ProjectGallery from "./ProjectGallery";
import type { Project } from "@/lib/data";

const plainLanguage: Record<string, { summary: string; contribution: string }> = {
  pms: {
    summary: "A web app that helps managers and employees complete performance reviews, send them for approval, and keep track of their progress.",
    contribution: "I built the team view, review forms, approval steps, and status updates. I also connected the screens to the app’s API and database.",
  },
  blogapp: {
    summary: "A blog website where people can write posts, preview them, publish them, and search for posts later.",
    contribution: "I worked on sign-in, the writing and preview screens, post editing, search, and the author dashboard.",
  },
  cnc: {
    summary: "A machine that follows digital instructions to feed and cut paper board automatically.",
    contribution: "I built the small screen operators use, helped control the motors and paper feed, and designed some machine parts in 3D.",
  },
  waytohome: {
    summary: "A bus booking app for finding trips, booking seats, paying, and getting a ticket. Operators can manage trips and bookings too.",
    contribution: "I built the passenger booking flow, backend services, live seat updates, QR tickets, and tools for trip operators.",
  },
  queuesense: {
    summary: "A clinic queue app for check-in, appointments, clinician workflows, and live wait-time updates, with analytics based on synthetic data.",
    contribution: "I built patient and staff workflows, live queue updates, reports, and an explainable wait-time model. On synthetic test data, it had a 7.10-minute average error.",
  },
  retailpulse: {
    summary: "A dashboard that helps retail teams explore sales, products, branches, and stock, with reports and data import tools.",
    contribution: "I built the dashboard and API, added secure branch access and safe data imports, and documented the limits of exploratory forecasts.",
  },
  "ink-and-ideas": {
    summary: "A blogging platform for writing and scheduling articles, finding stories, and managing a community of readers.",
    contribution: "I built the publishing and reader features, author analytics, admin moderation tools, and Docker-based setup.",
  },
};

const textGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: .07, delayChildren: .12 } },
};
const textItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: .4, ease: [.22, 1, .36, 1] } },
};

export default function InteractiveProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 22, mass: .55 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 22, mass: .55 });
  const rotateY = useTransform(springX, [-.5, .5], [-3.5, 3.5]);
  const rotateX = useTransform(springY, [-.5, .5], [3.5, -3.5]);
  const copy = plainLanguage[project.id];
  const media = project.media ?? [];

  const moveCard = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerX.set(x - .5);
    pointerY.set(y - .5);
    event.currentTarget.style.setProperty("--card-glow-x", `${Math.round(x * 100)}%`);
    event.currentTarget.style.setProperty("--card-glow-y", `${Math.round(y * 100)}%`);
  };

  const resetCard = (event: React.PointerEvent<HTMLElement>) => {
    pointerX.set(0);
    pointerY.set(0);
    event.currentTarget.style.setProperty("--card-glow-x", "50%");
    event.currentTarget.style.setProperty("--card-glow-y", "50%");
  };

  return (
    <motion.article
      className="clear-project-card"
      id={`project-${project.id}`}
      aria-labelledby={`project-title-${project.id}`}
      onPointerMove={moveCard}
      onPointerLeave={resetCard}
      style={{ transformPerspective: 1200, rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      <div className="clear-project-preview">
        {media.length ? <ProjectGallery media={media} title={project.title} /> : <ProjectVisual project={project} />}
      </div>
      <motion.div className="clear-project-copy" variants={textGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15, margin: "0px 0px -45px 0px" }}>
        <motion.div className="clear-project-meta" variants={textItem}><span>Project {String(index + 1).padStart(2, "0")}</span><span>{project.context}</span></motion.div>
        <motion.h3 id={`project-title-${project.id}`} variants={textItem}>{project.title}</motion.h3>
        <motion.p className="clear-project-summary" variants={textItem}>{copy?.summary ?? project.summary}</motion.p>
        <motion.div className="clear-project-explanation" variants={textItem}>
          <h4>What I worked on</h4>
          <p>{copy?.contribution ?? project.detail.slice(0, 2).join(" ")}</p>
        </motion.div>
        <motion.div className="clear-project-tools" variants={textItem}>
          <h4>Tools used</h4>
          <ul>{project.stack.slice(0, 6).map((item, tagIndex) => <li key={item} style={{ "--tag-index": tagIndex } as React.CSSProperties}>{item}</li>)}</ul>
        </motion.div>
        <motion.div className="clear-project-links" variants={textItem}>
          <Link href={`/projects/${project.id}`}>More about this project <ArrowUpRight size={16} /></Link>
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Open project <ArrowUpRight size={16} /></a>}
          {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer">View code <ArrowUpRight size={16} /></a>}
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
