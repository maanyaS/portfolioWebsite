import { profile } from "@/content/site";

export default function Footer() {
  return (
    <footer className="site-footer wrap">
      <span>
        {profile.name} / {profile.location}
      </span>
      <span className="footer-links">
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="#top">Back to top</a>
      </span>
    </footer>
  );
}
