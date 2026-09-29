"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

export function HeroSection() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center relative pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Architecting <span className="text-primary">Production-Grade</span> AI Systems & Multi-Agent Pipelines.
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-secondary mb-10 max-w-2xl font-sans"
        >
          B.Tech AI Engineer specializing in RAG architecture, LLMOps pipelines, and full-stack machine learning solutions.
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
            View Systems/Projects
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <a 
            href="#resume" 
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent font-bold rounded-lg transition-colors font-sans"
            style={{ border: "1px solid var(--border-mid)", color: "var(--text-heading)" }}
          >
            <FileText className="mr-2 w-5 h-5" style={{ color: "var(--text-body)" }} />
            Review Technical Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
