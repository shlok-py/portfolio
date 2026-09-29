"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type Mode = "dev" | "user";

export function ModeSwitcher({ mode: forcedMode }: { mode?: Mode | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const modeParam = searchParams.get("mode");
  const mode: Mode | null = forcedMode ?? (modeParam === "dev" || modeParam === "user" ? modeParam : null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mode) {
    return null;
  }

  const setMode = (nextMode: Mode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", nextMode);
    router.replace(`/?${params.toString()}`);
  };

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-7 border-b backdrop-blur-xl"
      style={{
        background: "var(--mode-switcher-bg)",
        borderColor: "var(--mode-switcher-border)",
      }}
    >
      <div className="mx-auto flex h-full max-w-[1800px] items-center justify-end gap-2 px-3 sm:px-8 lg:px-10">
        <div
          className="flex items-center gap-1 rounded-full border px-1 py-0.5"
          style={{
            borderColor: "var(--mode-switcher-border)",
            background: "rgba(255,255,255,0.28)",
          }}
        >
          <button
            type="button"
            onClick={() => setMode("dev")}
            className="rounded-full px-2 py-0.5 text-[9px] font-medium leading-none transition-all"
            style={{
              background: mode === "dev" ? "rgba(255,255,255,0.58)" : "transparent",
              color: "var(--mode-switcher-text)",
              boxShadow: mode === "dev" ? "inset 0 0 0 1px var(--mode-switcher-border)" : "none",
            }}
          >
            dev
          </button>
          <button
            type="button"
            onClick={() => setMode("user")}
            className="rounded-full px-2 py-0.5 text-[9px] font-medium leading-none transition-all"
            style={{
              background: mode === "user" ? "rgba(255,255,255,0.58)" : "transparent",
              color: "var(--mode-switcher-text)",
              boxShadow: mode === "user" ? "inset 0 0 0 1px var(--mode-switcher-border)" : "none",
            }}
          >
            user
          </button>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={!mounted || theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={!mounted || theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-5 w-7 items-center justify-center rounded-full border transition-colors"
          style={{
            borderColor: "var(--mode-switcher-border)",
            color: "var(--mode-switcher-text)",
            background: "rgba(255,255,255,0.28)",
          }}
        >
          {!mounted || theme === "dark" ? <Sun size={11} /> : <Moon size={11} />}
        </button>
      </div>
    </div>
  );
}
