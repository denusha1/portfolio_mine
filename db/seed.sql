-- ============================================================
-- Seed — the site's current content, generated from
-- content/projects.json and lib/data.ts.
--
--   psql "$DATABASE_URL" -f db/seed.sql
--
-- Every statement is idempotent (on conflict / where not exists), so
-- re-running refreshes rather than duplicating.
-- ============================================================

begin;

-- ── profile ─────────────────────────────────────────────────
insert into profile (id, name, short_name, role, location, email, phone, github_url, linkedin_url, university, degree, cgpa, tagline, bio, interests)
values (1, 'Denusha Thavaruban', 'Denusha', 'Software Engineering Undergraduate', 'Sri Lanka', 'denushadenu12@gmail.com', '+94 75 371 7693', 'https://github.com/denusha1', 'https://linkedin.com/in/denushathavaruban', 'University of Moratuwa', 'BSc (Hons) in Information Technology & Management', '3.53 / 4.00', 'Third-year IT & Management undergraduate at the University of Moratuwa, building full-stack applications with Java, Spring Boot, Python, TypeScript, React and PostgreSQL. Seeking a Software Engineering internship.', array['I''m a third-year Information Technology & Management undergraduate at the University of Moratuwa with a 3.53 / 4.00 CGPA. Through full-stack projects, I''ve worked on backend services, REST APIs, database design, authentication, role-based access, real-time updates and automated tests using Java, Spring Boot, Python, TypeScript, React and PostgreSQL.', 'I also have hands-on experience with Docker, CI/CD and cloud tools, and I''m exploring data analytics and machine learning. Outside software projects, I served as President of a Village Students'' Union for four years. I''m seeking a Software Engineering internship where I can contribute to secure, maintainable applications and keep growing as an engineer.'], array['Data science & statistical analysis', 'AI, machine learning & data-driven problem solving'])
on conflict (id) do update set
  name = excluded.name,
  short_name = excluded.short_name,
  role = excluded.role,
  location = excluded.location,
  email = excluded.email,
  phone = excluded.phone,
  github_url = excluded.github_url,
  linkedin_url = excluded.linkedin_url,
  university = excluded.university,
  degree = excluded.degree,
  cgpa = excluded.cgpa,
  tagline = excluded.tagline,
  bio = excluded.bio,
  interests = excluded.interests;

-- ── hero facts ──────────────────────────────────────────────
delete from profile_facts;
insert into profile_facts (label, value, sort_order) values
  ('Studying', 'BSc (Hons) IT & Management', 0),
  ('University', 'University of Moratuwa', 1),
  ('CGPA', '3.53 / 4.00', 2),
  ('Status', 'Seeking an internship', 3);

-- ── skills ──────────────────────────────────────────────────
delete from skills;
delete from skill_groups;
insert into skill_groups (name, note, sort_order) values
  ('Programming', null, 0),
  ('Backend & Frameworks', null, 1),
  ('Frontend', null, 2),
  ('Databases & Authentication', null, 3),
  ('Data Analytics & Machine Learning', null, 4),
  ('Real-Time Technologies', null, 5),
  ('Cloud & DevOps', 'AWS Cloud Fundamentals; Kubernetes at a basic level.', 6),
  ('Testing & API Tools', null, 7),
  ('Engineering Practices & Tools', null, 8);

