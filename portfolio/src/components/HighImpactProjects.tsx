"use client";

import { motion } from "framer-motion";
import { ExternalLink, Activity } from "lucide-react";
import { GithubIcon } from "./icons";

const projects = [
  {
    title: "Autonomous Research & RAG Platforms",
    type: "Enterprise Architecture",
    description: "Complex governance layers and multi-agent orchestration logic for autonomous document analysis. Improved retrieval latency by 45% and increased data throughput significantly.",
    metrics: ["45% Latency Reduction", "Multi-Agent Orchestration", "Dynamic Governance"],
    tech: ["Next.js", "FastAPI", "Pinecone", "LangChain"],
    link: "#",
    github: "#"
  },
  {
    title: "Sanjyaan (AI Learning Assistant)",
    type: "Social Impact & EdTech",
    description: "Personalized workflow design and accessible data modeling optimized for neurodivergent learning patterns. Features custom AI tutors and adaptive content delivery.",
    metrics: ["10k+ Active Users", "Adaptive Learning Paths", "WCAG 2.1 AA Compliant"],
    tech: ["React", "PyTorch", "Node.js", "MongoDB"],
    link: "#",
    github: "#"
  },
  {
    title: "Shades of History",
    type: "Computer Vision Research",
    description: "AI-powered heritage preservation using advanced image restoration pipelines. Published research in the Journal of NAST College on generative restoration.",
    metrics: ["Published Research", "98.5% SSIM Score", "Custom GAN Architecture"],
    tech: ["Python", "PyTorch", "OpenCV", "Azure ML"],
    link: "https://example.com/publication",
    github: "#"
  }
];

export function HighImpactProjects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-heading">High-Impact <span className="text-primary">Projects</span></h2>
        <div className="h-[1px] flex-1 bg-secondary/20"></div>
      </div>

      <div className="space-y-16">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Project Content */}
            <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <p className="text-primary font-mono text-sm mb-2">{project.type}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-heading mb-4 font-serif group-hover:text-primary transition-colors">{project.title}</h3>
              
              <div className="p-6 rounded-xl shadow-xl mb-6 relative z-10 transition-colors group-hover:border-primary/30" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                <p className="text-secondary leading-relaxed">{project.description}</p>
                
                <div className="mt-4 pt-4 border-t border-secondary/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-heading">Impact Metrics</span>
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
                <a href={project.github} className="text-secondary hover:text-primary transition-colors" aria-label="GitHub Repository">
                  <GithubIcon className="w-6 h-6" />
                </a>
                <a href={project.link} className="text-secondary hover:text-primary transition-colors" aria-label="External Link">
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Visual/Abstract Representation */}
            <div className={`lg:col-span-5 h-64 lg:h-full min-h-[300px] rounded-xl flex items-center justify-center overflow-hidden relative ${index % 2 === 1 ? 'lg:order-1' : ''} group-hover:border-primary/30 transition-colors`} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
              {/* Abstract structural representation */}
              <div className="relative w-full h-full p-8 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                <div className="w-32 h-32 border border-primary/30 rounded-full animate-[spin_10s_linear_infinite] absolute"></div>
                <div className="w-48 h-48 border border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse] absolute"></div>
                <div className="w-24 h-24 border border-primary/50 rounded-lg animate-[spin_8s_linear_infinite] absolute"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
