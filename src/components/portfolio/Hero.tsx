import { useState, useEffect } from "react";
import { MapPin, Mail, User, Github, Globe, Twitter } from "lucide-react";
import profileImg from "../../assets/“Peace Feels Better in Nature 🍃” copy.jpg";
import bannerImg from "../../assets/banner.gif";

const ROLES = ["Software Developer", "Curious Builder", "Product Engineer"];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const show = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(show);
  }, [index]);

  useEffect(() => {
    if (!visible) {
      const next = setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 450);
      return () => clearTimeout(next);
    }
  }, [visible]);

  return (
    <section id="home" className="relative pt-24 sm:pt-24 pb-10">
      <style>{`
        @keyframes roleIn {
          from { opacity: 0; filter: blur(6px); transform: translateY(6px); }
          to   { opacity: 1; filter: blur(0px); transform: translateY(0px); }
        }
        @keyframes roleOut {
          from { opacity: 1; filter: blur(0px); transform: translateY(0px); }
          to   { opacity: 0; filter: blur(6px); transform: translateY(-6px); }
        }
        .role-in  { animation: roleIn  420ms cubic-bezier(0,0,0.2,1) forwards; }
        .role-out { animation: roleOut 380ms cubic-bezier(0.4,0,1,1) forwards; }
      `}</style>

      <div className="relative w-full aspect-[2.7/1] sm:aspect-[3.2/1] overflow-hidden rounded-xl border border-border shadow-sm">
        <img src={bannerImg} alt="Banner Image" className="w-full h-full object-cover" />
      </div>

      <div className="flex items-center gap-4 sm:gap-4 mb-8 mt-6 min-w-0">
        <img
          src={profileImg}
          alt="Bharat Dhuva"
          className="h-12 w-12 flex-shrink-0 rounded-full object-cover border border-border shadow-sm"
        />
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground leading-tight">
            Bharat Dhuva
          </h1>

          <div className="relative mt-0.5" style={{ height: "1.25rem" }}>
            <span
              key={`${index}-${visible}`}
              className={`absolute left-0 top-0 text-sm font-medium text-muted-foreground whitespace-nowrap ${visible ? "role-in" : "role-out"}`}
            >
              {ROLES[index]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-x-6 sm:gap-x-10 gap-y-4 mb-8">
        <Meta
          label="LOCATION"
          icon={<MapPin className="h-3.5 w-3.5" />}
          value="Vadodara, India"
          href="https://www.google.com/maps/search/?api=1&query=Vadodara,+Gujarat,+India"
        />
        <Meta
          label="EMAIL"
          icon={<Mail className="h-3.5 w-3.5" />}
          value="bharatdhuva27@gmail.com"
          href="mailto:bharatdhuva27@gmail.com"
        />
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl mb-6">
        <span className="whitespace-nowrap">Full-Stack</span> Engineer crafting{" "}
        <span className="whitespace-nowrap">high-performance</span>, scalable web applications.
        Ready to build and ship something great together?
        <span className="block mt-2">
          Open for - Intern | <span className="whitespace-nowrap">Full-time</span> | Startup Roles
          (Remote & <span className="whitespace-nowrap">On-site</span>)
        </span>
      </p>

      <SpotifyStatus />

      <div className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mb-3 font-mono">
        CONTACT ME
      </div>

      <div className="flex items-center flex-wrap gap-4">
        {[
          {
            label: "X (Twitter)",
            href: "https://x.com/mrcrotes",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            ),
          },
          {
            label: "LinkedIn",
            href: "https://linkedin.com/in/bharatdhuva27",
            icon: (
              <img
                src="https://api.iconify.design/logos:linkedin-icon.svg"
                alt="LinkedIn"
                width="18"
                height="18"
                className="grayscale group-hover:grayscale-0 transition-all duration-150 opacity-80 group-hover:opacity-100"
              />
            ),
          },
          {
            label: "GitHub",
            href: "https://github.com/bharatdhuva",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            ),
          },
          {
            label: "Email",
            href: "mailto:bharatdhuva27@gmail.com",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            ),
          },
          {
            label: "Resume",
            href: "https://drive.google.com/file/d/1IOVkp12mBcVedyKLgKH2K7F1kRPqDAW7/view?usp=sharing",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
            ),
          },
        ].map(({ label, href, icon }) => (
          <div key={label} className="relative inline-flex group">
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#737373] dark:text-[#a0a0a0] hover:text-[#111111] dark:hover:text-[#f0f0f0] transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer"
            >
              {icon}
            </a>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 text-[11px] font-medium font-sans rounded-md whitespace-nowrap pointer-events-none transition-all duration-150 ease-out z-50 opacity-0 translate-y-1 bg-zinc-800 text-zinc-100 shadow-md group-hover:opacity-100 group-hover:translate-y-0 border border-zinc-700/50">
              {label}
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid #27272a",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Meta({
  label,
  icon,
  value,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  href?: string;
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 550);
  };

  return (
    <div>
      <div className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mb-1.5 font-mono">
        {label}
      </div>
      {href ? (
        <a
          href={href}
          onClick={handleClick}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-1.5 text-xs sm:text-sm text-foreground transition-all duration-150 active:scale-95 active:opacity-90 w-max cursor-pointer"
        >
          <span className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
            {icon}
          </span>
          <span
            className={`relative pb-0.5 whitespace-nowrap ${isClicked
              ? "animate-click-underline"
              : "after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 after:origin-bottom-right group-hover:after:origin-bottom-left group-hover:after:scale-x-100"
              }`}
          >
            {value}
          </span>
        </a>
      ) : (
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-foreground whitespace-nowrap">
          <span className="text-muted-foreground">{icon}</span>
          <span>{value}</span>
        </div>
      )}
    </div>
  );
}

