"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import messages from "@/i18n/en.json";

export function HeroSection() {
  const copy = messages.hero;

  return (
    <section className="relative flex min-h-[86vh] flex-col justify-center pb-16 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-primary/80">field log 001</p>
        <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-[1.02] md:text-7xl">
          {copy.titleLead} <span className="text-primary">{copy.titleAccent}</span> {copy.titleEnd}
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-secondary mb-10 max-w-2xl font-sans"
        >
          {copy.description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a 
            href="#projects" 
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors font-sans"
          >
            {copy.projects}
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <a 
            href="#resume" 
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent font-bold rounded-lg transition-colors font-sans"
            style={{ border: "1px solid var(--border-mid)", color: "var(--text-heading)" }}
          >
            <FileText className="mr-2 w-5 h-5" style={{ color: "var(--text-body)" }} />
            {copy.resume}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
