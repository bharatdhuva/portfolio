import React from "react";

interface MarqueeBannerProps {
  updates: string[];
}

export function MarqueeBanner({ updates }: MarqueeBannerProps) {
  if (!updates || updates.length === 0) return null;

  // Join updates with a clean divider
  const contentString = updates.join("   •   ") + "   •   ";

  return (
    <div className="w-full overflow-hidden py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10 shadow-md flex items-center px-4 pointer-events-auto select-none">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 40s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="flex flex-col gap-0.5 w-full text-[11px] sm:text-xs text-gray-400/70 font-mono tracking-tight">
        {/* Line 1 */}
        <div className="flex w-max relative overflow-hidden">
          <div className="flex animate-marquee-scroll whitespace-nowrap">
            <span className="pr-12">{contentString}</span>
            <span className="pr-12">{contentString}</span>
          </div>
        </div>
        {/* Line 2 */}
        <div className="flex w-max relative overflow-hidden">
          <div className="flex animate-marquee-scroll whitespace-nowrap">
            <span className="pr-12">{contentString}</span>
            <span className="pr-12">{contentString}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
