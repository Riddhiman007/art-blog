"use client";
import React, { createContext, useEffect, useState } from "react";

// components
import { useColorScheme as useJoyColorScheme } from "@mui/joy/styles";
import { useColorScheme as useMaterialColorScheme } from "@mui/material/styles";

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
  const { setMode: setMuiMode } = useMaterialColorScheme();
  const { setMode: setJoyMode } = useJoyColorScheme();

  const mode = isDark ? "dark" : "light";
  /**
   * system dark mode enabled or not
   */
  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme:dark)");
    setIsDark(dark.matches);
  }, []);

  useEffect(() => {
    setMuiMode(mode);
    setJoyMode(mode);
  }, [mode, setJoyMode, setMuiMode]);

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}
