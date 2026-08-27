import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

const deviconMap: Record<string, string> = {
  JS: "javascript/javascript-original",
  JAVASCRIPT: "javascript/javascript-original",
  TS: "typescript/typescript-original",
  TYPESCRIPT: "typescript/typescript-original",
  JV: "java/java-original",
  JAVA: "java/java-original",
  "C#": "csharp/csharp-original",
  CS: "csharp/csharp-original",
  CSHARP: "csharp/csharp-original",
  RE: "react/react-original",
  REACT: "react/react-original",
  "REACT.JS": "react/react-original",
  RN: "react/react-original",
  "REACT NATIVE": "react/react-original",
  ND: "nodejs/nodejs-original",
  NODE: "nodejs/nodejs-original",
  "NODE.JS": "nodejs/nodejs-original",
  EX: "express/express-original",
  EXPRESS: "express/express-original",
  "EXPRESS.JS": "express/express-original",
  MG: "mongodb/mongodb-original",
  MONGODB: "mongodb/mongodb-original",
  FB: "firebase/firebase-plain",
  FIREBASE: "firebase/firebase-plain",
  AS: "androidstudio/androidstudio-original",
  ANDROIDSTUDIO: "androidstudio/androidstudio-original",
  MY: "mysql/mysql-original",
  MYSQL: "mysql/mysql-original",
  RD: "redis/redis-original",
  REDIS: "redis/redis-original",
  DK: "docker/docker-original",
  DOCKER: "docker/docker-original",
  K8S: "kubernetes/kubernetes-original",
  KUBERNETES: "kubernetes/kubernetes-original",
  GH: "github/github-original",
  GITHUB: "github/github-original",
  PM: "postman/postman-original",
  POSTMAN: "postman/postman-original",
  SS: "microsoftsqlserver/microsoftsqlserver-original",
  "SQL SERVER": "microsoftsqlserver/microsoftsqlserver-original",
  MICROSOFTSQLSERVER: "microsoftsqlserver/microsoftsqlserver-original",
  PY: "python/python-original",
  PYTHON: "python/python-original",
  PG: "postgresql/postgresql-original",
  POSTGRESQL: "postgresql/postgresql-original",
  GT: "git/git-original",
  GIT: "git/git-original",
  SQ: "sqlite/sqlite-original",
  SQL: "sqlite/sqlite-original",
  AN: "dotnetcore/dotnetcore-original",
  "ASP.NET CORE": "dotnetcore/dotnetcore-original",
  "ASP.NET": "dotnetcore/dotnetcore-original",
  IO: "socketio/socketio-original",
  "SOCKET.IO": "socketio/socketio-original",
  VT: "vite/vite-original",
  VITE: "vite/vite-original",
  TW: "tailwindcss/tailwindcss-original",
  TAILWIND: "tailwindcss/tailwindcss-original",
  TAILWINDCSS: "tailwindcss/tailwindcss-original",
};

const slugMap: Record<string, string> = {
  JS: "javascript",
  JAVASCRIPT: "javascript",
  TS: "typescript",
  TYPESCRIPT: "typescript",
  PY: "python",
  PYTHON: "python",
  JV: "java",
  JAVA: "java",
  SQ: "sqlite",
  SQL: "sqlite",
  "C#": "csharp",
  CS: "csharp",
  CSHARP: "csharp",
  RE: "react",
  REACT: "react",
  "REACT.JS": "react",
  RN: "react",
  "REACT NATIVE": "react",
  ND: "nodedotjs",
  NODE: "nodedotjs",
  "NODE.JS": "nodedotjs",
  EX: "express",
  EXPRESS: "express",
  "EXPRESS.JS": "express",
  AN: "dotnet",
  "ASP.NET": "dotnet",
  "ASP.NET CORE": "dotnet",
  IO: "socketdotio",
  "SOCKET.IO": "socketdotio",
  WC: "webrtc",
  WEBRTC: "webrtc",
  MG: "mongodb",
  MONGODB: "mongodb",
  FB: "firebase",
  FIREBASE: "firebase",
  AS: "androidstudio",
  ANDROIDSTUDIO: "androidstudio",
  AU: "auth0",
  AUTH: "auth0",
  PG: "postgresql",
  POSTGRESQL: "postgresql",
  MY: "mysql",
  MYSQL: "mysql",
  RD: "redis",
  REDIS: "redis",
  SS: "microsoftsqlserver",
  "SQL SERVER": "microsoftsqlserver",
  G4: "openai",
  "GPT-4": "openai",
  OPENAI: "openai",
  GQ: "groq",
  GROQ: "groq",
  GM: "gmail",
  GMAIL: "gmail",
  O2: "openid",
  "OAUTH 2.0": "openid",
  JW: "jsonwebtokens",
  JWT: "jsonwebtokens",
  GT: "git",
  GIT: "git",
  GH: "github",
  GITHUB: "github",
  DK: "docker",
  DOCKER: "docker",
  PM: "postman",
  POSTMAN: "postman",
  K8S: "kubernetes",
  KUBERNETES: "kubernetes",
  GE: "googlegemini",
  GEMINI: "googlegemini",
  VT: "vite",
  VITE: "vite",
  TW: "tailwindcss",
  TAILWIND: "tailwindcss",
  TAILWINDCSS: "tailwindcss",
};

// Dark/black brand logos from Simple Icons or Devicon that need inversion in dark mode
const darkInvertSlugs = [
  "express",
  "socketdotio",
  "socketio",
  "socketio/socketio-original",
  "webrtc",
  "jsonwebtokens",
  "github",
  "openai",
  "express/express-original",
  "github/github-original",
];

