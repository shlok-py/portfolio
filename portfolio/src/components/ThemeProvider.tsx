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

