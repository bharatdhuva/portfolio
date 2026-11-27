import { lazy, Suspense } from "react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { TechStack } from "@/components/portfolio/TechStack";
import { ScrollReveal } from "@/components/portfolio/ScrollReveal";
import { Toaster } from "@/components/ui/sonner";

const ContributionHeatmap = lazy(() =>
  import("@/components/portfolio/ContributionHeatmap").then((m) => ({
    default: m.ContributionHeatmap,
  })),
);
const Projects = lazy(() =>
  import("@/components/portfolio/Projects").then((m) => ({ default: m.Projects })),
);
const Experience = lazy(() =>
  import("@/components/portfolio/Experience").then((m) => ({ default: m.Experience })),
);
const Education = lazy(() =>
  import("@/components/portfolio/Education").then((m) => ({ default: m.Education })),
);
const Contact = lazy(() =>
  import("@/components/portfolio/Contact").then((m) => ({ default: m.Contact })),
);
const KeyboardSection = lazy(() =>
  import("@/components/portfolio/KeyboardSection").then((m) => ({
    default: m.KeyboardSection,
  })),
);
const Footer = lazy(() =>
  import("@/components/portfolio/Footer").then((m) => ({ default: m.Footer })),
);
const CommandMenu = lazy(() =>
  import("@/components/portfolio/CommandMenu").then((m) => ({
    default: m.CommandMenu,
  })),
);

function App() {
  return (
    <div className="min-h-screen text-foreground antialiased relative overflow-x-clip">
      {/* Global Interactive Command Palette (Cmd+K / Ctrl+K) */}
      <Suspense fallback={null}>
        <CommandMenu />
      </Suspense>

      {/* Global Notification Toaster */}
      <Toaster position="bottom-right" richColors />

      {/* Centered Background Grid */}
      <div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "4.375rem 4.375rem" /* Scales proportionally (70px @ 16px font-size) */,
          backgroundPosition: "center top",
        }}
      />

      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal duration={600}>
          <Hero />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <TechStack />
        </ScrollReveal>
        <Suspense fallback={null}>
          <ScrollReveal delay={200}>
            <ContributionHeatmap />
          </ScrollReveal>
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
          <ScrollReveal>
            <Experience />
          </ScrollReveal>
          <ScrollReveal>
            <Education />
          </ScrollReveal>
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
          <ScrollReveal>
            <KeyboardSection />
          </ScrollReveal>
          <ScrollReveal>
            <Footer />
          </ScrollReveal>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
