import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { ContributionHeatmap } from "@/components/portfolio/ContributionHeatmap";
import { TechStack } from "@/components/portfolio/TechStack";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollReveal } from "@/components/portfolio/ScrollReveal";
import { KeyboardSection } from "@/components/portfolio/KeyboardSection";

function App() {
  return (
    <div className="min-h-screen text-foreground antialiased relative">
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
        <ScrollReveal delay={200}>
          <ContributionHeatmap />
        </ScrollReveal>
        <ScrollReveal>
          <Projects />
        </ScrollReveal>
        <ScrollReveal>
          <Education />
        </ScrollReveal>
        <ScrollReveal>
          <Experience />
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
      </main>
    </div>
  );
}

export default App;
