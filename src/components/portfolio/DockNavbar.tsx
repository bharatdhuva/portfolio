import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Folder, MessageSquare, Github, FileText, Sun, Moon } from "lucide-react";

interface DockNavbarProps {
  links: {
    github?: string;
    linkedin?: string;
    x?: string;
    email?: string;
    resumeUrl?: string;
  };
  updates: string[];
}

export function DockNavbar({ links, updates }: DockNavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [activeOption, setActiveOption] = useState("1");
  const [prevOption, setPrevOption] = useState("1");
  const [isMobile, setIsMobile] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Detect mobile / touch devices
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 640px)").matches ||
        window.matchMedia("(pointer: coarse)").matches,
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Sync active section based on scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newId = entry.target.id;
            setActiveSection(newId);

            // Update activeOption to match scroll position (1, 2, or 3)
            const map: Record<string, string> = { home: "1", projects: "2", contact: "3" };
            const nextOpt = map[newId];
            if (nextOpt) {
              setActiveOption((prev) => {
                if (prev !== nextOpt) {
                  setPrevOption(prev);
                  return nextOpt;
                }
                return prev;
              });
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: "-25% 0px -45% 0px" },
    );

    const sections = ["home", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Theme sync initial load
    const stored = localStorage.getItem("theme");
    let isDark = true; // Default to dark theme
    if (stored) {
      isDark = stored === "dark" || stored === "dim";
    }
    setDark(isDark);

    const handleThemeChange = (e: CustomEvent) => {
      const isDark = e.detail.dark !== undefined ? e.detail.dark : (e.detail.theme === "dark" || e.detail.theme === "dim");
      setDark(isDark);
    };

    window.addEventListener("theme-changed" as any, handleThemeChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
      window.removeEventListener("theme-changed" as any, handleThemeChange);
    };
  }, []);

  const scrollToSection = (id: string, optNum: string) => {
    const el = document.getElementById(id);
    if (el) {
      setPrevOption(activeOption);
      setActiveOption(optNum);
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openLink = (url: string, optNum: string) => {
    setPrevOption(activeOption);
    setActiveOption(optNum);
    window.open(url, "_blank", "noopener,noreferrer");

    // Auto-revert bubble back to active scroll section after 1.5 seconds
    setTimeout(() => {
      setActiveOption((prev) => {
        const map: Record<string, string> = { home: "1", projects: "2", contact: "3" };
        const correctOpt = map[activeSection] || "1";
        if (prev !== correctOpt) {
          setPrevOption(prev);
          return correctOpt;
        }
        return prev;
      });
    }, 1500);
  };

  const handleThemeToggle = (event: React.MouseEvent, optNum: string) => {
    event.preventDefault(); // Prevent browser from firing second click on the inner input
    const next = !dark;
    const nextTheme = next ? "dark" : "light";

    setPrevOption(activeOption);
    setActiveOption(optNum);
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", nextTheme);
    window.dispatchEvent(new CustomEvent("theme-changed", { detail: { theme: nextTheme, dark: next } }));

    // Auto-revert bubble back to active scroll section after 1.5 seconds
    setTimeout(() => {
      setActiveOption((prev) => {
        const map: Record<string, string> = { home: "1", projects: "2", contact: "3" };
        const correctOpt = map[activeSection] || "1";
        if (prev !== correctOpt) {
          setPrevOption(prev);
          return correctOpt;
        }
        return prev;
      });
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 w-[92vw] max-w-md pointer-events-none">
      {/* Bottom Floating Switcher Dock */}
      <motion.fieldset
        className="switcher switcher--dock glass-container flex items-center select-none transition-shadow duration-300 pointer-events-auto"
        {...{ "c-previous": prevOption }}
      >
        <legend className="switcher__legend">Navigation & Settings</legend>

        {/* Glassmorphic layers */}
        <div className="glass-filter" />
        <div className="glass-overlay" />
        <div className="glass-specular" />

        {/* 1. Home */}
        <label
          className="switcher__option"
          data-label="Home"
          onClick={() => scrollToSection("home", "1")}
        >
          <input
            type="radio"
            name="dock"
            value="home"
            className="switcher__input"
            {...{ "c-option": "1" }}
            checked={activeOption === "1"}
            onChange={() => { }}
          />
          <Home className="switcher__icon switcher__icon--home" />
        </label>

        {/* 2. Projects */}
        <label
          className="switcher__option"
          data-label="Projects"
          onClick={() => scrollToSection("projects", "2")}
        >
          <input
            type="radio"
            name="dock"
            value="projects"
            className="switcher__input"
            {...{ "c-option": "2" }}
            checked={activeOption === "2"}
            onChange={() => { }}
          />
          <Folder className="switcher__icon switcher__icon--folder" />
        </label>

        {/* 3. Contact */}
        <label
          className="switcher__option"
          data-label="Contact"
          onClick={() => scrollToSection("contact", "3")}
        >
          <input
            type="radio"
            name="dock"
            value="contact"
            className="switcher__input"
            {...{ "c-option": "3" }}
            checked={activeOption === "3"}
            onChange={() => { }}
          />
          <MessageSquare className="switcher__icon switcher__icon--message" />
        </label>

        {/* 4. GitHub */}
        <label
          className="switcher__option"
          data-label="GitHub"
          onClick={() => openLink(links.github || "https://github.com", "4")}
        >
          <input
            type="radio"
            name="dock"
            value="github"
            className="switcher__input"
            {...{ "c-option": "4" }}
            checked={activeOption === "4"}
            onChange={() => { }}
          />
          <Github className="switcher__icon switcher__icon--github" />
        </label>

        {/* 5. Resume */}
        <label
          className="switcher__option"
          data-label="Resume"
          onClick={() => openLink(links.resumeUrl || "#", "5")}
        >
          <input
            type="radio"
            name="dock"
            value="resume"
            className="switcher__input"
            {...{ "c-option": "5" }}
            checked={activeOption === "5"}
            onChange={() => { }}
          />
          <FileText className="switcher__icon switcher__icon--resume" />
        </label>

        {/* 6. Theme Toggle */}
        <label
          className="switcher__option"
          data-label={dark ? "Light Mode" : "Dark Mode"}
          onClick={(e) => handleThemeToggle(e, "6")}
        >
          <input
            type="radio"
            name="dock"
            value="theme"
            className="switcher__input"
            {...{ "c-option": "6" }}
            checked={activeOption === "6"}
            onChange={() => { }}
          />
          {dark ? (
            <Sun className="switcher__icon switcher__icon--sun" />
          ) : (
            <Moon className="switcher__icon switcher__icon--moon" />
          )}
        </label>
      </motion.fieldset>
    </div>
  );
}
