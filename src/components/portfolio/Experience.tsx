import { TechIcon } from "./TechIcon";

const items = [
  {
    title: "Software Development Intern",
    company: "YV Thinkers",
    location: "Onsite",
    range: "Jul 2023 — Sep 2023",
    active: false,
    description: "MERN | REST APIs | JWT | MongoDB",
    bullets: [
      "Built full-stack CRM using MERN stack for Admin and Customer-facing workflows — designed scalable REST APIs for order tracking, data management, and admin controls handling concurrent requests.",
      "Implemented role-based JWT authentication with dual-token strategy and applied SOLID principles with clean architecture — fully reviewable and maintainable by a team.",
      "Automated customer record lifecycle via MongoDB aggregation pipelines — reducing manual data entry by ~70% across core CRM workflows.",
    ],
    tech: ["JS", "Re", "Nd", "Ex", "Mg", "Jw"],
  },
];

export function Experience() {
  return (
    <section className="py-10">
      <h2 className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground mb-6 font-mono">
        EXPERIENCE
      </h2>
      <div className="space-y-8">
        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr] gap-4">
            <div className="pt-1.5">
              <span
                className={`block h-2 w-2 rounded-full ${it.active ? "bg-green-500" : "bg-muted-foreground/40"}`}
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <div className="text-sm text-foreground">
                  <span className="font-medium">{it.title}</span>
                  <span className="text-muted-foreground"> · </span>
                  <span className="text-foreground/80">{it.company}</span>
                </div>
                <div className="text-xs text-muted-foreground">{it.range}</div>
              </div>
              <div className="text-xs text-muted-foreground mb-3">{it.location}</div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">{it.description}</p>
              {it.bullets.length > 0 && (
                <ul className="space-y-1.5 mb-4 list-disc pl-5">
                  {it.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-foreground/80">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {it.tech.length > 0 && (
                <div className="flex items-center gap-3">
                  {it.tech.map((t) => (
                    <div key={t} className="transition-transform duration-150 hover:scale-110">
                      <TechIcon name={t} className="h-5 w-5" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
