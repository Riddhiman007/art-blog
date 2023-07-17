import React from "react";

import { Box, Container } from "../joy";
export default function BlogLayout({ children }) {
  return (
    <Container>
      <Box className="mt-10 rounded-lg bg-white p-7 px-7 shadow shadow-slate-950 dark:bg-slate-900">
        {children}
      </Box>
    </Container>
  );
}
