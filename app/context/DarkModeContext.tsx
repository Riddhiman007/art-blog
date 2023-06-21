"use client";
import React, { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext<{
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>> | any;
}>({ isDark: false, setIsDark: () => {} });

/**
 *
 * @param children the children the context should be provided
 * @param isDark whether the page is in dark mode
 * @returns wrapped context
 */
export function DarkModeProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [isDark, setIsDark] = useState<boolean>(false);

  /**
   * system dark mode enabled or not
   */
  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme:dark)");
    setIsDark(dark.matches);
  }, []);
  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}
