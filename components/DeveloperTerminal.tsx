"use client";

import { useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { ArrowUpRight, ChevronRight, Terminal as TerminalIcon } from "lucide-react";
import type { Profile } from "@/lib/content";
import type { Project } from "@/lib/data";
import type { SkillGroup } from "@/lib/content";

type Entry = { command: string; result: ReactNode };

export default function DeveloperTerminal({ profile, projects, skills }: { profile: Profile; projects: Project[]; skills: SkillGroup[] }) {
  const [history, setHistory] = useState<Entry[]>([]);
  const [command, setCommand] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const runCommand = (raw: string) => {
    const value = raw.trim().toLowerCase();
    if (!value) return;
    if (value === "clear") { setHistory([]); setCommand(""); return; }
    let result: ReactNode;
    switch (value) {
      case "help":
        result = <span>Try <code>about</code>, <code>projects</code>, <code>skills</code>, <code>contact</code>, or <code>clear</code>.</span>;
        break;
      case "about":
        result = <span>{profile.name} · {profile.role} at {profile.university}. CGPA {profile.cgpa}. Seeking a software engineering internship.</span>;
        break;
      case "projects":
        result = <ul className="terminal-project-list">{projects.map(project => <li key={project.id}><a href={`#project-${project.id}`}>{project.title}<ArrowUpRight size={13} /></a><span>{project.context}</span></li>)}</ul>;
        break;
      case "skills":
        result = <ul className="terminal-skills-list">{skills.map(group => <li key={group.group}><strong>{group.group}</strong><span>{group.items.slice(0, 5).join(" · ")}</span></li>)}</ul>;
        break;
      case "contact":
        result = <span>Email <a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={12} /></a></span>;
        break;
      default:
        result = <span>Command not found: <code>{raw.trim()}</code>. Type <code>help</code> to see available commands.</span>;
    }
    setHistory(current => [...current.slice(-5), { command: raw.trim(), result }]);
    setCommand("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(command);
  };

  return <section className="developer-terminal" aria-label="Interactive developer terminal">
    <div className="terminal-topbar"><span><TerminalIcon size={14} />denusha@portfolio:~</span><span><i />ONLINE</span></div>
    <div className="terminal-body" aria-live="polite" aria-relevant="additions">
      <p className="terminal-welcome">Explore my portfolio from the command line. Type <code>help</code> to get started.</p>
      {history.map((entry, index) => <div className="terminal-entry" key={`${entry.command}-${index}`}><p className="terminal-command"><ChevronRight size={14} />{entry.command}</p><div className="terminal-result">{entry.result}</div></div>)}
      <form className="terminal-prompt" onSubmit={submit}><label htmlFor="portfolio-command"><ChevronRight size={15} /><span className="sr-only">Enter a portfolio command</span></label><input ref={input} id="portfolio-command" autoComplete="off" spellCheck={false} value={command} onChange={event => setCommand(event.target.value)} placeholder="type a command…" /><button type="submit">Run</button></form>
    </div>
    <div className="terminal-shortcuts" aria-label="Example commands">{["about", "projects", "skills", "contact"].map(item => <button key={item} type="button" onClick={() => { runCommand(item); input.current?.focus(); }}>{item}</button>)}</div>
  </section>;
}
