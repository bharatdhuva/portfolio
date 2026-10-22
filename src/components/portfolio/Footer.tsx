import { Quote, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const socialLinks = [
  {
    icon: (className: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className={className}
      >
        <path
          d="M237.033,0.018 H18.89 C8.58,-0.1 0.12,8.16 0,18.47 V237.52 C0.12,247.84 8.57,256.1 18.89,256 H237.03 C247.37,256.12 255.86,247.86 256,237.52 V18.45 C255.85,8.12 247.36,-0.13 237.03,0 Z"
          fill="#0A66C2"
        />
        <path
          d="M218.123,218.127 H180.192 V158.724 C180.192,144.559 179.939,126.324 160.464,126.324 C140.708,126.324 137.685,141.758 137.685,157.693 V218.123 H99.754 V95.967 H136.168 V112.661 H136.678 C144.103,99.965 157.909,92.382 172.606,92.928 C211.051,92.928 218.139,118.216 218.139,151.114 L218.123,218.127 Z M56.955,79.269 C44.798,79.271 34.941,69.417 34.939,57.26 C34.937,45.103 44.79,35.246 56.947,35.244 C69.104,35.241 78.961,45.095 78.963,57.252 C78.964,63.09 76.646,68.69 72.519,72.818 C68.391,76.947 62.793,79.267 56.955,79.269 Z M75.921,218.127 H37.95 V95.967 H75.921 V218.127 Z"
          fill="#FFFFFF"
        />
      </svg>
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
