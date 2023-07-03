"use client";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Experimental_CssVarsProvider,
  experimental_extendTheme,
  THEME_ID,
  useColorScheme,
} from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
import { useTheme } from "next-themes";

import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./DarkModeContext";

const material_theme = experimental_extendTheme();
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
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={MuiTheme}>
      <Experimental_CssVarsProvider
        theme={{ [THEME_ID]: material_theme }}
        defaultMode="system"
      >
        <CssVarsProvider defaultMode={isDark ? "dark" : "light"}>
          <CssBaseline enableColorScheme />
          {children}
        </CssVarsProvider>
      </Experimental_CssVarsProvider>
    </ThemeProvider>
  );
}
