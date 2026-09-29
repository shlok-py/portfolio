"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Server, Layout } from "lucide-react";

const domains = [
  {
    title: "AI Architecture & Research",
    description: "RAG Engineering, Multi-Agent Systems, Model Control Planes, Fine-tuning (PyTorch).",
    icon: BrainCircuit,
    delay: 0.1,
  },
  {
    title: "Backend & MLOps",
    description: "FastAPI, LLMOps Pipelines, Docker, Azure Cloud Services.",
    icon: Server,
    delay: 0.2,
  },
  {
    title: "CV, NLP & LLMs",
    description: "Computer Vision, NLP pipelines, embeddings, LLM evaluation, and production ML systems.",
    icon: Layout,
    delay: 0.3,
  }
];

export function CoreDomains() {
  return (
    <section id="skills" className="py-20 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] flex-1 bg-secondary/20"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-center">Core Engineering <span className="text-primary">Domains</span></h2>
          <div className="h-[1px] flex-1 bg-secondary/20"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: domain.delay, duration: 0.5 }}
              className="group p-8 rounded-xl border hover:border-primary/50 transition-all hover:-translate-y-1 relative overflow-hidden"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
              
              <domain.icon className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold text-heading mb-4 font-serif">{domain.title}</h3>
              <p className="text-secondary leading-relaxed font-sans">{domain.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
