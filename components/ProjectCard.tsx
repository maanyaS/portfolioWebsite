import type { Project } from "@/content/site";
import VideoEmbed from "./VideoEmbed";

export default function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article className={`project${flip ? " flip" : ""}`}>
      <div className="project-copy">
        <div className="project-title">
          <h3>{project.name}</h3>
          {project.badge && <span className="badge">{project.badge}</span>}
        </div>
        <p className="muted small">{project.date}</p>
        <h4>{project.question}</h4>
        <p className="muted">{project.summary}</p>
        <p className="accent small">{project.focus}</p>
        <hr />
        <p className="label">My part</p>
        <ul className="ticks">
          {project.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <dl className="stats">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className="stack">{project.stack.join(" / ")}</p>
        {project.live && (
          <a className="line-link" href={project.live} target="_blank" rel="noreferrer">
            Try the app
          </a>
        )}
      </div>
      <div className="project-media">
        <VideoEmbed media={project.media} />
      </div>
    </article>
  );
}
