import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import type { Profile } from "@/lib/content";
import type { Project } from "@/lib/data";
import type { SkillGroup } from "@/lib/content";
import DeveloperTerminal from "./DeveloperTerminal";

export default function About({ personalInfo, projects, skills }: { personalInfo: Profile; projects: Project[]; skills: SkillGroup[] }) {
  const status = personalInfo.facts.find(fact => fact.label.toLowerCase() === "status")?.value;
  return (
    <section id="about" className="section about-editorial" style={{ background: "var(--bg-subtle)", "--section-accent": "var(--c-blue)" } as React.CSSProperties}>
      <div className="wrap">
        <SectionHeading index="01" eyebrow="The person behind the work" title="Curious mind. Builder at heart." />
        <div className="profile-grid profile-grid-simple">
          <div className="profile-info profile-info-left">
            <Reveal><section className="profile-block"><p className="eyebrow">01 / What I do</p><h3>{personalInfo.role}</h3><p>I connect thoughtful interfaces with the logic that makes them work.</p><span className="profile-label">FULL-STACK DEVELOPMENT</span></section></Reveal>
            <Reveal delay={.06}><section className="profile-block"><p className="eyebrow">02 / Where I learn</p><h3>{personalInfo.university}</h3><p>{personalInfo.degree}</p><dl className="profile-metric"><dt>CGPA</dt><dd>{personalInfo.cgpa}</dd></dl></section></Reveal>
          </div>
          <div className="profile-info profile-info-right">
            <Reveal delay={.08}><section className="profile-block"><p className="eyebrow">03 / Home base</p><h3>{personalInfo.location}</h3>{status && <p className="profile-status"><span aria-hidden="true" />{status}</p>}<a className="profile-contact" href={`mailto:${personalInfo.email}`}>Let’s talk ↗</a></section></Reveal>
            <Reveal delay={.12}><section className="profile-block"><p className="eyebrow">04 / What draws me in</p><h3>Always exploring.</h3><ul>{personalInfo.interests.map(interest => <li key={interest}>{interest}</li>)}</ul></section></Reveal>
          </div>
        </div>
        <div className="profile-story-grid"><div><p className="eyebrow">A little context</p><h3>How I work.</h3></div><div>{personalInfo.bio.map(paragraph => <Reveal key={paragraph.slice(0, 24)}><p>{paragraph}</p></Reveal>)}</div></div>
        <div className="about-terminal-intro"><p className="eyebrow">A quick way around</p><h3>Explore from the terminal.</h3><p>Try <code>about</code>, <code>projects</code>, <code>skills</code>, or <code>contact</code>.</p></div>
        <DeveloperTerminal profile={personalInfo} projects={projects} skills={skills} />
      </div>
    </section>
  );
}
