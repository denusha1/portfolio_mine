"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Compass, FileText, Mail, Sparkles, X } from "lucide-react";
import type { ReactNode } from "react";
import type { Profile, SkillGroup } from "@/lib/content";
import type { Project } from "@/lib/data";

type Stage = "boot" | "choose" | "recruiter" | "tour" | "closed";
const tourStops = [
  { label: "About", id: "about", icon: "01" },
  { label: "Projects", id: "work", icon: "02" },
  { label: "Skills", id: "skills", icon: "03" },
  { label: "Achievements", id: "experience", icon: "04" },
  { label: "Contact", id: "contact", icon: "05" },
];

export default function ExperienceHub({ children, profile, projects, skills }: { children: ReactNode; profile: Profile; projects: Project[]; skills: SkillGroup[] }) {
  const [stage, setStage] = useState<Stage>("boot");
  const [bootLine, setBootLine] = useState(0);
  const reducedMotion = useReducedMotion();
  const firstAction = useRef<HTMLButtonElement>(null);
  const touchStartY = useRef<number | null>(null);
  const modalLocked = stage === "recruiter" || stage === "tour";

  useEffect(() => {
    let seen = false;
    try { seen = localStorage.getItem("portfolio-entry-seen") === "1"; } catch { /* Continue normally if storage is unavailable. */ }
    if (seen || window.location.hash) { setStage("closed"); return; }
    if (reducedMotion) setStage("choose");
    else {
      const timer = window.setInterval(() => setBootLine(line => Math.min(4, line + 1)), 360);
      const finish = window.setTimeout(() => {
        window.clearInterval(timer);
        setStage("choose");
      }, 1600);
      return () => { window.clearInterval(timer); window.clearTimeout(finish); };
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!modalLocked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstAction.current?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = previous; };
  }, [modalLocked, stage]);

  useEffect(() => {
    if (stage === "closed") document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
  }, [stage]);

  const remember = useCallback(() => {
    try { localStorage.setItem("portfolio-entry-seen", "1"); } catch { /* The current session still works. */ }
  }, []);
  const close = useCallback(() => { remember(); setStage("closed"); }, [remember]);
  const enterRecruiterMode = () => { remember(); setStage("recruiter"); };
  const startTour = () => { remember(); setStage("tour"); };
  const openChooser = () => setStage("choose");
  const continueByScroll = (delta: number) => {
    if (stage !== "choose" || Math.abs(delta) < 5) return;
    close();
    window.requestAnimationFrame(() => window.scrollBy({ top: delta, behavior: "auto" }));
  };

  useEffect(() => {
    if (stage === "closed") return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (stage === "boot") setStage("choose");
        else close();
      }
      if (modalLocked && event.key === "Tab") {
        const overlay = document.querySelector<HTMLElement>(".experience-overlay");
        const focusable = Array.from(overlay?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), [tabindex='0']") ?? []);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [close, modalLocked, stage]);

  const orderedProjects = ["queuesense", "waytohome", "retailpulse", "pms", "ink-and-ideas"]
    .map(id => projects.find(project => project.id === id))
    .filter((project): project is Project => Boolean(project))
    .slice(0, 3);
  const technicalGroups = ["Frontend", "Backend & Frameworks", "Databases & Authentication"]
    .map(name => skills.find(group => group.group === name))
    .filter((group): group is SkillGroup => Boolean(group));
  const availability = profile.facts.find(fact => fact.label.toLowerCase() === "status")?.value ?? "Seeking a software engineering internship";

  return <>
    <div className="experience-toolbar" aria-label="Portfolio modes" inert={modalLocked ? true : undefined}>
      <button type="button" className="experience-recruiter-trigger" onClick={enterRecruiterMode}><BriefcaseBusiness size={14} />Recruiter mode</button>
      <button type="button" className="experience-chooser-trigger" onClick={openChooser} aria-label="Choose a portfolio experience">Modes</button>
    </div>
    <div inert={modalLocked ? true : undefined}>{children}</div>
    <AnimatePresence>
      {stage !== "closed" && <motion.div className={`experience-overlay experience-${stage} ${modalLocked ? "" : "experience-soft-gate"}`} role="dialog" aria-modal={modalLocked} aria-label={stage === "recruiter" ? "Recruiter overview" : stage === "tour" ? "Interactive portfolio tour" : stage === "choose" ? "Choose how to explore" : "System startup"} onWheel={event => continueByScroll(event.deltaY)} onTouchStart={event => { touchStartY.current = event.touches[0]?.clientY ?? null; }} onTouchEnd={event => { if (touchStartY.current !== null) continueByScroll(touchStartY.current - (event.changedTouches[0]?.clientY ?? touchStartY.current)); touchStartY.current = null; }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .22 }}>
        {stage === "boot" && <div className="system-boot-panel">
          <p className="system-boot-mark">D<span>.</span>DEV / PORTFOLIO OS</p>
          <h1>Initializing<br /><span>Denusha.dev</span></h1>
          <ol className="system-boot-log" aria-live="polite">
            {["Loading projects", "Loading skills", "Preparing workspace", "System ready"].map((line, index) => <li key={line} className={bootLine >= index + 1 ? "is-ready" : ""}><span>{line === "System ready" ? line : `${line}...`}</span><span>{bootLine >= index + 1 ? "✓" : "···"}</span></li>)}
          </ol>
          <button ref={firstAction} type="button" className="system-boot-skip" onClick={() => { remember(); setStage("choose"); }}>Skip startup <ArrowUpRight size={14} /></button>
        </div>}

        {stage === "choose" && <div className="experience-chooser-panel">
          <button ref={firstAction} type="button" className="experience-close" onClick={close} aria-label="Continue to the portfolio"><X size={17} /></button>
          <p className="experience-kicker"><Sparkles size={14} /> PORTFOLIO / ACCESS SELECTOR</p>
          <h1>How would you like<br />to explore?</h1>
          <p className="experience-lede">Choose a route. You can switch back to the regular portfolio at any time.</p>
          <div className="experience-choice-grid">
            <button type="button" className="experience-choice" onClick={enterRecruiterMode}><span className="experience-choice-icon"><BriefcaseBusiness size={20} /></span><strong>Recruiter</strong><span>Fast professional overview</span><ArrowRight size={16} /></button>
            <button type="button" className="experience-choice" onClick={close}><span className="experience-choice-icon"><Code2 size={20} /></span><strong>Developer</strong><span>Projects, architecture and tools</span><ArrowRight size={16} /></button>
            <button type="button" className="experience-choice" onClick={startTour}><span className="experience-choice-icon"><Compass size={20} /></span><strong>Explorer</strong><span>Take an 8-second guided mini tour</span><ArrowRight size={16} /></button>
          </div>
          <button type="button" className="experience-continue" onClick={close}>Continue to the portfolio <span>or scroll</span><ArrowUpRight size={14} /></button>
        </div>}

        {stage === "recruiter" && <div className="recruiter-dashboard" aria-labelledby="recruiter-title">
          <div className="recruiter-dashboard-top"><p className="experience-kicker"><BriefcaseBusiness size={14} /> RECRUITER MODE / 90-SECOND OVERVIEW</p><button ref={firstAction} type="button" className="experience-close" onClick={close} aria-label="Close recruiter mode"><X size={17} /></button></div>
          <h1 id="recruiter-title">Denusha Thavaruban<span>Software Engineering Intern Candidate</span></h1>
          <p className="recruiter-availability"><i />{availability}</p>
          <div className="recruiter-dashboard-grid">
            <section className="recruiter-card recruiter-projects"><p className="eyebrow">01 / Selected projects</p>{orderedProjects.map(project => <a className="recruiter-project" key={project.id} href={`/projects/${project.id}`}><span><strong>{project.title}</strong><small>{project.context}</small></span><ArrowUpRight size={15} /></a>)}<a className="recruiter-all-projects" href="#work" onClick={close}>See all projects <ArrowRight size={14} /></a></section>
            <section className="recruiter-card recruiter-skills"><p className="eyebrow">02 / Technical skills</p>{technicalGroups.map(group => <div key={group.group}><strong>{group.group}</strong><p>{group.items.slice(0, 6).join(" · ")}</p></div>)}<a href="#skills" onClick={close}>Full skills inventory <ArrowRight size={14} /></a></section>
            <section className="recruiter-card recruiter-profile"><p className="eyebrow">03 / Education</p><h2>{profile.university}</h2><p>{profile.degree}</p><p className="recruiter-gpa">CGPA <strong>{profile.cgpa}</strong></p><a href="/cv.pdf" target="_blank" rel="noopener noreferrer"><FileText size={15} />View résumé <ArrowUpRight size={14} /></a></section>
            <section className="recruiter-card recruiter-contact"><p className="eyebrow">04 / Contact</p><a className="recruiter-email" href={`mailto:${profile.email}`}><Mail size={16} />{profile.email}</a><div><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} /></a></div></section>
          </div>
          <button type="button" className="recruiter-back" onClick={close}>Back to portfolio <ArrowRight size={14} /></button>
        </div>}

        {stage === "tour" && <MiniTour firstAction={firstAction} onFinish={close} />}
      </motion.div>}
    </AnimatePresence>
  </>;
}

