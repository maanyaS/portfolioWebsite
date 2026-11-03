import type { Metadata } from "next";
import VideoEmbed from "@/components/VideoEmbed";
import { performances } from "@/content/site";

export const metadata: Metadata = {
  title: "Life | Maanya Shukla",
  description: "Music outside of work and studies.",
};

export default function Life() {
  return (
    <main>
      <section className="wrap life-hero">
        <p className="label">Outside work and studies</p>
        <h1>
          Off the
          <br />
          <span>clock.</span>
        </h1>
        <p className="lede">The double bass and the piano.</p>
      </section>

      <section className="wrap section" id="playing">
        <div className="section-head">
          <h2>What I play.</h2>
        </div>
        <div className="performance-grid">
          {performances.map((item) => (
            <figure key={item.id}>
              <VideoEmbed media={{ kind: "youtube", id: item.id, title: item.title }} />
              <figcaption>{item.instrument}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
