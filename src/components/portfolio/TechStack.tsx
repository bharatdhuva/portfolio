import { useEffect, useRef, useState } from "react";
import { TechIcon } from "./TechIcon";

const techs = [
  // Web & Frameworks
  { name: "JS", fullName: "JavaScript" },
  { name: "TS", fullName: "TypeScript" },
  { name: "Re", fullName: "React.js" },
  { name: "Nd", fullName: "Node.js" },
  { name: "Ex", fullName: "Express.js" },
  { name: "AN", fullName: "ASP.NET Core" },
  { name: "IO", fullName: "Socket.IO" },
  { name: "WC", fullName: "WebRTC" },

  // Languages
  { name: "Jv", fullName: "Java" },
  { name: "Cs", fullName: "C#" },
  { name: "Py", fullName: "Python" },
  { name: "Sq", fullName: "SQL" },

  // Databases
  { name: "Mg", fullName: "MongoDB" },
  { name: "Pg", fullName: "PostgreSQL" },
  { name: "My", fullName: "MySQL" },
  { name: "Rd", fullName: "Redis" },
  { name: "SS", fullName: "SQL Server" },

  // AI & APIs
  { name: "GE", fullName: "Google Gemini" },
  { name: "J0", fullName: "Judge0" },
  { name: "GM", fullName: "Gmail API" },
  { name: "O2", fullName: "OAuth 2.0" },
  { name: "JW", fullName: "JWT" },

  // DevOps & Tools
  { name: "GT", fullName: "Git" },
  { name: "Gh", fullName: "GitHub" },
  { name: "Dk", fullName: "Docker" },
  { name: "K8s", fullName: "Kubernetes" },
  { name: "Pm", fullName: "Postman" },
  { name: "BQ", fullName: "Bull Queue" },
];

// Duplicate the array three times to guarantee an unbroken marquee layout.
const marqueeItems = [...techs, ...techs, ...techs];

export function TechStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const speedRef = useRef(0.6); // Current speed in px/frame
  const targetSpeedRef = useRef(0.6); // Target speed in px/frame
  const offsetRef = useRef(0); // Scroll offset in px

  useEffect(() => {
    // Smooth transition: target speed is 0 on hover, 0.6 when active
    targetSpeedRef.current = isHovered ? 0 : 0.6;
  }, [isHovered]);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      // Lerp (Linear Interpolation) for deceleration and acceleration easing
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;

      // Update running offset
      offsetRef.current += speedRef.current;

      const track = trackRef.current;
      if (track) {
        const singleSetWidth = track.scrollWidth / 3;

        // Wrap around seamlessly
        if (offsetRef.current >= singleSetWidth) {
          offsetRef.current -= singleSetWidth;
        }

        const tx = -singleSetWidth + offsetRef.current;
        track.style.transform = `translate3d(${tx}px, 0, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section id="about" className="py-10">
      <h2 className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground mb-5 font-mono">
        TECH STACK
      </h2>
      <div className="marquee-mask pt-10 pb-2 -mt-8 select-none">
        <div
          ref={trackRef}
          className="marquee-track cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {marqueeItems.map((t, i) => (
            <div
              key={i}
              className="transition-transform duration-200 hover:scale-115 shrink-0 flex items-center justify-center p-1"
              title={t.fullName}
            >
              <TechIcon name={t.name} className="h-8 w-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
