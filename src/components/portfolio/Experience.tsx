import { TechIcon } from "./TechIcon";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  range: string;
  description: string;
  bullets: string[];
  tech: string[];
}

const items: ExperienceItem[] = [
  {
    title: "Software Development Intern",
    company: "YV Thinkers",
    location: "Onsite",
    range: "Jul 2023 — Sep 2023",
    description: "MERN | REST APIs | JWT | MongoDB",
    bullets: [
      "Built full-stack CRM using MERN stack for Admin and Customer-facing workflows — designed scalable REST APIs for order tracking, data management, and admin controls handling concurrent requests.",
      "Implemented role-based JWT authentication with dual-token strategy and applied SOLID principles with clean architecture.",
      "Automated customer record lifecycle via MongoDB aggregation pipelines — reducing manual data entry by ~70% across core CRM workflows.",
    ],
    tech: ["JS", "Re", "Nd", "Ex", "Mg", "Jw"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-10 border-t border-border/50">
      <h2 className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground mb-6 font-mono">
        EXPERIENCE
      </h2>

      <div className="space-y-8">
        {items.map((it, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div className="text-sm text-foreground">
                <span className="font-semibold text-foreground">{it.title}</span>
                <span className="text-muted-foreground"> · </span>
                <span className="text-foreground/90 font-medium">{it.company}</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono">{it.range}</div>
            </div>

            <div className="text-xs text-muted-foreground">{it.location}</div>
            <p className="text-xs font-mono text-muted-foreground/90">{it.description}</p>

            {it.bullets.length > 0 && (
              <ul className="space-y-1.5 my-3 list-disc pl-4 text-xs text-foreground/80 leading-relaxed">
                {it.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}

            {it.tech.length > 0 && (
              <div className="flex items-center gap-2.5 pt-1">
                {it.tech.map((t) => (
                  <div
                    key={t}
                    className="transition-transform duration-150 hover:scale-110 active:scale-90"
                  >
                    <TechIcon name={t} className="h-4.5 w-4.5" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
