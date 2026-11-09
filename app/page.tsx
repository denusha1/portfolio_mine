import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import ExperienceArchive from "@/components/ExperienceArchive";
import Education from "@/components/Education";
import Personal from "@/components/Personal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ExperienceHub from "@/components/ExperienceHub";
import { getEducation, getProfile, getProjects, getSkills } from "@/lib/content";

export default async function Home() {
  // Fetched here and passed down, rather than each section importing content
  // directly: the sections are mostly client components and only a server
  // component can await the database. One place also means one round of
  // queries per render instead of four scattered ones.
  const [profile, projects, skills, education] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getEducation(),
  ]);

  return (
    <ExperienceHub profile={profile} projects={projects} skills={skills}>
      <div className="portfolio-shell">
        <ScrollProgress />
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero personalInfo={profile} projects={projects} skills={skills} />
          <About personalInfo={profile} projects={projects} skills={skills} />
          <Work projects={projects} />
          <Skills skills={skills} projects={projects} />
          <ExperienceArchive />
          <Education education={education} />
          <Personal personalInfo={profile} />
          <Contact personalInfo={profile} />
        </main>
        <Footer personalInfo={profile} />
      </div>
    </ExperienceHub>
  );
}
