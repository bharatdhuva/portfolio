import { useState, useEffect } from "react";
import { Sun, Moon, SunDim } from "lucide-react";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark" | "dim">("light");
  const [prevOption, setPrevOption] = useState<string>("1");

  useEffect(() => {
    // Read theme from localStorage or document class
    const isDark = document.documentElement.classList.contains("dark");
    const storedTheme = localStorage.getItem("portfolio-theme") as "light" | "dark" | "dim";

    let initialTheme: "light" | "dark" | "dim" = "light";
    if (storedTheme) {
      initialTheme = storedTheme;
    } else if (isDark) {
      initialTheme = "dark";
    }

    setTheme(initialTheme);
    const optionMap = { light: "1", dark: "2", dim: "3" };
    setPrevOption(optionMap[initialTheme]);
    applyTheme(initialTheme);
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark" | "dim") => {
    const optionMap = { light: "1", dark: "2", dim: "3" };
    setPrevOption(optionMap[theme]);
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    applyTheme(newTheme);
  };

  const applyTheme = (t: "light" | "dark" | "dim") => {
    const root = document.documentElement;

    // Sync with .dark class for other components' styling
    if (t === "dark" || t === "dim") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Dispatch custom event to let other components (like DockNavbar) know the theme changed
    window.dispatchEvent(
      new CustomEvent("theme-changed", { detail: { dark: t === "dark" || t === "dim" } }),
    );
  };

  return (
    <fieldset className="switcher" c-previous={prevOption} style={{ zIndex: 100 }}>
      <legend className="switcher__legend">Theme Selection</legend>

      <label className="switcher__option">
        <input
          type="radio"
          name="theme"
          value="light"
          className="switcher__input"
          c-option="1"
          checked={theme === "light"}
          onChange={() => handleThemeChange("light")}
        />
        <Sun className="switcher__icon w-5 h-5" />
      </label>

      <label className="switcher__option">
        <input
          type="radio"
          name="theme"
          value="dark"
          className="switcher__input"
          c-option="2"
          checked={theme === "dark"}
          onChange={() => handleThemeChange("dark")}
        />
        <Moon className="switcher__icon w-5 h-5" />
      </label>

      <label className="switcher__option">
        <input
          type="radio"
          name="theme"
          value="dim"
          className="switcher__input"
          c-option="3"
          checked={theme === "dim"}
          onChange={() => handleThemeChange("dim")}
        />
        <SunDim className="switcher__icon w-5 h-5" />
      </label>
    </fieldset>
  );
}
