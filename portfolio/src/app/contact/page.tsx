"use client";

import { useState } from "react";
import { Mail, Send, Loader2 } from "lucide-react";

export default function Contact() {
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
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 text-heading">Get in <span className="text-primary">Touch</span></h1>
        <p className="text-secondary text-lg font-sans max-w-2xl mx-auto">
          Whether you have a question about my research, want to discuss a project, or just want to say hi, my inbox is always open.
        </p>
      </div>

      <div
        className="max-w-2xl mx-auto rounded-2xl p-8 shadow-xl"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3 mb-8 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
          <Mail className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold font-serif text-heading">Send a Message</h2>
        </div>

        {status === "success" ? (
          <div className="bg-primary/10 border border-primary/30 text-primary p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
            <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
            <button 
              onClick={() => setStatus("idle")}
              className="mt-6 px-6 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors font-mono text-sm"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold font-mono" style={{ color: "var(--text-heading)" }}>Name</label>
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
                  placeholder="Ada Lovelace"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold font-mono" style={{ color: "var(--text-heading)" }}>Email</label>
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
                  placeholder="ada@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold font-mono" style={{ color: "var(--text-heading)" }}>Message</label>
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
                placeholder="What would you like to discuss?"
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
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
