import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  FolderCode,
  FileText,
  Mail,
  Sun,
  Moon,
  ExternalLink,
  Copy,
  Home,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface CommandMenuProps {
  dark?: boolean;
  onToggleTheme?: () => void;
}

export function CommandMenu({ dark, onToggleTheme }: CommandMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-menu", handleCustomOpen);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-menu", handleCustomOpen);
    };
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    setOpen(false);
    navigator.clipboard.writeText("bharatdhuva27@gmail.com");
    toast.success("Email copied to clipboard!", {
      description: "bharatdhuva27@gmail.com",
    });
  };

  const openUrl = (url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search (e.g. React, Outly, Resume)..." />
      <CommandList className="max-h-[350px]">
        <CommandEmpty>No results found.</CommandEmpty>

        {/* ── Quick Actions ── */}
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={copyEmail} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4 text-emerald-500" />
            <span>Copy Email Address</span>
            <span className="ml-auto text-[11px] font-mono text-muted-foreground">
              bharatdhuva27@gmail.com
            </span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              openUrl(
                "https://drive.google.com/file/d/1qTF5HyDgOvAyPveGfaQxihhaS1gzjlgb/view?usp=sharing",
              )
            }
            className="cursor-pointer"
          >
            <FileText className="mr-2 h-4 w-4 text-amber-500" />
            <span>View Resume (PDF)</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
          </CommandItem>

          <CommandItem
            onSelect={() => {
              setOpen(false);
              if (onToggleTheme) {
                onToggleTheme();
              } else {
                const nextDark = !document.documentElement.classList.contains("dark");
                document.documentElement.classList.toggle("dark", nextDark);
                localStorage.setItem("theme", nextDark ? "dark" : "light");
              }
            }}
            className="cursor-pointer"
          >
            {dark ? (
              <Sun className="mr-2 h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="mr-2 h-4 w-4 text-indigo-400" />
            )}
            <span>Toggle Theme</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* ── Featured Projects ── */}
        <CommandGroup heading="Projects & Works">
          <CommandItem
            onSelect={() => openUrl("https://outly.online")}
            className="cursor-pointer"
          >
            <Sparkles className="mr-2 h-4 w-4 text-orange-500" />
            <div className="flex flex-col">
              <span className="font-medium">Outly — AI Job Search Platform</span>
              <span className="text-[11px] text-muted-foreground">
                React, TypeScript, Node.js, Express, MongoDB, Gemini AI
              </span>
            </div>
            <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">
              Live Demo
            </span>
          </CommandItem>

          <CommandItem
            onSelect={() => openUrl("https://interviewos-bharatdhuva.vercel.app/")}
            className="cursor-pointer"
          >
            <FolderCode className="mr-2 h-4 w-4 text-purple-500" />
            <div className="flex flex-col">
              <span className="font-medium">InterviewOS — Collaborative Interview Platform</span>
              <span className="text-[11px] text-muted-foreground">
                WebRTC, Y.js, Sandboxed Code Execution, Socket.io
              </span>
            </div>
            <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">
              Live Demo
            </span>
          </CommandItem>

          <CommandItem
            onSelect={() => openUrl("https://bookstage.vercel.app")}
            className="cursor-pointer"
          >
            <FolderCode className="mr-2 h-4 w-4 text-blue-500" />
            <div className="flex flex-col">
              <span className="font-medium">Bookstage — Event Booking Engine</span>
              <span className="text-[11px] text-muted-foreground">
                ASP.NET Core, React, PostgreSQL, Docker, Concurrency-Safe
              </span>
            </div>
            <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">
              Live Demo
            </span>
          </CommandItem>

          <CommandItem
            onSelect={() => openUrl("https://khetse-fresh.vercel.app/")}
            className="cursor-pointer"
          >
            <FolderCode className="mr-2 h-4 w-4 text-emerald-500" />
            <div className="flex flex-col">
              <span className="font-medium">Khetse — Farm-to-Home Fresh Produce</span>
              <span className="text-[11px] text-muted-foreground">
                React, Tailwind CSS, Firebase Auth, Real-Time Tracking
              </span>
            </div>
            <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">
              Live Demo
            </span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* ── Navigation ── */}
        <CommandGroup heading="Jump to Section">
          <CommandItem onSelect={() => scrollTo("home")} className="cursor-pointer">
            <Home className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("projects")} className="cursor-pointer">
            <FolderCode className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Featured Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("experience")} className="cursor-pointer">
            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Work Experience</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("education")} className="cursor-pointer">
            <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Education</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("contact")} className="cursor-pointer">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Contact</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("keyboard")} className="cursor-pointer">
            <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Leave a Message</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* ── Social Profiles ── */}
        <CommandGroup heading="Socials & Profiles">
          <CommandItem
            onSelect={() => openUrl("https://github.com/bharatdhuva")}
            className="cursor-pointer"
          >
            <span className="mr-2 text-sm">🐙</span>
            <span>GitHub Profile (github.com/bharatdhuva)</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
          </CommandItem>
          <CommandItem
            onSelect={() => openUrl("https://linkedin.com/in/bharatdhuva27")}
            className="cursor-pointer"
          >
            <span className="mr-2 text-sm">💼</span>
            <span>LinkedIn Profile (in/bharatdhuva27)</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
          </CommandItem>
          <CommandItem
            onSelect={() => openUrl("https://x.com/mrcrotes")}
            className="cursor-pointer"
          >
            <span className="mr-2 text-sm">𝕏</span>
            <span>X / Twitter (@mrcrotes)</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
