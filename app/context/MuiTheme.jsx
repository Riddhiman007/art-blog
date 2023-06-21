"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useTheme } from "next-themes";

import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./DarkModeContext";

export default function Theme({ children }) {
  const [root, setRoot] = useState("");

  const { isDark, setIsDark } = useContext(DarkModeContext);
  useEffect(() => setRoot(document.querySelector("body")), []);
  const MuiTheme = createTheme({
    components: {
      MuiPopover: {
        defaultProps: {
          container: root,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: root,
        },
      },
      MuiDrawer: { defaultProps: { container: root } },
    },
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={MuiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
