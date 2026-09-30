"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { GithubIcon } from "./icons";
import messages from "@/i18n/en.json";
import { formatMessage } from "@/lib/i18n";

export function HighImpactProjects() {
  const copy = messages.projects;
  const [activeIndex, setActiveIndex] = useState(0);
  const project = copy.items[activeIndex];

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + copy.items.length) % copy.items.length);
  };

  return (
    <section id="projects" className="relative py-20">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">{copy.eyebrow}</p>
          <h2 className="text-3xl font-bold text-heading md:text-5xl">{copy.headingLead} <span className="text-primary">{copy.headingAccent}</span></h2>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button type="button" onClick={() => move(-1)} aria-label={copy.previous} className="rounded-full border border-primary/20 bg-white/[0.05] p-3 text-secondary transition hover:border-primary/60 hover:text-primary"><ArrowLeft size={16} /></button>
          <button type="button" onClick={() => move(1)} aria-label={copy.next} className="rounded-full border border-primary/20 bg-white/[0.05] p-3 text-secondary transition hover:border-primary/60 hover:text-primary"><ArrowRight size={16} /></button>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-secondary/70">
        <span>{formatMessage(copy.step, { current: String(activeIndex + 1), total: String(copy.items.length) })}</span>
        <div className="flex gap-1">{copy.items.map((item, index) => <button key={item.title} type="button" aria-label={item.title} onClick={() => setActiveIndex(index)} className={`h-1.5 transition-all ${index === activeIndex ? "w-10 bg-primary" : "w-3 bg-secondary/30"}`} />)}</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.title}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28 }}
          className="group relative grid min-h-[430px] grid-cols-1 items-center gap-8 lg:h-[390px] lg:min-h-0 lg:grid-cols-12"
        >
            {/* Project Content */}
            <div className="lg:col-span-7">
              <p className="mb-2 font-mono text-sm text-primary">{project.type}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-heading mb-4 font-serif group-hover:text-primary transition-colors">{project.title}</h3>
              
              <div className="relative z-10 mb-6 rounded-xl p-6 shadow-xl transition-colors group-hover:border-primary/30" style={{ background: "rgba(13, 24, 34, 0.58)", border: "1px solid rgba(150, 220, 218, 0.14)", backdropFilter: "blur(18px)" }}>
                <p className="text-secondary leading-relaxed">{project.description}</p>
                
                <div className="mt-4 pt-4 border-t border-secondary/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-heading">{copy.impact}</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.metrics.map((metric, i) => (
                      <li key={i} className="text-sm text-secondary flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <ul className="flex flex-wrap gap-3 font-mono text-xs text-secondary mb-6">
                {project.tech.map((tech, i) => (
                  <li key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="flex gap-4">
                <a href={project.github} className="text-secondary transition-colors hover:text-primary" aria-label={copy.repository}>
                  <GithubIcon className="w-6 h-6" />
                </a>
                <a href={project.link} className="text-secondary transition-colors hover:text-primary" aria-label={copy.external}>
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Visual/Abstract Representation */}
            <div className="relative flex h-64 min-h-[300px] items-center justify-center overflow-hidden rounded-xl lg:col-span-5 lg:h-full group-hover:border-primary/30 transition-colors" style={{ background: "rgba(13, 24, 34, 0.48)", border: "1px solid rgba(150, 220, 218, 0.14)", backdropFilter: "blur(18px)" }}>
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${project.image})` }} />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
              {/* Abstract structural representation */}
              <div className="relative w-full h-full p-8 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                <div className="w-32 h-32 border border-primary/30 rounded-full animate-[spin_10s_linear_infinite] absolute"></div>
                <div className="w-48 h-48 border border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse] absolute"></div>
                <div className="w-24 h-24 border border-primary/50 rounded-lg animate-[spin_8s_linear_infinite] absolute"></div>
              </div>
            </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
