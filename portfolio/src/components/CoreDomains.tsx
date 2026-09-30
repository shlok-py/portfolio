"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Server, Layout } from "lucide-react";
import messages from "@/i18n/en.json";

const icons = [BrainCircuit, Server, Layout];

export function CoreDomains() {
  const copy = messages.domains;

  return (
    <section id="skills" className="relative py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-secondary/20"></div>
          <h2 className="text-center text-3xl font-bold md:text-5xl">{copy.headingLead} <span className="text-primary">{copy.headingAccent}</span></h2>
          <div className="h-[1px] flex-1 bg-secondary/20"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {copy.items.map((domain, index) => {
            const Icon = icons[index];
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
              className="group p-8 rounded-xl border hover:border-primary/50 transition-all hover:-translate-y-1 relative overflow-hidden"
              style={{ background: "rgba(13, 24, 34, 0.58)", borderColor: "rgba(150, 220, 218, 0.14)", backdropFilter: "blur(18px)" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
              
              <Icon className="mb-6 h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold text-heading mb-4 font-serif">{domain.title}</h3>
              <p className="text-secondary leading-relaxed font-sans">{domain.description}</p>
            </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
