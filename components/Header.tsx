import Link from "next/link";
import { profile } from "@/content/site";

export default function Header() {
  return (
    <header className="site-header wrap">
      <Link href="/" className="brand">
        <span className="brand-mark">MS</span>
        {profile.shortName}
      </Link>
      <nav aria-label="Main">
        <Link href="/#work">Work</Link>
        <Link href="/#leadership">Leadership</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
        <Link href="/life">Life</Link>
      </nav>
    </header>
  );
}
