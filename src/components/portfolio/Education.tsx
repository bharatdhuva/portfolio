interface EducationItem {
  degree: string;
  institution: string;
  range: string;
  extra?: string;
}

const educationItems: EducationItem[] = [
  {
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    institution: "The Maharaja Sayajirao University of Baroda, Vadodara",
    range: "2024 — 2027",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "Government Polytechnic, Jamnagar (G.T.U.)",
    range: "2021 — 2024",
  },
];

export function Education() {
  return (
    <section id="education" className="py-10 border-t border-border/50">
      <h2 className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground mb-6 font-mono">
        EDUCATION
      </h2>
      <div className="space-y-6">
        {educationItems.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div className="text-sm font-semibold text-foreground">
                {item.degree}
              </div>
              <div className="text-xs text-muted-foreground font-mono">{item.range}</div>
            </div>
            <div className="text-xs text-muted-foreground">{item.institution}</div>
            {item.extra && (
              <div className="text-xs text-muted-foreground italic mt-1">{item.extra}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
