"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import type { Profile } from "@/lib/content";
import type { Project } from "@/lib/data";
import type { SkillGroup } from "@/lib/content";
import DigitalUniverse from "./DigitalUniverse";
import MagneticText from "./MagneticText";
import PortfolioPulse from "./PortfolioPulse";

const technologies = ["TypeScript", "Java", "Python", "Next.js", "Spring Boot", "PostgreSQL", "Docker", "Socket.IO"];

export default function Hero({ personalInfo, projects, skills }: { personalInfo: Profile; projects: Project[]; skills: SkillGroup[] }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 20, mass: .6 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 20, mass: .6 });
  const rotateY = useTransform(springX, [-.5, .5], [-7, 7]);
  const rotateX = useTransform(springY, [-.5, .5], [5, -5]);
  const photoX = useTransform(springX, [-.5, .5], [-9, 9]);
  const photoY = useTransform(springY, [-.5, .5], [-6, 6]);
  const handleScenePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - .5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - .5);
  };
  const resetScenePointer = () => { pointerX.set(0); pointerY.set(0); };

  return (
    <section className="engineer-hero" aria-labelledby="hero-heading">
      <div className="engineer-hero-grid" aria-hidden="true" />
      <div className="wrap engineer-hero-inner">
        <motion.div
          className="engineer-hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
        >
          <p className="engineer-hero-status"><span aria-hidden="true" /> Open to Software Engineering internships</p>
          <p className="engineer-hero-overline">IT &amp; Management · University of Moratuwa</p>
          <h1 id="hero-heading">
            <MagneticText className="engineer-title-line">I turn complex</MagneticText>
            <MagneticText className="engineer-title-line">problems into</MagneticText>
            <MagneticText className="engineer-title-line engineer-title-highlight">useful software.</MagneticText>
          </h1>
          <p className="engineer-hero-intro">I&apos;m {personalInfo.name}. I build full-stack applications, from clear user experiences to secure APIs, databases, and real-time systems.</p>
          <div className="engineer-hero-actions">
            <a href="#work" className="engineer-button engineer-button-primary">Explore my projects <ArrowRight size={17} /></a>
            <a href="/cv.pdf" className="engineer-button engineer-button-secondary" target="_blank" rel="noopener noreferrer">View résumé <ArrowUpRight size={16} /></a>
          </div>
          <div className="engineer-hero-links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a>
            <span aria-hidden="true">/</span>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
          </div>
        </motion.div>

        <motion.div
          className="engineer-hero-art"
          role="group"
          aria-label="Engineering profile and project snapshot"
          onPointerMove={handleScenePointerMove}
          onPointerLeave={resetScenePointer}
          style={{ transformPerspective: 1100, rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: .96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .9, delay: .12, ease: [.22, 1, .36, 1] }}
        >
          <motion.div className="engineer-hero-photo" style={{ x: reduceMotion ? 0 : photoX, y: reduceMotion ? 0 : photoY, translateZ: 12 }}><Image src="/denusha-hi.png" alt={`${personalInfo.name}, software engineering undergraduate`} width={1139} height={1280} priority sizes="(max-width: 760px) 90vw, 46vw" /></motion.div>
          <DigitalUniverse projects={projects} skills={skills} />
        </motion.div>

        <div className="engineer-tech-row">
          <div className="engineer-tech-label"><ShieldCheck size={16} /><span>TOOLS I BUILD WITH</span></div>
          <ul>{technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
          <a href="#skills" className="engineer-tech-more">All skills <ArrowUpRight size={14} /></a>
          <PortfolioPulse profile={personalInfo} projects={projects} skills={skills} />
        </div>
      </div>
    </section>
  );
}
