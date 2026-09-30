"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Terminal } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { CoreDomains } from "@/components/CoreDomains";
import { TerminalConsole } from "@/components/TerminalConsole";
import { ContactFooter } from "@/components/ContactFooter";
import { HighImpactProjects } from "@/components/HighImpactProjects";
import { ExperienceTour } from "@/components/ExperienceTour";
import messages from "@/i18n/en.json";

type Mode = "landing" | "dev" | "user";

function HomeContent() {
  const copy = messages.landing;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const beginModeTransition = (nextMode: Mode) => {
    setIsTransitioning(true);
    window.setTimeout(() => setMode(nextMode), 900);
  };

  if (mode === "landing") {
    return (
      <motion.main
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-16"
        style={{
          background:
            "var(--page-glow), var(--page-bg)",
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-40"
          animate={{ y: isTransitioning ? -320 : 0, scale: isTransitioning ? 1.14 : 1, opacity: isTransitioning ? 0 : 0.4 }}
          transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundImage: "linear-gradient(var(--page-grid) 1px, transparent 1px), linear-gradient(90deg, var(--page-grid) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)" }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] shadow-[0_0_140px_rgba(65,155,157,0.1)]"
          animate={{ scale: isTransitioning ? 1.85 : 1, rotate: isTransitioning ? 18 : 0, opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: 0.86, ease: "easeIn" }}
        />
        <motion.div
          className="relative z-10 w-full max-w-3xl text-center"
          animate={{ y: isTransitioning ? -130 : 0, scale: isTransitioning ? 0.82 : 1, opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-100/15 bg-white/[0.07] text-cyan-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
            <Eye size={23} strokeWidth={1.4} />
          </div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.38em] text-cyan-200/55">{copy.signal}</p>
          <h1 className="mx-auto max-w-2xl font-serif text-5xl font-medium leading-[0.98] tracking-tight sm:text-7xl" style={{ color: "var(--text-heading)" }}>
            {copy.titleLead} <span style={{ color: "var(--text-primary)" }}>{copy.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-md text-sm leading-7" style={{ color: "var(--text-body)" }}>
            {copy.description}
          </p>
          <div className="mx-auto mt-11 grid max-w-lg gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => beginModeTransition("dev")}
            className="group rounded-2xl border px-5 py-4 text-left backdrop-blur-xl transition-all hover:-translate-y-1"
            style={{
              color: "var(--text-heading)", background: "var(--glass-control)", borderColor: "var(--glass-border)", boxShadow: "0 18px 45px rgba(0,0,0,0.2), inset 0 1px 0 var(--glass-control-active)",
            }}
          >
            <span className="mb-3 flex items-center justify-between text-cyan-200/70"><Terminal size={16} strokeWidth={1.5} /><ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
            <span className="block font-mono text-xs uppercase tracking-[0.18em]">{copy.devMode}</span>
            <span className="mt-1 block text-xs text-slate-400/65">{copy.devDetail}</span>
          </button>

          <button
            type="button"
            onClick={() => beginModeTransition("user")}
            className="group rounded-2xl border px-5 py-4 text-left backdrop-blur-xl transition-all hover:-translate-y-1"
            style={{
              color: "var(--text-heading)", background: "var(--glass-control)", borderColor: "var(--glass-border)", boxShadow: "0 18px 45px rgba(0,0,0,0.2), inset 0 1px 0 var(--glass-control-active)",
            }}
          >
            <span className="mb-3 flex items-center justify-between text-fuchsia-200/60"><Eye size={16} strokeWidth={1.5} /><ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
            <span className="block font-mono text-xs uppercase tracking-[0.18em]">{copy.userMode}</span>
            <span className="mt-1 block text-xs text-slate-400/65">{copy.userDetail}</span>
          </button>
        </div>
          <p className="mt-9 font-mono text-[9px] uppercase tracking-[0.28em] text-slate-500/55">{copy.choose}</p>
        </motion.div>
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          style={{ background: "var(--veil-bg)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0.94 : 0 }}
          transition={{ duration: 0.82, ease: "easeInOut" }}
        />
      </motion.main>
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
      <ExperienceTour />
      <HighImpactProjects />
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
