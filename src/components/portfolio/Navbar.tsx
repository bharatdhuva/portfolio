import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [clickedLabel, setClickedLabel] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const isClickScrollingRef = useRef(false);
  const clickTimerRef = useRef<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    let isDark = true;
    if (stored) {
      isDark = stored === "dark" || stored === "dim";
    } else {
      isDark = true;
      localStorage.setItem("theme", "dark");
    }
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleThemeChange = (e: CustomEvent) => {
      const isDark =
        e.detail.dark !== undefined
          ? e.detail.dark
          : e.detail.theme === "dark" || e.detail.theme === "dim";
      setDark(isDark);
    };
    window.addEventListener("theme-changed" as any, handleThemeChange);

    const handleScroll = () => {
      // Ignore scroll spy updates during click smooth scrolling
      if (isClickScrollingRef.current) return;

      // Near top of page, always highlight 'home' by default
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // If user is at bottom of page, activeSection is contact
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.scrollHeight - 50
      ) {
        setActiveSection("contact");
        return;
      }

      const sections = ["home", "projects", "contact"];
      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
      window.scrollTo(0, 0);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("theme-changed" as any, handleThemeChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent, id: string, label: string) => {
    e.preventDefault();
    setActiveSection(id);
    setClickedLabel(label);

    isClickScrollingRef.current = true;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 700);

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const targetY = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }

    setTimeout(() => {
      setClickedLabel(null);
    }, 550);
  };

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(
      new CustomEvent("theme-changed", {
        detail: { dark: next, theme: next ? "dark" : "light" },
      }),
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-auto select-none">
      {/* Exact siddz.com Top Gradient Fade Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-background [mask-image:linear-gradient(to_bottom,black_82%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
      />

      <div className="relative w-full max-w-4xl mx-auto px-6 lg:px-0">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-5 md:gap-6">
            {links.map((l) => {
              const isActive = activeSection === l.id;
              const isClicked = clickedLabel === l.label;

              const baseUnderline = isMobile
                ? isClicked
                  ? "animate-click-underline"
                  : ""
                : "after:content-[''] after:absolute after:-bottom-px after:left-0 after:h-px after:bg-current after:transition-all";

              const underlineWidth = isMobile
                ? ""
                : isActive
                ? "after:w-full"
                : "after:w-0 hover:after:w-full";

              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleLinkClick(e, l.id, l.label)}
                  className={`relative font-sans text-sm transition-colors duration-150 cursor-pointer ${baseUnderline} ${underlineWidth} ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground font-normal"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          <button
            onClick={toggle}
            className="py-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors group focus:outline-none"
            aria-label="Toggle Theme"
          >
            {dark ? (
              <Sun className="h-[17px] w-[17px] transition-transform duration-200 ease-in-out group-hover:-rotate-12 active:scale-90" />
            ) : (
              <Moon className="h-[17px] w-[17px] transition-transform duration-200 ease-in-out group-hover:-rotate-12 active:scale-90" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