insert into skills (group_id, name, sort_order)
select g.id, s.name, s.ord from skill_groups g
join (values
  ('Programming', 'Java', 0), ('Programming', 'Python', 1), ('Programming', 'TypeScript', 2), ('Programming', 'JavaScript', 3), ('Programming', 'SQL', 4), ('Programming', 'C', 5), ('Programming', 'HTML', 6), ('Programming', 'CSS', 7),
  ('Backend & Frameworks', 'Spring Boot', 0), ('Backend & Frameworks', 'NestJS', 1), ('Backend & Frameworks', 'FastAPI', 2), ('Backend & Frameworks', 'Node.js', 3), ('Backend & Frameworks', 'REST APIs', 4), ('Backend & Frameworks', 'Prisma ORM', 5), ('Backend & Frameworks', 'Spring Data JPA', 6), ('Backend & Frameworks', 'Hibernate', 7), ('Backend & Frameworks', 'SQLAlchemy', 8), ('Backend & Frameworks', 'Express.js', 9), ('Backend & Frameworks', 'Ballerina', 10),
  ('Frontend', 'React.js', 0), ('Frontend', 'Next.js', 1), ('Frontend', 'Tailwind CSS', 2), ('Frontend', 'Recharts', 3), ('Frontend', 'Responsive Web Design', 4), ('Frontend', 'Angular', 5),
  ('Databases & Authentication', 'PostgreSQL', 0), ('Databases & Authentication', 'MySQL', 1), ('Databases & Authentication', 'Supabase', 2), ('Databases & Authentication', 'JWT', 3), ('Databases & Authentication', 'Spring Security', 4), ('Databases & Authentication', 'BCrypt', 5), ('Databases & Authentication', 'Row-Level Security (RLS)', 6), ('Databases & Authentication', 'Database Migrations', 7), ('Databases & Authentication', 'MongoDB', 8),
  ('Data Analytics & Machine Learning', 'pandas', 0), ('Data Analytics & Machine Learning', 'NumPy', 1), ('Data Analytics & Machine Learning', 'scikit-learn', 2), ('Data Analytics & Machine Learning', 'Random Forest', 3), ('Data Analytics & Machine Learning', 'SHAP', 4), ('Data Analytics & Machine Learning', 'Exploratory Data Analysis', 5), ('Data Analytics & Machine Learning', 'Data Visualization', 6), ('Data Analytics & Machine Learning', 'Revenue Forecasting', 7), ('Data Analytics & Machine Learning', 'Anomaly Detection', 8), ('Data Analytics & Machine Learning', 'Matplotlib', 9), ('Data Analytics & Machine Learning', 'Plotly', 10),
  ('Real-Time Technologies', 'Socket.IO', 0), ('Real-Time Technologies', 'Server-Sent Events (SSE)', 1), ('Real-Time Technologies', 'Real-Time Data Synchronization', 2),
  ('Cloud & DevOps', 'Docker', 0), ('Cloud & DevOps', 'Docker Compose', 1), ('Cloud & DevOps', 'GitHub Actions', 2), ('Cloud & DevOps', 'CI/CD', 3), ('Cloud & DevOps', 'Render', 4), ('Cloud & DevOps', 'Cloudinary', 5), ('Cloud & DevOps', 'AWS Cloud Fundamentals', 6), ('Cloud & DevOps', 'Kubernetes', 7), ('Cloud & DevOps', 'Vercel', 8),
  ('Testing & API Tools', 'Pytest', 0), ('Testing & API Tools', 'Playwright', 1), ('Testing & API Tools', 'API Testing', 2), ('Testing & API Tools', 'Automated Testing', 3), ('Testing & API Tools', 'Postman', 4),
  ('Engineering Practices & Tools', 'OOP', 0), ('Engineering Practices & Tools', 'Modular Architecture', 1), ('Engineering Practices & Tools', 'Authentication & Authorization', 2), ('Engineering Practices & Tools', 'RBAC', 3), ('Engineering Practices & Tools', 'Database Design', 4), ('Engineering Practices & Tools', 'Git & GitHub', 5), ('Engineering Practices & Tools', 'Agile Development', 6), ('Engineering Practices & Tools', 'VS Code', 7), ('Engineering Practices & Tools', 'Jupyter Notebook', 8), ('Engineering Practices & Tools', 'Figma', 9), ('Engineering Practices & Tools', 'Photoshop', 10)
) as s(group_name, name, ord) on s.group_name = g.name;

