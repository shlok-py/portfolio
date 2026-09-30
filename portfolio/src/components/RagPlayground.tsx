"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FileUp, Gauge, Search, ShieldCheck, Sparkles } from "lucide-react";
import messages from "@/i18n/en.json";
import sample from "@/i18n/rag-sample.json";

interface Chunk {
  id: number;
  source: string;
  text: string;
  score: number;
}

interface Answer {
  text: string;
  confidence: number;
  evidence: Chunk[];
}

const MAX_FILE_SIZE = 1024 * 1024;
const MAX_QUERIES = 6;
const WINDOW_MS = 60_000;
const STOP_WORDS = new Set(["a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "how", "in", "is", "it", "of", "on", "or", "the", "to", "what", "who", "with"]);

function tokenize(value: string) {
  return value.toLowerCase().match(/[a-z0-9]+/g)?.filter((word) => !STOP_WORDS.has(word)) ?? [];
}

function chunkText(text: string, source: string): Chunk[] {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const chunks: Chunk[] = [];
  const size = 90;
  const overlap = 18;

  for (let start = 0; start < words.length; start += size - overlap) {
    const content = words.slice(start, start + size).join(" ");
    if (content) chunks.push({ id: chunks.length + 1, source, text: content, score: 0 });
  }

  return chunks;
}

function retrieve(chunks: Chunk[], question: string) {
  const terms = tokenize(question);
  return chunks
    .map((chunk) => {
      const chunkTerms = tokenize(chunk.text);
      const uniqueMatches = new Set(terms.filter((term) => chunkTerms.includes(term)));
      const phraseBonus = chunk.text.toLowerCase().includes(question.toLowerCase().trim()) ? 0.28 : 0;
      const score = terms.length ? uniqueMatches.size / terms.length + phraseBonus : 0;
      return { ...chunk, score };
    })
    .filter((chunk) => chunk.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

function synthesize(evidence: Chunk[], question: string): Answer | null {
  if (!evidence.length) return null;
  const terms = tokenize(question);
  const sentences = evidence.flatMap((chunk) => chunk.text.split(/(?<=[.!?])\s+/));
  const selected = sentences
    .map((sentence) => ({ sentence, matches: new Set(terms.filter((term) => tokenize(sentence).includes(term))).size }))
    .sort((left, right) => right.matches - left.matches)
    .filter((item) => item.matches > 0)
    .slice(0, 2)
    .map((item) => item.sentence);
  const text = selected.length ? selected.join(" ") : evidence[0].text;
  const confidence = Math.min(0.96, 0.42 + evidence[0].score * 0.42 + Math.min(evidence.length, 3) * 0.08);

  return { text, confidence, evidence };
}

export function RagPlayground() {
  const copy = messages.rag;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryTimes = useRef<number[]>([]);
  const [source, setSource] = useState(sample.source);
  const [documentText, setDocumentText] = useState(sample.content);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [error, setError] = useState("");

  const loadText = (text: string, name: string) => {
    if (!text.trim()) {
      setError(copy.emptyDocument);
      return;
    }
    setDocumentText(text);
    setSource(name);
    setAnswer(null);
    setError("");
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setError(copy.fileTooLarge);
      return;
    }
    if (!/\.(txt|md|json|csv)$/i.test(file.name)) {
      setError(copy.unsupportedFile);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => loadText(String(reader.result ?? ""), file.name);
    reader.onerror = () => setError(copy.readError);
    reader.readAsText(file);
  };

  const handleAsk = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanQuestion = question.trim();
    if (!cleanQuestion || isAsking) return;

    const now = Date.now();
    queryTimes.current = queryTimes.current.filter((time) => now - time < WINDOW_MS);
    if (queryTimes.current.length >= MAX_QUERIES) {
      const seconds = Math.ceil((WINDOW_MS - (now - queryTimes.current[0])) / 1000);
      setError(copy.rateLimit.replace("{seconds}", String(seconds)));
      return;
    }

    queryTimes.current.push(now);
    setIsAsking(true);
    setError("");
    window.setTimeout(() => {
      const evidence = retrieve(chunkText(documentText, source), cleanQuestion);
      setAnswer(synthesize(evidence, cleanQuestion));
      setIsAsking(false);
    }, 360);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-20" style={{ background: "var(--page-glow), var(--page-bg)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(var(--page-grid) 1px, transparent 1px), linear-gradient(90deg, var(--page-grid) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      <div className="relative mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.34em] text-primary">{copy.eyebrow}</p>
          <h1 className="text-5xl font-bold leading-none text-heading md:text-7xl">{copy.titleLead} <span className="text-primary">{copy.titleAccent}</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary">{copy.description}</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <section className="rounded-2xl border p-6 shadow-2xl shadow-black/20" style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)", backdropFilter: "blur(18px)" }}>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3"><ShieldCheck size={18} className="text-primary" /><h2 className="font-serif text-2xl font-bold text-heading">{copy.source}</h2></div>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {copy.sourceReady}</span>
            </div>
            <div className="rounded-xl border border-primary/15 bg-[var(--glass-control)] p-4 font-mono text-xs text-secondary"><span className="text-primary">source://</span>{source}</div>
            <div className="mt-5 grid gap-3">
              <input ref={fileInputRef} type="file" accept=".txt,.md,.json,.csv,text/plain,text/markdown,application/json,text/csv" onChange={handleUpload} className="sr-only" />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 font-mono text-xs text-primary transition hover:bg-primary/20"><FileUp size={16} /> {copy.upload}</button>
              <button type="button" onClick={() => loadText(sample.content, sample.source)} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-xs text-secondary transition hover:border-primary/30 hover:text-primary">{copy.sample}</button>
            </div>
            <p className="mt-4 text-center font-mono text-[10px] leading-5 text-secondary/60">{copy.uploadHint}</p>
            {error && <p role="alert" className="mt-5 rounded-lg border border-red-400/25 bg-red-400/10 p-3 font-mono text-xs text-red-200">{error}</p>}
          </section>

          <section className="rounded-2xl border p-6 shadow-2xl shadow-black/20" style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)", backdropFilter: "blur(18px)" }}>
            <form onSubmit={handleAsk}>
              <label htmlFor="rag-question" className="mb-3 block font-mono text-[10px] uppercase tracking-[0.24em] text-primary">{copy.questionLabel}</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input id="rag-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={copy.questionPlaceholder} className="min-w-0 flex-1 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-control)] px-4 py-3 text-sm text-heading outline-none transition placeholder:text-secondary/50 focus:border-primary/60" />
                <button type="submit" disabled={isAsking || !question.trim()} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-xs font-bold text-[#061014] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"><Search size={15} /> {isAsking ? copy.asking : copy.ask}</button>
              </div>
            </form>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="mb-4 flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-heading"><Sparkles size={16} className="text-primary" /><h2 className="font-serif text-2xl font-bold">{copy.answer}</h2></div><p className="mt-1 font-mono text-[10px] text-secondary/60">{copy.answerHint}</p></div>{answer && <div className="text-right"><span className="block font-mono text-[10px] uppercase tracking-widest text-secondary/60">{copy.confidence}</span><strong className="font-mono text-lg text-primary">{Math.round(answer.confidence * 100)}%</strong></div>}</div>
              <div className="min-h-24 rounded-xl border border-primary/15 bg-[var(--surface-teal)] p-4 text-sm leading-7 text-secondary">{answer ? answer.text : copy.noAnswer}</div>
            </div>

            <div className="mt-8 border-t border-[var(--border)] pt-6"><div className="mb-4 flex items-center justify-between"><div><div className="flex items-center gap-2 text-heading"><Gauge size={16} className="text-primary" /><h2 className="font-serif text-2xl font-bold">{copy.evidence}</h2></div><p className="mt-1 font-mono text-[10px] text-secondary/60">{copy.evidenceHint}</p></div>{answer && <span className="font-mono text-[10px] text-secondary/60">{answer.evidence.length} {copy.match}</span>}</div><div className="space-y-3">{answer?.evidence.length ? answer.evidence.map((chunk) => <article key={chunk.id} className="rounded-xl border border-[var(--border)] bg-[var(--glass-control)] p-4"><div className="mb-2 flex items-center justify-between gap-3 font-mono text-[10px] text-primary"><span>{copy.sourceLabel}: {chunk.source} / chunk-{chunk.id}</span><span>{Math.round(chunk.score * 100)}%</span></div><p className="text-xs leading-6 text-secondary">{chunk.text}</p></article>) : <p className="rounded-xl border border-[var(--border)] bg-[var(--glass-control)] p-4 text-sm text-secondary/70">{copy.noEvidence}</p>}</div></div>
          </section>
        </div>
        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-secondary/50">{copy.footer}</p>
      </div>
    </main>
  );
}
