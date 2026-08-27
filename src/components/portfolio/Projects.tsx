import { Github, Globe } from "lucide-react";
import { TechIcon } from "./TechIcon";
import interviewosImg from "../../assets/interviewos.gif";
import khetseImg from "../../assets/khetse.gif";
import outlyImg from "../../assets/outly.png";
import bookstageImg from "../../assets/image.png";

interface Project {
  name: string;
  description: string;
  gradient: string;
  accent: string;
  image?: string;
  video?: string;
  tech: string[];
  github?: string;
  globe?: string;
  objectFit?: string;
}

const projects: Project[] = [
  {
    name: "Outly",
    description:
      "An AI-powered job search automation platform with ATS resume tailoring, cold email generation, and Kanban application tracking.",
    gradient: "from-amber-500 via-orange-600 to-red-600",
    accent: "AI-Powered Career & Email Automation",
    image: outlyImg,
    video: "/outly-video.mp4",
    tech: ["Re", "TS", "VT", "Nd", "Ex", "Mg", "GE"],
    github: "https://github.com/bharatdhuva/Outly",
    globe: "https://outly.online",
  },
  {
    name: "InterviewOS",
    description:
      "Real-time technical interview platform featuring WebRTC video, Y.js collaborative code editor, shared whiteboard, and sandboxed code execution.",
    gradient: "from-indigo-600 via-purple-700 to-pink-600",
    accent: "Real-Time Collaborative Interview Platform",
    image: interviewosImg,
    tech: ["Re", "Nd", "Ex", "Mg", "Wc", "Io", "J0"],
    github: "https://github.com/bharatdhuva/Interview-OS",
    globe: "https://interviewos-bharatdhuva.vercel.app/",
  },
  {
    name: "Bookstage",
    description:
      "Decoupled movie and live event booking platform built with ASP.NET Core & React, featuring a concurrency-safe seat locking engine and automated PDF tickets.",
    gradient: "from-blue-600 via-indigo-700 to-cyan-600",
    accent: "Full-Stack Ticket Booking Platform",
    image: bookstageImg,
    tech: ["Re", "An", "PG", "Dk", "Jw", "Vt"],
    github: "https://github.com/bharatdhuva/Bookstage",
    globe: "https://bookstage.vercel.app",
  },
  {
    name: "Khetse",
    description:
      "Farm-to-home delivery platform UI featuring real-time order tracking, product category filtering, cart management, and Firebase authentication.",
    gradient: "from-green-600 via-emerald-700 to-teal-600",
    accent: "Farm-to-Home Fresh Produce & Dairy Platform",
    image: khetseImg,
    tech: ["RE", "TW"],
    github: "https://github.com/bharatdhuva/Khetse---Farm-to-Home-",
    globe: "https://khetse-fresh.vercel.app/",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-10">
      <h2 className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground mb-5 font-mono">
        FEATURED PROJECTS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((p) => (
          <article
            key={p.name}
            className="rounded-xl border border-border bg-card hover:border-foreground/20 transition-all duration-200 group active:scale-[0.99] flex flex-col h-full relative"
          >
            {/* ── Thumbnail (Flush 16:9 - Seamless Fit) ── */}
            {p.globe || p.github ? (
              <a
                href={p.globe || p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full aspect-video overflow-hidden rounded-t-xl block cursor-pointer bg-card"
              >
                {p.video ? (
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  /* Gradient fallback */
                  <div
                    className={`w-full h-full bg-gradient-to-br ${p.gradient} flex items-center justify-center`}
                  >
                    <span className="text-white/90 font-medium text-sm text-center px-4 leading-snug">
                      {p.accent}
                    </span>
                  </div>
                )}
              </a>
            ) : (
              <div className="relative w-full aspect-video overflow-hidden rounded-t-xl block bg-card">
                {p.video ? (
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  /* Gradient fallback */
                  <div
                    className={`w-full h-full bg-gradient-to-br ${p.gradient} flex items-center justify-center`}
                  >
                    <span className="text-white/90 font-medium text-sm text-center px-4 leading-snug">
                      {p.accent}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ── Card Body (Padding) ── */}
            <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground tracking-tight">{p.name}</h3>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    {p.github && (
                      <div className="relative inline-flex group/github">
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.name} GitHub`}
                          className="hover:text-foreground transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer p-0.5"
                        >
                          <Github className="h-[18px] w-[18px]" />
                        </a>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 text-[11px] font-medium font-sans rounded-md whitespace-nowrap pointer-events-none transition-all duration-150 ease-out z-50 opacity-0 translate-y-1 bg-zinc-800 text-zinc-100 shadow-md group-hover/github:opacity-100 group-hover/github:translate-y-0 border border-zinc-700/50">
                          View on GitHub
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
                            style={{
                              width: 0,
                              height: 0,
                              borderLeft: "4px solid transparent",
                              borderRight: "4px solid transparent",
                              borderTop: "4px solid #27272a",
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {p.globe && (
                      <div className="relative inline-flex group/globe">
                        <a
                          href={p.globe}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.name} live site`}
                          className="hover:text-foreground transition-all duration-150 hover:scale-110 active:scale-90 cursor-pointer p-0.5"
                        >
                          <Globe className="h-[18px] w-[18px]" />
                        </a>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 text-[11px] font-medium font-sans rounded-md whitespace-nowrap pointer-events-none transition-all duration-150 ease-out z-50 opacity-0 translate-y-1 bg-zinc-800 text-zinc-100 shadow-md group-hover/globe:opacity-100 group-hover/globe:translate-y-0 border border-zinc-700/50">
                          Visit Website
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
                            style={{
                              width: 0,
                              height: 0,
                              borderLeft: "4px solid transparent",
                              borderRight: "4px solid transparent",
                              borderTop: "4px solid #27272a",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {p.description}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap pt-1.5 mt-auto">
                {p.tech.map((t) => (
                  <div
                    key={t}
                    className="transition-transform duration-150 hover:scale-110 active:scale-90 cursor-pointer"
                  >
                    <TechIcon name={t} className="h-[21px] w-[21px]" />
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
