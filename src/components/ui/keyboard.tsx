"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const NEON_COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#84cc16", // lime
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#d946ef", // fuchsia
  "#ec4899", // pink
];

const getRandomColor = () => NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];

export const Component = () => {
  const [activeKeys, setActiveKeys] = useState<Record<string, string>>({});
  const [capsLock, setCapsLock] = useState(false);
  const [shift, setShift] = useState(false);
  const [numLock, setNumLock] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(680);

  // Track parent container width reactively to fit perfectly
  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial width
    setContainerWidth(containerRef.current.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyName = e.key;

      // Select a random color for the key press if it isn't already active
      setActiveKeys((prev) => {
        if (prev[keyName]) return prev;
        return { ...prev, [keyName]: getRandomColor() };
      });

      if (e.key === "CapsLock") setCapsLock((prev) => !prev);
      if (e.key === "Shift") setShift(true);
      if (e.key === "NumLock") setNumLock((prev) => !prev);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keyName = e.key;
      setActiveKeys((prev) => {
        const next = { ...prev };
        delete next[keyName];
        return next;
      });

      if (e.key === "Shift") setShift(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleKeyPress = (key: string) => {
    // Generate static random color for click duration
    const color = getRandomColor();
    setActiveKeys((prev) => ({ ...prev, [key]: color }));

    setTimeout(() => {
      setActiveKeys((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, 150);

    if (key === "CapsLock") {
      setCapsLock(!capsLock);
    } else if (key === "Shift") {
      setShift(!shift);
    } else if (key === "NumLock") {
      setNumLock(!numLock);
    } else {
      if (shift) setShift(false);
    }
  };

  const getKeyDisplay = (key: string, shiftSymbol?: string) => {
    if (key.length === 1 && key.match(/[a-z]/)) {
      return capsLock || shift ? key.toUpperCase() : key;
    }
    return shift && shiftSymbol ? shiftSymbol : key;
  };

  const KeyButton = ({
    children,
    subLabel,
    className = "",
    variant = "outline" as const,
    onClick,
    isPressed = false,
    pressedColor,
    isActive = false,
    size = "default",
  }: {
    children: React.ReactNode;
    subLabel?: React.ReactNode;
    className?: string;
    variant?: "outline" | "secondary" | "default";
    onClick?: () => void;
    isPressed?: boolean;
    pressedColor?: string;
    isActive?: boolean;
    size?: "sm" | "default" | "lg" | "xl";
  }) => {
    const sizeClasses = {
      sm: "h-9 w-9 text-[10px] px-0",
      default: "h-11 w-[43px] text-xs px-0",
      lg: "h-11 w-16 text-xs px-0",
      xl: "h-11 w-20 text-xs px-0",
    };

    // Dynamic style when key is active/pressed
    const activeStyle = pressedColor
      ? {
          borderColor: pressedColor,
          color: pressedColor,
          boxShadow: `0 0 12px ${pressedColor}88, 0 0 20px ${pressedColor}44, inset 0 0 6px ${pressedColor}33`,
          transform: "translateY(2px) scale(0.96)",
        }
      : undefined;

    return (
      <Button
        variant={isActive ? "default" : variant}
        onClick={onClick}
        style={activeStyle}
        className={`
          ${sizeClasses[size]}
          relative flex flex-col items-center justify-center font-mono font-medium transition-all duration-100 select-none cursor-pointer px-0 rounded-lg text-xs
          bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100
          border border-zinc-300/80 dark:border-zinc-700/80
          ${
            !pressedColor
              ? "shadow-[0_3px_0_0_#d4d4d8,0_4px_6px_-1px_rgba(0,0,0,0.08)] dark:shadow-[0_3px_0_0_#18181b,0_4px_6px_-1px_rgba(0,0,0,0.5)] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#d4d4d8] dark:hover:shadow-[0_2px_0_0_#18181b] active:translate-y-[2px] active:shadow-none"
              : ""
          }
          ${className}
        `}
      >
        {subLabel && (
          <span className="text-zinc-400 dark:text-zinc-500 absolute top-1 left-1.5 text-[0.55rem] font-semibold opacity-90 leading-none">
            {subLabel}
          </span>
        )}
        <span className={`${subLabel ? "pt-1" : ""} font-semibold text-[11px] sm:text-xs`}>{children}</span>
      </Button>
    );
  };

  const numberRow = [
    { key: "`", shiftSymbol: "~" },
    { key: "1", shiftSymbol: "!" },
    { key: "2", shiftSymbol: "@" },
    { key: "3", shiftSymbol: "#" },
    { key: "4", shiftSymbol: "$" },
    { key: "5", shiftSymbol: "%" },
    { key: "6", shiftSymbol: "^" },
    { key: "7", shiftSymbol: "&" },
    { key: "8", shiftSymbol: "*" },
    { key: "9", shiftSymbol: "(" },
    { key: "0", shiftSymbol: ")" },
    { key: "-", shiftSymbol: "_" },
    { key: "=", shiftSymbol: "+" },
  ];

  const topRow = [
    { key: "q" },
    { key: "w" },
    { key: "e" },
    { key: "r" },
    { key: "t" },
    { key: "y" },
    { key: "u" },
    { key: "i" },
    { key: "o" },
    { key: "p" },
    { key: "[", shiftSymbol: "{" },
    { key: "]", shiftSymbol: "}" },
    { key: "\\", shiftSymbol: "|" },
  ];

  const middleRow = [
    { key: "a" },
    { key: "s" },
    { key: "d" },
    { key: "f" },
    { key: "g" },
    { key: "h" },
    { key: "j" },
    { key: "k" },
    { key: "l" },
    { key: ";", shiftSymbol: ":" },
    { key: "'", shiftSymbol: '"' },
  ];

  const bottomRow = [
    { key: "z" },
    { key: "x" },
    { key: "c" },
    { key: "v" },
    { key: "b" },
    { key: "n" },
    { key: "m" },
    { key: ",", shiftSymbol: "<" },
    { key: ".", shiftSymbol: ">" },
    { key: "/", shiftSymbol: "?" },
  ];

  const baseWidth = 672;
  const baseHeight = 250;

  // Calculate scale based on the actual container width instead of window width
  const scale = Math.min(1, containerWidth / baseWidth);

  return (
    <div
      ref={containerRef}
      className="flex justify-center w-full select-none py-1 overflow-visible"
    >
      {/* Outer Wrapper with scaled layout footprint */}
      <div
        style={{
          width: `${scale * baseWidth}px`,
          height: `${scale * baseHeight}px`,
        }}
        className="relative flex-shrink-0 overflow-visible"
      >
        {/* Inner Scaled Container */}
        <div
          style={{
            width: `${baseWidth}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="absolute top-0 left-0 flex flex-col gap-1.5 px-0 py-1"
        >
          {/* Number Row */}
          <div className="flex justify-between gap-1">
            {numberRow.map((item) => (
              <KeyButton
                key={item.key}
                onClick={() => handleKeyPress(item.key)}
                isPressed={!!activeKeys[item.key]}
                pressedColor={activeKeys[item.key]}
                subLabel={item.shiftSymbol}
              >
                {getKeyDisplay(item.key, item.shiftSymbol)}
              </KeyButton>
            ))}
            <KeyButton
              onClick={() => handleKeyPress("Backspace")}
              isPressed={!!activeKeys["Backspace"]}
              pressedColor={activeKeys["Backspace"]}
              className="w-[61px]"
            >
              ⌫
            </KeyButton>
          </div>

          {/* Top Row */}
          <div className="flex justify-between gap-1">
            <KeyButton
              className="w-[61px]"
              onClick={() => handleKeyPress("Tab")}
              isPressed={!!activeKeys["Tab"]}
              pressedColor={activeKeys["Tab"]}
            >
              Tab
            </KeyButton>
            {topRow.map((item) => (
              <KeyButton
                key={item.key}
                onClick={() => handleKeyPress(item.key)}
                isPressed={!!activeKeys[item.key]}
                pressedColor={activeKeys[item.key]}
                subLabel={item.shiftSymbol}
              >
                {getKeyDisplay(item.key, item.shiftSymbol)}
              </KeyButton>
            ))}
          </div>

          {/* Middle Row */}
          <div className="flex justify-between gap-1">
            <KeyButton
              className="w-[75px]"
              onClick={() => handleKeyPress("CapsLock")}
              isPressed={!!activeKeys["CapsLock"]}
              pressedColor={activeKeys["CapsLock"]}
              isActive={capsLock}
            >
              Caps
            </KeyButton>
            {middleRow.map((item) => (
              <KeyButton
                key={item.key}
                onClick={() => handleKeyPress(item.key)}
                isPressed={!!activeKeys[item.key]}
                pressedColor={activeKeys[item.key]}
                subLabel={item.shiftSymbol}
              >
                {getKeyDisplay(item.key, item.shiftSymbol)}
              </KeyButton>
            ))}
            <KeyButton
              className="w-[76px]"
              onClick={() => handleKeyPress("Enter")}
              isPressed={!!activeKeys["Enter"]}
              pressedColor={activeKeys["Enter"]}
            >
              Enter
            </KeyButton>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between gap-1">
            <KeyButton
              className="w-[99px]"
              onClick={() => handleKeyPress("Shift")}
              isPressed={!!activeKeys["Shift"]}
              pressedColor={activeKeys["Shift"]}
              isActive={shift}
            >
              Shift
            </KeyButton>
            {bottomRow.map((item) => (
              <KeyButton
                key={item.key}
                onClick={() => handleKeyPress(item.key)}
                isPressed={!!activeKeys[item.key]}
                pressedColor={activeKeys[item.key]}
                subLabel={item.shiftSymbol}
              >
                {getKeyDisplay(item.key, item.shiftSymbol)}
              </KeyButton>
            ))}
            <KeyButton
              className="w-[99px]"
              onClick={() => handleKeyPress("Shift")}
              isPressed={!!activeKeys["Shift"]}
              pressedColor={activeKeys["Shift"]}
              isActive={shift}
            >
              Shift
            </KeyButton>
          </div>

          {/* Space Row */}
          <div className="flex justify-between gap-1">
            <KeyButton
              className="w-[59px]"
              onClick={() => handleKeyPress("Control")}
              isPressed={!!activeKeys["Control"]}
              pressedColor={activeKeys["Control"]}
            >
              Ctrl
            </KeyButton>
            <KeyButton
              className="w-[59px]"
              onClick={() => handleKeyPress("Meta")}
              isPressed={!!activeKeys["Meta"]}
              pressedColor={activeKeys["Meta"]}
            >
              <svg className="w-3.5 h-3.5 fill-current opacity-90" viewBox="0 0 16 16">
                <path d="M0 0h7.2v7.2H0V0zm8.8 0H16v7.2H8.8V0zM0 8.8h7.2V16H0V8.8zm8.8 0H16V16H8.8V8.8z"/>
              </svg>
            </KeyButton>
            <KeyButton
              className="w-[59px]"
              onClick={() => handleKeyPress("Alt")}
              isPressed={!!activeKeys["Alt"]}
              pressedColor={activeKeys["Alt"]}
            >
              Alt
            </KeyButton>
            <KeyButton
              className="w-[294px]"
              onClick={() => handleKeyPress(" ")}
              isPressed={!!activeKeys[" "]}
              pressedColor={activeKeys[" "]}
            >
              {" "}
            </KeyButton>
            <KeyButton
              className="w-[59px]"
              onClick={() => handleKeyPress("Alt")}
              isPressed={!!activeKeys["Alt"]}
              pressedColor={activeKeys["Alt"]}
            >
              Alt
            </KeyButton>
            <KeyButton
              className="w-[59px]"
              onClick={() => handleKeyPress("ContextMenu")}
              isPressed={!!activeKeys["ContextMenu"]}
              pressedColor={activeKeys["ContextMenu"]}
            >
              ☰
            </KeyButton>
            <KeyButton
              className="w-[59px]"
              onClick={() => handleKeyPress("Control")}
              isPressed={!!activeKeys["Control"]}
              pressedColor={activeKeys["Control"]}
            >
              Ctrl
            </KeyButton>
          </div>
        </div>
      </div>
    </div>
  );
};
