"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, MapPin } from "lucide-react";
import { useState } from "react";
import messages from "@/i18n/en.json";
import { formatMessage } from "@/lib/i18n";

export function ExperienceTour() {
  const copy = messages.experience;
  const [activeIndex, setActiveIndex] = useState(0);
  const role = copy.items[activeIndex];

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + copy.items.length) % copy.items.length);
  };

  return (
    <section id="experience" className="relative py-20">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">{copy.eyebrow}</p>
          <h2 className="text-3xl font-bold text-heading md:text-5xl">
            {copy.headingLead} <span className="text-primary">{copy.headingAccent}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => move(-1)} aria-label={copy.previous} className="rounded-full border border-primary/20 bg-white/[0.05] p-3 text-secondary transition hover:border-primary/60 hover:text-primary"><ArrowLeft size={16} /></button>
          <button type="button" onClick={() => move(1)} aria-label={copy.next} className="rounded-full border border-primary/20 bg-white/[0.05] p-3 text-secondary transition hover:border-primary/60 hover:text-primary"><ArrowRight size={16} /></button>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-secondary/70">
        <span>{formatMessage(copy.step, { current: String(activeIndex + 1), total: String(copy.items.length) })}</span>
        <div className="flex gap-1">
          {copy.items.map((item, index) => (
            <button key={item.company} type="button" aria-label={item.company} onClick={() => setActiveIndex(index)} className={`h-1.5 transition-all ${index === activeIndex ? "w-10 bg-primary" : "w-3 bg-secondary/30"}`} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={role.company + role.period}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28 }}
          className="relative min-h-[430px] overflow-hidden rounded-2xl border p-6 shadow-2xl shadow-black/20 sm:p-10 lg:h-[390px] lg:min-h-0"
          style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)", backdropFilter: "blur(18px)" }}
        >
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/[0.08] blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary"><Briefcase size={20} /></div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{role.period}</p>
              <h3 className="mt-3 text-2xl font-bold text-heading sm:text-3xl">{role.role}</h3>
              <p className="mt-3 flex items-center gap-2 font-mono text-sm text-secondary"><MapPin size={14} className="text-primary" /> {role.company}</p>
            </div>
            <div className="flex flex-col justify-between gap-7">
              <p className="max-w-2xl text-lg leading-8 text-secondary">{role.description}</p>
              <ul className="flex flex-wrap gap-2">
                {role.skills.map((skill) => <li key={skill} className="rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1.5 font-mono text-xs text-primary">{skill}</li>)}
              </ul>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>

    </section>
  );
}
