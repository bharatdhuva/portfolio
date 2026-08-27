import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Shade = 0 | 1 | 2 | 3 | 4;

interface ContributionDay {
  date: string;
  count: number;
  level: Shade;
}

interface ContributionsData {
  totalContributions: number;
  days: ContributionDay[];
}

const shades = ["bg-contrib-0", "bg-contrib-1", "bg-contrib-2", "bg-contrib-3", "bg-contrib-4"];

// Seeded pseudo-random for stable fallback output
function rand(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

function shadeFor(i: number): Shade {
  const r = rand(i);
  if (r < 0.55) return 0;
  if (r < 0.75) return 1;
  if (r < 0.88) return 2;
  if (r < 0.96) return 3;
  return 4;
}

const fallbackDays: ContributionDay[] = [];
for (let i = 0; i < 52 * 7; i++) {
  const shade = shadeFor(i);
  const startDate = new Date(2025, 5, 1); // June 1, 2025
  startDate.setDate(startDate.getDate() + i);
  const dateStr = startDate.toISOString().split("T")[0]; // YYYY-MM-DD

  let count = 0;
  if (shade === 1) count = 1 + Math.floor(rand(i) * 5);
  else if (shade === 2) count = 6 + Math.floor(rand(i) * 5);
  else if (shade === 3) count = 11 + Math.floor(rand(i) * 5);
  else if (shade === 4) count = 16 + Math.floor(rand(i) * 10);

  fallbackDays.push({
    date: dateStr,
    count,
    level: shade,
  });
}
const fallbackTotalContributions = fallbackDays.reduce((a, b) => a + b.count, 0);

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function ContributionHeatmap() {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        // Step 1: Try fetching from local/Vercel serverless proxy first
        const response = await fetch("/api/github-contributions");
        if (!response.ok) {
          throw new Error(`Proxy API returned status ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.warn("Local/Proxy API failed, attempting to fetch from public scraper API:", err);
        try {
          // Step 2: Fallback to public contributions scraper API (enables dev mode & zero-token client preview)
          const response = await fetch(
            "https://github-contributions-api.jogruber.de/v4/bharatdhuva?y=last",
          );
          if (!response.ok) {
            throw new Error(`Scraper API returned status ${response.status}`);
          }
          const json = await response.json();
          const totalContributions = json.contributions.reduce(
            (sum: number, day: any) => sum + (day.count || 0),
            0,
          );

          setData({
            totalContributions,
            days: json.contributions.map((day: any) => ({
              date: day.date,
              count: day.count || 0,
              level: (day.level ?? 0) as Shade,
            })),
          });
        } catch (scraperErr) {
          console.error(
            "All contribution APIs failed. Falling back to local mock data:",
            scraperErr,
          );
          // Step 3: Local mock fallback (safe recovery)
          setData({
            totalContributions: fallbackTotalContributions,
            days: fallbackDays,
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  useEffect(() => {
    if (!loading && scrollRef.current) {
      // Scroll to the right end on mount so most recent activity shows first on mobile
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading]);

  if (loading) {
    return (
      <section className="py-8">
        <style>{`
          .bg-contrib-skeleton {
            background-color: #ebedf0;
            --skeleton-bg: #ebedf0;
            --snake-color: #216e39;
          }
          .dark .bg-contrib-skeleton {
            background-color: #161b22;
            --skeleton-bg: #161b22;
            --snake-color: #39d353;
          }

          @keyframes snakeShimmer {
            0% {
              background-color: var(--skeleton-bg);
            }
            3% {
              background-color: var(--snake-color);
              box-shadow: 0 0 6px var(--snake-color);
            }
            12%, 100% {
              background-color: var(--skeleton-bg);
            }
          }

          .animate-snake {
            animation-name: snakeShimmer;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }
        `}</style>

        <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-800 rounded mb-4 animate-pulse" />
        <div className="overflow-x-auto scrollbar-none border border-border/40 rounded-lg p-4 bg-muted/20 dark:bg-zinc-950/40">
          <div className="min-w-[760px] pr-2">
            <div className="flex gap-3">
              <div className="w-[28px]" /> {/* Weekday spacing */}
              <div className="flex-1">
                <div className="grid gap-[3px] mb-2 text-[10px] h-3" />
                <div
                  className="grid gap-[3px]"
                  style={{
                    gridTemplateColumns: "repeat(53, 13px)",
                    gridTemplateRows: "repeat(7, 13px)",
                    gridAutoFlow: "column",
                  }}
                >
                  {Array.from({ length: 53 * 7 }).map((_, i) => {
                    const col = Math.floor(i / 7);
                    const row = i % 7;
                    const snakeIndex = col % 2 === 0 ? col * 7 + row : col * 7 + (6 - row);
                    const delay = snakeIndex * 12; // 12ms delay per cell
                    return (
                      <div
                        key={i}
                        className="h-[13px] w-[13px] rounded-[2px] bg-contrib-skeleton animate-snake"
                        style={{
                          animationDelay: `${delay}ms`,
                          animationDuration: "4.45s",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 text-[10px] tracking-[0.15em] text-muted-foreground">
          <div className="h-3.5 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-3.5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      </section>
    );
  }

  if (!data) return null;

  const totalDays = data.days.length;
  const totalWeeks = Math.ceil(totalDays / 7);

  const monthLabels: { colIndex: number; label: string }[] = [];
  let lastMonth = "";
  for (let c = 0; c < totalWeeks; c++) {
    const dayIndex = c * 7;
    if (dayIndex < data.days.length) {
      const dateStr = data.days[dayIndex].date;
      const d = new Date(dateStr + "T00:00:00");
      const m = d.toLocaleDateString("en-US", { month: "short" });
      if (m !== lastMonth) {
        monthLabels.push({ colIndex: c, label: m });
        lastMonth = m;
      }
    }
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    const month = d.toLocaleDateString("en-US", { month: "long" });
    const day = d.getDate();
    return `${month} ${day}${getOrdinalSuffix(day)}`;
  };

  return (
    <section className="py-8">
      {/* GitHub Official Contribution Theme Colors */}
      <style>{`
        .bg-contrib-0 { background-color: #ebedf0; }
        .bg-contrib-1 { background-color: #9be9a8; }
        .bg-contrib-2 { background-color: #40c463; }
        .bg-contrib-3 { background-color: #30a14e; }
        .bg-contrib-4 { background-color: #216e39; }

        .dark .bg-contrib-0 { background-color: #161b22; }
        .dark .bg-contrib-1 { background-color: #0e4429; }
        .dark .bg-contrib-2 { background-color: #006d32; }
        .dark .bg-contrib-3 { background-color: #26a641; }
        .dark .bg-contrib-4 { background-color: #39d353; }
      `}</style>

      {/* Header aligned like GitHub: "302 contributions in the last year" */}
      <div className="mb-3 text-sm font-normal text-foreground select-none">
        {data.totalContributions.toLocaleString()} contributions in the last year
      </div>

      {/* Main Heatmap Container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-none border border-border/40 rounded-lg p-4 bg-muted/20 dark:bg-zinc-950/40"
      >
        <div className="min-w-[760px] pr-2">
          <div className="flex gap-3 items-stretch">
            {/* Weekdays Row Labels (aligned to rows) */}
            <div className="flex flex-col justify-end pb-[2px]">
              <div
                className="grid gap-[3px] text-[9px] font-medium text-[#737373] dark:text-[#a0a0a0] select-none"
                style={{
                  gridTemplateRows: "repeat(7, 13px)",
                  height: "calc(7 * 13px + 6 * 3px)",
                }}
              >
                <div className="flex items-center h-[13px] leading-none"></div> {/* Sun */}
                <div className="flex items-center h-[13px] leading-none pr-2">Mon</div> {/* Mon */}
                <div className="flex items-center h-[13px] leading-none"></div> {/* Tue */}
                <div className="flex items-center h-[13px] leading-none pr-2">Wed</div> {/* Wed */}
                <div className="flex items-center h-[13px] leading-none"></div> {/* Thu */}
                <div className="flex items-center h-[13px] leading-none pr-2">Fri</div> {/* Fri */}
                <div className="flex items-center h-[13px] leading-none"></div> {/* Sat */}
              </div>
            </div>

            {/* Heatmap Grid + Month Labels Column */}
            <div className="flex-1">
              {/* Month Labels aligned to grid columns */}
              <div
                className="grid gap-[3px] mb-2 text-[10px] text-muted-foreground select-none"
                style={{
                  gridTemplateColumns: `repeat(${totalWeeks}, 13px)`,
                }}
              >
                {monthLabels.map(({ colIndex, label }, idx) => (
                  <div
                    key={`${label}-${idx}`}
                    style={{
                      gridColumnStart: colIndex + 1,
                      gridColumnEnd: "span 4",
                    }}
                    className="text-left font-normal text-[9px] text-[#737373] dark:text-[#a0a0a0]"
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Heatmap Grid wrapper in TooltipProvider to support portaled radix tooltips */}
              <TooltipProvider delayDuration={0}>
                <div
                  className="grid gap-[3px]"
                  style={{
                    gridTemplateColumns: `repeat(${totalWeeks}, 13px)`,
                    gridTemplateRows: "repeat(7, 13px)",
                    gridAutoFlow: "column",
                  }}
                >
                  {data.days.map((cell, i) => {
                    const countText = cell.count === 0 ? "No" : cell.count;
                    const contributionText = cell.count === 1 ? "contribution" : "contributions";
                    return (
                      <Tooltip key={i} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div
                            className={`h-[13px] w-[13px] rounded-[2px] ${shades[cell.level]} cursor-pointer`}
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-zinc-950 dark:bg-zinc-900 text-zinc-100 text-[10px] font-mono py-1.5 px-3 rounded shadow-lg border border-zinc-700/50"
                        >
                          {countText} {contributionText} on {formatDate(cell.date)}.
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          </div>

          {/* Bottom Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] tracking-[0.15em] text-muted-foreground select-none">
            <span>LESS</span>
            {shades.map((s, i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-[2px] ${s}`} />
            ))}
            <span>MORE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
