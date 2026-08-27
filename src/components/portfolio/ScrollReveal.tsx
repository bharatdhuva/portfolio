import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  threshold?: number; // threshold of intersection
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 800,
  threshold = 0.05,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px", // Trigger slightly before full scroll viewport entry
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        filter: isIntersecting ? "blur(0px)" : "blur(4px)",
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}