const fullNameMap: Record<string, string> = {
  JS: "JavaScript",
  JAVASCRIPT: "JavaScript",
  TS: "TypeScript",
  TYPESCRIPT: "TypeScript",
  PY: "Python",
  PYTHON: "Python",
  JV: "Java",
  JAVA: "Java",
  SQ: "SQL",
  SQL: "SQL",
  "C#": "C#",
  CS: "C#",
  CSHARP: "C#",
  RE: "React.js",
  REACT: "React.js",
  "REACT.JS": "React.js",
  RN: "React Native",
  "REACT NATIVE": "React Native",
  ND: "Node.js",
  NODE: "Node.js",
  "NODE.JS": "Node.js",
  EX: "Express.js",
  EXPRESS: "Express.js",
  "EXPRESS.JS": "Express.js",
  AN: "ASP.NET Core",
  IO: "Socket.IO",
  WC: "WebRTC",
  MG: "MongoDB",
  MONGODB: "MongoDB",
  FB: "Firebase",
  FIREBASE: "Firebase",
  AS: "Android Studio",
  ANDROIDSTUDIO: "Android Studio",
  AU: "Firebase Auth",
  AUTH: "Authentication",
  PG: "PostgreSQL",
  POSTGRESQL: "PostgreSQL",
  MY: "MySQL",
  MYSQL: "MySQL",
  RD: "Redis",
  REDIS: "Redis",
  SS: "SQL Server",
  G4: "GPT-4",
  GQ: "Groq API",
  J0: "Judge0",
  JUDGE0: "Judge0",
  GM: "Gmail API",
  O2: "OAuth 2.0",
  JW: "JWT",
  JWT: "JWT",
  GT: "Git",
  GIT: "Git",
  GH: "GitHub",
  GITHUB: "GitHub",
  DK: "Docker",
  DOCKER: "Docker",
  PM: "Postman",
  POSTMAN: "Postman",
  K8S: "Kubernetes",
  KUBERNETES: "Kubernetes",
  BQ: "Bull Queue",
  GE: "Google Gemini",
  GEMINI: "Google Gemini",
  VT: "Vite",
  VITE: "Vite",
  TW: "Tailwind CSS",
  TAILWIND: "Tailwind CSS",
  TAILWINDCSS: "Tailwind CSS",
};

interface TechIconProps {
  name: string;
  className?: string;
  showTooltip?: boolean;
}

export function TechIcon({ name, className = "h-5 w-5", showTooltip = true }: TechIconProps) {
  const norm = name.trim().toUpperCase();
  const fullName = fullNameMap[norm] || name;

  let iconNode;

  // Try Devicon CDN first for high-quality, multi-colored original SVGs
  const deviconPath = deviconMap[norm];
  if (deviconPath) {
    const isInverted = darkInvertSlugs.includes(deviconPath);
    iconNode = (
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconPath}.svg`}
        alt={name}
        className={`${className} ${isInverted ? "dark-invert" : ""}`}
        loading="lazy"
      />
    );
  } else {
    // Fallback to Simple Icons CDN for other standard technologies
    const slug = slugMap[norm];
    if (slug) {
      const isInverted = darkInvertSlugs.includes(slug);

      // JS has a yellow square with transparent 'JS' text. Adding bg-black makes the letters show up black.
      // TS has a blue square with transparent 'TS' text. Adding bg-white makes the letters show up white.
      let bgStyle = "";
      if (slug === "javascript") {
        bgStyle = "bg-black rounded-[4px]";
      } else if (slug === "typescript") {
        bgStyle = "bg-white rounded-[4px]";
      }

      if (slug === "openai") {
        iconNode = (
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/openai.svg"
            alt={name}
            className={`${className} dark-invert`}
            loading="lazy"
          />
        );
      } else {
        iconNode = (
          <img
            src={`https://cdn.simpleicons.org/${slug}`}
            alt={name}
            className={`${className} ${isInverted ? "dark-invert" : ""} ${bgStyle}`}
            loading="lazy"
          />
        );
      }
    } else if (norm === "J0" || norm === "JUDGE0") {
      // Fallbacks for custom integrations
      iconNode = (
        <svg
          role="img"
          viewBox="0 0 24 24"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 2h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm2 6v8l4-4zm6 5.5l1-1h6v1zm0-3h7v1h-7zm0-3h7v1h-7z"
            fill="#607D8B"
          />
        </svg>
      );
    } else if (norm === "BQ" || norm === "BULL QUEUE" || norm === "BULL") {
      iconNode = (
        <svg
          role="img"
          viewBox="0 0 24 24"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H7v-2h6v2zm4-4H7v-2h10v2zm0-4H7V6h10v2z"
            fill="#6A7B83"
          />
        </svg>
      );
    } else {
      // Text fallback
      iconNode = (
        <span className="text-[10px] font-bold text-muted-foreground tracking-tighter">
          {name.slice(0, 2).toUpperCase()}
        </span>
      );
    }
  }

  if (!showTooltip) {
    return iconNode;
  }

  return (
    <div className="relative group/icon inline-flex items-center justify-center">
      {iconNode}

      {/* Animated Dark Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[11px] font-medium font-sans rounded bg-zinc-900 dark:bg-zinc-800 text-zinc-100 shadow-md opacity-0 translate-y-1 pointer-events-none transition-all duration-150 ease-out z-50 group-hover/icon:opacity-100 group-hover/icon:translate-y-0 border border-zinc-800 dark:border-zinc-700/50 whitespace-nowrap">
        {fullName}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-zinc-900 dark:border-t-zinc-800" />
      </div>
    </div>
  );
}
