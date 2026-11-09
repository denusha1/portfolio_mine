import Link from "next/link";
import { Plus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import InteractiveProjectCard from "./InteractiveProjectCard";
import ProjectScrollFrame from "./ProjectScrollFrame";
import type { Project } from "@/lib/data";

export default function Work({ projects }: { projects: Project[] }) {
  const newestFirst = ["waytohome", "queuesense", "retailpulse", "ink-and-ideas"];
  const featured = projects.filter(project => project.featured);
  const otherProjects = projects
    .filter(project => !project.featured)
    .sort((a, b) => {
      const aRank = newestFirst.indexOf(a.id);
      const bRank = newestFirst.indexOf(b.id);
      return (aRank < 0 ? newestFirst.length : aRank) - (bRank < 0 ? newestFirst.length : bRank);
    });
  const ordered = [...featured, ...otherProjects];
  return <section id="work" className="section clear-work" style={{ "--section-accent": "var(--c-violet)" } as React.CSSProperties}>
    <div className="wrap">
      <SectionHeading index="02" eyebrow="Projects" title="Things I’ve worked on" description="Here’s what each project does, what I worked on, and the tools I used." />
      {process.env.NODE_ENV !== "production" && <Link href="/admin" className="btn btn-ghost btn-sm project-editor-link"><Plus size={15} />Edit projects & media</Link>}
      <div className="clear-project-list">{ordered.map((project, index) => <Reveal key={project.id} delay={(index % 2) * .08}><ProjectScrollFrame><InteractiveProjectCard project={project} index={index} /></ProjectScrollFrame></Reveal>)}</div>
    </div>
  </section>;
}
