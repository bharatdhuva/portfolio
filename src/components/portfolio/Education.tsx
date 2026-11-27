import msuLogo from "../../assets/education/msu-baroda-logo.webp";
import gtuLogo from "../../assets/education/gtu-logo.webp";

interface EducationItem {
  degree: string;
  institution: string;
  range: string;
  logo: string;
  logoAlt: string;
  extra?: string;
}

const educationItems: EducationItem[] = [
  {
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    institution: "The Maharaja Sayajirao University of Baroda, Vadodara",
    range: "2024 — 2027",
    logo: msuLogo,
    logoAlt: "MSU Baroda logo",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "Government Polytechnic, Jamnagar (G.T.U.)",
    range: "2021 — 2024",
    logo: gtuLogo,
    logoAlt: "GTU logo",
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
          <div key={i} className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg border border-border/60 bg-white p-1.5 flex items-center justify-center shrink-0 mt-0.5">
              <img
                src={item.logo}
                alt={item.logoAlt}
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
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
          </div>
        ))}
      </div>
    </section>
  );
}
