"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type IntroState = { done: boolean; finish: () => void };

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // The intro only belongs on the home page.
    if (pathname !== "/" && root.dataset.intro === "play") root.dataset.intro = "done";
    if (root.dataset.intro !== "play") setDone(true);
  }, [pathname]);

  const finish = useCallback(() => {
    document.documentElement.dataset.intro = "done";
    setDone(true);
  }, []);

  return <IntroContext.Provider value={{ done, finish }}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
