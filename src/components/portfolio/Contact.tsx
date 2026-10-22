import { Mail, ArrowUpRight, Clock, Check, Server, Code, Terminal, BookOpen } from "lucide-react";

interface ContactOption {
  icon: (className: string) => React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  download?: boolean | string;
}

const options: ContactOption[] = [
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
    title: "Connect on LinkedIn",
    subtitle: "linkedin.com/in/bharatdhuva27",
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
    title: "Follow on X",
    subtitle: "x.com/mrcrotes",
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
    title: "Follow on GitHub",
    subtitle: "github.com/bharatdhuva",
    href: "https://github.com/bharatdhuva",
  },
  {
    icon: (className: string) => <Mail className={`${className} text-muted-foreground`} />,
    title: "bharatdhuva27@gmail.com",
    subtitle: "Quick inquiries & questions",
    href: "mailto:bharatdhuva27@gmail.com",
  },
];

function LearningBoard() {
  const learningItems = [
    {
      icon: Code,
      title: "Data Structures & Algorithms",
      desc: "Solving complex computational problems and optimizing time/space complexity. Guided by Kunal Kushwaha's structured DSA roadmap.",
      tags: ["DSA", "JAVA", "Kunal Kushwaha", "LeetCode"],
      status: "Daily Practice",
      statusColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      icon: Server,
      title: "Backend Development",
      desc: "Designing scalable microservices, API architecture, database indexing, and caching. Guided by Hitesh Choudhary's Chai aur Code bootcamps.",
      tags: ["Chai aur Code", "Node.js", "Redis", "MongoDB"],
      status: "Deep Dive",
      statusColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      icon: Terminal,
      title: "DevOps & Cloud Computing",
      desc: "Automating deployment pipelines, managing container orchestration, and learning cloud computing. Guided by TechWorld with Nana & KodeKloud.",
      tags: ["TechWorld with Nana", "Docker", "K8s", "AWS"],
      status: "Hands-on",
      statusColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
  ];

  return (
    <div className="rounded-lg border border-border p-5 flex flex-col justify-between h-full min-h-0 md:min-h-[440px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-border pb-3 select-none">
          <div>
            <h3 className="text-base font-medium text-foreground">Currently Learning & Building</h3>
            <p className="text-[11px] text-muted-foreground">Exploring new tech & core concepts</p>
          </div>
        </div>

        {/* Learning Items */}
        <div className="space-y-4">
          {learningItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-3 rounded-md border border-border/60 bg-muted/20 flex flex-col gap-2 transition-all duration-200 hover:border-foreground/10"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-muted-foreground/10 text-foreground/80 shrink-0">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-foreground leading-none">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full border text-[9px] font-medium leading-none ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-5 border-t border-border pt-4 select-none">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5 text-foreground/75 shrink-0" />
          <span>
            Currently reading:{" "}
            <strong className="text-foreground font-medium">
              Designing Data-Intensive Applications
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-12">
      <h2 className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground mb-6 font-mono">
        LET'S WORK TOGETHER
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side: Contact Options */}
        <div className="rounded-lg border border-border p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-medium text-foreground mb-1">Get in Touch</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Choose your preferred method to connect and let's discuss your project.
            </p>
            <div className="space-y-2">
              {options.map(({ icon: renderIcon, title, subtitle, href, download }) => (
                <a
                  key={title}
                  href={href}
                  download={download}
                  target={download ? undefined : href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-muted transition-all duration-150 group hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  {renderIcon("h-[18px] w-[18px] flex-shrink-0")}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground break-all">{title}</div>
                    <div className="text-xs text-muted-foreground break-words">{subtitle}</div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-5 space-y-1.5 text-xs text-muted-foreground border-t border-border pt-4">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Replies within 24 hours
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3 w-3" /> Open to remote, freelance & Full-time
            </div>
          </div>
        </div>

        {/* Right Side: Learning Board */}
        <LearningBoard />
      </div>
    </section>
  );
}
