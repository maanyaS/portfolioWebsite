import AvatarStage from "@/components/AvatarStage";
import ProjectCard from "@/components/ProjectCard";
import RoleTabs from "@/components/RoleTabs";
import { education, experience, leadership, profile, projects, skills } from "@/content/site";

export default function Home() {
  return (
    <main>
      <section className="hero wrap">
        <AvatarStage />
        <div className="hero-copy">
          <h1>
            Builder mind.
            <br />
            <span>Curious person.</span>
          </h1>
          <p>
            I&apos;m Maanya, a computer engineering student in the Rutgers Honors College. I build web apps, machine
            learning tools, and hardware prototypes.
          </p>
          <a className="line-link" href="#contact">
            Open to internships
          </a>
        </div>
      </section>

      <section id="work" className="wrap section">
        <div className="section-head">
          <h2>Selected projects.</h2>
          <p>Software, machine learning, and hardware in practice.</p>
        </div>
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} flip={i % 2 === 1} />
        ))}
      </section>

      <section id="leadership" className="wrap section">
        <div className="section-head">
          <h2>Leading with people.</h2>
          <p>Partnerships, mentorship, and campus community.</p>
        </div>
        <RoleTabs roles={leadership} />
      </section>

      <section id="about" className="wrap section">
        <div className="section-head">
          <h2>Behind the work.</h2>
        </div>
        <div className="about-grid">
          <div>
            <h3 className="label">Experience</h3>
            {experience.map((item) => (
              <article className="exp" key={item.title}>
                <div>
                  <h4>{item.title}</h4>
                  <p className="accent">{item.project}</p>
                </div>
                <p className="muted small exp-dates">{item.dates}</p>
                <p className="exp-summary">{item.summary}</p>
              </article>
            ))}
          </div>
          <div>
            <h3 className="label">Education</h3>
            <h4>{education.school}</h4>
            <p className="muted">{education.college}</p>
            <p>
              {education.degree} · GPA {education.gpa}
            </p>
            <p className="muted">{education.graduation}</p>
            <p className="muted">{education.awards.join(" · ")}</p>
            <h3 className="label spaced">Languages &amp; tools</h3>
            <p>{skills.join(" / ")}</p>
            <h3 className="label spaced">Certifications</h3>
            <ul className="plain">
              {education.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="wrap section contact">
        <h2>
          Let&apos;s build
          <br />
          <span>what&apos;s next.</span>
        </h2>
        <p>I&apos;m looking for internships. LinkedIn is the best place to reach me.</p>
        <div className="contact-links">
          <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
            Message me on LinkedIn
          </a>
          <a className="button ghost" href={profile.github} target="_blank" rel="noreferrer">
            {profile.githubLabel}
          </a>
        </div>
      </section>
    </main>
  );
}
