"use client";

import React, { createContext, useState, useEffect } from "react";

export const MobileFirstContext = createContext<boolean>(false);

/**
 *
 * @param {{children: React.ReactNode}} param0 The children for the context
 */
export default function MobileFirstProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width:600px)");
    setIsMobile(query.matches);
    window.addEventListener("resize", () => {
      setIsMobile(query.matches);
    });
  }, []);

  return (
    <MobileFirstContext.Provider value={isMobile}>{children}</MobileFirstContext.Provider>
  );
}
