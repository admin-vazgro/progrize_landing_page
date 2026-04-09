"use client";

import { useState, useEffect, useRef } from "react";
import { X, Check } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function getTimeLeft(targetDate: Date) {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // 90 days from now
  const targetDateRef = useRef(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDateRef.current));

  // Animate in
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  // Countdown
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDateRef.current));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Blurred landing page backdrop */}
      <div
        className={`absolute inset-0 backdrop-blur-md transition-all duration-500 ${
          mounted ? "bg-background/60 opacity-100" : "bg-background/0 opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-30 w-9 h-9 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 flex items-center justify-center transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4 text-foreground/60" />
      </button>

      {/* Modal card */}
      <div
        className={`relative z-20 w-full max-w-[420px] transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
        }`}
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[#D6E264]/30 via-foreground/5 to-foreground/10 pointer-events-none" />

        <div className="relative bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
          {/* Subtle top gradient */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D6E264]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#D6E264]/[0.04] to-transparent pointer-events-none rounded-3xl" />

          <div className="relative z-10">
            {!isSubmitted ? (
              <>
                {/* Label */}
                <div className="mb-7 text-center">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-[#8a9a20] mb-5 tracking-widest uppercase">
                    <span className="w-6 h-px bg-[#D6E264]/50" />
                    Early Access
                    <span className="w-6 h-px bg-[#D6E264]/50" />
                  </span>
                  <h2 className="font-display text-4xl text-foreground mb-3 leading-tight">
                    Join the Waitlist
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Be the first to access Progrize — the career platform
                    that actually moves you forward. Launching soon.
                  </p>
                </div>

                {/* Email form */}
                <form onSubmit={handleSubmit} className="mb-5">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      required
                      disabled={isLoading}
                      className="flex-1 bg-foreground/[0.04] border border-foreground/15 text-foreground placeholder:text-muted-foreground/60 focus:border-[#D6E264]/60 focus:ring-1 focus:ring-[#D6E264]/30 focus:outline-none h-12 rounded-xl px-4 text-sm font-mono transition-colors disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="h-12 px-5 bg-[#D6E264] hover:bg-[#c8d655] text-black font-medium rounded-xl transition-all duration-200 text-sm shrink-0 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed min-w-[100px] flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Joining...</span>
                        </>
                      ) : (
                        "Notify Me"
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs font-mono mt-2 pl-1">{error}</p>
                  )}
                </form>

                {/* Social proof */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="flex -space-x-2">
                    {[
                      { i: "S", bg: "#4ade80" },
                      { i: "J", bg: "#60a5fa" },
                      { i: "E", bg: "#a78bfa" },
                    ].map(({ i, bg }) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-white text-xs font-medium"
                        style={{ background: bg }}
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm font-mono">
                    2,800+ early adopters joined
                  </span>
                </div>

                {/* Countdown */}
                <div className="border border-foreground/10 rounded-2xl p-4 bg-foreground/[0.02]">
                  <p className="text-center text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                    Launching in
                  </p>
                  <div className="flex items-start justify-center gap-1 text-center">
                    {[
                      { value: timeLeft.days, label: "days" },
                      { value: timeLeft.hours, label: "hours" },
                      { value: timeLeft.minutes, label: "min" },
                      { value: timeLeft.seconds, label: "sec" },
                    ].map((unit, i) => (
                      <div key={unit.label} className="flex items-start gap-1">
                        {i > 0 && (
                          <span className="text-foreground/20 font-mono text-2xl leading-none mt-1">:</span>
                        )}
                        <div className="min-w-[44px]">
                          <div className="text-3xl font-display text-foreground tabular-nums leading-none">
                            {String(unit.value).padStart(2, "0")}
                          </div>
                          <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-1">
                            {unit.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-center text-xs text-muted-foreground/60 font-mono mt-4">
                  No credit card required • Cancel anytime
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#D6E264]/15 border border-[#D6E264]/30 flex items-center justify-center">
                  <Check className="w-8 h-8 text-[#8a9a20]" />
                </div>
                <h3 className="font-display text-3xl text-foreground mb-3">
                  You&apos;re on the list!
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-7">
                  We&apos;ll notify you the moment Progrize launches.
                  <br />
                  Get ready to move your career forward.
                </p>
                <button
                  onClick={onClose}
                  className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to the site →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
