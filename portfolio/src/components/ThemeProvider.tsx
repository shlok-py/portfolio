"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const darkTokens: Record<string, string> = {
  "--bg": "#0B0F19",
  "--bg-surface": "#0c1221",
  "--bg-deep": "#070b14",
  "--bg-deeper": "#060a13",
  "--text-primary": "#008080",
  "--text-heading": "#F8FAFC",
  "--text-body": "#94A3B8",
  "--border": "rgba(148,163,184,0.1)",
  "--border-mid": "rgba(148,163,184,0.15)",
  "--border-faint": "rgba(148,163,184,0.07)",
  "--surface-hover": "rgba(148,163,184,0.06)",
  "--surface-teal": "rgba(0,128,128,0.12)",
  "--surface-teal-hover": "rgba(0,128,128,0.18)",
  "--code-bg": "#0f1623",
  "--navbar-bg": "rgba(11,15,25,0.85)",
  "--page-bg": "#050811",
  "--page-glow": "radial-gradient(circle at 70% 18%, rgba(77, 41, 87, 0.2), transparent 32%), radial-gradient(circle at 18% 75%, rgba(24, 83, 91, 0.18), transparent 34%)",
  "--page-grid": "rgba(137, 196, 198, 0.05)",
  "--glass-bg": "rgba(13, 24, 34, 0.62)",
  "--glass-bg-soft": "rgba(13, 24, 34, 0.48)",
  "--glass-border": "rgba(150, 220, 218, 0.14)",
  "--glass-control": "rgba(255, 255, 255, 0.07)",
  "--glass-control-active": "rgba(255, 255, 255, 0.14)",
  "--veil-bg": "#050811",
  // Tailwind token overrides
  "--color-background": "#0B0F19",
  "--color-heading": "#F8FAFC",
  "--color-secondary": "#94A3B8",
  "--color-primary": "#008080",
};

const lightTokens: Record<string, string> = {
  "--bg": "#F0F4F8",
  "--bg-surface": "#FFFFFF",
  "--bg-deep": "#E8EDF3",
  "--bg-deeper": "#DDE4EE",
  "--text-primary": "#007070",
  "--text-heading": "#0F172A",
  "--text-body": "#475569",
  "--border": "rgba(15,23,42,0.1)",
  "--border-mid": "rgba(15,23,42,0.15)",
  "--border-faint": "rgba(15,23,42,0.07)",
  "--surface-hover": "rgba(15,23,42,0.04)",
  "--surface-teal": "rgba(0,128,128,0.08)",
  "--surface-teal-hover": "rgba(0,128,128,0.14)",
  "--code-bg": "#E2EAF4",
  "--navbar-bg": "rgba(240,244,248,0.88)",
  "--page-bg": "#edf3f5",
  "--page-glow": "radial-gradient(circle at 70% 18%, rgba(151, 102, 166, 0.18), transparent 32%), radial-gradient(circle at 18% 75%, rgba(53, 145, 145, 0.15), transparent 34%)",
  "--page-grid": "rgba(24, 91, 94, 0.09)",
  "--glass-bg": "rgba(255, 255, 255, 0.68)",
  "--glass-bg-soft": "rgba(255, 255, 255, 0.5)",
  "--glass-border": "rgba(24, 91, 94, 0.18)",
  "--glass-control": "rgba(15, 45, 53, 0.06)",
  "--glass-control-active": "rgba(15, 45, 53, 0.12)",
  "--veil-bg": "#edf3f5",
  // Tailwind token overrides
  "--color-background": "#F0F4F8",
  "--color-heading": "#0F172A",
  "--color-secondary": "#475569",
  "--color-primary": "#007070",
};

function applyTheme(theme: Theme) {
  const tokens = theme === "dark" ? darkTokens : lightTokens;
  const root = document.documentElement;
  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.setAttribute("data-theme", theme);
}

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    const preferred =
      stored ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(preferred);
    applyTheme(preferred);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
    applyTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

