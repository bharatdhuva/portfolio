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
    <section className="py-10 border-t border-border/50">
      <h2 className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground mb-6 font-mono">
        EDUCATION
      </h2>
      <div className="space-y-8">
        {educationItems.map((item, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr] gap-4">
            <div className="pt-1.5">
              <span className="block h-2 w-2 rounded-full bg-muted-foreground/40" />
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <div className="text-sm text-foreground">
                  <span className="font-medium block">{item.degree}</span>
                  <span className="text-muted-foreground/80 text-xs">{item.institution}</span>
                </div>
                <div className="text-xs text-muted-foreground">{item.range}</div>
              </div>
              {item.extra && (
                <div className="text-xs text-muted-foreground italic">{item.extra}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
