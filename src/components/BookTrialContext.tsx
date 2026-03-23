"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface BookTrialContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const BookTrialContext = createContext<BookTrialContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function BookTrialProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <BookTrialContext.Provider value={{ isOpen, open, close }}>
      {children}
    </BookTrialContext.Provider>
  );
}

export function useBookTrial() {
  return useContext(BookTrialContext);
}
