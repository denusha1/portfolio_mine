// ─────────────────────────────────────────────────────────────
// Single source of truth for every piece of content on the site.
// Everything here is taken from the CV — nothing is embellished.
//
// ⚠️ Search for `TODO` before deploying: the project repo links are
// the only placeholders left.
// ─────────────────────────────────────────────────────────────

import projectsData from "@/content/projects.json";

export const heroCopy = {
  headline: "Thoughtful interfaces.",
  highlight: "Solid systems.",
  ending: "Built with care.",
  description: "I build full-stack web applications, connecting the details you see with the logic that makes them work.",
};

export const personalInfo = {
  name: "Denusha Thavaruban",
  shortName: "Denusha",
  role: "Software Engineering Undergraduate",
  location: "Sri Lanka",

  email: "denushadenu12@gmail.com",
  phone: "+94 75 371 7693",
  github: "https://github.com/denusha1",
  linkedin: "https://linkedin.com/in/denushathavaruban",

  university: "University of Moratuwa",
  degree: "BSc (Hons) in Information Technology & Management",
  cgpa: "3.53 / 4.00",

  // One line: what you do, and what you are looking for.
  tagline:
    "Third-year IT & Management undergraduate at the University of Moratuwa, building full-stack applications with Java, Spring Boot, Python, TypeScript, React and PostgreSQL. Seeking a Software Engineering internship.",

  // Two short paragraphs. Concrete over adjectives.
  bio: [
    "I'm a third-year Information Technology & Management undergraduate at the University of Moratuwa with a 3.53 / 4.00 CGPA. Through full-stack projects, I've worked on backend services, REST APIs, database design, authentication, role-based access, real-time updates and automated tests using Java, Spring Boot, Python, TypeScript, React and PostgreSQL.",
    "I also have hands-on experience with Docker, CI/CD and cloud tools, and I'm exploring data analytics and machine learning. Outside software projects, I served as President of a Village Students' Union for four years. I'm seeking a Software Engineering internship where I can contribute to secure, maintainable applications and keep growing as an engineer.",
  ],

  // Facts a reader can verify, not self-assessed scores.
  facts: [
    { label: "Studying", value: "BSc (Hons) IT & Management" },
    { label: "University", value: "University of Moratuwa" },
    { label: "CGPA", value: "3.53 / 4.00" },
    { label: "Status", value: "Seeking an internship" },
  ],

  interests: [
    "Data science & statistical analysis",
    "AI, machine learning & data-driven problem solving",
  ],
};

// Grouped the way the CV groups them. No percentages — a self-assigned
// "React 88%" is not information a reader can act on.
export const skills: { group: string; items: string[]; note?: string }[] = [
  {
    group: "Programming",
    items: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "C", "HTML", "CSS"],
  },
  {
    group: "Backend & Frameworks",
    items: ["Spring Boot", "NestJS", "FastAPI", "Node.js", "REST APIs", "Prisma ORM", "Spring Data JPA", "Hibernate", "SQLAlchemy", "Express.js", "Ballerina"],
  },
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Recharts", "Responsive Web Design", "Angular"],
  },
  {
    group: "Databases & Authentication",
    items: ["PostgreSQL", "MySQL", "Supabase", "JWT", "Spring Security", "BCrypt", "Row-Level Security (RLS)", "Database Migrations", "MongoDB"],
  },
  {
    group: "Data Analytics & Machine Learning",
    items: ["pandas", "NumPy", "scikit-learn", "Random Forest", "SHAP", "Exploratory Data Analysis", "Data Visualization", "Revenue Forecasting", "Anomaly Detection", "Matplotlib", "Plotly"],
  },
  {
    group: "Real-Time Technologies",
    items: ["Socket.IO", "Server-Sent Events (SSE)", "Real-Time Data Synchronization"],
  },
  {
    group: "Cloud & DevOps",
    items: ["Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Render", "Cloudinary", "AWS Cloud Fundamentals", "Kubernetes", "Vercel"],
    note: "AWS Cloud Fundamentals; Kubernetes at a basic level.",
  },
  {
    group: "Testing & API Tools",
    items: ["Pytest", "Playwright", "API Testing", "Automated Testing", "Postman"],
  },
  {
    group: "Engineering Practices & Tools",
    items: ["OOP", "Modular Architecture", "Authentication & Authorization", "RBAC", "Database Design", "Git & GitHub", "Agile Development", "VS Code", "Jupyter Notebook", "Figma", "Photoshop"],
  },
];

export type Project = {
  id: string;
  title: string;
  context: string;
  /** Team projects say "My contribution" over the bullets, so a reader
   *  never has to guess which parts were actually yours. */
  team?: boolean;
  summary: string;
  detail: string[];
  stack: string[];
  featured?: boolean;
  repo?: string;
  live?: string;
  media?: ProjectMedia[];
  caseStudy?: {
    problem: string;
    approach: string;
    architecture: string[];
    decisions: string;
    lessons: string;
    outcome: string;
  };
};

export type ProjectMedia = {
  src: string;
  kind: "image" | "video";
  caption: string;
};

// Projects live in content/projects.json so the dev-only editor at /admin
// can rewrite them. Everything else on the site is still edited here.
export const projects = projectsData as Project[];

export const education = [
  {
    degree: "BSc (Hons) in Information Technology & Management",
    institution: "University of Moratuwa",
    location: "Moratuwa, Sri Lanka",
    period: "2024 — 2028",
    status: "In progress",
    note: "Faculty of Information Technology · SGPA: 3.53 / 4.00.",
    breakdown: [
      { label: "Semester 1", value: "3.68" },
      { label: "Semester 2", value: "3.69" },
      { label: "Semester 3", value: "3.22" },
    ],
  },
  {
    degree: "GCE Advanced Level — Combined Mathematics",
    institution: "J/Vembadi Girls' High School",
    location: "Jaffna, Sri Lanka",
    period: "2020 — 2022",
    status: "Completed",
    note: "Combined Mathematics.",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Archive", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Personal", href: "#personal" },
  { label: "Contact", href: "#contact" },
];
