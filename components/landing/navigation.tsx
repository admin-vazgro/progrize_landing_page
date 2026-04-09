"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useWaitlist } from "./waitlist-context";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "For Organisations", href: "#how-it-works" },
  { name: "Community", href: "#integrations" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Pricing", href: "#pricing" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openWaitlist } = useWaitlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Header — z-50 so it always renders above the z-40 mobile overlay */}
      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
        }`}
      >
        <nav
          className={`mx-auto transition-all duration-500 ${
            isScrolled || isMobileMenuOpen
              ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
              : "bg-transparent max-w-[1400px]"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 px-4 sm:px-6 lg:px-8 ${
              isScrolled ? "h-14" : "h-16 sm:h-20"
            }`}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group shrink-0">
              <span
                className={`font-display tracking-tight transition-all duration-500 ${
                  isScrolled ? "text-xl" : "text-xl sm:text-2xl"
                }`}
              >
                Progrize
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10 xl:gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <Button
                onClick={openWaitlist}
                className={`bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 ${
                  isScrolled ? "px-4 h-9 text-xs" : "px-6 py-3"
                }`}
              >
                Join Waitlist
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-1 rounded-lg hover:bg-foreground/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay — z-40, below the header (z-50) so the toggle button stays visible */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full px-6 sm:px-10 pt-20 sm:pt-24 pb-8 overflow-y-auto">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-5 sm:gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[2.5rem] sm:text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 leading-tight ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className={`pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "375ms" : "0ms" }}
          >
            <Button
              className="w-full bg-foreground text-background rounded-full h-12 sm:h-14 text-base"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openWaitlist();
              }}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
