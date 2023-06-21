"use client";
import React from "react";

import { Box, Skeleton } from "@mui/material";
export default function Loading() {
  return (
    <Box className="dark:bg-slate-900">
      <Skeleton height={50} width={40} className="m-7 dark:text-slate-100" />
    </Box>
  );
}
