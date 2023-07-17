"use client";
import React, { useContext } from "react";
import PropTypes from "prop-types";

import Ganesh from "../static/img/ganesh.jpg";
import Image, { StaticImageData } from "next/image";

import { Container, Box, Typography } from ".";
import { AspectRatio } from "@@/joy";

// contexts
import { MobileFirstContext } from "@@/context";

function Header({ image, children }) {
  const { isMobile } = useContext(MobileFirstContext);
  return (
    <header className="h-fit w-fit">
      <AspectRatio ratio={isMobile ? "4/3" : "9/16"}>
        <Image
          src={image}
          alt="loading"
          fill
          className="static flex w-screen flex-col justify-center opacity-30"
        />
        <Box className="flex w-full flex-col align-middle">
          <Container className="mx-auto flex h-full flex-row justify-center pb-7">
            {children}
          </Container>
        </Box>
      </AspectRatio>
    </header>
  );
}

Header.defaultProps = {
  title: "Art Blog",
};

export default Header;
