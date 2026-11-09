import type { Profile } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import StudioCorner from "./StudioCorner";

export default function Personal({ personalInfo }: { personalInfo: Profile }) {
  return (
    <section id="personal" className="section personal-editorial" aria-label="Personal side">
      <div className="wrap">
        <SectionHeading index="06" eyebrow="Personal field notes" title="Beyond the build." description="The curiosity, habits and small discoveries that shape how I work." />
        <div className="personal-leadership-note">
          <p className="eyebrow">Student leadership</p>
          <div><h3>President · Village Students’ Union</h3><p>Four years of serving in a student leadership role alongside my studies at {personalInfo.university}.</p></div>
          <span>04 YEARS</span>
        </div>
        <StudioCorner />
      </div>
    </section>
  );
}
