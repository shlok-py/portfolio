"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export function ContactFooter() {
  return (
    <footer id="contact" className="py-12 mt-20 border-t border-secondary/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold font-serif mb-2 text-heading">Ready to architect the future?</h2>
          <p className="text-secondary text-sm max-w-md text-center md:text-left">
            Available for advanced engineering roles and technical collaborations starting late 2026/2027.
          </p>
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com/shlok-py" target="_blank" rel="noreferrer" className="p-3 rounded-full hover:border-primary hover:text-primary transition-all text-secondary" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/shlok-koirala-2aabb51b6/" target="_blank" rel="noreferrer" className="p-3 rounded-full hover:border-primary hover:text-primary transition-all text-secondary" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a href="mailto:shlokkoirala19@gmail.com" className="p-3 rounded-full hover:border-primary hover:text-primary transition-all text-secondary" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <div className="mt-12 text-center text-xs text-secondary/50 font-mono">
        <p>&copy; {new Date().getFullYear()} AI Engineer Portfolio. Designed & Architected for Production.</p>
      </div>
    </footer>
  );
}
