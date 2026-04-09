"use client";

import { useEffect, useState, useRef } from "react";

const joiners = [
  { initials: "SK", name: "Sarah Khan", role: "Product Designer", company: "Google", time: "Just joined", color: "#4ade80" },
  { initials: "JB", name: "John Bosa", role: "Software Engineer", company: "Amazon", time: "2m ago", color: "#60a5fa" },
  { initials: "EC", name: "Emily Chen", role: "UX Researcher", company: "Microsoft", time: "4m ago", color: "#a78bfa" },
  { initials: "MO", name: "Marcus Obi", role: "Data Scientist", company: "Deloitte", time: "6m ago", color: "#f97316" },
  { initials: "PR", name: "Priya Rajan", role: "Marketing Lead", company: "Spotify", time: "9m ago", color: "#f43f5e" },
  { initials: "TW", name: "Tom Walsh", role: "Frontend Engineer", company: "Stripe", time: "11m ago", color: "#06b6d4" },
  { initials: "AN", name: "Aisha Nwosu", role: "Career Coach", company: "KPMG", time: "14m ago", color: "#eab308" },
  { initials: "RL", name: "Raj Lakhani", role: "Product Manager", company: "Meta", time: "17m ago", color: "#84cc16" },
  { initials: "FL", name: "Fiona Lee", role: "Brand Strategist", company: "Accenture", time: "20m ago", color: "#ec4899" },
  { initials: "DM", name: "David Mills", role: "DevOps Engineer", company: "Netflix", time: "23m ago", color: "#8b5cf6" },
  { initials: "YA", name: "Yara Adeyemi", role: "Recruiter", company: "LinkedIn", time: "26m ago", color: "#14b8a6" },
  { initials: "CB", name: "Chris Byrne", role: "Growth Analyst", company: "Shopify", time: "29m ago", color: "#fb923c" },
];

const joinersRow2 = [
  { initials: "NP", name: "Nina Patel", role: "Sales Executive", company: "Salesforce", time: "31m ago", color: "#a3e635" },
  { initials: "OT", name: "Oliver Tran", role: "ML Engineer", company: "OpenAI", time: "33m ago", color: "#67e8f9" },
  { initials: "BK", name: "Bella Kim", role: "Content Strategist", company: "HubSpot", time: "36m ago", color: "#f0abfc" },
  { initials: "WA", name: "Will Asante", role: "Finance Analyst", company: "Goldman Sachs", time: "38m ago", color: "#fcd34d" },
  { initials: "LS", name: "Laura Silva", role: "People & Culture", company: "Airbnb", time: "41m ago", color: "#6ee7b7" },
  { initials: "KR", name: "Kenji Rao", role: "Backend Engineer", company: "Uber", time: "44m ago", color: "#93c5fd" },
  { initials: "ZH", name: "Zoe Hughes", role: "Graphic Designer", company: "Adobe", time: "47m ago", color: "#fca5a5" },
  { initials: "AM", name: "Amara Mensah", role: "Business Analyst", company: "McKinsey", time: "50m ago", color: "#c4b5fd" },
  { initials: "ST", name: "Sam Torres", role: "iOS Developer", company: "Apple", time: "53m ago", color: "#86efac" },
  { initials: "HN", name: "Hana Nakamura", role: "Operations Lead", company: "Toyota", time: "56m ago", color: "#7dd3fc" },
  { initials: "IG", name: "Ivan Greco", role: "UI Designer", company: "Figma", time: "58m ago", color: "#d8b4fe" },
  { initials: "MF", name: "Maya Foster", role: "Product Analyst", company: "Notion", time: "1h ago", color: "#fdba74" },
];

function JoinerCard({ joiner }: { joiner: typeof joiners[0] }) {
  return (
    <div className="shrink-0 flex items-center gap-4 px-5 py-4 border border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.02] transition-all duration-300 rounded-2xl w-[280px]">
      {/* Avatar */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium text-black shrink-0"
        style={{ backgroundColor: joiner.color }}
      >
        {joiner.initials}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-sm truncate">{joiner.name}</span>
          <span className="text-xs font-mono text-muted-foreground shrink-0">{joiner.time}</span>
        </div>
        <div className="text-xs text-muted-foreground truncate mt-0.5">{joiner.role} · {joiner.company}</div>
      </div>
    </div>
  );
}

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            WHO&apos;S JOINING
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Your future network
            <br />
            is already here.
          </h2>
          <p className="text-xl text-muted-foreground">
            Professionals from top companies are joining the waitlist every day.
            Be part of the movement.
          </p>
        </div>
      </div>

      {/* Row 1 — left scroll */}
      <div className="w-full mb-4 overflow-hidden">
        <div className="flex gap-4 marquee">
          {[...Array(2)].map((_, si) => (
            <div key={si} className="flex gap-4 shrink-0 px-2">
              {joiners.map((j) => (
                <JoinerCard key={`${j.name}-${si}`} joiner={j} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-4 marquee-reverse">
          {[...Array(2)].map((_, si) => (
            <div key={si} className="flex gap-4 shrink-0 px-2">
              {joinersRow2.map((j) => (
                <JoinerCard key={`${j.name}-${si}`} joiner={j} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex justify-center mt-10">
        <span className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live — people joining right now
        </span>
      </div>
    </section>
  );
}
