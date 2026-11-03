"use client";

import { useState } from "react";
import type { Role } from "@/content/site";

export default function RoleTabs({ roles }: { roles: Role[] }) {
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label="Leadership roles">
        {roles.map((item, i) => (
          <button
            key={item.org}
            role="tab"
            id={`role-tab-${i}`}
            aria-selected={i === active}
            aria-controls="role-panel"
            onClick={() => setActive(i)}
          >
            <strong>{item.org}</strong>
            <small>{item.title}</small>
          </button>
        ))}
      </div>
      <div className="tab-panel" id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${active}`}>
        <div className="tab-head">
          <h3>{role.title}</h3>
          {role.dates && <p className="muted small">{role.dates}</p>}
        </div>
        <p className="tab-summary">{role.summary}</p>
        <ul className="ticks">
          {role.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <hr />
        <p className="tags">
          {role.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </p>
      </div>
    </div>
  );
}
