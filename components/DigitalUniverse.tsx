"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CircleDot, Orbit } from "lucide-react";
import type { Project } from "@/lib/data";
import type { SkillGroup } from "@/lib/content";

type UniverseNode =
  | { kind: "project"; label: string; x: number; y: number; project: Project }
  | { kind: "skill"; label: string; x: number; y: number; group: SkillGroup };

const nodeKey = (node: UniverseNode) => node.kind === "project" ? `project-${node.project.id}` : `skill-${node.group.group}`;

export default function DigitalUniverse({ projects, skills }: { projects: Project[]; skills: SkillGroup[] }) {
  const featured = projects.filter(project => project.featured).slice(0, 3);
  const skillGroups = ["Frontend", "Backend & Frameworks", "Databases & Authentication"]
    .map(name => skills.find(group => group.group === name))
    .filter((group): group is SkillGroup => Boolean(group));
  const nodes: UniverseNode[] = [
    ...featured.map((project, index) => ({ kind: "project" as const, project, label: project.title, x: [12, 72, 83][index], y: [23, 14, 64][index] })),
    ...skillGroups.map((group, index) => ({ kind: "skill" as const, group, label: group.group === "Databases & Authentication" ? "Data" : group.group === "Backend & Frameworks" ? "Backend" : "Frontend", x: [16, 76, 23][index], y: [75, 42, 48][index] })),
  ];
  const [active, setActive] = useState<UniverseNode | null>(nodes[0] ?? null);

  return <div className="digital-universe" aria-label="Interactive project and technology constellation">
    <svg className="universe-orbits" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <ellipse cx="50" cy="50" rx="42" ry="27" /><ellipse cx="50" cy="50" rx="29" ry="43" transform="rotate(35 50 50)" /><ellipse cx="50" cy="50" rx="20" ry="48" transform="rotate(-42 50 50)" />
    </svg>
    <div className="universe-heading"><Orbit size={13} /><span>PROJECT UNIVERSE</span><span>SELECT A NODE</span></div>
    {nodes.map((node, index) => <button key={nodeKey(node)} type="button" className={`universe-node ${node.kind === "skill" ? "universe-node-skill" : ""} ${active && nodeKey(active) === nodeKey(node) ? "is-active" : ""}`} style={{ left: `${node.x}%`, top: `${node.y}%`, "--node-delay": `${index * -.7}s` } as React.CSSProperties} onClick={() => setActive(node)} aria-pressed={Boolean(active && nodeKey(active) === nodeKey(node))}>
      <span className="universe-node-core" aria-hidden="true" /><span className="universe-node-label">{node.label}</span>
    </button>)}
    <div className="universe-detail" aria-live="polite" aria-atomic="true">
      {active?.kind === "project" ? <>
        <p className="universe-detail-kicker">PROJECT / {active.project.context}</p>
        <h3>{active.project.title}</h3><p>{active.project.summary}</p>
        <Link href={`/projects/${active.project.id}`}>Explore this project <ArrowUpRight size={14} /></Link>
      </> : active?.kind === "skill" ? <>
        <p className="universe-detail-kicker">SKILL CLUSTER / {active.group.items.length} TOOLS</p>
        <h3>{active.group.group}</h3><p>{active.group.items.slice(0, 4).join(" · ")}</p>
        <a href="#skills">Explore all skills <ArrowUpRight size={14} /></a>
      </> : <CircleDot aria-hidden="true" />}
    </div>
  </div>;
}
