import { useState, useEffect } from "react";
import { GitFork, Star, Users, BookOpen } from "lucide-react";

const GITHUB_USER = "bharatdhuva";

interface GitHubData {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
}

export function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        // Fetch user profile + repos in parallel
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
        ]);

        const user = await userRes.json();
        const repos = await reposRes.json();

        // Calculate total stars
        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0)
          : 0;

        // Calculate top languages
        const langMap: Record<string, number> = {};
        if (Array.isArray(repos)) {
          repos.forEach((r: any) => {
            if (r.language && !r.fork) {
              langMap[r.language] = (langMap[r.language] || 0) + 1;
            }
          });
        }
        const topLanguages = Object.entries(langMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setData({
          publicRepos: user.public_repos || 0,
          followers: user.followers || 0,
          totalStars,
          topLanguages,
        });
      } catch (err) {
        console.error("GitHub API fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHub();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-6 py-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 w-20 bg-muted rounded" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    { icon: <BookOpen className="h-3.5 w-3.5" />, label: "Repos", value: data.publicRepos },
    { icon: <Star className="h-3.5 w-3.5" />, label: "Stars", value: data.totalStars },
    { icon: <Users className="h-3.5 w-3.5" />, label: "Followers", value: data.followers },
  ];

  return (
    <div className="flex flex-col gap-3 pt-2 pb-1">
      {/* Stats row */}
      <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
        {stats.map(({ icon, label, value }) => (
          <a
            key={label}
            href={`https://github.com/${GITHUB_USER}${label === "Followers" ? "?tab=followers" : label === "Repos" ? "?tab=repositories" : ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-muted-foreground/70 group-hover:text-foreground/80 transition-colors">
              {icon}
            </span>
            <span className="font-medium text-foreground tabular-nums">{value}</span>
            <span>{label}</span>
          </a>
        ))}
      </div>

      {/* Top languages */}
      {data.topLanguages.length > 0 && (
        <div className="flex items-center flex-wrap gap-1.5">
          {data.topLanguages.map(({ name }) => (
            <span
              key={name}
              className="inline-flex items-center gap-1 text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/50"
            >
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: langColor(name) }}
              />
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Common GitHub language colors
function langColor(lang: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Shell: "#89e051",
    Dart: "#00B4AB",
    "C++": "#f34b7d",
    C: "#555555",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Vue: "#41b883",
    Svelte: "#ff3e00",
    SCSS: "#c6538c",
    EJS: "#a91e50",
  };
  return colors[lang] || "#8b8b8b";
}