function MiniTour({ firstAction, onFinish }: { firstAction: React.RefObject<HTMLButtonElement | null>; onFinish: () => void }) {
  const [selected, setSelected] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(8);
  useEffect(() => {
    const timer = window.setInterval(() => setSecondsLeft(value => Math.max(0, value - 1)), 1000);
    const finish = window.setTimeout(onFinish, 8000);
    return () => { window.clearInterval(timer); window.clearTimeout(finish); };
  }, [onFinish]);

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") setSelected(value => (value + 1) % tourStops.length);
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") setSelected(value => (value - 1 + tourStops.length) % tourStops.length);
      if (event.key === "Enter" || event.key === " ") {
        if (event.target instanceof HTMLElement && event.target.closest("button, a")) return;
        event.preventDefault();
        document.getElementById(tourStops[selected].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        onFinish();
      }
    };
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [onFinish, selected]);

  return <div className="mini-tour-panel">
    <div className="mini-tour-top"><p className="experience-kicker"><Compass size={14} /> EXPLORER / QUICK TOUR</p><button ref={firstAction} type="button" className="experience-close" onClick={onFinish} aria-label="Skip guided tour"><X size={17} /></button></div>
    <h1>Pick a destination.<br /><span>Move with ← →</span></h1>
    <div className="mini-tour-track"><div className="mini-tour-rail" /><motion.div className="mini-tour-robot" animate={{ left: `${selected * 25}%` }} transition={{ type: "spring", stiffness: 180, damping: 18 }}>D</motion.div>
      {tourStops.map((stop, index) => <button key={stop.id} type="button" className={`mini-tour-stop ${selected === index ? "is-active" : ""}`} style={{ left: `${index * 25}%` }} aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{stop.icon}</span><strong>{stop.label}</strong></button>)}
    </div>
    <div className="mini-tour-actions"><p>Auto-return to navigation in <strong>{secondsLeft}s</strong></p><button type="button" className="mini-tour-land" onClick={() => { document.getElementById(tourStops[selected].id)?.scrollIntoView({ behavior: "smooth", block: "start" }); onFinish(); }}>Land at {tourStops[selected].label} <ArrowRight size={15} /></button></div>
    <button type="button" className="mini-tour-skip" onClick={onFinish}>Skip tour and use normal navigation</button>
  </div>;
}
