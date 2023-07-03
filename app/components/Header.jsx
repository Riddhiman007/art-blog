"use client";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Ganesh from "../static/img/ganesh.jpg";
import Image, { StaticImageData } from "next/image";

import { Container, Box, Typography, Joy } from ".";

function Header({ image, children }) {
  const isMobile = useRef();

  useEffect(() => {
    const query = window.matchMedia("(max-width:600px)");
    isMobile.current = query.matches;
  });
  return (
    <header className="h-fit w-fit">
      <Joy.AspectRatio ratio>
        <Image
          src={image}
          alt="loading"
          fill
          className="static flex w-screen flex-col justify-center opacity-30"
        />
      </Joy.AspectRatio>
      <Container className="mx-auto flex h-full flex-col justify-center pb-7">
        {children}
      </Container>
    </header>
  );
}

Header.defaultProps = {
  title: "Art Blog",
};

export default Header;
