import React from "react";

// components
import { Box, Container, Modal, Navbar, Typography } from "../../components";
/**
 *
 * @returns a React component that is show when the user enter email address
 */
export default function Verify() {
  return (
    <>
      <Box className="mt-7 pl-7">
        {/* heading */}
        <Typography
          variant="h2"
          className="text-2xl dark:text-slate-100 md:text-3xl lg:text-4xl"
        >
          Verify your email
        </Typography>
      </Box>
      <Box className="m-7 mt-0">
        <Typography variant="body2" className="text-base dark:text-slate-100 lg:text-xl">
          A link has been sent to your email address. Please click on the link to
          continue.
        </Typography>
      </Box>
    </>
  );
}
