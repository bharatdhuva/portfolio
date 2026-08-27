import { Quote, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const socialLinks = [
  {
    icon: (className: string) => (
      <img
        src="https://api.iconify.design/logos:linkedin-icon.svg"
        alt="LinkedIn"
        className={className}
        loading="lazy"
      />
    ),
    href: "https://linkedin.com/in/bharatdhuva27",
  },
  {
    icon: (className: string) => (
      <img
        src="https://cdn.simpleicons.org/x"
        alt="X"
        className={`${className} dark:invert`}
        loading="lazy"
      />
    ),
    href: "https://x.com/mrcrotes",
  },
  {
    icon: (className: string) => (
      <img
        src="https://cdn.simpleicons.org/github"
        alt="GitHub"
        className={`${className} dark:invert`}
        loading="lazy"
      />
    ),
    href: "https://github.com/bharatdhuva",
  },
];

export function Footer() {
  return (
    <footer className="pt-12 pb-8 border-t border-border mt-12">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center mb-10">
        <div className="flex gap-3">
          <Quote className="h-5 w-5 text-muted-foreground/60 shrink-0" />
          <div>
            <p className="text-sm italic text-foreground/80 leading-relaxed max-w-md">
              The only impossible journey is the one you never begin. Start building your digital
              presence today.
            </p>
            <p className="text-xs text-muted-foreground mt-2">— Tony Robbins</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground md:pl-6 md:border-l md:border-border py-1">
          You are the <VisitorCounter />
          <sup>th</sup> visitor
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border text-xs text-muted-foreground">
        <div>© 2026 Bharat Dhuva.</div>
        <nav className="flex items-center gap-5">
          <a
            href="#home"
            className="hover:text-foreground transition-all duration-150 active:scale-95 active:opacity-90 cursor-pointer"
          >
            Home
          </a>

          <a
            href="#projects"
            className="hover:text-foreground transition-all duration-150 active:scale-95 active:opacity-90 cursor-pointer"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="hover:text-foreground transition-all duration-150 active:scale-95 active:opacity-90 cursor-pointer"
          >
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-1">
          {socialLinks.map(({ icon: renderIcon, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-muted hover:text-foreground transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer"
            >
              {renderIcon("h-3.5 w-3.5 flex-shrink-0")}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function loadCount() {
      try {
        const CLIENT_FLAG = "visitorCounted";
        const cachedKey = "visitorCount";

        const alreadyCounted = localStorage.getItem(CLIENT_FLAG) === "true";
        const KEY = "bharatdhuva_portfolio_visits";
        const BASE_URL = "https://countapi.mileshilliard.com/api/v1";

        if (!alreadyCounted) {
          // First time: hit increment endpoint
          const res = await fetch(`${BASE_URL}/hit/${KEY}`);
          if (!res.ok) throw new Error(`CountAPI hit returned status ${res.status}`);
          const data = await res.json();
          if (data && typeof data.value === "number") {
            localStorage.setItem(CLIENT_FLAG, "true");
            localStorage.setItem(cachedKey, data.value.toString());
            setCount(data.value);
            return;
          }
          throw new Error("Invalid response format");
        }

        // Subsequent visits: fetch current value only
        const res = await fetch(`${BASE_URL}/get/${KEY}`);
        if (!res.ok) throw new Error(`CountAPI get returned status ${res.status}`);
        const data = await res.json();
        if (data && typeof data.value === "number") {
          localStorage.setItem(cachedKey, data.value.toString());
          setCount(data.value);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Failed to fetch visitor count:", err);
        const cached = localStorage.getItem("visitorCount");
        setCount(cached ? parseInt(cached, 10) : 635);
      }
    }

    loadCount();
  }, []);

  if (count === null) {
    return <span className="text-foreground font-medium animate-pulse">...</span>;
  }

  return <span className="text-foreground font-medium">{count.toLocaleString()}</span>;
}
