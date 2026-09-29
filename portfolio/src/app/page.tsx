"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { CoreDomains } from "@/components/CoreDomains";
import { TerminalConsole } from "@/components/TerminalConsole";
import { ContactFooter } from "@/components/ContactFooter";

type Mode = "landing" | "dev" | "user";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const mode: Mode = modeParam === "dev" ? "dev" : modeParam === "user" ? "user" : "landing";

  const setMode = (nextMode: Mode) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextMode === "landing") {
      params.delete("mode");
      router.replace(params.toString() ? `/?${params.toString()}` : "/");
      return;
    }

    params.set("mode", nextMode);
    router.replace(`/?${params.toString()}`);
  };

  if (mode === "landing") {
    return (
      <main className="flex min-h-screen items-center justify-center px-6" style={{ background: "var(--bg)" }}>
        <div className="flex -translate-y-12 flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setMode("dev")}
            className="px-5 py-2.5 text-sm font-medium transition-all"
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              color: "var(--text-heading)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "10px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            Dev mode
          </button>

          <button
            type="button"
            onClick={() => setMode("user")}
            className="px-5 py-2.5 text-sm font-medium transition-all"
            style={{
              background: "rgba(255, 255, 255, 0.10)",
              color: "var(--text-heading)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              borderRadius: "10px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.2)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            User mode
          </button>
        </div>
      </main>
    );
  }

  if (mode === "dev") {
    return (
      <main className="h-full min-h-0 w-full overflow-hidden" style={{ background: "var(--bg)" }}>
        <div className="h-full min-h-0 w-full px-0 py-0">
          <TerminalConsole fullScreen />
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 overflow-x-hidden" style={{ background: "var(--bg)" }}>
      <HeroSection />
      <CoreDomains />
      <ContactFooter />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<main className="min-h-screen" style={{ background: "var(--bg)" }} /> }>
      <HomeContent />
    </Suspense>
  );
}
