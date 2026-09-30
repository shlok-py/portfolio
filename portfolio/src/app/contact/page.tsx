"use client";

import { useState } from "react";
import { Mail, Send, Loader2 } from "lucide-react";
import messages from "@/i18n/en.json";

export default function Contact() {
  const copy = messages.contact;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : copy.errorFallback);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-20" style={{ background: "var(--page-glow), var(--page-bg)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(var(--page-grid) 1px, transparent 1px), linear-gradient(90deg, var(--page-grid) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      <div className="relative mx-auto max-w-4xl">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold font-serif text-heading md:text-6xl">{copy.titleLead} <span className="text-primary">{copy.titleAccent}</span></h1>
        <p className="text-secondary text-lg font-sans max-w-2xl mx-auto">
          {copy.description}
        </p>
      </div>

      <div
        className="mx-auto max-w-2xl rounded-2xl p-8 shadow-xl"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div className="flex items-center gap-3 mb-8 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
          <Mail className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold font-serif text-heading">{copy.formTitle}</h2>
        </div>

        {status === "success" ? (
          <div className="bg-primary/10 border border-primary/30 text-primary p-6 rounded-xl text-center">
            <h3 className="mb-2 text-xl font-bold">{copy.successTitle}</h3>
            <p>{copy.successDescription}</p>
            <button 
              onClick={() => setStatus("idle")}
              className="mt-6 px-6 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors font-mono text-sm"
            >
              {copy.sendAnother}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold font-mono" style={{ color: "var(--text-heading)" }}>{copy.name}</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg px-4 py-3 transition-colors focus:outline-none"
                  style={{
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border)",
                    color: "var(--text-heading)",
                  }}
                  placeholder={copy.namePlaceholder}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold font-mono" style={{ color: "var(--text-heading)" }}>{copy.email}</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg px-4 py-3 transition-colors focus:outline-none"
                  style={{
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border)",
                    color: "var(--text-heading)",
                  }}
                  placeholder={copy.emailPlaceholder}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold font-mono" style={{ color: "var(--text-heading)" }}>{copy.message}</label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-lg px-4 py-3 transition-colors resize-none focus:outline-none"
                style={{
                  background: "var(--bg-deep)",
                  border: "1px solid var(--border)",
                  color: "var(--text-heading)",
                }}
                placeholder={copy.messagePlaceholder}
              ></textarea>
            </div>

            {status === "error" && (
              <div
                className="text-sm font-mono p-3 rounded border"
                style={{
                  color: "#ef4444",
                  background: "rgba(239, 68, 68, 0.08)",
                  borderColor: "rgba(239, 68, 68, 0.25)",
                }}
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full font-bold py-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: "var(--text-primary)", color: "#0B0F19" }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> {copy.sending}
                </>
              ) : (
                <>
                  {copy.send} <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
      </div>
    </main>
  );
}