-- ── projects (generated from content/projects.json) ─────────
insert into projects (id, title, context, summary, detail, stack, is_team, is_featured, sort_order, repo_url, live_url) values
  ('pms', 'Performance Management System', 'Team project · Full stack', 'A centralised platform for running employee performance evaluations through a multi-level organisational workflow. Each level reviews the level below it, and every evaluation moves through an approval chain before it counts.',
   array['Built the evaluation and approval workflow end to end — team management, employee evaluation, review, approval, rejection and status tracking.', 'Implemented the My Team view, with employee search, evaluation-status filtering and status-wise employee counts.', 'Built the evaluation interfaces covering performance objectives, targets, achievements, ratings, overall scores and feedback.', 'Implemented the multi-level approval and rejection flows, including reason and comment handling and the status updates that follow from them.', 'Developed the Enquiry and Notification modules for evaluation disputes and workflow updates.', 'Integrated the frontend with Flask REST APIs and Supabase PostgreSQL, with role-based access following the organisational hierarchy.'],
   array['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Python Flask', 'REST API', 'Supabase PostgreSQL', 'Azure AD SSO', 'LLM APIs'],
   true, true, 0, null, null),
  ('blogapp', 'BlogApp', 'Team project · Full stack', 'A blogging platform with dynamic post management, a Markdown editor that previews as you type, search across published posts, and profile administration.',
   array['Built the authentication engine: secure login and session management with role-based access.', 'Developed the Markdown editor, with live preview, formatting controls and draft saving.', 'Implemented the full post CRUD lifecycle — creation, inline editing and deletion behind confirmation modals.', 'Engineered post discovery with real-time text search and detailed post views.', 'Designed a personalised profile dashboard showing activity metrics and post management controls.'],
   array['Next.js', 'React', 'Node.js', 'REST APIs', 'Markdown parser', 'Tailwind CSS'],
   true, false, 1, null, null),
  ('cnc', 'CNC Paper Board Cutting Machine', 'Team project · Microcontroller', 'An automated CNC machine that cuts paper board from G-code, driven by an ESP32 coordinating stepper motors, servo motors and optical sensors.',
   array['Implemented the LCD operator interface and the servo motor control for machine operation.', 'Integrated and synchronised the paper feeding mechanism with the cutting process.', 'Designed the machine''s 3D components in Blender.'],
   array['ESP32', 'CNC Shield', 'NEMA 17', 'DRV8825', 'TCRT5000', 'GRBL', 'Inkscape', 'Blender'],
   true, false, 2, null, null)
on conflict (id) do update set
  title = excluded.title, context = excluded.context, summary = excluded.summary,
  detail = excluded.detail, stack = excluded.stack, is_team = excluded.is_team,
  is_featured = excluded.is_featured, sort_order = excluded.sort_order,
  repo_url = excluded.repo_url, live_url = excluded.live_url;

-- ── education ───────────────────────────────────────────────
delete from education_results;
delete from education;
insert into education (degree, institution, location, period, status, note, sort_order) values
  ('BSc (Hons) in Information Technology & Management', 'University of Moratuwa', 'Moratuwa, Sri Lanka', '2024 — 2028', 'In progress', 'Faculty of Information Technology · SGPA: 3.53 / 4.00.', 0),
  ('GCE Advanced Level — Combined Mathematics', 'J/Vembadi Girls'' High School', 'Jaffna, Sri Lanka', '2020 — 2022', 'Completed', 'Combined Mathematics.', 1);

insert into education_results (education_id, label, value, sort_order)
select e.id, r.label, r.value, r.ord from education e
join (values
  ('BSc (Hons) in Information Technology & Management', 'Semester 1', '3.68', 0),
  ('BSc (Hons) in Information Technology & Management', 'Semester 2', '3.69', 1),
  ('BSc (Hons) in Information Technology & Management', 'Semester 3', '3.22', 2)
) as r(degree, label, value, ord) on r.degree = e.degree;

commit;
