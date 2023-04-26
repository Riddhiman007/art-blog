import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import React, { useEffect, useState } from "react";

export default function Theme(props) {
  const [root, setRoot] = useState("");
  useEffect(() => setRoot(document.getElementById("__next")), []);
  const theme = createTheme({
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
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
