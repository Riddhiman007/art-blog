import React from "react";

//components
import { Box, Container } from "@@/components";
export default function Layout({ children }) {
  return (
    <>
      <Container className="flex flex-row justify-center ">
        <Box className="mt-7 flex flex-col gap-7 rounded-md bg-white shadow-md shadow-slate-300 drop-shadow-lg dark:bg-slate-900 dark:shadow-slate-950">
          {children}
        </Box>
      </Container>
    </>
  );
}