function SpotifyStatus() {
  const [data, setData] = useState<{
    title: string;
    artist: string;
    albumArt?: string;
    url?: string;
  } | null>(null);

  useEffect(() => {
    const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY || "";
    const LASTFM_USER = "bharatdhuva";

    if (!LASTFM_API_KEY) return;

    const fetchLastPlayed = async () => {
      try {
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`,
        );
        const json = await res.json();
        const tracks = json?.recenttracks?.track;
        if (!tracks) return;

        const trackArray = Array.isArray(tracks) ? tracks : [tracks];
        if (trackArray.length === 0) return;

        // If the first track in the response is currently playing, get the second one (last completed track)
        const isCurrentNowPlaying = trackArray[0]["@attr"]?.nowplaying === "true";
        const lastCompletedTrack = isCurrentNowPlaying ? trackArray[1] : trackArray[0];

        if (!lastCompletedTrack) return;

        const isUptown = lastCompletedTrack.name?.toLowerCase().includes("uptown funk");
        if (isUptown) {
          setData(null);
          return;
        }

        setData({
          title: lastCompletedTrack.name || "Unknown",
          artist: lastCompletedTrack.artist?.["#text"] || "Unknown",
          albumArt: lastCompletedTrack.image?.[2]?.["#text"] || undefined,
          url: lastCompletedTrack.url || undefined,
        });
      } catch (err) {
        console.error("Last.fm fetch failed:", err);
      }
    };

    fetchLastPlayed();
    const interval = setInterval(fetchLastPlayed, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 min-w-0 w-full">
      {data.albumArt && (
        <img
          src={data.albumArt}
          alt="Album art"
          className="w-5 h-5 rounded-sm shrink-0 shadow-sm"
        />
      )}
      <span className="flex items-center gap-1.5 text-[#1DB954] font-medium shrink-0">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        Last Played
      </span>
      <span className="shrink-0">—</span>
      {data.title ? (
        <a
          href={`https://open.spotify.com/search/${encodeURIComponent(data.title + " " + data.artist)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 truncate flex-1 min-w-0 no-underline hover:underline decoration-muted-foreground underline-offset-2 transition-all duration-100 active:scale-[0.98] active:opacity-90 inline-block cursor-pointer"
        >
          {data.title} · {data.artist}
        </a>
      ) : (
        <span className="text-foreground/70 truncate flex-1 min-w-0">
          {data.title} · {data.artist}
        </span>
      )}
    </div>
  );
}
