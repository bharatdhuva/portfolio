import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Home, Folder, MessageSquare } from "lucide-react";

export function FloatingDock() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    // Detect mobile / touch devices
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 640px)").matches ||
          window.matchMedia("(pointer: coarse)").matches,
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Sync active section based on scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" },
    );

    const sections = ["home", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, []);

  const dockItems = [
    {
      label: "Home",
      href: "#home",
      icon: <Home className="h-5 w-5" />,
      id: "home",
    },
    {
      label: "Projects",
      href: "#projects",
      icon: <Folder className="h-5 w-5" />,
      id: "projects",
    },
    {
      label: "Contact",
      href: "#contact",
      icon: <MessageSquare className="h-5 w-5" />,
      id: "contact",
    },
  ];

  return (
    <motion.div
      onMouseMove={(e) => {
        if (!isMobile) mouseX.set(e.clientX);
      }}
      onMouseLeave={() => {
        if (!isMobile) mouseX.set(Infinity);
      }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-3 px-4 py-3 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 shadow-lg backdrop-blur-md select-none transition-shadow duration-300 hover:shadow-xl"
    >
      {dockItems.map((item) => (
        <DockIcon
          key={item.label}
          item={item}
          mouseX={mouseX}
          isMobile={isMobile}
          isActive={activeSection === item.id}
        />
      ))}
    </motion.div>
  );
}

function DockIcon({
  item,
  mouseX,
  isMobile,
  isActive,
}: {
  item: { label: string; href: string; icon: React.ReactNode; id: string };
  mouseX: any;
  isMobile: boolean;
  isActive: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Proximity calculations (only if fine pointer / desktop)
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { left: 0, width: 0 };
    const centerX = bounds.left + bounds.width / 2;
    return val - centerX;
  });

  // Map distance to scale and y offset (macOS Dock magnification style)
  const scaleTransform = useTransform(distance, [-150, 0, 150], [1, 1.45, 1]);
  const yTransform = useTransform(distance, [-150, 0, 150], [0, -12, 0]);

  // Spring physics interpolation
  const scale = useSpring(scaleTransform, {
    stiffness: 280,
    damping: 22,
    mass: 0.8,
  });

  const y = useSpring(yTransform, {
    stiffness: 280,
    damping: 22,
    mass: 0.8,
  });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      onMouseEnter={() => {
        if (!isMobile) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!isMobile) setIsHovered(false);
      }}
      style={{
        scale: isMobile ? 1 : scale,
        y: isMobile ? 0 : y,
      }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex flex-col items-center justify-center p-3 rounded-full cursor-pointer origin-bottom transition-colors duration-200 ${
        isActive
          ? "bg-zinc-100 dark:bg-zinc-900 text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
      }`}
    >
      {item.icon}

      {/* Tiny active indicator dot below the icon */}
      {isActive && (
        <motion.div
          layoutId="activeDot"
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-zinc-800 dark:bg-zinc-200"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}

      {/* Premium Framer Motion tooltip */}
      <AnimatePresence>
        {isHovered && !isMobile && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-full mb-3.5 px-2.5 py-1.5 rounded-md bg-zinc-900 dark:bg-zinc-800 text-zinc-100 text-[10px] font-medium font-sans shadow-md border border-zinc-700/30 whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
