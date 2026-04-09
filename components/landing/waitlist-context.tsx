"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { WaitlistModal } from "./waitlist-modal";

interface WaitlistContextValue {
  openWaitlist: () => void;
}

const WaitlistContext = createContext<WaitlistContextValue>({
  openWaitlist: () => {},
});

export function useWaitlist() {
  return useContext(WaitlistContext);
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-open on first visit after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <WaitlistContext.Provider value={{ openWaitlist: () => setIsOpen(true) }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </WaitlistContext.Provider>
  );
}
