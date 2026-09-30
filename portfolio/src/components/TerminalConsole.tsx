"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import messages from "@/i18n/en.json";
import { formatMessage } from "@/lib/i18n";

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export function TerminalConsole({ fullScreen = false }: { fullScreen?: boolean }) {
  const copy = messages.terminal;
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, React.ReactNode> = {
    help: (
      <div className="text-secondary">
        <p>{copy.available}</p>
        <ul className="list-none ml-2 mt-2 space-y-1">
          <li><span className="text-primary w-20 inline-block">{copy.commandNames.skills}</span> - {copy.commands.skills}</li>
          <li><span className="text-primary w-20 inline-block">{copy.commandNames.contact}</span> - {copy.commands.contact}</li>
          <li><span className="text-primary w-20 inline-block">{copy.commandNames.writing}</span> - {copy.commands.writing}</li>
          <li><span className="text-primary w-20 inline-block">{copy.commandNames.clear}</span> - {copy.commands.clear}</li>
        </ul>
      </div>
    ),
    skills: (
      <div className="text-secondary mt-2 space-y-2">
        <p><span className="text-primary font-bold">{copy.skills.ai}:</span> {copy.skills.aiValue}</p>
        <p><span className="text-primary font-bold">{copy.skills.backend}:</span> {copy.skills.backendValue}</p>
        <p><span className="text-primary font-bold">{copy.skills.cloud}:</span> {copy.skills.cloudValue}</p>
        <p><span className="text-primary font-bold">{copy.skills.vision}:</span> {copy.skills.visionValue}</p>
      </div>
    ),
    contact: (
      <div className="text-secondary mt-2 space-y-1">
        <p>{copy.contact.email}: <a href="mailto:shlokkoirala19@gmail.com" className="text-primary hover:underline">shlokkoirala19@gmail.com</a></p>
        <p>{copy.contact.linkedin}: <a href="https://www.linkedin.com/in/shlok-koirala-2aabb51b6/" target="_blank" rel="noreferrer" className="text-primary hover:underline">linkedin.com/in/shlok-koirala</a></p>
        <p>{copy.contact.github}: <a href="https://github.com/shlok-py" target="_blank" rel="noreferrer" className="text-primary hover:underline">github.com/shlok-py</a></p>
      </div>
    ),
    writing: <span className="text-secondary mt-2 block">{copy.writingOpened}</span>,
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      if (cmd === "clear") {
        setHistory([]);
      } else {
        if (cmd === "writing") {
          window.open("https://medium.com/@shlokkoirala19", "_blank", "noopener,noreferrer");
        }
        const output = commands[cmd] || (
          <span className="text-red-400 mt-2 block">{formatMessage(copy.notFound, { command: cmd })}</span>
        );
        setHistory([...history, { command: cmd, output }]);
      }
      setInput("");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={fullScreen ? "flex h-full min-h-0 w-full flex-col overflow-hidden font-mono" : "w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/10 font-mono"}
      style={{ background: "var(--bg-deeper)" }}
    >
      <div className="flex items-center px-4 py-3 border-b border-primary/20" style={{ background: "var(--bg-surface)" }}>
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <Terminal className="w-4 h-4 text-primary mr-2" />
        <span className="text-xs text-secondary">{copy.title}</span>
      </div>
      <div className={fullScreen ? "min-h-0 flex-1 overflow-y-auto p-4 text-sm sm:text-base scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent" : "p-4 h-80 overflow-y-auto text-sm sm:text-base scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"} style={{ overflowAnchor: "none" }}>
        <div className="text-secondary mb-4">
            <p>{copy.welcome}</p>
            <p>{copy.promptHint} <span className="text-primary">{copy.commandNames.help}</span> to inspect available commands.</p>
        </div>

        {history.map((entry, i) => (
          <div key={i} className="mb-4">
            <div className="flex items-center text-heading mb-1">
              <span className="text-primary mr-2">❯</span>
              <span>{entry.command}</span>
            </div>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.2 }}
            >
              {entry.output}
            </motion.div>
          </div>
        ))}

        <div
          className="sticky bottom-0 z-10 mt-2 pt-2"
          style={{
            background: "var(--bg-deeper)",
            borderTop: "1px solid rgba(0, 128, 128, 0.12)",
          }}
        >
          <div className="flex items-center text-heading min-h-[1.5rem]">
            <span className="text-primary mr-2 shrink-0">❯</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-heading p-0 leading-none"
              autoComplete="off"
              spellCheck="false"
              autoFocus
              style={{ margin: 0 }}
            />
          </div>
        </div>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
}
